/**
 * ===================================================================
 * UPDATED FIREBASE FUNCTIONS CODE (index.js)
 * ===================================================================
 *
 * This file includes the critical fix for PayPal payments.
 *
 * The Problem: The original code only *checked* the order status
 * (which was "APPROVED") but never *captured* the payment.
 *
 * The Fix: The code has been changed to make a POST request to
 * PayPal's "/capture" endpoint. This tells PayPal to actually
 * transfer the funds and mark the order as "COMPLETED".
 *
 * See line 74 for the exact change.
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();
const db = admin.firestore();

// PayPal API URLs - use "api-m.paypal.com" for LIVE
const PAYPAL_API = "https://api-m.sandbox.paypal.com";

/**
 * Generates a PayPal access token for API calls.
 * This function is unchanged and correct.
 */
async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.post(
      `${PAYPAL_API}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error(
      "Failed to get PayPal access token:",
      error.response ? error.response.data : error.message
    );
    throw new functions.https.HttpsError("internal", "PayPal API error.");
  }
}

/**
 * Verifies a PayPal order from the frontend and grants coins.
 * --- THIS FUNCTION IS NOW FIXED ---
 */
exports.verifyPayPalOrder = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in."
    );
  }

  const orderID = data.orderID;
  const userId = context.auth.uid;

  if (!orderID) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "No Order ID provided."
    );
  }

  // --- Security Check 1: Prevent Replay Attacks ---
  const paymentRef = db.collection("payments").doc(orderID);
  const paymentDoc = await paymentRef.get();

  if (paymentDoc.exists) {
    console.warn(
      `User ${userId} attempted to reuse PayPal Order ID: ${orderID}`
    );
    throw new functions.https.HttpsError(
      "already-exists",
      "This payment has already been processed."
    );
  }

  try {
    // 1. Get our secret API token
    const accessToken = await getPayPalAccessToken();

    // 2. Call PayPal to CAPTURE the order
    //    ============================================================
    //    == THIS IS THE FIX ==
    //    We change .get(url) to .post(`${url}/capture`, {})
    //    This tells PayPal to finalize the payment.
    //    ============================================================
    const url = `${PAYPAL_API}/v2/checkout/orders/${orderID}`;
    const response = await axios.post(
      `${url}/capture`, // <-- We add /capture to the URL
      {}, // <-- We pass an empty body for the POST request
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // 3. Check payment status
    //    Now that we've captured it, the status will be "COMPLETED"
    const orderData = response.data;
    if (orderData.status !== "COMPLETED") {
      // This will now only catch if the capture itself fails
      console.error(`Payment capture failed. Status: ${orderData.status}`, orderData);
      throw new functions.https.HttpsError(
        "failed-precondition",
        `Payment capture failed. Status: ${orderData.status}`
      );
    }

    // --- Grant 15 coins for 5 EUR ---
    const coinsToGrant = 15;
    const amountPaid = orderData.purchase_units[0].amount.value;
    const currencyPaid = orderData.purchase_units[0].amount.currency_code;

    // 4. Security Check: Verify both amount and currency
    if (parseFloat(amountPaid) < 5 || currencyPaid !== "EUR") {
      throw new functions.https.HttpsError(
        "failed-precondition",
        `Incorrect payment. Expected 5.00 EUR, got ${amountPaid} ${currencyPaid}`
      );
    }

    // --- Security Check 2: Grant Coins and Log Payment (as a transaction) ---
    const userRef = db.collection("users").doc(userId);

    await db.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists) throw "User not found!";

      const newCoins = (userDoc.data().coins || 0) + coinsToGrant;
      transaction.update(userRef, { coins: newCoins });

      // Log the payment to prevent reuse
      transaction.set(paymentRef, {
        userId: userId,
        userEmail: context.auth.token.email || "unknown",
        amount: parseFloat(amountPaid),
        currency: currencyPaid,
        coinsGranted: coinsToGrant,
        processedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    console.log(
      `Successfully granted ${coinsToGrant} coins to ${userId} for PayPal order ${orderID}`
    );
    return { success: true, coinsGranted: coinsToGrant };
  } catch (error) {
    // Log the detailed error
    console.error(
      `Failed to verify PayPal order ${orderID}:`,
      error.response ? error.response.data : error.message
    );
    
    // Send a more specific error message back to the client if possible
    const errorMessage =
      error.response?.data?.message || "Failed to verify payment.";
    
    throw new functions.https.HttpsError("internal", errorMessage);
  }
});