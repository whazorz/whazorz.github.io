/**
 * wsystemtracker.js - Unique IP History & Security Monitor
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

// 2. Log Session (Live Monitor) and Unique History
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
        // A. Update the Live Dashboard Monitor (Always updates)
        await firebase.firestore().collection("admin_meta").doc("last_access").set(sessionData);

        // B. Update Unique History Log
        // We use the IP address (dots replaced by underscores) as the ID to prevent duplicates.
        const ipDocId = geoData.ip.replace(/\./g, "_");
        const historyRef = firebase.firestore().collection("login_history").doc(ipDocId);
        
        // We use set with {merge: true} so we don't create multiple entries for the same IP
        await historyRef.set({
            ...sessionData,
            first_captured: timestamp // Records when this IP was first seen
        }, { merge: true });

        console.log("Security check complete. Unique IP logged.");
    } catch (e) {
        console.error("Security logging error:", e);
    }
}

// 3. Real-time Monitor Display
function displayLoginTracker() {
    const ipDisplay = document.getElementById("last-login-ip");
    const locDisplay = document.getElementById("last-login-location");
    const timeDisplay = document.getElementById("last-login-time");
    const devDisplay = document.getElementById("last-login-device");

    if (ipDisplay) {
        firebase.firestore().collection("admin_meta").doc("last_access")
            .onSnapshot(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    ipDisplay.textContent = data.ip;
                    locDisplay.textContent = data.location;
                    timeDisplay.textContent = data.time ? data.time.toDate().toLocaleString() : "Just now";
                    devDisplay.textContent = data.device;
                }
            });
    }
}