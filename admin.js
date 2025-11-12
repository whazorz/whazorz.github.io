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
  const galleryList = document.getElementById("gallery-items-list");
  const galleryForm = document.getElementById("gallery-form");

  // --- Store DOM Elements ---
  const storeForm = document.getElementById("store-form");
  const storeList = document.getElementById("store-items-list");
  const storeOrdersList = document.getElementById("store-orders-list");


  // --- Authentication ---
  
  auth.onAuthStateChanged(user => {
    if (user) {
      loginView.style.display = "none";
      dashboardView.style.display = "block";
      loadRequests();
      loadGalleryItems();
      loadStoreItems();
      loadStoreOrders(); // Load new store orders
    } else {
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
        } // ... add other product types
        
        tr.innerHTML = `
          <td>${date}</td>
          <td>${req.email}</td>
          <td>${req.product_type}</td>
          <td>${req.budget} Eur</td>
          <td>
            <select class="status-select" data-collection="requests" data-id="${doc.id}">
              <option value="pending" ${req.status === 'pending' ? 'selected' : ''}>Pending</option>
              <option value="approved" ${req.status === 'approved' ? 'selected' : ''}>Approved</option>
              <option value="declined" ${req.status === 'declined' ? 'selected' : ''}>Declined</option>
            </select>
          </td>
          <td><pre class="request-details">${details}</pre></td>
          <td>
            <button class="btn-action btn-delete" data-collection="requests" data-id="${doc.id}">Delete</button>
          </td>
        `;
        requestList.appendChild(tr);
      });
      addDynamicListeners(requestList, "requests");
    });
  }

  // --- Gallery Management ---

  galleryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const imageUrl = document.getElementById("gallery-url").value;
    const type = document.getElementById("gallery-type").value;
    
    db.collection("portfolioItems").add({
      imageUrl: imageUrl,
      type: type,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      galleryForm.reset();
    }).catch(err => {
      alert("Error adding item: " + err.message);
    });
  });

  function loadGalleryItems() {
    db.collection("portfolioItems").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      galleryList.innerHTML = "";
      snapshot.forEach(doc => {
        const item = doc.data();
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><img src="${item.imageUrl}" alt="Gallery Item" width="100"></td>
          <td>${item.type}</td>
          <td>
            <button class="btn-action btn-delete" data-collection="portfolioItems" data-id="${doc.id}">Delete</button>
          </td>
        `;
        galleryList.appendChild(tr);
      });
      addDynamicListeners(galleryList, "portfolioItems");
    });
  }

  // --- Store Product Management ---

  storeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("store-name").value;
    const imageUrl = document.getElementById("store-image-url").value;
    const description = document.getElementById("store-description").value;
    const price = parseFloat(document.getElementById("store-price").value); // Get price
    const paymentUrl = document.getElementById("store-payment-url").value; // Get payment URL

    db.collection("storeItems").add({
      name: name,
      imageUrl: imageUrl,
      description: description,
      price: price, // Save price
      paymentUrl: paymentUrl, // Save payment URL
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      storeForm.reset();
    }).catch(err => {
      alert("Error adding store item: " + err.message);
    });
  });

  function loadStoreItems() {
    db.collection("storeItems").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      storeList.innerHTML = "";
      snapshot.forEach(doc => {
        const item = doc.data();
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><img src="${item.imageUrl}" alt="${item.name}" width="100"></td>
          <td>${item.name}</td>
          <td>${item.price.toFixed(2)} Eur</td>
          <td>
            <button class="btn-action btn-delete" data-collection="storeItems" data-id="${doc.id}">Delete</button>
          </td>
        `;
        storeList.appendChild(tr);
      });
      addDynamicListeners(storeList, "storeItems");
    });
  }

  // --- Store Order Management ---
  
  function loadStoreOrders() {
    db.collection("storeOrders").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      storeOrdersList.innerHTML = "";
      snapshot.forEach(doc => {
        const order = doc.data();
        const date = order.timestamp ? order.timestamp.toDate().toLocaleDateString() : 'N/A';
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${date}</td>
          <td>${order.email}</td>
          <td>${order.productName}</td>
          <td>${order.price.toFixed(2)} Eur</td>
          <td>
            <select class="status-select" data-collection="storeOrders" data-id="${doc.id}">
              <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
              <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
            </select>
          </td>
          <td>
             <button class="btn-action btn-delete" data-collection="storeOrders" data-id="${doc.id}">Delete</button>
          </td>
        `;
        storeOrdersList.appendChild(tr);
      });
      addDynamicListeners(storeOrdersList, "storeOrders");
    });
  }

  // --- Generic Listeners for All Tables ---
  
  /**
   * Adds delete and status-change listeners to a table
   * @param {HTMLElement} tableBody The tbody element
   * @param {string} defaultCollection The firebase collection name
   */
  function addDynamicListeners(tableBody, defaultCollection) {
    tableBody.querySelectorAll('.status-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const collection = e.target.getAttribute('data-collection') || defaultCollection;
        const status = e.target.value;
        db.collection(collection).doc(id).update({ status: status });
      });
    });

    tableBody.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const collection = e.target.getAttribute('data-collection') || defaultCollection;
        const id = e.target.getAttribute('data-id');
        if (!confirm(`Are you sure you want to delete this item from ${collection}?`)) return;
        db.collection(collection).doc(id).delete();
      });
    });
  }
});