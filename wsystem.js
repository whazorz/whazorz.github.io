/**
 * tracker.js - Security & Session Monitor
 */

// 1. Fetch IP from a 3rd party API
async function getAdminIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (err) {
        return "IP_BLOCKED";
    }
}

// 2. Intercept the existing Login Form
const adminLoginForm = document.getElementById("login-form");

if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", async () => {
        const email = document.getElementById("admin-email").value;
        const ip = await getAdminIP();
        
        const sessionData = {
            email: email,
            ip: ip,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            device: navigator.platform,
            browser: navigator.userAgent,
            screenResolution: `${window.screen.width}x${window.screen.height}`
        };

        // Save a permanent log entry
        firebase.firestore().collection("login_logs").add(sessionData);
        
        // Update the single "Last Access" record for the dashboard UI
        firebase.firestore().collection("admin_meta").doc("last_access").set(sessionData);
    });
}

// 3. Display the data in the Dashboard
function displayLoginTracker() {
    const ipDisplay = document.getElementById("last-login-ip");
    const timeDisplay = document.getElementById("last-login-time");
    const deviceDisplay = document.getElementById("last-login-device");

    if (ipDisplay && timeDisplay) {
        // Use onSnapshot for real-time updates without refreshing
        firebase.firestore().collection("admin_meta").doc("last_access")
            .onSnapshot(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    ipDisplay.textContent = data.ip || "0.0.0.0";
                    timeDisplay.textContent = data.time ? data.time.toDate().toLocaleString() : "Just now";
                    
                    if (deviceDisplay) {
                        deviceDisplay.textContent = data.device || "Unknown";
                        deviceDisplay.title = `Resolution: ${data.screenResolution} | Browser: ${data.browser}`;
                    }
                }
            });
    }
}

// 4. Trigger display only when logged in
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        displayLoginTracker();
    }
});