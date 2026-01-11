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
  
  const downloadUrlInput = document.getElementById("download-file-url-visible"); 

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

  // --- IP Tracker Logic ---
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
      .catch(err => { if (loginError) loginError.textContent = err.message; });
  });

  logoutBtn.addEventListener("click", () => auth.signOut());

  // --- HELPER: Format Request Details (New Structure) ---
  function formatRequestDetails(req) {
    let html = "";
    
    // 1. Order Summary
    if (req.orderSummary && Array.isArray(req.orderSummary)) {
      html += `<div class="detail-block"><strong>ORDER:</strong><br>`;
      req.orderSummary.forEach(item => {
        html += `• ${item.quantity}x <span class="highlight">${item.name}</span> <span class="dim">(${item.specs})</span><br>`;
      });
      html += `</div>`;
    } else if (req.product_type) {
      html += `<strong>Old Type:</strong> ${req.product_type}<br>`;
    }

    // 2. Specific Details
    if (req.specificDetails) {
       html += `<div class="detail-block"><strong>DETAILS:</strong><br>`;
       Object.keys(req.specificDetails).sort().forEach(key => {
          const detailBlock = req.specificDetails[key];
          const title = key.replace(/_/g, " ").toUpperCase();
          html += `<em class="gold">[${title}]</em><br>`;

          if (Array.isArray(detailBlock)) {
             detailBlock.forEach(field => {
                let val = field.value;
                if (field.isFile) val = `<span class="cyan">(File: ${field.fileName})</span>`;
                if(val && val.trim() !== "") html += `&nbsp;› <strong>${field.label}:</strong> ${val}<br>`;
             });
          }
       });
       html += `</div>`;
    }

    // 3. General Instructions
    if (req.instructions) {
      html += `<div class="detail-block"><strong class="orange">Brief:</strong><br> ${req.instructions}</div>`;
    }

    return html;
  }

  // --- HELPER: Create Table Row ---
  function createRequestRow(doc, isPending) {
      const req = doc.data();
      const tr = document.createElement("tr");

      // Date
      const date = req.timestamp ? req.timestamp.toDate().toLocaleDateString() : 'N/A';
      
      // Checkbox Logic
      const isShowcase = req.agreements?.showcase ?? req.showcase ?? false;
      const isMarketing = req.agreements?.marketing ?? req.email_agree ?? false;

      const showcaseIcon = isShowcase 
        ? '<span class="icon-check" title="Allowed">✔</span>' 
        : '<span class="icon-cross" title="Denied">✘</span>';
      
      const marketingIcon = isMarketing 
        ? '<span class="icon-check" title="Subscribed">✔</span>' 
        : '<span class="icon-cross" title="No Email">✘</span>';

      // Product Name
      let mainProduct = "Bundle";
      if(req.orderSummary?.length > 0) {
          mainProduct = req.orderSummary[0].name;
          if(req.orderSummary.length > 1) mainProduct += " +";
      } else if (req.product_type) {
          mainProduct = req.product_type;
      }

      const detailsHtml = formatRequestDetails(req);

      let statusHtml = '';
      if (isPending) {
        statusHtml = `
            <select class="status-select" data-id="${doc.id}">
              <option value="pending" ${req.status === 'pending' ? 'selected' : ''}>Pending</option>
              <option value="in_progress" ${req.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
              <option value="approved">Approve</option>
              <option value="declined" ${req.status === 'declined' ? 'selected' : ''}>Decline</option>
            </select>`;
      } else {
        statusHtml = `<span class="status-badge status-${req.status}">${req.status.toUpperCase()}</span>`;
      }

      tr.innerHTML = `
        <td data-label="Date">${date}</td>
        <td data-label="Email" class="col-email"><a href="mailto:${req.email}">${req.email}</a></td>
        <td data-label="Product" class="col-product">${mainProduct}</td>
        <td data-label="Budget" class="col-budget">${req.budget || '0'} €</td>
        <td data-label="Status">${statusHtml}</td>
        <td data-label="Showcase" class="text-center">${showcaseIcon}</td>
        <td data-label="Marketing" class="text-center">${marketingIcon}</td>
        <td data-label="Details" class="col-details"><div class="details-box">${detailsHtml}</div></td>
        <td data-label="Actions" class="col-actions">
           ${isPending ? `<button class="btn-approve" data-id="${doc.id}">✓</button>` : ''}
           <button class="btn-delete" data-id="${doc.id}">🗑</button>
        </td>
      `;
      return tr;
  }

  // --- Load Requests ---
  function loadRequests() {
    db.collection("requests").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      requestList.innerHTML = "";
      snapshot.forEach(doc => {
        const req = doc.data();
        if (req.status === 'approved') return; 
        requestList.appendChild(createRequestRow(doc, true));
      });
      addListeners(requestList);
    });
  }

  function loadCompletedRequests() {
    db.collection("requests").where("status", "==", "approved").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      completedRequestList.innerHTML = "";
      snapshot.forEach(doc => {
        completedRequestList.appendChild(createRequestRow(doc, false));
      });
      addListeners(completedRequestList);
    });
  }

  function addListeners(list) {
    list.querySelectorAll('.status-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const val = e.target.value;
        if(val === 'approved') {
            if(confirm("Approve and move to History?")) {
                db.collection("requests").doc(id).update({ status: "approved" });
            } else {
                e.target.value = "pending"; 
            }
        } else {
            db.collection("requests").doc(id).update({ status: val });
        }
      });
    });

    list.querySelectorAll('.btn-approve').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        db.collection("requests").doc(id).update({ status: "approved" });
      });
    });

    list.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (!confirm("Permanently delete this request?")) return;
        const id = e.target.getAttribute('data-id');
        db.collection("requests").doc(id).delete();
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
          <td><img src="/images/${item.imageUrl}" alt="Gallery Item" style="max-width:50px;"></td>
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

  // --- Download/GFX Management ---
  downloadsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = downloadEditId.value;

    const data = {
      title: document.getElementById("download-title").value,
      imageUrl: document.getElementById("download-image-url").value,
      type: document.getElementById("download-type").value,
      description: document.getElementById("download-description").value,
      downloadUrl: downloadUrlInput ? (downloadUrlInput.value || '') : ''
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
    if(downloadUrlInput) downloadUrlInput.value = "";
  }

  downloadCancelBtn.addEventListener("click", resetDownloadsForm);

  function loadAdminDownloads() {
    db.collection("downloads").onSnapshot(snapshot => {
      downloadsList.innerHTML = "";
      snapshot.forEach(doc => {
        const item = doc.data();
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><img src="/gfx/${item.imageUrl}" alt="${item.title}" style="max-width:50px;"></td>
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

            if (downloadUrlInput) {
                downloadUrlInput.value = item.downloadUrl || '';
            }

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