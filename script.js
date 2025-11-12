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
    console.log("Firebase initialized successfully");
    
    // Setup all page functions that need the database
    setupRequestForm(db);
    loadPortfolio(db); // <-- NEW: Load dynamic portfolio

  } catch (e) {
    console.error("Error initializing Firebase:", e);
    const formStatus = document.getElementById("form-status");
    if(formStatus) {
      formStatus.textContent = "Error: Could not connect to submission service. Check API key.";
      formStatus.className = "error";
    }
  }

  // --- 1. Page Navigation ---
  const links = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('.content');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      link.classList.add('active');
      const targetId = link.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // --- 2. Portfolio Filter (Now a separate function) ---
  function setupPortfolioFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    // We query for galleryItems *inside* this function
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
              item.style.display = "block";
            } else {
              item.classList.add("hidden");
              setTimeout(() => {
                if (item.classList.contains('hidden')) {
                    item.style.display = "none";
                }
              }, 300);
            }
          });
        });
      });
    }
  }
  
  // --- 3. NEW: Load Portfolio Function ---
  async function loadPortfolio(db) {
    const gallery = document.getElementById("portfolio-gallery");
    if (!gallery) return;

    try {
      const snapshot = await db.collection("portfolioItems").get();
      
      gallery.innerHTML = ""; // Clear any placeholders
      snapshot.forEach(doc => {
        const item = doc.data();
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-type', item.type);
        galleryItem.innerHTML = `<img src="${item.imageUrl}" alt="${item.type} project">`;
        gallery.appendChild(galleryItem);
      });
      
      // !! IMPORTANT: Setup filters *after* items are loaded
      setupPortfolioFilter();
      
    } catch (e) {
      console.error("Error loading portfolio: ", e);
      gallery.innerHTML = "<p>Error loading portfolio.</p>";
    }
  }
  
  // --- 4. Request Form Logic (No changes needed) ---
  function setupRequestForm(db) {
    const form = document.getElementById("request-form");
    if (!form) return;

    const productSelect = document.getElementById("product-type");
    const budgetInput = document.getElementById("budget");
    const formStatus = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");

    const prices = {
      profile: 10, banner: 20, poster: 30, logo: 50, bundle: 80
    };

    const conditionalFields = {
      logo: document.getElementById("logo-details"),
      poster: document.getElementById("poster-details"),
      banner: document.getElementById("banner-details"),
      profile: document.getElementById("profile-details"),
    };

    function updateForm() {
      const selectedValue = productSelect.value;
      budgetInput.value = prices[selectedValue] || 10;
      Object.values(conditionalFields).forEach(field => {
        if(field) field.classList.remove("visible");
      });
      if (selectedValue === "bundle") {
        if(conditionalFields.logo) conditionalFields.logo.classList.add("visible");
        if(conditionalFields.banner) conditionalFields.banner.classList.add("visible");
        if(conditionalFields.profile) conditionalFields.profile.classList.add("visible");
      } else if (conditionalFields[selectedValue]) {
        conditionalFields[selectedValue].classList.add("visible");
      }
    }
    updateForm();
    productSelect.addEventListener("change", updateForm);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      formStatus.textContent = "Submitting...";
      formStatus.className = "";

      const formData = new FormData(form);
      const requestData = {};
      formData.forEach((value, key) => {
        requestData[key] = value;
      });
      
      // Add a timestamp and default status
      requestData.timestamp = firebase.firestore.FieldValue.serverTimestamp();
      requestData.status = "pending"; // Default status
      requestData.showcase = requestData.showcase === "true";

      try {
        const docRef = await db.collection("requests").add(requestData);
        console.log("Document written with ID: ", docRef.id);
        formStatus.textContent = "Request submitted! We will contact you via email shortly.";
        formStatus.className = "success";
        form.reset();
        updateForm();
      } catch (error) {
        console.error("Error adding document: ", error);
        formStatus.textContent = "An error occurred. Please try again or contact us directly.";
        formStatus.className = "error";
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
});