/**
 * tracker.js - Security & Session Monitor (Finalized)
 */

// 1. Fetch IP with a timeout to prevent hanging
async function getAdminIP() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

    try {
        const response = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
        const data = await response.json();
        return data.ip;
    } catch (err) {
        console.warn("IP Fetch failed or timed out.");
        return "IP_PRIVATE_OR_BLOCKED";
    }
}

// 2. The Interceptor: Capture and Save
const adminLoginForm = document.getElementById("login-form");

if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Stop the reload

        // Gather UI elements for status feedback (optional)
        const email = document.getElementById("admin-email").value;
        const password = document.getElementById("admin-password").value; // Adjust ID as needed

        try {
            // Step A: Authenticate first
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            
            // Step B: If login successful, gather session data
            const ip = await getAdminIP();
            const sessionData = {
                email: email,
                ip: ip,
                time: firebase.firestore.FieldValue.serverTimestamp(),
                device: navigator.platform || "Unknown",
                browser: navigator.userAgent,
                screenResolution: `${window.screen.width}x${window.screen.height}`
            };

            // Step C: Save to Firestore
            await Promise.all([
                firebase.firestore().collection("login_logs").add(sessionData),
                firebase.firestore().collection("admin_meta").doc("last_access").set(sessionData)
            ]);

            console.log("Session captured. Redirecting...");
            // Redirect to dashboard if necessary: window.location.href = "dashboard.html";

        } catch (error) {
            console.error("Auth or Logging Error:", error.message);
            alert("Login failed: " + error.message);
        }
    });
}

// 3. The Display: Real-time Listener
function displayLoginTracker() {
    const ipDisplay = document.getElementById("last-login-ip");
    const timeDisplay = document.getElementById("last-login-time");
    const deviceDisplay = document.getElementById("last-login-device");

    // Only proceed if the elements exist on the current page
    if (ipDisplay && timeDisplay) {
        firebase.firestore().collection("admin_meta").doc("last_access")
            .onSnapshot(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    
                    // Update UI with fades or direct text
                    ipDisplay.textContent = data.ip || "0.0.0.0";
                    
                    if (data.time) {
                        // Firebase Timestamps need toDate()
                        const date = data.time.seconds ? data.time.toDate() : new Date();
                        timeDisplay.textContent = date.toLocaleString();
                    }

                    if (deviceDisplay) {
                        deviceDisplay.textContent = data.device || "Unknown Device";
                        deviceDisplay.title = `Browser: ${data.browser} | Res: ${data.screenResolution}`;
                    }
                }
            }, err => {
                console.error("Firestore Listen Error. Check your Security Rules:", err.message);
            });
    }
}

// 4. Initialization
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("Admin authenticated:", user.email);
        displayLoginTracker();
    } else {
        console.log("No active session.");
    }
});