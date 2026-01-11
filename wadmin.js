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

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();

  // --- Get DOM Elements ---
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
  const downloadUrlInput = document.getElementById("download-file-url-visible"); // New static ID

  const loginHistoryList = document.getElementById("login-history-list");

  // --- Authentication & Data Loading ---
  
  auth.onAuthStateChanged(user => {
    if (user) {
      loginView.style.display = "none";
      dashboardView.style.display = "block";
      
      loadRequests();
      loadCompletedRequests();
      loadGalleryItems();
      loadAdminDownloads();
      loadLoginHistory(); 
    } else {
      loginView.style.display = "block";
      dashboardView.style.display = "none";
    }
  });

  // --- Advanced IP Tracker Logic ---
  async function logLoginAttempt(email) {
      try {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();

          const loginEntry = {
              email: email,
              ip: data.ip || "Unknown",
              city: data.city || "Unknown",
              country: data.country_name || "Unknown",
              isp: data.org || "Unknown",
              userAgent: navigator.userAgent,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
          };

          if (auth.currentUser) {
              await db.collection("login_history").add(loginEntry);
          }
      } catch (error) {
          console.error("IP Tracker Error:", error);
      }
  }

  function loadLoginHistory() {
    if (!loginHistoryList) return;
    db.collection("login_history")
      .orderBy("timestamp", "desc")
      .limit(100) 
      .onSnapshot(snapshot => {
        const uniqueIps = new Map();

        snapshot.forEach(doc => {
            const data = doc.data();
            const ip = data.ip || '0.0.0.0';
            if (!uniqueIps.has(ip)) {
                uniqueIps.set(ip, { id: doc.id, ...data });
            }
        });

        loginHistoryList.innerHTML = "";
        const finalDisplayList = Array.from(uniqueIps.values()).slice(0, 15);

        finalDisplayList.forEach(item => {
            const tr = document.createElement("tr");
            const date = item.timestamp ? item.timestamp.toDate().toLocaleString() : 'Just now';
            const userAgent = item.userAgent || "Unknown Device";

            tr.innerHTML = `
                <td>${date}</td>
                <td>${item.email || "No Email"}</td>
                <td><strong>${item.ip || '0.0.0.0'}</strong></td>
                <td>${item.city || 'Unknown'}, ${item.country || 'Unknown'}</td>
                <td>${item.isp || 'Unknown'}</td>
                <td><small title="${userAgent}">${userAgent.slice(0, 15)}...</small></td>
            `;
            loginHistoryList.appendChild(tr);
        });
    });
  }

  loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("admin-email").value;
      const pass = document.getElementById("admin-password").value;
      auth.signInWithEmailAndPassword(email, pass)
          .then(() => logLoginAttempt(email))
          .catch(err => { if(loginError) loginError.textContent = err.message; });
  });

  logoutBtn.addEventListener("click", () => auth.signOut());

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
        } else if (req.product_type === 'postera3') {
          details += `Info: ${req.poster_info}`;
        } else if (req.product_type === 'banner') {
            details += `Platform: ${req.banner_platform}\nText: ${req.banner_text}`;
        } else if (req.product_type === 'profile') {
            details += `Username: ${req.profile_username}\nStyle: ${req.profile_style}`;
        } else if (req.product_type === 'ui') {
        }
        
        // FIX: Changed <pre> to <div> to allow CSS word-wrapping
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
          <td><div class="request-details">${details}</div></td>
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
    requestList.querySelectorAll('.status-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const status = e.target.value;
        db.collection("requests").doc(id).update({ status: status });
      });
    });

    requestList.querySelectorAll('.btn-approve').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        db.collection("requests").doc(id).update({ status: "approved" });
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

  // --- Completed Requests Log ---
  
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
        
        // FIX: Changed <pre> to <div>
        tr.innerHTML = `
          <td>${date}</td>
          <td>${req.email}</td>
          <td>${req.product_type}</td>
          <td>${req.budget} Eur</td>
          <td>${req.status}</td>
          <td>${req.showcase ? 'Yes' : 'No'}</td>
          <td>${req.email_agree ? 'Yes' : 'No'}</td>
          <td><div class="request-details">${details}</div></td>
        `;
        completedRequestList.appendChild(tr);
      });
    });
  }

  // --- Gallery Management ---

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
      db.collection("portfolioItems").doc(id).update(data)
        .then(() => resetGalleryForm())
        .catch(err => alert("Error updating item: " + err.message));
    } else {
      db.collection("portfolioItems").add(data)
        .then(() => galleryForm.reset())
        .catch(err => alert("Error adding item: " + err.message));
    }
  });

  function resetGalleryForm() {
    galleryForm.reset();
    galleryEditId.value = "";
    gallerySubmitBtn.textContent = "Add Gallery Item";
    galleryCancelBtn.style.display = "none";
  }

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
      
      galleryList.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (!confirm("Are you sure you want to delete this gallery item?")) return;
          const id = e.target.getAttribute('data-id');
          db.collection("portfolioItems").doc(id).delete();
        });
      });
    });
  }

  // --- Download/GFX Management (FIXED) ---

  downloadsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = downloadEditId.value;

    const data = {
      title: document.getElementById("download-title").value,
      imageUrl: document.getElementById("download-image-url").value,
      type: document.getElementById("download-type").value,
      description: document.getElementById("download-description").value,
      // FIX: Read directly from the static input field
      downloadUrl: downloadUrlInput.value || '' 
    };

    if (id) {
      db.collection("downloads").doc(id).update(data)
        .then(() => resetDownloadsForm())
        .catch(err => alert("Error updating item: " + err.message));
    } else {
      db.collection("downloads").add(data)
        .then(() => downloadsForm.reset())
        .catch(err => alert("Error adding download item: " + err.message));
    }
  });

  function resetDownloadsForm() {
    downloadsForm.reset();
    downloadEditId.value = "";
    downloadSubmitBtn.textContent = "Add Download Item";
    downloadCancelBtn.style.display = "none";
    downloadType.value = "environment"; 
    // FIX: Clear the static input
    downloadUrlInput.value = ""; 
  }

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
          <td>${item.description}</td>
          <td>
            <button class="btn-action btn-edit" data-id="${doc.id}">Edit</button>
            <button class="btn-action btn-delete" data-id="${doc.id}">Delete</button>
          </td>
        `;
        downloadsList.appendChild(tr);
      });
      
      downloadsList.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id');
          db.collection("downloads").doc(id).get().then(doc => {
            const item = doc.data();
            document.getElementById("download-title").value = item.title;
            document.getElementById("download-image-url").value = item.imageUrl;
            document.getElementById("download-type").value = item.type;
            document.getElementById("download-description").value = item.description;

            // FIX: Populate the static input field
            downloadUrlInput.value = item.downloadUrl || ''; 

            downloadEditId.value = doc.id;
            downloadSubmitBtn.textContent = "Update Item";
            downloadCancelBtn.style.display = "inline-block";
            
            downloadsForm.scrollIntoView({ behavior: 'smooth' });
          });
        });
      });
      
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