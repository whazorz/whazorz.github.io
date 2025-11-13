document.addEventListener("DOMContentLoaded", () => {

  // --- 1. Translation Setup ---
  const translations = {
    en: {
      // Nav
      navHome: "Home",
      navPortfolio: "Portfolio",
      navRequest: "Request",
      // Header
      headerTitle: "/// Whazorz Designs",
      // Home Page
      homeAboutTitle: "About",
      homeAboutText: "Hi, I’m Whazorz — an artist deeply inspired by creativity in all its forms. My journey began in 2012, when I started my career in technical fields and gradually moved toward graphic design. Over the years, I’ve shared my creative process and ideas through live streams, inviting others to explore the world of digital art and design with me.",
      homeLatestWorkTitle: "Latest Work",
      homeViewAll: "View Full Portfolio &rarr;",
      homeRequestInfoTitle: "REQUESTING INFO.",
      homeTermsTitle: "Key Terms",
      homeTermsApproval: "<strong>Approval:</strong> All requests are subject to review. Projects begin only after designer approval.",
      homeTermsTimeframe: "<strong>Timeframe:</strong> Standard delivery is 2-3 business days, but complex projects may take longer.",
      homeTermsRevisions: "<strong>Revisions:</strong> Up to two revisions are included. Additional revisions may incur extra charges.",
      homeTermsPayment: "<strong>Payment:</strong> Payment is processed *after* you approve the design. Prices shown are estimates and can vary.",
      homeTermsComm: "<strong>Communication:</strong> All project communication will be via email.",
      homeTermsContact: "Contacts: whazorz.design@gmail.com",
      priceLogo: "Logo",
      pricePoster: "A4 poster / promo",
      priceBanner: "Banner / Header / promo",
      priceProfile: "Profile / promo",
      priceBundle: "Promo Bundle [Logo/Profile/Banner]",
      priceNote1: "<strong>Note:</strong> Prices are starting estimates. Final cost may vary based on complexity.",
      priceNote2: "Discount for regular client discussable.",
      // Portfolio Page
      portfolioTitle: "Portfolio",
      filterAll: "All",
      filterLogos: "Logos",
      filterPosters: "A4 Posters",
      filterBanners: "Banners",
      filterProfile: "Profile",
      // Request Page
      requestTitle: "Request a Design",
      requestTermsSummary: "Please read the full Commission Terms & Conditions before proceeding.",
      requestTermsTitle: "Commission Terms & Conditions",
      requestTermsApprovalTitle: "Approval",
      requestTermsApproval1: "All design requests are subject to review and approval by the designer.",
      requestTermsApproval2: "Projects will only proceed if they meet the designer’s creative and technical requirements.",
      requestTermsApproval3: "The designer reserves the right to decline any request that does not align with the project criteria or ethical guidelines.",
      requestTermsPaymentTitle: "Payment",
      requestTermsPayment1: "Payment will be processed only after the client has reviewed and approved the proposed design.",
      requestTermsPayment2: "Please note that final pricing may vary depending on the project’s complexity and may exceed the initial estimate.",
      requestTermsPayment3: "Clients will be notified and must approve any cost adjustments before further work continues.",
      requestTermsTimeframeTitle: "Timeframe",
      requestTermsTimeframe1: "The standard delivery timeframe is 2–3 business days.",
      requestTermsTimeframe2: "However, more complex or customized projects may require additional time.",
      requestTermsTimeframe3: "Clients will be informed of any expected delays in advance.",
      requestTermsRevisionsTitle: "Revisions",
      requestTermsRevisions1: "Each project includes up to two (2) revisions, depending on the scope and complexity.",
      requestTermsRevisions2: "Additional revisions may incur extra charges, which will be discussed prior to implementation.",
      requestTermsCommTitle: "Communication",
      requestTermsComm1: "All communication and project updates will be conducted via email to ensure clear and traceable correspondence.",
      requestTermsComm2: "Clients are encouraged to respond promptly to maintain project timelines.",
      requestTermsEuTitle: "European Consumer Compliance",
      requestTermsEu1: "All transactions comply with EU consumer protection laws, including transparency in pricing, digital service delivery, and refund eligibility.",
      requestTermsEu2: "Once a design is approved and production has begun, refunds may not be available due to the custom nature of the service.",
      requestFormIntro: "Please fill out the form below to start your request. <strong>All future communication will be conducted via email.</strong>",
      formEmail: "Your Email Address",
      formEmailPlaceholder: "your.email@example.com",
      formProduct: "Select Product Type",
      formOptionProfile: "Profile / promo (10 Eur)",
      formOptionBanner: "Banner / Header / promo (20 Eur)",
      formOptionPoster: "A4 poster / promo (30 Eur)",
      formOptionLogo: "Logo (50 Eur)",
      formOptionBundle: "Promo Bundle [Logo/Profile/Banner] (80 Eur)",
      formBudget: "Starting Budget (EUR)",
      formLogoDetails: "Logo Details",
      formLogoPlaceholder1: "Brand Name",
      formLogoPlaceholder2: "Describe the style (e.g., modern, minimalist, retro) and any color preferences.",
      formPosterDetails: "A4 Poster / Promo Details",
      formPosterPlaceholder: "What text, dates, and information must be on the poster?",
      formBannerDetails: "Banner / Header Details",
      formBannerPlaceholder1: "Platform (e.g., YouTube, Twitter, Website)",
      formBannerPlaceholder2: "What text or @usernames should be on the banner?",
      formProfileDetails: "Profile / Promo Details",
      formProfilePlaceholder1: "Username or Text for profile pic",
      formProfilePlaceholder2: "Color scheme, style, or any specific ideas.",
      formInstructions: "General Instructions / Project Brief",
      formInstructionsPlaceholder: "Please provide a clear and detailed brief of your requirements. Include links to any inspiration or references.",
      formAgreeTerms: "I agree to the Terms and Conditions",
      formAgreeShowcase: "I agree to allow WhazorzDesigns to showcase the final work in their portfolio.",
      formAgreeEmail: "I agree to recieve future emails.",
      formSubmitButton: "Submit Request",
      // Footer
      footerCopyright: "Copyright © WHAZORZ 2025",
      // Dynamic JS Messages
      firebaseError: "Error: Could not connect to submission service. Check API key.",
      portfolioError: "<p>Error loading portfolio.</p>",
      latestWorkError: "<p>Error loading latest work.</p>",
      formSubmitting: "Submitting...",
      formSuccess: "Success! You can send another request in 30 seconds.",
      formError: "An error occurred. Please try again or contact us directly."
    },
    lv: {
      // Nav
      navHome: "Sākums",
      navPortfolio: "Portfolio",
      navRequest: "Pieprasījums",
      // Header
      headerTitle: "/// Whazorz Designs",
      // Home Page
      homeAboutTitle: "Par mani",
      homeAboutText: "Sveiki, es esmu Whazorz — mākslinieks, kuru dziļi iedvesmo radošums visās tā formās. Mans ceļojums sākās 2012. gadā, kad sāku karjeru tehniskajās jomās un pakāpeniski pievērsos grafiskajam dizainam. Gadu gaitā esmu dalījies ar savu radošo procesu un idejām tiešraidēs, aicinot citus kopā ar mani izpētīt digitālās mākslas un dizaina pasauli.",
      homeLatestWorkTitle: "Jaunākie darbi",
      homeViewAll: "Skatīt pilnu portfolio &rarr;",
      homeRequestInfoTitle: "INFORMĀCIJA PAR PASŪTĪJUMU",
      homeTermsTitle: "Galvenie noteikumi",
      homeTermsApproval: "<strong>Apstiprināšana:</strong> Visi pieprasījumi tiek pārskatīti. Projekti sākas tikai pēc dizainera apstiprinājuma.",
      homeTermsTimeframe: "<strong>Izpildes laiks:</strong> Standarta piegāde ir 2-3 darba dienas, bet sarežģītāki projekti var aizņemt vairāk laika.",
      homeTermsRevisions: "<strong>Labojumi:</strong> Iekļautas līdz divām labojumu kārtām. Papildu labojumi var radīt papildu maksu.",
      homeTermsPayment: "<strong>Apmaksa:</strong> Apmaksa tiek veikta *pēc* tam, kad esat apstiprinājis dizainu. Norādītās cenas ir aptuvenas un var mainīties.",
      homeTermsComm: "<strong>Komunikācija:</strong> Visa projekta komunikācija notiks pa e-pastu.",
      homeTermsContact: "Kontakti: whazorz.design@gmail.com",
      priceLogo: "Logo",
      pricePoster: "A4 plakāts / promo",
      priceBanner: "Baneris / Galvene / promo",
      priceProfile: "Profils / promo",
      priceBundle: "Promo komplekts [Logo/Profils/Baneris]",
      priceNote1: "<strong>Piezīme:</strong> Cenas ir sākuma cenas. Gala izmaksas var atšķirties atkarībā no sarežģītības.",
      priceNote2: "Atlaides pastāvīgiem klientiem ir apspriežamas.",
      // Portfolio Page
      portfolioTitle: "Portfolio",
      filterAll: "Visi",
      filterLogos: "Logo",
      filterPosters: "A4 Plakāti",
      filterBanners: "Baneri",
      filterProfile: "Profili",
      // Request Page
      requestTitle: "Pieprasīt dizainu",
      requestTermsSummary: "Lūdzu, izlasiet visus Pasūtījuma noteikumus un nosacījumus pirms turpināt.",
      requestTermsTitle: "Pasūtījuma noteikumi un nosacījumi",
      requestTermsApprovalTitle: "Apstiprināšana",
      requestTermsApproval1: "Visi dizaina pieprasījumi tiek pārskatīti un apstiprināti no dizainera puses.",
      requestTermsApproval2: "Projekti tiks turpināti tikai tad, ja tie atbilst dizainera radošajām un tehniskajām prasībām.",
      requestTermsApproval3: "Dizaineris patur tiesības atteikt jebkuru pieprasījumu, kas neatbilst projekta kritērijiem vai ētikas vadlīnijām.",
      requestTermsPaymentTitle: "Apmaksa",
      requestTermsPayment1: "Apmaksa tiks apstrādāta tikai pēc tam, kad klients ir pārskatījis un apstiprinājis piedāvāto dizainu.",
      requestTermsPayment2: "Lūdzu, ņemiet vērā, ka galīgā cena var atšķirties atkarībā no projekta sarežģītības un var pārsniegt sākotnējo tāmi.",
      requestTermsPayment3: "Klienti tiks informēti un viņiem būs jāapstiprina jebkādas izmaksu korekcijas pirms darba turpināšanas.",
      requestTermsTimeframeTitle: "Izpildes laiks",
      requestTermsTimeframe1: "Standarta piegādes laiks ir 2–3 darba dienas.",
      requestTermsTimeframe2: "Tomēr sarežģītāki vai pielāgoti projekti var prasīt papildu laiku.",
      requestTermsTimeframe3: "Klienti tiks iepriekš informēti par jebkādiem sagaidāmiem kavējumiem.",
      requestTermsRevisionsTitle: "Labojumi",
      requestTermsRevisions1: "Katrs projekts ietver līdz diviem (2) labojumiem, atkarībā no apjoma un sarežģītības.",
      requestTermsRevisions2: "Papildu labojumi var radīt papildu maksu, kas tiks apspriesta pirms to ieviešanas.",
      requestTermsCommTitle: "Komunikācija",
      requestTermsComm1: "Visa saziņa un projekta atjauninājumi tiks veikti pa e-pastu, lai nodrošinātu skaidru un izsekojamu saraksti.",
      requestTermsComm2: "Klienti tiek aicināti laikus atbildēt, lai ievērotu projekta termiņus.",
      requestTermsEuTitle: "Eiropas Patērētāju Atbilstība",
      requestTermsEu1: "Visi darījumi atbilst ES patērētāju aizsardzības tiesību aktiem, ieskaitot cenu pārredzamību, digitālo pakalpojumu sniegšanu un atmaksas tiesības.",
      requestTermsEu2: "Tiklīdz dizains ir apstiprināts un ražošana ir sākusies, atmaksa var nebūt pieejama pakalpojuma pielāgotā rakstura dēļ.",
      requestFormIntro: "Lūdzu, aizpildiet zemāk esošo veidlapu, lai sāktu pieprasījumu. <strong>Visa turpmākā saziņa notiks pa e-pastu.</strong>",
      formEmail: "Jūsu e-pasta adrese",
      formEmailPlaceholder: "jusu.epasts@piemers.com",
      formProduct: "Izvēlieties produkta veidu",
      formOptionProfile: "Profils / promo (10 Eur)",
      formOptionBanner: "Baneris / Galvene / promo (20 Eur)",
      formOptionPoster: "A4 plakāts / promo (30 Eur)",
      formOptionLogo: "Logo (50 Eur)",
      formOptionBundle: "Promo komplekts [Logo/Profils/Baneris] (80 Eur)",
      formBudget: "Sākuma budžets (EUR)",
      formLogoDetails: "Logo detaļas",
      formLogoPlaceholder1: "Zīmola nosaukums",
      formLogoPlaceholder2: "Aprakstiet stilu (piemēram, moderns, minimālistisks, retro) un krāsu vēlmes.",
      formPosterDetails: "A4 Plakāta / Promo detaļas",
      formPosterPlaceholder: "Kāds teksts, datumi un informācija jāiekļauj plakātā?",
      formBannerDetails: "Banera / Galvenes detaļas",
      formBannerPlaceholder1: "Platforma (piem., YouTube, Twitter, Mājaslapa)",
      formBannerPlaceholder2: "Kāds teksts vai @lietotājvārdi jāiekļauj banerī?",
      formProfileDetails: "Profila / Promo detaļas",
      formProfilePlaceholder1: "Lietotājvārds vai teksts profila bildei",
      formProfilePlaceholder2: "Krāsu shēma, stils vai citas konkrētas idejas.",
      formInstructions: "Vispārīgas instrukcijas / Projekta apraksts",
      formInstructionsPlaceholder: "Lūdzu, sniedziet skaidru un detalizētu savu prasību aprakstu. Iekļaujiet saites uz iedvesmas avotiem vai atsaucēm.",
      formAgreeTerms: "Es piekrītu Noteikumiem un Nosacījumiem",
      formAgreeShowcase: "Es piekrītu atļaut WhazorzDesigns demonstrēt gala darbu savā portfolio.",
      formAgreeEmail: "Es piekrītu saņemt turpmākus e-pastus.",
      formSubmitButton: "Iesniegt pieprasījumu",
      // Footer
      footerCopyright: "Autortiesības © WHAZORZ 2025",
      // Dynamic JS Messages
      firebaseError: "Kļūda: Nevar izveidot savienojumu ar iesniegšanas pakalpojumu. Pārbaudiet API atslēgu.",
      portfolioError: "<p>Kļūda, ielādējot portfolio.</p>",
      latestWorkError: "<p>Kļūda, ielādējot jaunākos darbus.</p>",
      formSubmitting: "Iesniedz...",
      formSuccess: "Veiksmīgi! Jūs varat nosūtīt nākamo pieprasījumu pēc 30 sekundēm.",
      formError: "Radās kļūda. Lūdzu, mēģiniet vēlreiz vai sazinieties ar mums tieši."
    }
  };

  let currentLang = localStorage.getItem('lang') || 'en';

  function translatePage(lang) {
    if (!translations[lang]) lang = 'en'; // Fallback to English
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // Update lang button active state
    document.querySelectorAll('#lang-switcher .lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Translate all elements with data-key
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      if (translations[lang][key]) {
        // Use innerHTML for keys that contain <strong> or &rarr;
        if (key.includes('homeTerms') || key === 'homeViewAll' || key === 'requestFormIntro' || key === 'priceNote1') {
          el.innerHTML = translations[lang][key];
        } else {
          el.innerText = translations[lang][key];
        }
      }
    });

    // Translate all placeholders
    document.querySelectorAll('[data-key-placeholder]').forEach(el => {
      const key = el.getAttribute('data-key-placeholder');
      if (translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });

    // Translate <summary> tags
    document.querySelectorAll('summary[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      if (translations[lang][key]) {
        el.innerText = translations[lang][key];
      }
    });

    // Translate <option> tags in select
    document.querySelectorAll('#product-type option[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      if (translations[lang][key]) {
        el.innerText = translations[lang][key];
      }
    });
  }

  // --- 2. Language Switcher Event Listeners ---
  document.querySelectorAll('#lang-switcher .lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      translatePage(lang);
    });
  });

  // --- Initial Page Translation ---
  translatePage(currentLang);

  // --- 3. Firebase Setup ---
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
    // Pass translations and a function to get the current language
    setupRequestForm(db, translations, () => currentLang);
    loadPortfolio(db, translations, () => currentLang);
    loadLatestWork(db, translations, () => currentLang);
    setupLightbox();
    setupHomePageLinks();
    setupImageProtection();

  } catch (e) {
    console.error("❌ Error initializing Firebase:", e);
    const formStatus = document.getElementById("form-status");
    if (formStatus) {
      // Use translations for the error message
      formStatus.textContent = translations[currentLang].firebaseError;
      formStatus.className = "error";
    }
  }

  // --- 4. Page Navigation ---
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

  // --- 5. Portfolio Filter ---
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

  // --- 6. Load Portfolio ---
  // Modified to accept translations
  async function loadPortfolio(db, translations, getCurrentLang) {
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
      gallery.innerHTML = translations[getCurrentLang()].portfolioError;
    }
  }

  // --- 7. Load Latest Work ---
  // Modified to accept translations
  async function loadLatestWork(db, translations, getCurrentLang) {
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
      gallery.innerHTML = translations[getCurrentLang()].latestWorkError;
    }
  }

  // --- 8. Create Gallery Item Helper ---
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

  // --- 9. Lightbox Setup ---
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

  // --- 10. Home Page "View Full Portfolio" Link ---
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

  // --- 11. Request Form ---
  // Modified to accept translations and getCurrentLang function
  function setupRequestForm(db, translations, getCurrentLang) {
    const form = document.getElementById("request-form");
    if (!form) return;

    const productSelect = document.getElementById("product-type");
    const budgetInput = document.getElementById("budget");
    const formStatus = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");
    const termsCheckbox = document.getElementById("terms-agree");

    // Disable button by default
    submitBtn.disabled = true;

    // Add event listener to the terms checkbox
    termsCheckbox.addEventListener("change", () => {
      submitBtn.disabled = !termsCheckbox.checked;
    });

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
      
      const lang = getCurrentLang(); // Get current language for messages
      formStatus.textContent = translations[lang].formSubmitting;
      formStatus.className = "";

      const formData = new FormData(form);
      const requestData = {};
      formData.forEach((value, key) => (requestData[key] = value));

      requestData.timestamp = firebase.firestore.FieldValue.serverTimestamp();
      requestData.status = "pending";
      
      requestData.showcase = requestData.showcase === "true";
      requestData.email_agree = requestData.email_agree === "true";

      try {
        const docRef = await db.collection("requests").add(requestData);
        console.log("✅ Request added with ID:", docRef.id);
        
        formStatus.textContent = translations[lang].formSuccess;
        formStatus.className = "success";
        form.reset();
        updateForm();
        
        submitBtn.disabled = true;
        termsCheckbox.checked = false;

        setTimeout(() => {
          submitBtn.disabled = !termsCheckbox.checked;
          formStatus.textContent = ""; 
        }, 30000); 

      } catch (error) {
        console.error("❌ Error adding document:", error);
        formStatus.textContent = translations[lang].formError;
        formStatus.className = "error";
        submitBtn.disabled = !termsCheckbox.checked;
      }
    });
  }

  // --- 12. Image Right-Click Protection ---
  function setupImageProtection() {
    document.addEventListener('contextmenu', event => {
      if (event.target.tagName === 'IMG' && event.target.closest('.gallery-container')) {
        event.preventDefault();
      }
    });
  }

});