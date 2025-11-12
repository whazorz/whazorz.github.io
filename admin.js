document.addEventListener("DOMContentLoaded", () => {
  // --- Firebase Setup ---
  // This config is safe to expose. All security is in your Rules.
const firebaseConfig = {
  apiKey: "AIzaSyD5AQifYaoVsRyc2-LmIAh4SncH5P5kpqQ",
  authDomain: "whazorzdesign-1ebbe.firebaseapp.com",
  projectId: "whazorzdesign-1ebbe",
  storageBucket: "whazorzdesign-1ebbe.firebasestorage.app",
  messagingSenderId: "425863278566",
  appId: "1:425863278566:web:cd604440b34b9dea62b027",
  measurementId: "G-EJEJGRE025"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();

  // Get DOM Elements
  const loginView = document.getElementById("admin-login");
  const dashboardView = document.getElementById("admin-dashboard");
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");
  const logoutBtn = document.getElementById("logout-btn");
  
  const requestList = document.getElementById("request-items-list");
  const galleryList = document.getElementById("gallery-items-list");
  const galleryForm = document.getElementById("gallery-form");

  // --- Authentication ---
  
  // Listen for login state changes
  auth.onAuthStateChanged(user => {
    if (user) {
      // User is logged in
      loginView.style.display = "none";
      dashboardView.style.display = "block";
      loadRequests();
      loadGalleryItems();
    } else {
      // User is logged out
      loginView.style.display = "block";
      dashboardView.style.display = "none";
    }
  });

  // Login form submit
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("admin-email").value;
    const pass = document.getElementById("admin-password").value;
    
    auth.signInWithEmailAndPassword(email, pass)
      .catch(err => {
        loginError.textContent = err.message;
      });
  });

  // Logout button click
  logoutBtn.addEventListener("click", () => {
    auth.signOut();
  });

  // --- Request Management ---
  
  function loadRequests() {
    db.collection("requests").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      requestList.innerHTML = "";
      snapshot.forEach(doc => {
        const req = doc.data();
        const tr = document.createElement("tr");
        
        // Format timestamp
        const date = req.timestamp ? req.timestamp.toDate().toLocaleDateString() : 'N/A';
        
        // Build details string
        let details = `Instructions: ${req.instructions || 'N/A'}\n`;
        if (req.product_type === 'logo') {
          details += `Brand: ${req.logo_brand_name}\nStyle: ${req.logo_style}`;
        } else if (req.product_type === 'poster') {
          details += `Info: ${req.poster_info}`;
        } // ... add other product types
        
        // --- MODIFIED INNERHTML TO ADD NEW COLUMNS ---
        tr.innerHTML = `
          <td>${date}</td>
          <td>${req.email}</td>
          <td>${req.product_type}</td>
          <td>${req.budget} Eur</td>
          <td>
            <select class="status-select" data-id="${doc.id}">
              <option value="pending" ${req.status === 'pending' ? 'selected' : ''}>Pending</option>
              <option value="approved" ${req.status === 'approved' ? 'selected' : ''}>Approved</option>
              <option value="declined" ${req.status === 'declined' ? 'selected' : ''}>Declined</option>
            </select>
          </td>
          <td>${req.showcase ? 'Yes' : 'No'}</td>
          <td>${req.email_agree ? 'Yes' : 'No'}</td>
          <td><pre class="request-details">${details}</pre></td>
          <td>
            <button class="btn-action btn-delete" data-id="${doc.id}">Delete</button>
          </td>
        `;
        requestList.appendChild(tr);
      });

      // Add event listeners for new buttons
      addRequestListeners();
    });
  }

  function addRequestListeners() {
    requestList.querySelectorAll('.status-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const status = e.target.value;
        db.collection("requests").doc(id).update({ status: status });
      });
    });

    requestList.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (!confirm("Are you sure you want to delete this request?")) return;
        const id = e.target.getAttribute('data-id');
        db.collection("requests").doc(id).delete();
      });
    });
  }

  // --- Gallery Management ---

  galleryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const imageUrl = document.getElementById("gallery-url").value;
    const type = document.getElementById("gallery-type").value;
    
    db.collection("portfolioItems").add({
      imageUrl: imageUrl,
      type: type
    }).then(() => {
      galleryForm.reset();
    }).catch(err => {
      alert("Error adding item: " + err.message);
    });
  });

  function loadGalleryItems() {
    db.collection("portfolioItems").onSnapshot(snapshot => {
      galleryList.innerHTML = "";
      snapshot.forEach(doc => {
        const item = doc.data();
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><img src="${item.imageUrl}" alt="Gallery Item" width="100"></td>
          <td>${item.type}</td>
          <td>
            <button class="btn-action btn-delete" data-id="${doc.id}">Delete</T>
          </td>
        `;
        galleryList.appendChild(tr);
      });
      
      // Add listeners for delete buttons
      galleryList.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (!confirm("Are you sure you want to delete this gallery item?")) return;
          const id = e.target.getAttribute('data-id');
          db.collection("portfolioItems").doc(id).delete();
        });
      });
    });
  }
});