document.addEventListener("DOMContentLoaded", () => {
  // --- Firebase Setup ---
  const firebaseConfig = {
  apiKey: "AIzaSyBUzYdeKfD7z31uUMhIKcQsU-ImA8Aopxk",
  authDomain: "whazorz-portfolio.firebaseapp.com",
  projectId: "whazorz-portfolio",
  storageBucket: "whazorz-portfolio.firebasestorage.app",
  messagingSenderId: "23481217882",
  appId: "1:23481217882:web:533d4a7dadd4563426b963",
  measurementId: "G-159920MCTC"
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
  const completedRequestList = document.getElementById("completed-request-items-list");
  
  const galleryList = document.getElementById("gallery-items-list");
  const galleryForm = document.getElementById("gallery-form");
  const galleryEditId = document.getElementById("gallery-edit-id");
  const gallerySubmitBtn = document.getElementById("gallery-submit-btn");
  const galleryCancelBtn = document.getElementById("gallery-cancel-btn");
  
  const downloadsList = document.getElementById("downloads-items-list");
  const downloadsForm = document.getElementById("downloads-form");
  const downloadEditId = document.getElementById("download-edit-id");
  const downloadSubmitBtn = document.getElementById("download-submit-btn");
  const downloadCancelBtn = document.getElementById("download-cancel-btn");
  const downloadType = document.getElementById("download-type");
  // NEW: Reference to the hidden download URL input
  const downloadFileUrlInput = document.getElementById("download-file-url"); 

  // Function to temporarily show the Download File URL field
  function showDownloadUrlField(url = '') {
      // Create and insert the missing form group temporarily for editing
      let fg = document.getElementById('download-file-url-group');
      if (!fg) {
          fg = document.createElement('div');
          fg.id = 'download-file-url-group';
          fg.className = 'form-group';
          fg.innerHTML = `
              <label for="download-file-url-visible">Download File URL</label>
              <input type="url" id="download-file-url-visible" placeholder="https://link.to/file.zip">
          `;
          downloadsForm.insertBefore(fg, downloadEditId.parentNode);
      }
      document.getElementById("download-file-url-visible").value = url;
      downloadFileUrlInput.value = url; // Keep the hidden field updated

      // Add a listener to update the hidden field
      document.getElementById("download-file-url-visible").oninput = (e) => {
          downloadFileUrlInput.value = e.target.value;
      };
  }

  // Function to remove the temporary Download File URL field
  function hideDownloadUrlField() {
      const fg = document.getElementById('download-file-url-group');
      if (fg) {
          fg.remove();
      }
  }


// --- Authentication Block ---
auth.onAuthStateChanged(user => {
  if (user) {
    // 1. Reveal Dashboard
    loginView.style.display = "none";
    dashboardView.style.display = "block";
    
    // 2. Start the monitor listener ONLY now
    if (typeof displayLoginTracker === "function") {
      displayLoginTracker(); 
    }
    
    // 3. Load other data
    loadRequests();
    loadCompletedRequests();
    loadGalleryItems();
    loadAdminDownloads();
  } else {
    loginView.style.display = "block";
    dashboardView.style.display = "none";
  }
});

// --- Consolidated Login Handler ---
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("admin-email").value;
    const pass = document.getElementById("admin-password").value;
    
    try {
        // Step 1: Sign in with Firebase
        const userCredential = await auth.signInWithEmailAndPassword(email, pass);
        
        // Step 2: Trigger the Security Tracker immediately after successful login
        if (typeof logSecuritySession === "function") {
            await logSecuritySession(email);
            console.log("Security log: IP and Location captured.");
        }
        
        loginError.textContent = ""; // Clear any error messages
    } catch (err) {
        console.error("Login Error:", err.message);
        loginError.textContent = err.message;
    }
});


// Login Handler: Captures IP/Location immediately after success
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("admin-email").value;
        const pass = document.getElementById("admin-password").value;
        
        try {
            await auth.signInWithEmailAndPassword(email, pass);
            
            // Trigger the One-Time IP Catch (from wsystemtracker.js)
            if (typeof logSecuritySession === "function") {
                await logSecuritySession(email);
                console.log("Security Audit: Session metadata logged.");
            }
            loginError.textContent = ""; 
        } catch (err) {
            console.error("Login failed:", err.message);
            loginError.textContent = err.message;
        }
    });

    // Logout Handler: Fully resets page state to avoid permission bugs
    logoutBtn.addEventListener("click", () => {
        auth.signOut().then(() => {
            window.location.reload();
        }).catch(err => alert("Logout Error: " + err.message));
    });
  // --- Updated Request Management for 2026 Bulk Orders ---

function loadRequests() {
  db.collection("requests").orderBy("timestamp", "desc").onSnapshot(snapshot => {
    requestList.innerHTML = "";
    snapshot.forEach(doc => {
      const req = doc.data();
      const tr = document.createElement("tr");
      const date = req.timestamp ? req.timestamp.toDate().toLocaleDateString() : 'N/A';

      // 1. Build Order Summary (The items selected in the grid)
      let itemsOrdered = "";
      if (Array.isArray(req.orderSummary)) {
        itemsOrdered = req.orderSummary.join(", ");
      } else {
        // Fallback for old orders using the previous schema
        itemsOrdered = req.product_type || "N/A"; 
      }

      // 2. Build Detailed Project Info (Aggregating all possible conditional fields)
      let details = `Instructions: ${req.instructions || 'N/A'}\n\n`;
      
      // Check each specific design field from the 2026 form
      if (req.logo_brand_name) details += `[LOGO] Brand: ${req.logo_brand_name}\n`;
      if (req.poster_info) details += `[A3 POSTER] Info: ${req.poster_info}\n`;
      if (req.poster_info2) details += `[A4 POSTER] Info: ${req.poster_info2}\n`;
      if (req.banner_platform) details += `[BANNER] Platform: ${req.banner_platform} | Text: ${req.banner_text}\n`;
      if (req.profile_username) details += `[PROFILE] Name: ${req.profile_username}\n`;
      if (req.flyer_info) details += `[FLYER] Info: ${req.flyer_info}\n`;
      if (req.cover_info) details += `[COVER] Info: ${req.cover_info}\n`;
      if (req.brandcard_name) details += `[BRAND CARD] Name: ${req.brandcard_name}\n`;
      
      // Legacy support for older field names
      if (req.logo_style) details += `[LEGACY LOGO] Style: ${req.logo_style}\n`;

      tr.innerHTML = `
        <td>${date}</td>
        <td>${req.email}</td>
        <td><strong style="color:var(--accent-color)">${itemsOrdered}</strong></td>
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
          <button class="btn-action btn-approve" data-id="${doc.id}">Approve</button>
          <button class="btn-action btn-delete" data-id="${doc.id}">Delete</button>
        </td>
      `;
      requestList.appendChild(tr);
    });
    addRequestListeners();
  });
}

function loadCompletedRequests() {
  db.collection("requests").where("status", "==", "approved").orderBy("timestamp", "desc").onSnapshot(snapshot => {
    completedRequestList.innerHTML = "";
    snapshot.forEach(doc => {
      const req = doc.data();
      const tr = document.createElement("tr");
      const date = req.timestamp ? req.timestamp.toDate().toLocaleDateString() : 'N/A';

      let itemsOrdered = Array.isArray(req.orderSummary) ? req.orderSummary.join(", ") : (req.product_type || "N/A");

      let details = `Instructions: ${req.instructions || 'N/A'}\n\n`;
      if (req.logo_brand_name) details += `[LOGO] Brand: ${req.logo_brand_name}\n`;
      if (req.poster_info) details += `[A3 POSTER] Info: ${req.poster_info}\n`;
      if (req.banner_platform) details += `[BANNER] Platform: ${req.banner_platform}\n`;

      tr.innerHTML = `
        <td>${date}</td>
        <td>${req.email}</td>
        <td>${itemsOrdered}</td>
        <td>${req.budget} Eur</td>
        <td>${req.status}</td>
        <td>${req.showcase ? 'Yes' : 'No'}</td>
        <td>${req.email_agree ? 'Yes' : 'No'}</td>
        <td><pre class="request-details">${details}</pre></td>
      `;
      completedRequestList.appendChild(tr);
    });
  });
}

  function addRequestListeners() {
    // Status dropdown change
    requestList.querySelectorAll('.status-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const status = e.target.value;
        db.collection("requests").doc(id).update({ status: status });
      });
    });

    // "Approve" button click
    requestList.querySelectorAll('.btn-approve').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        db.collection("requests").doc(id).update({ status: "approved" });
      });
    });

    // "Delete" button click
    requestList.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (!confirm("Are you sure you want to delete this request?")) return;
        const id = e.target.getAttribute('data-id');
        db.collection("requests").doc(id).delete();
      });
    });
  }

  // --- Completed Requests Log (Unchanged) ---
  
  function loadCompletedRequests() {
    db.collection("requests").where("status", "==", "approved").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      completedRequestList.innerHTML = "";
      snapshot.forEach(doc => {
        const req = doc.data();
        const tr = document.createElement("tr");
        
        const date = req.timestamp ? req.timestamp.toDate().toLocaleDateString() : 'N/A';
        
        let details = `Instructions: ${req.instructions || 'N/A'}\n`;
        if (req.product_type === 'logo') {
          details += `Brand: ${req.logo_brand_name}\nStyle: ${req.logo_style}`;
        } else if (req.product_type === 'postera3') {
          details += `Info: ${req.poster_info}`;
        } else if (req.product_type === 'banner') {
            details += `Platform: ${req.banner_platform}\nText: ${req.banner_text}`;
        } else if (req.product_type === 'profile') {
            details += `Username: ${req.profile_username}\nStyle: ${req.profile_style}`;
        } else if (req.product_type === 'ui') {
            details += `UI Platform: ${req.ui_platform}\nLayout Info: ${req.ui_info}`;
        }
        
        tr.innerHTML = `
          <td>${date}</td>
          <td>${req.email}</td>
          <td>${req.product_type}</td>
          <td>${req.budget} Eur</td>
          <td>${req.status}</td>
          <td>${req.showcase ? 'Yes' : 'No'}</td>
          <td>${req.email_agree ? 'Yes' : 'No'}</td>
          <td><pre class="request-details">${details}</pre></td>
        `;
        completedRequestList.appendChild(tr);
      });
    });
  }


  // --- Gallery Management (Unchanged) ---

  galleryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = galleryEditId.value;
    const imageFilename = document.getElementById("gallery-url").value; 
    const type = document.getElementById("gallery-type").value;
    
    const data = {
      imageUrl: imageFilename,
      type: type
    };

    if (id) {
      // Update existing item
      db.collection("portfolioItems").doc(id).update(data)
        .then(() => resetGalleryForm())
    .catch(err => alert("Error updating item: " + err.message));
    } else {
      // Add new item
      db.collection("portfolioItems").add(data)
        .then(() => galleryForm.reset())
        .catch(err => alert("Error adding item: " + err.message));
    }
  });

  // Reset gallery form (for editing)
  function resetGalleryForm() {
    galleryForm.reset();
    galleryEditId.value = "";
    gallerySubmitBtn.textContent = "Add Gallery Item";
    galleryCancelBtn.style.display = "none";
  }

  // Cancel button listener
  galleryCancelBtn.addEventListener("click", resetGalleryForm);

  function loadGalleryItems() {
    db.collection("portfolioItems").onSnapshot(snapshot => {
      galleryList.innerHTML = "";
      snapshot.forEach(doc => {
        const item = doc.data();
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><img src="/images/${item.imageUrl}" alt="Gallery Item"></td>
          <td>${item.type}</td>
          <td>
            <button class="btn-action btn-edit" data-id="${doc.id}">Edit</button>
            <button class="btn-action btn-delete" data-id="${doc.id}">Delete</button>
          </td>
        `;
        galleryList.appendChild(tr);
      });
      
      // Add Edit Listeners
      galleryList.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id');
          db.collection("portfolioItems").doc(id).get().then(doc => {
            const item = doc.data();
            document.getElementById("gallery-url").value = item.imageUrl;
            document.getElementById("gallery-type").value = item.type;
            
            galleryEditId.value = doc.id;
            gallerySubmitBtn.textContent = "Update Item";
            galleryCancelBtn.style.display = "inline-block";
            
            galleryForm.scrollIntoView({ behavior: 'smooth' });
          });
        });
      });
      
      // Add Delete Listeners
      galleryList.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (!confirm("Are you sure you want to delete this gallery item?")) return;
          const id = e.target.getAttribute('data-id');
          db.collection("portfolioItems").doc(id).delete();
        });
      });
    });
  }

  // --- Download/GFX Management (Updated) ---

  downloadsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = downloadEditId.value;

    const data = {
      title: document.getElementById("download-title").value,
      imageUrl: document.getElementById("download-image-url").value,
      type: document.getElementById("download-type").value,
      description: document.getElementById("download-description").value,
      // Use the value from the hidden input field
      downloadUrl: downloadFileUrlInput.value || '' 
    };

    if (id) {
      // Update existing item
      db.collection("downloads").doc(id).update(data)
        .then(() => resetDownloadsForm())
        .catch(err => alert("Error updating item: " + err.message));
    } else {
      // Add new item
      db.collection("downloads").add(data)
        .then(() => downloadsForm.reset())
        .catch(err => alert("Error adding download item: " + err.message));
    }
  });

  // Reset downloads form (for editing)
  function resetDownloadsForm() {
    downloadsForm.reset();
    downloadEditId.value = "";
    downloadSubmitBtn.textContent = "Add Download Item";
    downloadCancelBtn.style.display = "none";
    downloadType.value = "environment"; 
    downloadFileUrlInput.value = ''; // Clear hidden download URL
    hideDownloadUrlField(); // Remove temporary field
  }

  // Cancel button listener
  downloadCancelBtn.addEventListener("click", resetDownloadsForm);

  function loadAdminDownloads() {
    db.collection("downloads").onSnapshot(snapshot => {
      downloadsList.innerHTML = "";
      snapshot.forEach(doc => {
        const item = doc.data();
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><img src="/gfx/${item.imageUrl}" alt="${item.title}"></td>
          <td>${item.title}</td>
          <td>${item.type}</td>
          <td class="td-truncate" title="${item.description}">${item.description}</td>
          <td>
            <button class="btn-action btn-edit" data-id="${doc.id}">Edit</button>
            <button class="btn-action btn-delete" data-id="${doc.id}">Delete</button>
          </td>
        `;
        downloadsList.appendChild(tr);
      });
      
      // Add Edit Listeners
      downloadsList.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id');
          db.collection("downloads").doc(id).get().then(doc => {
            const item = doc.data();
            document.getElementById("download-title").value = item.title;
            document.getElementById("download-image-url").value = item.imageUrl;
            document.getElementById("download-type").value = item.type;
            document.getElementById("download-description").value = item.description;

            // Show and populate the download URL field for editing
            showDownloadUrlField(item.downloadUrl || ''); 

            downloadEditId.value = doc.id;
            downloadSubmitBtn.textContent = "Update Item";
            downloadCancelBtn.style.display = "inline-block";
            
            downloadsForm.scrollIntoView({ behavior: 'smooth' });
          });
        });
      });
      
      // Add Delete Listeners
      downloadsList.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (!confirm("Are you sure you want to delete this download item?")) return;
          const id = e.target.getAttribute('data-id');
          db.collection("downloads").doc(id).delete();
        });
      });
    });
  }

});


