document.addEventListener("DOMContentLoaded", () => {

  // --- 1. Translation Setup ---
  const translations = {
    en: {
      // Nav
      navHome: "Home",
      navPortfolio: "Portfolio",
      navGFX: "GFX",
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
      // UPDATED PRICES/PRODUCTS
      priceLogo: "Logo",
      pricePoster: "A4 Promo Poster",
      priceBanner: "Banner / Header",
      priceProfile: "Profile",
      priceUI: "Brand-focused UI layout [Logo/Profile/Ui]",
      priceBundle: "Promo Bundle [Logo/Profile/Banner]",
      priceNote1: "<strong>Note:</strong> Prices are starting estimates. Final cost may vary based on complexity.",
      priceNote2: "Bulk discount for regular clients: 37.5%.",
      homeDonateTitle: "Support My Work",
      homeDonateText: "“Buy me a coffee ☕🎨”",
      homeDonateButton: "Donate with PayPal",
      // Portfolio Page
      portfolioTitle: "Portfolio",
      filterAll: "All",
      filterLogos: "Logos",
      filterPosters: "A4 Posters",
      filterBanners: "Banners",
      filterProfile: "Profile",
      // NEW: GFX Page
      gfxTitle: "GFX",
      gfxIntro: "Here you can find various design assets and resources I've created over time.",
      downloadsError: "<p>Error loading GFX.</p>", 
      // NEW GFX Filter Keys
      filterEnvironment: "ENVIRONMENT",
      filterNatural: "NATURAL EFFECTS",
      filterParticle: "PARTICLE STYLES",
      filterTech: "TECH GLITCH DIGITAL EFFECTS",
      filterSpace: "SPACE COSMIC EFFECTS",
      filterAbstract: "CLEAN ABSTRACT TEXTURES",
      filterImpact: "IMPACT DAMAGE EFFECTS",
      filterEnergy: "ENERGY MAGIC SCI-FI EFFECTS",
      filterSmoke: "SMOKE FOG ATMOSPHERE",
      filterFire: "FIRE HEAT EFFECTS",
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
      // UPDATED OPTIONS
      formOptionProfile: "Profile (3 Eur)",
      formOptionBanner: "Banner / Header (5 Eur)",
      formOptionPoster: "A4 Promo Poster (8 Eur)",
      formOptionLogo: "Logo (20 Eur)",
      formOptionUI: "Brand-focused UI layout [Logo/Profile/Ui] (30 Eur)",
      formOptionBundle: "Promo Bundle [Logo/Profile/Banner] (25 Eur)",
      formBudget: "Starting Budget (EUR)",
      formLogoDetails: "Logo Details",
      formLogoPlaceholder1: "Brand Name",
      formLogoPlaceholder2: "Describe the style (e.g., modern, minimalist, retro) and any color preferences.",
      formPosterDetails: "A4 Poster / Promo Details",
      formPosterPlaceholder: "What text, dates, and information must be on the poster?",
      formBannerDetails: "Banner / Header Details",
      formBannerPlaceholder1: "Platform (e.g., YouTube, Twitter, Website)",
      formBannerPlaceholder2: "What text or @usernames should be on the banner?",
      formProfileDetails: "Profile Details",
      formProfilePlaceholder1: "Username or Text for profile pic",
      formProfilePlaceholder2: "Color scheme, style, or any specific ideas.",
      // NEW UI FIELDS
      formUIDetails: "Brand-focused UI layout Details",
      formUIPlaceholder1: "UI Platform (e.g., Twitch, YouTube channel layout, App)",
      formUIPlaceholder2: "Describe the layout requirements, brand feel, and necessary assets (Logo/Profile/UI).",
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
      navGFX: "GFX",
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
      // UPDATED PRICES/PRODUCTS
      priceLogo: "Logo",
      pricePoster: "A4 Promo Plakāts",
      priceBanner: "Baneris / Galvene",
      priceProfile: "Profils",
      priceUI: "Uz zīmolu orientēts UI izkārtojums [Logo/Profils/UI]",
      priceBundle: "Promo komplekts [Logo/Profils/Baneris]",
      priceNote1: "<strong>Piezīme:</strong> Cenas ir sākuma cenas. Gala izmaksas var atšķirties atkarībā no sarežģītības.",
      priceNote2: "Lielapjoma atlaide pastāvīgiem klientiem: 37.5%.",
      homeDonateTitle: "Atbalsti manu darbu",
      homeDonateText: "“Uzsauc man kafiju ☕🎨”",
      homeDonateButton: "Ziedot ar PayPal",
      // Portfolio Page
      portfolioTitle: "Portfolio",
      filterAll: "Visi",
      filterLogos: "Logo",
      filterPosters: "A4 Plakāti",
      filterBanners: "Baneri",
      filterProfile: "Profili",
      // NEW: GFX Page
      gfxTitle: "GFX",
      gfxIntro: "Šeit Jūs varat atrast dažādus dizaina resursus, ko esmu laika gaitā izveidojis.",
      downloadsError: "<p>Kļūda, ielādējot GFX.</p>",
      // NEW GFX Filter Keys
      filterEnvironment: "VIDE",
      filterNatural: "DABĪGIE EFEKTI",
      filterParticle: "DAĻIŅU STILI",
      filterTech: "TEHNISKI DIGITĀLIE EFEKTI",
      filterSpace: "KOSMOSA EFEKTI",
      filterAbstract: "TĪRAS ABSTRAKTAS TEKSTŪRAS",
      filterImpact: "TRIECIENA BOJĀJUMU EFEKTI",
      filterEnergy: "ENERĢIJAS/MAĢIJAS/SCI-FI EFEKTI",
      filterSmoke: "DŪMU/MIGLAS EFEKTI",
      filterFire: "UGUNS/KARSTUMA EFEKTI",
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
      // UPDATED OPTIONS
      formOptionProfile: "Profils (3 Eur)",
      formOptionBanner: "Baneris / Galvene (5 Eur)",
      formOptionPoster: "A4 Promo Plakāts (8 Eur)",
      formOptionLogo: "Logo (20 Eur)",
      formOptionUI: "Uz zīmolu orientēts UI izkārtojums [Logo/Profils/UI] (30 Eur)",
      formOptionBundle: "Promo komplekts [Logo/Profils/Baneris] (25 Eur)",
      formBudget: "Sākuma budžets (EUR)",
      formLogoDetails: "Logo detaļas",
      formLogoPlaceholder1: "Zīmola nosaukums",
      formLogoPlaceholder2: "Aprakstiet stilu (piemēram, moderns, minimālistisks, retro) un krāsu vēlmes.",
      formPosterDetails: "A4 Plakāta / Promo detaļas",
      formPosterPlaceholder: "Kāds teksts, datumi un informācija jāiekļauj plakātā?",
      formBannerDetails: "Banera / Galvenes detaļas",
      formBannerPlaceholder1: "Platforma (piem., YouTube, Twitter, Mājaslapa)",
      formBannerPlaceholder2: "Kāds teksts vai @lietotājvārdi jāiekļauj banerī?",
      formProfileDetails: "Profila detaļas",
      formProfilePlaceholder1: "Lietotājvārds vai teksts profila bildei",
      formProfilePlaceholder2: "Krāsu shēma, stils vai citas konkrētas idejas.",
      // NEW UI FIELDS
      formUIDetails: "Uz zīmolu orientēts UI izkārtojums detaļas",
      formUIPlaceholder1: "UI Platforma (piem., Twitch, YouTube kanāla izkārtojums, Lietotne)",
      formUIPlaceholder2: "Aprakstiet izkārtojuma prasības, zīmola sajūtu un nepieciešamos resursus (Logo/Profils/UI).",
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
      // Use fallback for GFX keys if old keys are accidentally used
      const translationKey = translations[lang][key] ? key : (key.replace('downloads', 'gfx') in translations[lang] ? key.replace('downloads', 'gfx') : key);


      if (translations[lang][translationKey]) {
        if (translationKey.includes('homeTerms') || translationKey === 'homeViewAll' || translationKey === 'requestFormIntro' || translationKey.includes('priceNote')) {
          el.innerHTML = translations[lang][translationKey];
        } else {
          el.innerText = translations[lang][translationKey];
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

    // NEW: Re-translate GFX filter buttons
    document.querySelectorAll('#gfx-filter-controls .filter-btn').forEach(btn => {
        const type = btn.getAttribute('data-filter');
        const key = `filter${type.charAt(0).toUpperCase() + type.slice(1)}`;
        if (translations[lang][key]) {
            btn.innerText = translations[lang][key];
        } else if (type === 'all') {
             btn.innerText = translations[lang].filterAll;
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
    authDomain: "whazorz-portfolio.firebaseapp.com",
    projectId: "whazorz-portfolio",
    storageBucket: "whazorz-portfolio.appspot.com",
    messagingSenderId: "23481217882",
    appId: "1:23481217882:web:cd604440b34b9dea62b027", // IMPORTANT: Verify the App ID hash in your Firebase Console
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
    loadGFX(db, translations, translatePage, () => currentLang);
    setupLightbox();
    setupHomePageLinks();
    
    // NOTE: setupImageProtection is REMOVED to allow right-click
    // setupImageProtection(); 

  } catch (e) {
    console.error("❌ Error initializing Firebase:", e);
    const formStatus = document.getElementById("form-status");
    if (formStatus) {
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
    const filterButtons = document.querySelectorAll("#Portfolio .filter-btn");
    const galleryItems = document.querySelectorAll("#portfolio-gallery .gallery-item");

    if (filterButtons.length > 0 && galleryItems.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener("click", () => {
          const filter = button.getAttribute("data-filter");

          filterButtons.forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");

          galleryItems.forEach(item => {
            const itemType = item.getAttribute("data-type");
            // Use display none/block for filter visibility (instead of opacity/scale for smooth filtering)
            if (filter === "all" || filter === itemType) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    }
  }

  // --- 6. Load Portfolio ---
  async function loadPortfolio(db, translations, getCurrentLang) {
    const gallery = document.getElementById("portfolio-gallery");
    if (!gallery) return;

    try {
      const snapshot = await db.collection("portfolioItems").get();

      gallery.innerHTML = "";
      snapshot.forEach(doc => {
        const item = doc.data();
        // Ensure item.imageUrl includes the full filename and extension (e.g., "my_image.jpg")
        const galleryItem = createGalleryItem(item, '/images/'); 
        gallery.appendChild(galleryItem);
      });

      setupPortfolioFilter();

    } catch (e) {
      console.error("Error loading portfolio:", e);
      gallery.innerHTML = translations[getCurrentLang()].portfolioError;
    }
  }

  // --- 7. Load Latest Work ---
  async function loadLatestWork(db, translations, getCurrentLang) {
    const gallery = document.getElementById("latest-work-gallery");
    if (!gallery) return;

    try {
      const snapshot = await db.collection("portfolioItems").limit(3).get();

      gallery.innerHTML = "";
      snapshot.forEach(doc => {
        const item = doc.data();
        // Ensure item.imageUrl includes the full filename and extension (e.g., "my_image.jpg")
        const galleryItem = createGalleryItem(item, '/images/'); 
        gallery.appendChild(galleryItem);
      });
    } catch (e) {
      console.error("Error loading latest work:", e);
      gallery.innerHTML = translations[getCurrentLang()].latestWorkError;
    }
  }

  // --- 8. Create Gallery Item Helper (FOR PORTFOLIO) ---
  function createGalleryItem(item, rootPath) {
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";
    galleryItem.setAttribute("data-type", item.type || "general");

    const img = document.createElement("img");
    // Full URL construction: expects rootPath (/images/) + item.imageUrl (filename.ext)
    const fullUrl = `${rootPath}${item.imageUrl}`; 
    img.src = fullUrl;
    img.alt = `${item.type || "Portfolio"} project`;
    img.setAttribute("data-lightbox-src", fullUrl);

    galleryItem.appendChild(img);
    return galleryItem;
  }

  // --- 9. Load GFX (replacing Load Downloads) ---
  async function loadGFX(db, translations, translatePage, getCurrentLang) {
    const container = document.getElementById("gfx-container");
    const filterControls = document.getElementById("gfx-filter-controls");

    if (!container || !filterControls) return;

    // --- Setup GFX Filter Listener (using pre-defined buttons) ---
    function setupGfxFilter() {
        const filterButtons = document.querySelectorAll("#GFX .filter-btn");
        
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                const filter = button.getAttribute("data-filter");

                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                container.querySelectorAll('.gfx-item').forEach(item => {
                    const itemType = item.getAttribute("data-type");
                    item.style.display = (filter === "all" || filter === itemType) ? 'flex' : 'none';
                });
            });
        });
    }
    // -----------------------------------------------------------------

    try {
        const snapshot = await db.collection("downloads").orderBy("title").get();

        container.innerHTML = "";
        const lang = getCurrentLang();

        if (snapshot.empty) {
            container.innerHTML = `<p>${translations[lang].gfxIntro}</p>`;
            return;
        }

        const items = [];
        snapshot.forEach(doc => {
            const item = doc.data();
            item.id = doc.id;
            items.push(item);
        });

        // 1. Render Items
        items.forEach(item => {
            const gfxItem = document.createElement("div");
            gfxItem.className = "download-item gfx-item"; // Use download-item for styling
            gfxItem.setAttribute("data-type", item.type || "general");

            // Full URL construction: expects /gfx/ + item.imageUrl (filename.ext)
            const imageUrl = `/gfx/${item.imageUrl}`; 

            // REMOVED: Title/Description container and Download button
            // The image remains clickable (due to .gfx-copy-image class) but the actual copy logic is removed below.
            gfxItem.innerHTML = `
              <img src="${imageUrl}" alt="${item.title}" class="download-item-image" data-image-url="${imageUrl}">
            `;
            container.appendChild(gfxItem);
        });

        // 2. Setup GFX Filter Listener
        setupGfxFilter();

        // 3. REMOVED: Image Copy Feature. 
        // We ensure the image tag no longer has the gfx-copy-image class
        // and we delete the click listener to allow default behavior.

    } catch (e) {
        console.error("Error loading GFX:", e);
        container.innerHTML = translations[getCurrentLang()].downloadsError;
    }
  }

  // --- 10. Lightbox Setup ---
  function setupLightbox() {
    const overlay = document.getElementById("lightbox-overlay");
    const lightboxImg = document.getElementById("lightbox-image");
    const closeBtn = document.getElementById("lightbox-close");

    if (!overlay || !lightboxImg || !closeBtn) return;

    function openLightbox(e) {
      // Only open lightbox for Portfolio images
      if (e.target.tagName === "IMG" && e.target.closest("#portfolio-gallery")) {
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

  // --- 11. Home Page "View Full Portfolio" Link ---
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

  // --- 12. Request Form ---
  function setupRequestForm(db, translations, getCurrentLang) {
    const form = document.getElementById("request-form");
    if (!form) return;

    const productSelect = document.getElementById("product-type");
    const budgetInput = document.getElementById("budget");
    const formStatus = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");
    const termsCheckbox = document.getElementById("terms-agree");

    submitBtn.disabled = true;
    termsCheckbox.addEventListener("change", () => {
      submitBtn.disabled = !termsCheckbox.checked;
    });

    // UPDATED PRICES
    const prices = {
      profile: 3,
      banner: 5,
      poster: 8,
      logo: 20,
      ui: 30, // NEW PRODUCT PRICE
      bundle: 25
    };

    const conditionalFields = {
      logo: document.getElementById("logo-details"),
      poster: document.getElementById("poster-details"),
      banner: document.getElementById("banner-details"),
      profile: document.getElementById("profile-details"),
      ui: document.getElementById("ui-details")
    };

    function updateForm() {
      const selectedValue = productSelect.value;
      budgetInput.value = prices[selectedValue] || 3; // Fallback to lowest price (profile: 3)

      Object.values(conditionalFields).forEach(field => {
        if (field) field.classList.remove("visible");
      });

      if (selectedValue === "bundle") {
        ["logo", "banner", "profile"].forEach(key => {
          if (conditionalFields[key]) conditionalFields[key].classList.add("visible");
        });
      } else if (selectedValue === "ui") {
        ["logo", "profile", "ui"].forEach(key => {
          if (conditionalFields[key]) conditionalFields[key].classList.add("visible");
        });
      }
      else if (conditionalFields[selectedValue]) {
        conditionalFields[selectedValue].classList.add("visible");
      }
    }

    updateForm();
    productSelect.addEventListener("change", updateForm);

    form.addEventListener("submit", async e => {
      e.preventDefault();
      submitBtn.disabled = true;

      const lang = getCurrentLang();
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

  // --- 13. Image Right-Click Protection ---
  // REMOVED function body as requested to allow context menu.
  
});