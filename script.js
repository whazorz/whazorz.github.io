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

  // Initialize Firebase and Firestore
  try {
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    console.log("✅ Firebase initialized successfully");

    // Setup all page functions that need the database
    setupRequestForm(db);
    loadPortfolio(db);
    loadLatestWork(db);
    loadStore(db); // <-- NEW
    setupLightbox();
    setupHomePageLinks();
    setupStoreModal(db); // <-- NEW

  } catch (e) {
    console.error("❌ Error initializing Firebase:", e);
    const formStatus = document.getElementById("form-status");
    if (formStatus) {
      formStatus.textContent = "Error: Could not connect to submission service. Check API key.";
      formStatus.className = "error";
    }
  }

  // --- 1. Page Navigation ---
  const links = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll(".content");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      links.forEach(l => l.classList.remove("active"));
      sections.forEach(s => s.classList.remove("active"));
      link.classList.add("active");
      const targetId = link.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");
    });
  });

  // --- 2. Portfolio Filter ---
  function setupPortfolioFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll("#portfolio-gallery .gallery-item");

    if (filterButtons.length > 0 && galleryItems.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener("click", () => {
          const filter = button.getAttribute("data-filter");

          filterButtons.forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");

          galleryItems.forEach(item => {
            const itemType = item.getAttribute("data-type");
            if (filter === "all" || filter === itemType) {
              item.classList.remove("hidden");
            } else {
              item.classList.add("hidden");
            }
          });
        });
      });
    }
  }

  // --- 3. Load Portfolio ---
  async function loadPortfolio(db) {
    const gallery = document.getElementById("portfolio-gallery");
    if (!gallery) return;

    try {
      // Order by timestamp, descending
      const snapshot = await db.collection("portfolioItems").orderBy("timestamp", "desc").get();

      gallery.innerHTML = "";
      snapshot.forEach(doc => {
        const item = doc.data();
        const galleryItem = createGalleryItem(item);
        gallery.appendChild(galleryItem);
      });

      setupPortfolioFilter();

    } catch (e) {
      console.error("Error loading portfolio:", e);
      gallery.innerHTML = "<p>Error loading portfolio.</p>";
    }
  }

  // --- 4. Load Latest Work ---
  async function loadLatestWork(db) {
    const gallery = document.getElementById("latest-work-gallery");
    if (!gallery) return;

    try {
      // Order by timestamp, descending, limit to 3
      const snapshot = await db.collection("portfolioItems").orderBy("timestamp", "desc").limit(3).get();

      gallery.innerHTML = "";
      snapshot.forEach(doc => {
        const item = doc.data();
        const galleryItem = createGalleryItem(item);
        gallery.appendChild(galleryItem);
      });
    } catch (e) {
      console.error("Error loading latest work:", e);
      gallery.innerHTML = "<p>Error loading latest work.</p>";
    }
  }

  // --- 5. Create Gallery Item Helper ---
  function createGalleryItem(item) {
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";
    galleryItem.setAttribute("data-type", item.type || "general");

    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = `${item.type || "Portfolio"} project`;
    img.setAttribute("data-lightbox-src", item.imageUrl);

    galleryItem.appendChild(img);
    return galleryItem;
  }

  // --- 6. Lightbox Setup ---
  function setupLightbox() {
    const overlay = document.getElementById("lightbox-overlay");
    const lightboxImg = document.getElementById("lightbox-image");
    const closeBtn = document.getElementById("lightbox-close");

    if (!overlay || !lightboxImg || !closeBtn) return;

    function openLightbox(e) {
      if (e.target.tagName === "IMG" && e.target.closest(".gallery-container")) {
        const src = e.target.getAttribute("data-lightbox-src");
        if (src) {
          lightboxImg.src = src;
          overlay.classList.add("visible");
        }
      }
    }

    function closeLightbox() {
      overlay.classList.remove("visible");
      lightboxImg.src = "";
    }

    document.addEventListener("click", openLightbox);
    closeBtn.addEventListener("click", closeLightbox);
    overlay.addEventListener("click", e => {
      if (e.target === overlay) closeLightbox();
    });
  }

  // --- 7. Home Page "View Full Portfolio" Link ---
  function setupHomePageLinks() {
    const viewAllLink = document.querySelector(".view-all-portfolio");
    if (!viewAllLink) return;

    viewAllLink.addEventListener("click", e => {
      e.preventDefault();
      const targetId = viewAllLink.getAttribute("data-target");
      const navLinks = document.querySelectorAll("nav a");
      const sections = document.querySelectorAll(".content");

      navLinks.forEach(l => l.classList.remove("active"));
      sections.forEach(s => s.classList.remove("active"));

      document.getElementById(targetId).classList.add("active");
      const targetNavLink = document.querySelector(`nav a[data-target="${targetId}"]`);
      if (targetNavLink) targetNavLink.classList.add("active");
    });
  }

  // --- 8. Request Form ---
  function setupRequestForm(db) {
    const form = document.getElementById("request-form");
    if (!form) return;

    const productSelect = document.getElementById("product-type");
    const budgetInput = document.getElementById("budget");
    const formStatus = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");

    const prices = {
      profile: 10,
      banner: 20,
      poster: 30,
      logo: 50,
      bundle: 80
    };

    const conditionalFields = {
      logo: document.getElementById("logo-details"),
      poster: document.getElementById("poster-details"),
      banner: document.getElementById("banner-details"),
      profile: document.getElementById("profile-details")
    };

    function updateForm() {
      const selectedValue = productSelect.value;
      budgetInput.value = prices[selectedValue] || 10;

      Object.values(conditionalFields).forEach(field => {
        if (field) field.classList.remove("visible");
      });

      if (selectedValue === "bundle") {
        ["logo", "banner", "profile"].forEach(key => {
          if (conditionalFields[key]) conditionalFields[key].classList.add("visible");
        });
      } else if (conditionalFields[selectedValue]) {
        conditionalFields[selectedValue].classList.add("visible");
      }
    }

    updateForm();
    productSelect.addEventListener("change", updateForm);

    form.addEventListener("submit", async e => {
      e.preventDefault();
      submitBtn.disabled = true;
      formStatus.textContent = "Submitting...";
      formStatus.className = "";

      const formData = new FormData(form);
      const requestData = {};
      formData.forEach((value, key) => (requestData[key] = value));

      requestData.timestamp = firebase.firestore.FieldValue.serverTimestamp();
      requestData.status = "pending";
      requestData.showcase = requestData.showcase === "true";

      try {
        const docRef = await db.collection("requests").add(requestData);
        console.log("✅ Request added with ID:", docRef.id);
        formStatus.textContent = "Request submitted! We will contact you via email shortly.";
        formStatus.className = "success";
        form.reset();
        updateForm();
      } catch (error) {
        console.error("❌ Error adding document:", error);
        formStatus.textContent = "An error occurred. Please try again or contact us directly.";
        formStatus.className = "error";
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // --- 9. NEW: Load Store Items ---
  async function loadStore(db) {
    const gallery = document.getElementById("store-gallery");
    if (!gallery) return;

    try {
      const snapshot = await db.collection("storeItems").orderBy("timestamp", "desc").get();
      
      if (snapshot.empty) {
        gallery.innerHTML = "<p>Store is empty right now.</p>";
        return;
      }

      gallery.innerHTML = ""; // Clear loading state
      snapshot.forEach(doc => {
        const item = doc.data();
        const itemEl = document.createElement("div");
        itemEl.className = "store-item";
        
        // Format price
        const price = item.price ? item.price.toFixed(2) : "0.00";

        itemEl.innerHTML = `
          <div class="store-item-image">
            <img src="${item.imageUrl}" alt="${item.name}">
          </div>
          <div class="store-item-content">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <button class="store-buy-btn" 
              data-id="${doc.id}" 
              data-name="${item.name}" 
              data-price="${item.price}" 
              data-payment-url="${item.paymentUrl}">
              Buy - ${price} Eur
            </button>
          </div>
        `;
        gallery.appendChild(itemEl);
      });

    } catch (e) {
      console.error("Error loading store items:", e);
      gallery.innerHTML = "<p>Error loading store.</p>";
    }
  }

  // --- 10. NEW: Setup Store Modal ---
  function setupStoreModal(db) {
    const overlay = document.getElementById("store-checkout-overlay");
    const modal = document.querySelector(".store-modal-content");
    const closeBtn = document.getElementById("store-modal-close");
    const gallery = document.getElementById("store-gallery");
    const form = document.getElementById("store-checkout-form");
    const step1 = document.getElementById("store-modal-step-1");
    const step2 = document.getElementById("store-modal-step-2");
    const emailInput = document.getElementById("store-email");
    const submitBtn = document.getElementById("store-submit-btn");

    if (!overlay || !gallery || !form) {
      console.warn("Store modal elements not found. Skipping setup.");
      return;
    }

    // Store product data on the modal itself
    let currentProduct = {};

    function openModal(productData) {
      currentProduct = productData;
      // Reset modal to step 1
      step1.style.display = "block";
      step2.style.display = "none";
      emailInput.value = "";
      submitBtn.disabled = false;
      overlay.classList.add("visible");
    }

    function closeModal() {
      overlay.classList.remove("visible");
      currentProduct = {}; // Clear data
    }

    // Open modal when a buy button is clicked
    gallery.addEventListener("click", (e) => {
      if (e.target.classList.contains("store-buy-btn")) {
        const btn = e.target;
        openModal({
          id: btn.dataset.id,
          name: btn.dataset.name,
          price: parseFloat(btn.dataset.price),
          paymentUrl: btn.dataset.paymentUrl
        });
      }
    });

    // Close modal listeners
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });

    // Handle form submission
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!currentProduct.id) return; // No product selected

      submitBtn.disabled = true;
      submitBtn.textContent = "Saving...";

      try {
        // Save order to Firestore
        await db.collection("storeOrders").add({
          email: emailInput.value,
          productId: currentProduct.id,
          productName: currentProduct.name,
          price: currentProduct.price,
          paymentUrl: currentProduct.paymentUrl,
          status: "pending",
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        console.log("✅ Store order saved");

        // Show step 2
        step1.style.display = "none";
        step2.style.display = "block";

        // Redirect to payment after a short delay
        setTimeout(() => {
          window.location.href = currentProduct.paymentUrl;
          // After redirecting, reset modal for next time
          closeModal();
          submitBtn.textContent = "Continue to Payment";
        }, 3000); // 3-second delay

      } catch (err) {
        console.error("❌ Error saving store order:", err);
        alert("An error occurred. Please try again.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Continue to Payment";
      }
    });
  }

});