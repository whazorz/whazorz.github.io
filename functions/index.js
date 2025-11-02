const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios"); // We will install this next

admin.initializeApp();
const db = admin.firestore();

// PayPal API URLs - use "api-m.paypal.com" for LIVE
const PAYPAL_API = "https://api-m.paypal.com"; 

/**
 * Generates a PayPal access token for API calls.
 */
async function getPayPalAccessToken() {
  // We use process.env to read from the .env file
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
    console.error("Failed to get PayPal access token:", error.response ? error.response.data : error.message);
    throw new functions.https.HttpsError("internal", "PayPal API error.");
  }
}

/**
 * Verifies a PayPal order from the frontend and grants coins.
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
    throw new functions.https.HttpsError("invalid-argument", "No Order ID provided.");
  }

  // --- Security Check 1: Prevent Replay Attacks ---
  const paymentRef = db.collection("payments").doc(orderID);
  const paymentDoc = await paymentRef.get();

  if (paymentDoc.exists) {
    console.warn(`User ${userId} attempted to reuse PayPal Order ID: ${orderID}`);
    throw new functions.https.HttpsError("already-exists", "This payment has already been processed.");
  }
  
  try {
    // 1. Get our secret API token
    const accessToken = await getPayPalAccessToken();

    // 2. Call PayPal to verify the order
    const url = `${PAYPAL_API}/v2/checkout/orders/${orderID}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    // 3. Check payment status
    const orderData = response.data;
    if (orderData.status !== "COMPLETED") {
      throw new functions.https.HttpsError("failed-precondition", "Payment was not completed.");
    }
    
    // --- Define what is being purchased ---
    const coinsToGrant = 100; // This must match the price in onApprove
    const amountPaid = orderData.purchase_units[0].amount.value;
    
    // 4. Check if they paid the correct amount (e.g., $1.00)
    if (parseFloat(amountPaid) < 1.00) { // Set this to your price
       throw new functions.https.HttpsError("failed-precondition", "Incorrect payment amount.");
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
        userEmail: context.auth.token.email || 'unknown',
        amount: parseFloat(amountPaid),
        currency: orderData.purchase_units[0].amount.currency_code,
        coinsGranted: coinsToGrant,
        processedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    console.log(`Successfully granted ${coinsToGrant} coins to ${userId} for PayPal order ${orderID}`);
    return { success: true, coinsGranted: coinsToGrant };

  } catch (error) {
    console.error(`Failed to verify PayPal order ${orderID}:`, error.response ? error.response.data : error.message);
    throw new functions.https.HttpsError("internal", "Failed to verify payment.");
  }
});