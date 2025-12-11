loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loginError.textContent = ""; // Clear previous errors
    const email = document.getElementById("admin-email").value;
    const pass = document.getElementById("admin-password").value;
    
    // Attempt login
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // SUCCESS: This part confirms the function finished successfully
        console.log("Login successful! User:", userCredential.user.email);
        // The onAuthStateChanged listener will now take over and display the dashboard
      })
      .catch(err => {
        // FAILURE: This confirms the function caught an error
        console.error("Login failed:", err.code, err.message);
        loginError.textContent = err.message;
      });
  });