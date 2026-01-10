async function getAdminIP() {
    try {
        // Using ipify for a clean JSON response
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (err) {
        return "IP_BLOCKED_OR_FAILED";
    }
}

// Intercept Login Form
const adminLoginForm = document.getElementById("login-form");

if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", async () => {
        const email = document.getElementById("admin-email").value;
        const ip = await getAdminIP();
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        
        // Advanced metadata capture
        const sessionData = {
            email: email,
            ip: ip,
            time: timestamp,
            device: navigator.platform,
            browser: navigator.userAgent,
            screenResolution: `${window.screen.width}x${window.screen.height}`
        };

        // Store in a history log
        firebase.firestore().collection("login_logs").add(sessionData)
            .then(() => console.log("Login session tracked successfully."))
            .catch(e => console.error("Tracking Error:", e));
            
        // Also update the "Last Login" global record for the dashboard
        firebase.firestore().collection("admin_meta").doc("last_access").set(sessionData);
    });
}

// Function to display data in the dashboard
function displayLoginTracker() {
    const ipDisplay = document.getElementById("last-login-ip");
    const timeDisplay = document.getElementById("last-login-time");

    if (ipDisplay && timeDisplay) {
        firebase.firestore().collection("admin_meta").doc("last_access")
            .onSnapshot(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    ipDisplay.textContent = data.ip;
                    timeDisplay.textContent = data.time ? data.time.toDate().toLocaleString() : "Just now";
                    
                    // Optional: set title for device info on hover
                    ipDisplay.title = `Device: ${data.device} | Res: ${data.screenResolution}`;
                }
            });
    }
}

// Initialize display when auth is ready
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        displayLoginTracker();
    }
});