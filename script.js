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
    setupLightbox();
    setupHomePageLinks();
    setupImageProtection(); // --- NEW: Call image protection function

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

  // --- BROKEN CODE REMOVED ---
  // The broken checkbox code that was here has been removed.
  // The correct logic is now inside setupRequestForm.

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
      const snapshot = await db.collection("portfolioItems").get();

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
      const snapshot = await db.collection("portfolioItems").limit(3).get();

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

    // --- NEW CHECKBOX LOGIC ---
    const termsCheckbox = document.getElementById("terms-agree");

    // Disable button by default
    submitBtn.disabled = true; 

    // Add event listener to the terms checkbox
    termsCheckbox.addEventListener("change", () => {
      submitBtn.disabled = !termsCheckbox.checked;
    });
    // --- END NEW CHECKBOX LOGIC ---

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
      submitBtn.disabled = true; // Disable on submit
      formStatus.textContent = "Submitting...";
      formStatus.className = "";

      const formData = new FormData(form);
      const requestData = {};
      formData.forEach((value, key) => (requestData[key] = value));

      requestData.timestamp = firebase.firestore.FieldValue.serverTimestamp();
      requestData.status = "pending";
      
      // Correctly handle boolean conversion for checkboxes
      requestData.showcase = requestData.showcase === "true";
      // --- NEW LINE TO CAPTURE EMAIL PREFERENCE ---
      requestData.email_agree = requestData.email_agree === "true";

      try {
        const docRef = await db.collection("requests").add(requestData);
        console.log("✅ Request added with ID:", docRef.id);
        // --- MODIFIED FOR ANTI-SPAM ---
        formStatus.textContent = "Success! You can send another request in 30 seconds.";
        formStatus.className = "success";
        form.reset();
        updateForm();
        
        // Keep button disabled for 30 seconds
        submitBtn.disabled = true; 
        termsCheckbox.checked = false;

        setTimeout(() => {
          // Re-enable button *only if* checkbox is checked again later
          submitBtn.disabled = !termsCheckbox.checked;
          formStatus.textContent = ""; // Clear status message
        }, 30000); // 30-second delay
        // --- END ANTI-SPAM MOD ---

      } catch (error) {
        console.error("❌ Error adding document:", error);
        formStatus.textContent = "An error occurred. Please try again or contact us directly.";
        formStatus.className = "error";
        // Re-enable button on error so user can try again
        submitBtn.disabled = !termsCheckbox.checked; 
      }
    });
  }

  // --- 9. Image Right-Click Protection ---
  function setupImageProtection() {
    document.addEventListener('contextmenu', event => {
      // Check if the target is an image inside a gallery-container
      if (event.target.tagName === 'IMG' && event.target.closest('.gallery-container')) {
        event.preventDefault();
      }
    });
  }

});