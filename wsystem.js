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

// 2. Global Function: Log Session & Unique History (Called from wadmin.js)
window.logSecuritySession = async function(userEmail) {
    // Ensure Firebase is initialized
    if (!firebase.apps.length) return;

    const geoData = await getAdminSessionData();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    const sessionData = {
        email: userEmail,
        ip: geoData.ip,
        location: geoData.location,
        time: timestamp,
        device: navigator.platform || "Unknown Platform",
        browser: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`
    };

    try {
        const db = firebase.firestore();
        
        // Update Live Monitor (admin_meta/last_access)
        await db.collection("admin_meta").doc("last_access").set(sessionData);

        // One-time History Catch: Use IP as document ID to prevent duplicates
        // Dots are replaced by underscores because Firestore IDs handle them better
        const ipDocId = geoData.ip.replace(/\./g, "_");
        await db.collection("login_history").doc(ipDocId).set({
            ...sessionData,
            first_detected: timestamp
        }, { merge: true });

        console.log("Tracker: Successfully logged security session for", geoData.ip);
        return true;
    } catch (e) {
        console.error("Tracker Logging Error:", e);
        return false;
    }
};

// 3. Real-time Monitor Display (Triggered by onAuthStateChanged)
window.displayLoginTracker = function() {
    const ipDisplay = document.getElementById("last-login-ip");
    const locDisplay = document.getElementById("last-login-location");
    const timeDisplay = document.getElementById("last-login-time");
    const devDisplay = document.getElementById("last-login-device");

    // Safety Check: Avoid "Missing Permissions" by ensuring user is logged in
    if (!firebase.auth().currentUser) {
        console.warn("Tracker: Authentication required to start display listener.");
        return;
    }

    firebase.firestore().collection("admin_meta").doc("last_access")
        .onSnapshot(doc => {
            if (doc.exists) {
                const data = doc.data();
                
                // Update UI elements if they exist in the current view
                if (ipDisplay) ipDisplay.textContent = data.ip || "0.0.0.0";
                if (locDisplay) locDisplay.textContent = data.location || "Detecting...";
                
                if (timeDisplay) {
                    timeDisplay.textContent = data.time ? data.time.toDate().toLocaleString() : "Syncing...";
                }
                
                if (devDisplay) {
                    devDisplay.textContent = data.device || "Unknown";
                    devDisplay.title = `Browser: ${data.browser}`;
                }
            }
        }, err => {
            // This usually triggers during the split-second logout transition
            console.log("Monitor Listener paused (waiting for valid session).");
        });
};