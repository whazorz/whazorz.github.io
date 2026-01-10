/**
 * wsystemtracker.js - Security & Unique History Tracker
 */

// 1. Fetch Geo-IP Data with Error Handling
async function getAdminSessionData() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        return {
            ip: data.ip || "0.0.0.0",
            location: (data.city && data.country_name) ? `${data.city}, ${data.country_name}` : "Unknown Location"
        };
    } catch (err) {
        console.error("Geo-Fetch Error:", err);
        return { ip: "IP_PRIVATE/VPN", location: "Geo-Fetch Blocked" };
    }
}

// 2. Global Function: Log Session & Unique History
window.logSecuritySession = async function(userEmail) {
    if (!firebase.apps.length) return;

    const geoData = await getAdminSessionData();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    const sessionData = {
        email: userEmail,
        ip: geoData.ip,
        location: geoData.location,
        time: timestamp,
        device: navigator.platform || "Unknown",
        browser: navigator.userAgent
    };

    try {
        const db = firebase.firestore();
        // Update Live Monitor
        await db.collection("admin_meta").doc("last_access").set(sessionData);

        // One-time History Catch: Use IP as document ID to prevent duplicates
        const ipDocId = geoData.ip.replace(/\./g, "_");
        await db.collection("login_history").doc(ipDocId).set({
            ...sessionData,
            first_detected: timestamp
        }, { merge: true });

        console.log("Tracker: Security session logged for", geoData.ip);
        return true;
    } catch (e) {
        console.error("Tracker Logging Error:", e);
    }
};

// 3. Real-time Monitor Display
window.displayLoginTracker = function() {
    const ipDisplay = document.getElementById("last-login-ip");
    const locDisplay = document.getElementById("last-login-location");
    const timeDisplay = document.getElementById("last-login-time");
    const devDisplay = document.getElementById("last-login-device");

    if (!firebase.auth().currentUser) return;

    firebase.firestore().collection("admin_meta").doc("last_access")
        .onSnapshot(doc => {
            if (doc.exists) {
                const data = doc.data();
                if (ipDisplay) ipDisplay.textContent = data.ip || "0.0.0.0";
                if (locDisplay) locDisplay.textContent = data.location || "Unknown";
                if (timeDisplay) timeDisplay.textContent = data.time ? data.time.toDate().toLocaleString() : "Syncing...";
                if (devDisplay) devDisplay.textContent = data.device || "Unknown";
            }
        }, err => console.log("Monitor paused."));
};