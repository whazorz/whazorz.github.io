/**
 * wsystemtracker.js - Security & Session Monitor
 */

// 1. Fetch Geo-IP Data
async function getAdminSessionData() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return {
            ip: data.ip || "0.0.0.0",
            location: `${data.city}, ${data.country_name}` || "Unknown Location"
        };
    } catch (err) {
        return { ip: "IP_BLOCKED", location: "Geo-Fetch Failed" };
    }
}

// 2. Log Session & Unique History (One-time catch)
async function logSecuritySession(userEmail) {
    const geoData = await getAdminSessionData();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    const sessionData = {
        email: userEmail,
        ip: geoData.ip,
        location: geoData.location,
        time: timestamp,
        device: navigator.platform,
        browser: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`
    };

    try {
        // Update Live Monitor
        await firebase.firestore().collection("admin_meta").doc("last_access").set(sessionData);

        // One-time History Catch: Use IP as document ID to prevent duplicates
        const ipDocId = geoData.ip.replace(/\./g, "_");
        await firebase.firestore().collection("login_history").doc(ipDocId).set({
            ...sessionData,
            first_detected: timestamp
        }, { merge: true });

        console.log("Security Audit: Unique IP session logged.");
    } catch (e) {
        console.error("Tracking Error:", e);
    }
}

// 3. Real-time Monitor Display (Wait for Auth)
function displayLoginTracker() {
    const ipDisplay = document.getElementById("last-login-ip");
    const locDisplay = document.getElementById("last-login-location");
    const timeDisplay = document.getElementById("last-login-time");
    const devDisplay = document.getElementById("last-login-device");

    // Only start the listener if the user is authenticated to prevent permission errors
    const user = firebase.auth().currentUser;
    if (!user) {
        console.warn("Tracker: Waiting for authentication...");
        return;
    }

    if (ipDisplay) {
        firebase.firestore().collection("admin_meta").doc("last_access")
            .onSnapshot(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    ipDisplay.textContent = data.ip || "0.0.0.0";
                    locDisplay.textContent = data.location || "Unknown";
                    timeDisplay.textContent = data.time ? data.time.toDate().toLocaleString() : "Just now";
                    devDisplay.textContent = data.device || "Unknown";
                }
            }, err => {
                console.error("Monitor Listener Error:", err.message);
            });
    }
}