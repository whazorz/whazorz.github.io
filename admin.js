import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc, query, orderBy, where, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
// --- 3. Firebase Setup (MODULAR) ---
  const firebaseConfig = {
    // Note: Your existing API Key is kept, but ensure it's restricted and authorized for your new project
    apiKey: "1:23481217882:web:533d4a7dadd4563426b963", 
    authDomain: "whazorz-portfolio.firebaseapp.com",
    projectId: "whazorz-portfolio",
    storageBucket: "whazorz-portfolio.appspot.com",
    messagingSenderId: "23481217882",
    appId: "1:23481217882:web:cd604440b34b9dea62b027",
    measurementId: "G-EJEJGRE025"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Get modular service instances
  const db = getFirestore(app); // MODULAR FIRESTORE
  const auth = getAuth(app);    // MODULAR AUTH

  // Get DOM Elements (Unchanged)
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

  // Function to temporarily show the Download File URL field (Unchanged)
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

  // Function to remove the temporary Download File URL field (Unchanged)
  function hideDownloadUrlField() {
      const fg = document.getElementById('download-file-url-group');
      if (fg) {
          fg.remove();
      }
  }


  // --- Authentication (MODULAR) ---
  
  onAuthStateChanged(auth, user => { // Uses modular onAuthStateChanged
    if (user) {
      // User is logged in
      loginView.style.display = "none";
      dashboardView.style.display = "block";
      loadRequests();
      loadCompletedRequests();
      loadGalleryItems();
      loadAdminDownloads();
    } else {
      // User is logged out
      loginView.style.display = "block";
      dashboardView.style.display = "none";
    }
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("admin-email").value;
    const pass = document.getElementById("admin-password").value;
    
    // Uses modular signInWithEmailAndPassword
    signInWithEmailAndPassword(auth, email, pass)
      .catch(err => {
        loginError.textContent = err.message;
      });
  });

  logoutBtn.addEventListener("click", () => {
    // Uses modular signOut
    signOut(auth);
  });

  // --- Request Management (MODULAR Firestore) ---
  
  function loadRequests() {
    const requestsCol = collection(db, "requests");
    const q = query(requestsCol, orderBy("timestamp", "desc"));

    onSnapshot(q, (snapshot) => {
      requestList.innerHTML = "";
      snapshot.forEach(docSnapshot => {
        const docId = docSnapshot.id;
        const req = docSnapshot.data();
        const tr = document.createElement("tr");
        
        const date = req.timestamp ? req.timestamp.toDate().toLocaleDateString() : 'N/A';
        
        let details = `Instructions: ${req.instructions || 'N/A'}\n`;
        if (req.product_type === 'logo') {
          details += `Brand: ${req.logo_brand_name}\nStyle: ${req.logo_style}`;
        } else if (req.product_type === 'poster') {
          details += `Info: ${req.poster_info}`;
        } else if (req.product_type === 'banner') {
            details += `Platform: ${req.banner_platform}\nText: ${req.banner_text}`;
        } else if (req.product_type === 'profile') {
            details += `Username: ${req.profile_username}\nStyle: ${req.profile_style}`;
        } else if (req.product_type === 'ui') {
           details += `UI Platform: ${req.ui_platform}\nLayout Info: ${req.ui_info}`;
       } else if (req.product_type === 'bundle') {
            details += `(Bundle) Logo Brand: ${req.logo_brand_name}\n`;
            details += `(Bundle) Banner Platform: ${req.banner_platform}\n`;
            details += `(Bundle) Profile User: ${req.profile_username}`;
        }
        
        tr.innerHTML = `
          <td>${date}</td>
          <td>${req.email}</td>
          <td>${req.product_type}</td>
          <td>${req.budget} Eur</td>
          <td>
            <select class="status-select" data-id="${docId}">
              <option value="pending" ${req.status === 'pending' ? 'selected' : ''}>Pending</option>
              <option value="approved" ${req.status === 'approved' ? 'selected' : ''}>Approved</option>
              <option value="declined" ${req.status === 'declined' ? 'selected' : ''}>Declined</option>
            </select>
          </td>
          <td>${req.showcase ? 'Yes' : 'No'}</td>
          <td>${req.email_agree ? 'Yes' : 'No'}</td>
          <td><pre class="request-details">${details}</pre></td>
          <td>
            <button class="btn-action btn-approve" data-id="${docId}">Approve</button>
            <button class="btn-action btn-delete" data-id="${docId}">Delete</button>
          </td>
        `;
        requestList.appendChild(tr);
      });
      addRequestListeners();
    });
  }

  function addRequestListeners() {
    // Status dropdown change
    requestList.querySelectorAll('.status-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const status = e.target.value;
        // Uses modular updateDoc
        updateDoc(doc(db, "requests", id), { status: status });
      });
    });

    // "Approve" button click
    requestList.querySelectorAll('.btn-approve').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        // Uses modular updateDoc
        updateDoc(doc(db, "requests", id), { status: "approved" });
      });
    });

    // "Delete" button click
    requestList.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (!confirm("Are you sure you want to delete this request?")) return;
        const id = e.target.getAttribute('data-id');
        // Uses modular deleteDoc
        deleteDoc(doc(db, "requests", id));
      });
    });
  }

  // --- Completed Requests Log (MODULAR Firestore) ---
  
  function loadCompletedRequests() {
    const requestsCol = collection(db, "requests");
    const q = query(requestsCol, where("status", "==", "approved"), orderBy("timestamp", "desc"));
    
    onSnapshot(q, (snapshot) => {
      completedRequestList.innerHTML = "";
      snapshot.forEach(docSnapshot => {
        const req = docSnapshot.data();
        const tr = document.createElement("tr");
        
        const date = req.timestamp ? req.timestamp.toDate().toLocaleDateString() : 'N/A';
        
        let details = `Instructions: ${req.instructions || 'N/A'}\n`;
        if (req.product_type === 'logo') {
          details += `Brand: ${req.logo_brand_name}\nStyle: ${req.logo_style}`;
        } else if (req.product_type === 'poster') {
          details += `Info: ${req.poster_info}`;
        } else if (req.product_type === 'banner') {
            details += `Platform: ${req.banner_platform}\nText: ${req.banner_text}`;
        } else if (req.product_type === 'profile') {
            details += `Username: ${req.profile_username}\nStyle: ${req.profile_style}`;
        } else if (req.product_type === 'ui') {
            details += `UI Platform: ${req.ui_platform}\nLayout Info: ${req.ui_info}`;
        } else if (req.product_type === 'bundle') {
            details += `(Bundle) Logo Brand: ${req.logo_brand_name}\n`;
            details += `(Bundle) Banner Platform: ${req.banner_platform}\n`;
            details += `(Bundle) Profile User: ${req.profile_username}`;
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


  // --- Gallery Management (MODULAR Firestore) ---

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
      // Update existing item (Uses modular updateDoc)
      updateDoc(doc(db, "portfolioItems", id), data)
        .then(() => resetGalleryForm())
        .catch(err => alert("Error updating item: " + err.message));
    } else {
      // Add new item (Uses modular addDoc)
      addDoc(collection(db, "portfolioItems"), data)
        .then(() => galleryForm.reset())
        .catch(err => alert("Error adding item: " + err.message));
    }
  });

  // Reset gallery form (for editing) (Unchanged)
  function resetGalleryForm() {
    galleryForm.reset();
    galleryEditId.value = "";
    gallerySubmitBtn.textContent = "Add Gallery Item";
    galleryCancelBtn.style.display = "none";
  }

  // Cancel button listener (Unchanged)
  galleryCancelBtn.addEventListener("click", resetGalleryForm);

  function loadGalleryItems() {
    onSnapshot(collection(db, "portfolioItems"), (snapshot) => {
      galleryList.innerHTML = "";
      snapshot.forEach(docSnapshot => {
        const item = docSnapshot.data();
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><img src="/images/${item.imageUrl}" alt="Gallery Item"></td>
          <td>${item.type}</td>
          <td>
            <button class="btn-action btn-edit" data-id="${docSnapshot.id}">Edit</button>
            <button class="btn-action btn-delete" data-id="${docSnapshot.id}">Delete</button>
          </td>
        `;
        galleryList.appendChild(tr);
      });
      
      // Add Edit Listeners
      galleryList.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id');
          // Uses modular getDoc
          getDoc(doc(db, "portfolioItems", id)).then(docSnapshot => {
            const item = docSnapshot.data();
            document.getElementById("gallery-url").value = item.imageUrl;
            document.getElementById("gallery-type").value = item.type;
            
            galleryEditId.value = docSnapshot.id;
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
          // Uses modular deleteDoc
          deleteDoc(doc(db, "portfolioItems", id));
        });
      });
    });
  }

  // --- Download/GFX Management (MODULAR Firestore) ---

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
      // Update existing item (Uses modular updateDoc)
      updateDoc(doc(db, "downloads", id), data)
        .then(() => resetDownloadsForm())
        .catch(err => alert("Error updating item: " + err.message));
    } else {
      // Add new item (Uses modular addDoc)
      addDoc(collection(db, "downloads"), data)
        .then(() => downloadsForm.reset())
        .catch(err => alert("Error adding download item: " + err.message));
    }
  });

  // Reset downloads form (for editing) (Unchanged)
  function resetDownloadsForm() {
    downloadsForm.reset();
    downloadEditId.value = "";
    downloadSubmitBtn.textContent = "Add Download Item";
    downloadCancelBtn.style.display = "none";
    downloadType.value = "environment"; 
    downloadFileUrlInput.value = ''; // Clear hidden download URL
    hideDownloadUrlField(); // Remove temporary field
  }

  // Cancel button listener (Unchanged)
  downloadCancelBtn.addEventListener("click", resetDownloadsForm);

  function loadAdminDownloads() {
    onSnapshot(collection(db, "downloads"), (snapshot) => {
      downloadsList.innerHTML = "";
      snapshot.forEach(docSnapshot => {
        const item = docSnapshot.data();
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><img src="/gfx/${item.imageUrl}" alt="${item.title}"></td>
          <td>${item.title}</td>
          <td>${item.type}</td>
          <td class="td-truncate" title="${item.description}">${item.description}</td>
          <td>
            <button class="btn-action btn-edit" data-id="${docSnapshot.id}">Edit</button>
            <button class="btn-action btn-delete" data-id="${docSnapshot.id}">Delete</button>
          </td>
        `;
        downloadsList.appendChild(tr);
      });
      
      // Add Edit Listeners
      downloadsList.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id');
          // Uses modular getDoc
          getDoc(doc(db, "downloads", id)).then(docSnapshot => {
            const item = docSnapshot.data();
            document.getElementById("download-title").value = item.title;
            document.getElementById("download-image-url").value = item.imageUrl;
            document.getElementById("download-type").value = item.type;
            document.getElementById("download-description").value = item.description;

            // Show and populate the download URL field for editing
            showDownloadUrlField(item.downloadUrl || ''); 

            downloadEditId.value = docSnapshot.id;
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
          // Uses modular deleteDoc
          deleteDoc(doc(db, "downloads", id));
        });
      });
    });
  }

});