/**
 * tracker.js - Security & Session Monitor (Updated)
 */

// 1. Fetch IP with a fallback
async function getAdminIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) throw new Error("API Limit/Blocked");
        const data = await response.json();
        return data.ip;
    } catch (err) {
        console.warn("IP Fetch failed, using fallback string.");
        return "IP_UNAVAILABLE";
    }
}

// 2. Intercept the Login Form
const adminLoginForm = document.getElementById("login-form");

if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", async (e) => {
        // PREVENT the default refresh so the async code can finish
        e.preventDefault();

        const email = document.getElementById("admin-email").value;
        const ip = await getAdminIP();
        
        const sessionData = {
            email: email,
            ip: ip,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            device: navigator.platform || "Unknown Platform",
            browser: navigator.userAgent,
            screenResolution: `${window.screen.width}x${window.screen.height}`
        };

        try {
            // Wait for BOTH operations to finish before moving on
            await Promise.all([
                firebase.firestore().collection("login_logs").add(sessionData),
                firebase.firestore().collection("admin_meta").doc("last_access").set(sessionData)
            ]);
            
            console.log("Security log captured.");

            // SUCCESS: Now manually trigger the login logic or redirect
            // If you are using Firebase Auth signInWithEmailAndPassword, call it here:
            // loginUser(email, password); 
            
            // Or, if this is a standard form submit, you can now unbind and submit:
            // adminLoginForm.submit();

        } catch (error) {
            console.error("Firestore Error:", error);
            // Even if logging fails, you might want to allow login to proceed
        }
    });
}

// 3. Display the data in the Dashboard
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
                    
                    // Handle Firestore Timestamp conversion
                    if (data.time && data.time.toDate) {
                        timeDisplay.textContent = data.time.toDate().toLocaleString();
                    } else {
                        timeDisplay.textContent = "Updating...";
                    }
                    
                    if (deviceDisplay) {
                        deviceDisplay.textContent = data.device || "Unknown";
                        deviceDisplay.title = `Res: ${data.screenResolution} | Browser: ${data.browser}`;
                    }
                }
            }, err => {
                console.error("Snapshot listener failed (Check Rules):", err);
            });
    }
}

// 4. Trigger display only when logged in
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        displayLoginTracker();
    }
});