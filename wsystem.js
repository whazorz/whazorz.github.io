/**
 * wsystemtracker.js - Security & Session Monitor
 */

// 1. Fetch IP with a fallback
async function getAdminIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (err) {
        return "IP_UNAVAILABLE";
    }
}

// 2. Logic to log the session
async function logSecuritySession(userEmail) {
    const ip = await getAdminIP();
    const sessionData = {
        email: userEmail,
        ip: ip,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        device: navigator.platform,
        browser: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`
    };

    try {
        // Save history and update the dashboard monitor
        await firebase.firestore().collection("login_logs").add(sessionData);
        await firebase.firestore().collection("admin_meta").doc("last_access").set(sessionData);
        console.log("Security session logged.");
    } catch (e) {
        console.error("Tracker Error:", e);
    }
}

// 3. Display data on the Dashboard
function displayLoginTracker() {
    const ipDisplay = document.getElementById("last-login-ip");
    const timeDisplay = document.getElementById("last-login-time");
    const deviceDisplay = document.getElementById("last-login-device");

    if (ipDisplay && timeDisplay) {
        firebase.firestore().collection("admin_meta").doc("last_access")
            .onSnapshot(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    ipDisplay.textContent = data.ip || "0.0.0.0";
                    
                    if (data.time) {
                        const date = data.time.toDate ? data.time.toDate() : new Date();
                        timeDisplay.textContent = date.toLocaleString();
                    }
                    
                    if (deviceDisplay) {
                        deviceDisplay.textContent = data.device || "Unknown";
                        deviceDisplay.title = `Browser: ${data.browser} | Res: ${data.screenResolution}`;
                    }
                }
            });
    }
}