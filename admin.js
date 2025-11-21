document.addEventListener("DOMContentLoaded", () => {
  // --- Firebase Setup ---
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
  const completedRequestList = document.getElementById("completed-request-items-list"); // NEW (Now exists in HTML)
  
  const galleryList = document.getElementById("gallery-items-list");
  const galleryForm = document.getElementById("gallery-form");
  const galleryEditId = document.getElementById("gallery-edit-id"); // NEW (Now exists in HTML)
  const gallerySubmitBtn = document.getElementById("gallery-submit-btn"); // NEW (Now exists in HTML)
  const galleryCancelBtn = document.getElementById("gallery-cancel-btn"); // NEW (Now exists in HTML)
  
  const downloadsList = document.getElementById("downloads-items-list");
  const downloadsForm = document.getElementById("downloads-form");
  const downloadEditId = document.getElementById("download-edit-id"); // NEW (Now exists in HTML)
  const downloadSubmitBtn = document.getElementById("download-submit-btn"); // NEW (Now exists in HTML)
  const downloadCancelBtn = document.getElementById("download-cancel-btn"); // NEW (Now exists in HTML)


  // --- Authentication ---
  
  auth.onAuthStateChanged(user => {
    if (user) {
      // User is logged in
      loginView.style.display = "none";
      dashboardView.style.display = "block";
      loadRequests();
      loadCompletedRequests(); // NEW
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
    
    auth.signInWithEmailAndPassword(email, pass)
      .catch(err => {
        loginError.textContent = err.message;
      });
  });

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

  // --- NEW: Completed Requests Log ---
  
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
        } else if (req.product_type === 'poster') {
          details += `Info: ${req.poster_info}`;
        } else if (req.product_type === 'banner') {
            details += `Platform: ${req.banner_platform}\nText: ${req.banner_text}`;
        } else if (req.product_type === 'profile') {
            details += `Username: ${req.profile_username}\nStyle: ${req.profile_style}`;
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


  // --- Gallery Management ---

  galleryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = galleryEditId.value;
    const imageUrl = document.getElementById("gallery-url").value;
    const type = document.getElementById("gallery-type").value;
    
    const data = {
      imageUrl: imageUrl,
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

  // NEW: Reset gallery form (for editing)
  function resetGalleryForm() {
    galleryForm.reset();
    galleryEditId.value = "";
    gallerySubmitBtn.textContent = "Add Gallery Item";
    galleryCancelBtn.style.display = "none";
  }

  // NEW: Cancel button listener
  galleryCancelBtn.addEventListener("click", resetGalleryForm);

  function loadGalleryItems() {
    db.collection("portfolioItems").onSnapshot(snapshot => {
      galleryList.innerHTML = "";
      snapshot.forEach(doc => {
        const item = doc.data();
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><img src="${item.imageUrl}" alt="Gallery Item"></td>
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

  // --- Download Management ---

  downloadsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = downloadEditId.value;

    const data = {
      title: document.getElementById("download-title").value,
      imageUrl: document.getElementById("download-image-url").value,
      description: document.getElementById("download-description").value,
      downloadUrl: document.getElementById("download-file-url").value
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

  // NEW: Reset downloads form (for editing)
  function resetDownloadsForm() {
    downloadsForm.reset();
    downloadEditId.value = "";
    downloadSubmitBtn.textContent = "Add Download Item";
    downloadCancelBtn.style.display = "none";
  }

  // NEW: Cancel button listener
  downloadCancelBtn.addEventListener("click", resetDownloadsForm);

  function loadAdminDownloads() {
    db.collection("downloads").onSnapshot(snapshot => {
      downloadsList.innerHTML = "";
      snapshot.forEach(doc => {
        const item = doc.data();
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><img src="${item.imageUrl}" alt="${item.title}"></td>
          <td>${item.title}</td>
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
            document.getElementById("download-description").value = item.description;
            document.getElementById("download-file-url").value = item.downloadUrl;

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
