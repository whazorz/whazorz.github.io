// --- 1. Translation Setup ---
const translations = {
  en: {
    // Nav
    navHome: "Home",
    navPortfolio: "Portfolio",
    navGFX: "GFX",
    navRequest: "Service",
    // Header
    headerTitle: "/// Whazorz Designs",
    // Home Page
    homeAboutTitle: "About",
    homeAboutText: "Hi, I’m Whazorz — an artist deeply inspired by creativity in all its forms. My journey began in 2012, when I started my career in technical fields and gradually moved toward graphic design. Over the years, I’ve shared my creative process and ideas through live streams, inviting others to explore the world of graphics and design with me.",
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
    priceHeaderProduct: "Available Products",
    priceHeaderRes: "Technical Resolution (In MM)",
    notpredefined: "Not Predefined size",
    priceLogo: "Logo Graphical",
    priceA3: "A3 Poster Graphical",
    priceA4: "A4 Poster Graphical",
    priceCover: "Cover Graphical",
    priceFlyer: "Flyer Graphical",
    priceBrandCard: "Brand Card GRaphical",
    priceBanner: "Banner / Header Graphical",
    priceProfile: "Profile Image Graphical",
    
    // PRODUCTS (Items)
    prodLogo: "Logo",
    prodA3: "A3 Poster",
    prodA4: "A4 Poster",
    prodBanner: "Banner",
    prodCover: "Cover",
    prodFlyer: "Flyer",
    prodBrandCard: "Brand Card",
    prodProfile: "Profile Image",

    homeDonateTitle: "Support My Work",
    homeDonateText: "“Buy me a coffee ☕🎨”",
    homeDonateButton: "Donate with PayPal",
    // Portfolio Page
    portfolioTitle: "Portfolio",
    filterAll: "All",
    filterLogos: "Logos",
    filterPosters: "Posters",
    filterFlyer: "Flyers",
    filterCover: "Covers",
    filterBrandCard: "Brand Cards",
    filterBanners: "Banners",
    filterProfile: "Profile",
    // GFX Page
    gfxTitle: "GFX",
    gfxIntro: "Here you can find various digital hand wrapped design assets and resources I've created over time. Tech tip: use it as Screen filter to make it transparent as background so the GFX image works indeed.",
    downloadsError: "<p>Error loading GFX.</p>",
    // GFX Filter Keys
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
    FormalSelectProductAbove: "Choose Product Above.",
    FormalSmartGuide: "*Smart Guide: Sizes are Width x Height & mm",
    FormalResolution: "Technical Resolution:",
    FormalSelectProduct: "Select a product.",
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

    // FORM LABELS
    formEmail: "Your Email Address",
    formEmailPlaceholder: "your.email@example.com",
    formProduct: "Select Product Type",
    formBudget: "Your Budget (EUR)",
    formInstructions: "Additional information or General Instructions / Project Brief",
    formInstructionsPlaceholder: "Please provide a clear and detailed brief of your requirements. Include information, dates and links to any inspiration or references.",
    formAgreeTerms: "I agree to the Terms and Conditions",
    formAgreeShowcase: "I agree to allow WhazorzDesigns to showcase the final work in their portfolio.",
    formAgreeEmail: "I agree to receive future emails.",
    formSubmitButton: "Submit Request",

    // DYNAMIC FORM DETAILS
    formLogoDetails: "Logo Details",
    formBrandCardDetails: "Brand Card Details",
    formPosterDetails: "A3 Poster Details",
    formPosterDetails2: "A4 Poster Details",
    formBannerDetails: "Banner Details",
    formProfileDetails: "Profile Details",
    formFlyerDetails: "Flyer Details",
    formCoverDetails: "Cover Details",
    formUIDetails: "Brand-focused UI layout Details",

    // FORM PLACEHOLDERS
    formLogoPlaceholder1: "Brand Name",
    formLogoPlaceholder2: "Describe the style (e.g., modern, minimalist, retro) and any color preferences?",

    formBrandcardPlaceholder1: "Brand Name",
    formBrandcardPlaceholder2: "Phone Number",
    formBrandcardPlaceholder3: "E-mail",
    formBrandcardPlaceholder4: "Extra Information",
    formBrandCardPlaceholder5: "Describe the style (e.g., modern, minimalist, retro) and any color preferences?",

    formPosterPlaceholder: "What text, dates, and information must be on the poster?",
    FormPosterPlaceholder2: "Describe any style (e.g., modern, minimalist, retro) or any color preferences?",

    formBannerPlaceholder1: "Platform (e.g., YouTube, Twitter, Website)",
    formBannerPlaceholder2: "What text or @usernames should be on the banner?",
    formBannerPlaceholder3: "Describe any style (e.g., modern, minimalist, retro) or any color preferences?",

    formProfilePlaceholder1: "Username or Text for profile pic",
    formProfilePlaceholder2: "Color scheme, style, or any specific ideas?",

    formUIPlaceholder1: "UI Platform (e.g., Twitch, YouTube channel layout, App)",
    formUIPlaceholder2: "Describe the layout requirements, brand feel, and necessary assets (Logo/Profile/UI).",

    formFlyerPlaceholder1: "What text, dates, and information must be on the flyer?",
    formFlyerPlaceholder2: "Color scheme, style, or any specific ideas?",

    formCoverPlaceholder1: "What text, dates, and information must be on the cover?",
    formCoverPlaceholder2: "Color scheme, style, or any specific ideas?",

    // Footer & Errors
    footerCopyright: "Copyright © WHAZORZ 2025-2026",
    firebaseError: "Error: Could not connect to submission service. Check API key.",
    portfolioError: "<p>Error loading portfolio.</p>",
    latestWorkError: "<p>Error loading latest work.</p>",
    formSubmitting: "Submitting...",
    formSuccess: "Success! Once approved by the designer, you will be notified via the email address you provided.",
    formError: "An error occurred. Please try again or contact us directly through contact e-mail whazorz.design@gmail.com",
  },

  lv: {
    // Nav
    navHome: "Sākums",
    navPortfolio: "Portfolio",
    navGFX: "GFX",
    navRequest: "Pakalpojumi",
    // Header
    headerTitle: "/// Whazorz Designs",
    // Home Page
    homeAboutTitle: "Par mani",
    homeAboutText: "Sveiki, es esmu Whazorz — mākslinieks, kuru dziļi iedvesmo radošums visās tā formās. Mans ceļojums sākās 2012. gadā, kad sāku karjeru tehniskajās jomās un pakāpeniski pievērsos grafiskajam dizainam. Gadu gaitā esmu dalījies ar savu radošo procesu un idejām tiešraidēs, aicinot citus kopā ar mani izpētīt digitālās grafikas un dizaina pasauli.",
    homeLatestWorkTitle: "Jaunākie darbi",
    homeViewAll: "Skatīt pilnu portfolio &rarr;",
    homeRequestInfoTitle: "INFORMĀCIJA PAR PASŪTĪJUMU",
    homeTermsTitle: "Galvenie noteikumi",
    homeTermsApproval: "<strong>Apstiprināšana:</strong> Visi pieprasījumi tiek pārskatīti. Projekti sākas tikai pēc dizainera apstiprinājuma.",
    homeTermsTimeframe: "<strong>Izpildes laiks:</strong> Standarta piegāde ir 2-3 darba dienas, bet sarežģītāki projekti var aizņemt vairāk laika.",
    homeTermsRevisions: "<strong>Labojumi:</strong> Iekļautas līdz divām labojumu kārtām. Papildu labojumi var radīt papildu maksu.",
    homeTermsPayment: "<strong>Apmaksa:</strong> Apmaksa tiek veikta *tikai pēc tam*, kad esat apstiprinājis dizainu. Norādītās cenas ir aptuvenas un var mainīties.",
    homeTermsComm: "<strong>Komunikācija:</strong> Visa projekta komunikācija notiks pa e-pastu.",
    homeTermsContact: "Kontakti: whazorz.design@gmail.com",
    priceHeaderProduct: "Pieejamie Produkti",
    priceHeaderRes: "Tehniskā Izšķirtspēja (mm)",
    notpredefined: "Izmērs nav definēts",
    priceLogo: "Logotips Grafiski",
    priceA3: "A3 Posteris Grafiski",
    priceA4: "A4 Poster Grafiski",
    priceCover: "Vāks (Koveris) Grafiski",
    priceFlyer: "Flyer Grafiski",
    priceBrandCard: "Vizītkarte Grafiski",
    priceBanner: "Banneris / Galvene Grafiski",
    priceProfile: "Profil Bilde Grafiski",

    // PRODUCTS (Items)
    prodLogo: "Logo",
    prodA3: "A3 Plakāts",
    prodA4: "A4 Plakāts",
    prodBanner: "Baneris",
    prodCover: "Vāks (Koveris)",
    prodFlyer: "Flajers",
    prodBrandCard: "Vizītkarte",
    prodProfile: "Profila attēls",

    homeDonateTitle: "Atbalsti manu darbu",
    homeDonateText: "“Uzsauc man kafiju ☕🎨”",
    homeDonateButton: "Ziedot ar PayPal",
    // Portfolio Page
    portfolioTitle: "Portfolio",
    filterAll: "Visi",
    filterLogos: "Logo",
    filterPosters: "Plakāti",
    filterFlyer: "Flajeri",
    filterCover: "Vāki",
    filterBrandCard: "Vizītkartes",
    filterBanners: "Baneri",
    filterProfile: "Profila bildes",
    // GFX Page
    gfxTitle: "GFX",
    gfxIntro: "Šeit varat atrast dažādus digitālus, ar rokām veidotus dizaina elementus un resursus, kurus esmu izstrādājis laika gaitā. Tehnisks padoms: izmantojiet 'Screen' sapludināšanas režīmu, lai padarītu fonu caurspīdīgu, tādējādi GFX attēls darbosies korekti.",
    downloadsError: "<p>Kļūda, ielādējot GFX.</p>",
    // GFX Filter Keys
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
    FormalSelectProductAbove: "Izvēlieties produktu augstāk.",
    FormalSmartGuide: "*Gudrais ceļvedis: izmēri ir Platums x Augstums (mm)",
    FormalResolution: "Tehniskā izšķirtspēja:",
    FormalSelectProduct: "Izvēlieties produktu.",
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

    // FORM LABELS
    formEmail: "Jūsu e-pasta adrese",
    formEmailPlaceholder: "jusu.epasts@piemers.com",
    formProduct: "Izvēlieties produkta veidu",
    formBudget: "Tavs Budžets (EUR)",
    formInstructions: "Vispārīgas instrukcijas / Projekta apraksts",
    formInstructionsPlaceholder: "Lūdzu, sniedziet skaidru un detalizētu aprakstu par savām prasībām. Iekļaujiet informāciju, datumus un saites uz jebkādu iedvesmu vai atsaucēm.",
    formAgreeTerms: "Es piekrītu Noteikumiem un Nosacījumiem",
    formAgreeShowcase: "Es piekrītu atļaut WhazorzDesigns demonstrēt gala darbu savā portfolio.",
    formAgreeEmail: "Es piekrītu saņemt turpmākus e-pastus.",
    formSubmitButton: "Iesniegt pieprasījumu",

    // DYNAMIC FORM DETAILS (Synchronized with EN)
    formLogoDetails: "Logo detaļas",
    formBrandCardDetails: "Vizītkartes detaļas",
    formPosterDetails: "A3 Plakāta detaļas",
    formPosterDetails2: "A4 Plakāta detaļas",
    formBannerDetails: "Banera detaļas",
    formProfileDetails: "Profila detaļas",
    formFlyerDetails: "Flajera detaļas",
    formCoverDetails: "Vāka (Cover) detaļas",
    formUIDetails: "Uz zīmolu orientēta UI izkārtojuma detaļas",

    // FORM PLACEHOLDERS
    formLogoPlaceholder1: "Zīmola nosaukums",
    formLogoPlaceholder2: "Aprakstiet stilu (piemēram, moderns, minimālistisks, retro) un krāsu vēlmes.",

    formBrandcardPlaceholder1: "Zīmola nosaukums",
    formBrandcardPlaceholder2: "Tālruņa numurs",
    formBrandcardPlaceholder3: "E-pasta adrese",
    formBrandcardPlaceholder4: "Papildu informācija",
    formBrandCardPlaceholder5: "Aprakstiet stilu (piemēram, moderns, minimālistisks, retro) un krāsu vēlmes.",

    formPosterPlaceholder: "Kāds teksts, datumi un informācija jāiekļauj plakātā?",
    FormPosterPlaceholder2: "Aprakstiet vēlamo stilu (piemēram, modernu, minimālistisku, retro) vai jebkādas krāsu izvēles.",

    formBannerPlaceholder1: "Platforma (piem., YouTube, Twitter, Mājaslapa)",
    formBannerPlaceholder2: "Kāds teksts vai @lietotājvārdi jāiekļauj?",
    formBannerPlaceholder3: "Aprakstiet stilu (piemēram, moderns, minimālistisks, retro) un krāsu vēlmes.",

    formProfilePlaceholder1: "Lietotājvārds vai teksts profila bildei",
    formProfilePlaceholder2: "Krāsu shēma, stils vai citas konkrētas idejas.",

    formUIPlaceholder1: "UI Platforma (piem., Twitch, YouTube kanāla izkārtojums, Lietotne)",
    formUIPlaceholder2: "Aprakstiet izkārtojuma prasības, zīmola sajūtu un nepieciešamos resursus (Logo/Profils/UI).",

    formFlyerPlaceholder1: "Kāds teksts, datumi un informācija jāiekļauj flajerī?",
    formFlyerPlaceholder2: "Krāsu shēma, stils vai konkrētas idejas?",

    formCoverPlaceholder1: "Kāds teksts, datumi vai informācija jāiekļauj uz vāka?",
    formCoverPlaceholder2: "Krāsu shēma, stils vai konkrētas idejas?",

    // Footer & Errors
    footerCopyright: "Autortiesības © WHAZORZ 2025-2026",
    firebaseError: "Kļūda: Nevar izveidot savienojumu ar iesniegšanas pakalpojumu. Pārbaudiet API atslēgu.",
    portfolioError: "<p>Kļūda, ielādējot portfolio.</p>",
    latestWorkError: "<p>Kļūda, ielādējot jaunākos darbus.</p>",
    formSubmitting: "Iesniedz...",
    formSuccess: "Veiksmīgi! Pēc dizainera apstiprināšanas jūs saņemsiet paziņojumu uz norādīto e-pasta adresi.",
    formError: "Radās kļūda. Lūdzu, mēģiniet vēlreiz vai sazinieties ar mums tieši, rakstot uz kontaktpersonas e-pastu: whazorz.design@gmail.com",
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

  // Refresh dynamic form components if they exist
  const gridContainer = document.getElementById("product-selection-grid");
  if (gridContainer && gridContainer.innerHTML !== "") {
    // If request form is initialized, we trigger a re-render of the grid to update product names
    // This requires accessing the setupRequestForm scope or storing a reference.
    // For simplicity in this structure, we rely on page refresh or user re-interaction
    // However, if we want instant update, we can dispatch an event:
    document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
  }
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
  apiKey: "AIzaSyBUzYdeKfD7z31uUMhIKcQsU-ImA8Aopxk",
  authDomain: "whazorz-portfolio.firebaseapp.com",
  projectId: "whazorz-portfolio",
  storageBucket: "whazorz-portfolio.firebasestorage.app",
  messagingSenderId: "23481217882",
  appId: "1:23481217882:web:533d4a7dadd4563426b963",
  measurementId: "G-159920MCTC"
};

// Initialize Firebase and Firestore
try {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  console.log("✅ Firebase initialized successfully");

  // Setup all page functions that need the database
  setupRequestForm(db, translations, () => currentLang);
  loadPortfolio(db, translations, () => currentLang);
  loadLatestWork(db, translations, () => currentLang);
  loadGFX(db, translations, translatePage, () => currentLang);
  setupLightbox();
  setupHomePageLinks();

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

    // Optimize DOM insertion
    const fragment = document.createDocumentFragment();
    gallery.innerHTML = "";
    
    snapshot.forEach(doc => {
      const item = doc.data();
      const galleryItem = createGalleryItem(item, '/images/');
      fragment.appendChild(galleryItem);
    });

    gallery.appendChild(fragment);
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

    const fragment = document.createDocumentFragment();
    gallery.innerHTML = "";

    snapshot.forEach(doc => {
      const item = doc.data();
      const galleryItem = createGalleryItem(item, '/images/');
      fragment.appendChild(galleryItem);
    });
    gallery.appendChild(fragment);
  } catch (e) {
    console.error("Error loading latest work:", e);
    gallery.innerHTML = translations[getCurrentLang()].latestWorkError;
  }
}

// --- 8. Create Gallery Item Helper ---
function createGalleryItem(item, rootPath) {
  const galleryItem = document.createElement("div");
  galleryItem.className = "gallery-item";
  galleryItem.setAttribute("data-type", item.type || "general");

  const img = document.createElement("img");
  img.src = `${rootPath}${item.imageUrl}`;
  img.alt = `${item.type || "Portfolio"} project`;
  img.setAttribute("data-lightbox-src", `${rootPath}${item.imageUrl}`);
  // Add loading lazy for performance
  img.loading = "lazy";

  galleryItem.appendChild(img);
  return galleryItem;
}

// --- 9. Load GFX ---
async function loadGFX(db, translations, translatePage, getCurrentLang) {
  const container = document.getElementById("gfx-container");
  const filterControls = document.getElementById("gfx-filter-controls");

  if (!container || !filterControls) return;

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

  try {
    const snapshot = await db.collection("downloads").orderBy("title").get();

    container.innerHTML = "";
    const lang = getCurrentLang();

    if (snapshot.empty) {
      container.innerHTML = `<p>${translations[lang].gfxIntro}</p>`;
      return;
    }

    const fragment = document.createDocumentFragment();

    snapshot.forEach(doc => {
      const item = doc.data();
      item.id = doc.id;

      const gfxItem = document.createElement("div");
      gfxItem.className = "download-item gfx-item";
      gfxItem.setAttribute("data-type", item.type || "general");

      const imageUrl = `/gfx/${item.imageUrl}`;

      gfxItem.innerHTML = `
            <img src="${imageUrl}" alt="${item.title}" class="download-item-image" data-image-url="${imageUrl}" loading="lazy">
          `;
      fragment.appendChild(gfxItem);
    });

    container.appendChild(fragment);
    setupGfxFilter();

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

// --- 12. Request Form (Updated 2026 - Clickable & Bulk & Fully Translated) ---
function setupRequestForm(db, translations, getCurrentLang) {
  const form = document.getElementById("request-form");
  if (!form) return;

  const gridContainer = document.getElementById("product-selection-grid");
  const dynamicDetailsContainer = document.getElementById("dynamic-details-container");
  const submitBtn = document.getElementById("submit-btn");
  const formStatus = document.getElementById("form-status");
  const resOutput = document.getElementById("res-output");

  let selectedItems = {};
  const MAX_QTY = 7;

  // Use translation keys (prodLogo, prodA3, etc.) instead of hardcoded strings
  const designLibrary = {
    logo: { nameKey: "prodLogo", res: "Vector (.SVG/.PNG)", dimensions: "Size not predefined", customizable: true },
    a3: { nameKey: "prodA3", res: "3508 x 4961 px", dimensions: "297 x 420 mm", customizable: false },
    a4: { nameKey: "prodA4", res: "2480 x 3508 px", dimensions: "210 x 297 mm", customizable: false },
    banner: { nameKey: "prodBanner", res: "2560 x 1440 px", dimensions: "216.75 x 121.92 mm", customizable: true },
    cover: { nameKey: "prodCover", res: "3000 x 3000 px", dimensions: "120 x 120 mm", customizable: true },
    flyer: { nameKey: "prodFlyer", res: "1748 x 2480 px", dimensions: "148 x 210 mm", customizable: true },
    brandcard: { nameKey: "prodBrandCard", res: "1050 x 600 px", dimensions: "85 x 55 mm", customizable: false },
    profile: { nameKey: "prodProfile", res: "800 x 800 px", dimensions: "67.73 x 67.73 mm", customizable: true }
  };

  function renderGrid() {
    if (!gridContainer) return;
    
    // Use Fragment for performance
    const fragment = document.createDocumentFragment();
    gridContainer.innerHTML = "";
    
    const lang = getCurrentLang();
    const t = translations[lang];

    Object.keys(designLibrary).forEach(key => {
      const item = designLibrary[key];
      const count = selectedItems[key] || 0;
      const isSelected = count > 0;
      const localizedName = t[item.nameKey] || item.nameKey;

      const card = document.createElement("div");
      card.className = `product-card ${isSelected ? 'active' : ''}`;

      card.innerHTML = `
        <div class="card-main">
          <strong>${localizedName}</strong>
          <small style="display:block; opacity: 0.8;">${item.dimensions}</small>
        </div>
        
        ${isSelected ? `
          <div class="card-qty">
            <button type="button" class="qty-btn" data-action="minus" data-key="${key}">-</button>
            <span class="qty-val">${count}</span>
            <button type="button" class="qty-btn" data-action="plus" data-key="${key}" ${count >= MAX_QTY ? 'disabled' : ''}>+</button>
          </div>
        ` : `<button type="button" class="add-btn add-space" data-action="add" data-key="${key}">Add</button>`}
      `;
      fragment.appendChild(card);
    });

    gridContainer.appendChild(fragment);
    updateSpecs();
    renderDetailForms();
  }

  // --- Dynamic Detail Form Generation ---
  function renderDetailForms() {
    const lang = getCurrentLang();
    const t = translations[lang];

    const templates = {
      logo: (i) => `
            <label>${t.formLogoDetails} #${i}</label>
            <input type="text" name="logo_brand_name_${i}" placeholder="${t.formLogoPlaceholder1 || 'Brand Name'}">
            <textarea name="logo_style_${i}" placeholder="${t.formLogoPlaceholder2 || 'Describe the style...'}"></textarea>
        `,
      brandcard: (i) => `
            <label>${t.formBrandCardDetails} #${i}</label>
            <input type="text" name="Brand-Card_name_${i}" placeholder="${t.formBrandcardPlaceholder1 || 'Brand Name'}">
            <input type="text" name="Brand-Card_phone_${i}" placeholder="${t.formBrandcardPlaceholder2 || 'Phone'}">
            <input type="text" name="Brand-Card_email_${i}" placeholder="${t.formBrandcardPlaceholder3 || 'Email'}">
            <input type="text" name="Brand-Card_extra_${i}" placeholder="${t.formBrandcardPlaceholder4 || 'Extra'}">
            <textarea name="Brand-Card_style_${i}" placeholder="${t.formBrandCardPlaceholder5 || 'Style...'}"></textarea>
        `,
      a3: (i) => `
             <label>${t.formPosterDetails} (A3) #${i}</label>
             <textarea name="poster_info_a3_${i}" placeholder="${t.formPosterPlaceholder || 'Info...'}"></textarea>
             <textarea name="poster_style_a3_${i}" placeholder="${t.FormPosterPlaceholder2 || 'Style...'}"></textarea>
        `,
      a4: (i) => `
             <label>${t.formPosterDetails2} (A4) #${i}</label>
             <textarea name="poster_info_a4_${i}" placeholder="${t.formPosterPlaceholder || 'Info...'}"></textarea>
             <textarea name="poster_style_a4_${i}" placeholder="${t.FormPosterPlaceholder2 || 'Style...'}"></textarea>
        `,
      banner: (i) => `
            <label>${t.formBannerDetails} #${i}</label>
            <input type="text" name="banner_platform_${i}" placeholder="${t.formBannerPlaceholder1 || 'Platform'}">
            <input type="text" name="banner_text_${i}" placeholder="${t.formBannerPlaceholder2 || 'Text/@Username'}">
            <textarea name="banner_style_${i}" placeholder="${t.formBannerPlaceholder3 || 'Style...'}"></textarea>
        `,
      profile: (i) => `
            <label>${t.formProfileDetails} #${i}</label>
            <input type="text" name="profile_username_${i}" placeholder="${t.formProfilePlaceholder1 || 'Username/Text'}">
            <input type="file" name="file_profile_${i}" accept="image/png, image/jpeg">
        `,
      flyer: (i) => `
            <label>${t.formFlyerDetails} #${i}</label>
            <input type="text" name="Flyer_username_${i}" placeholder="${t.formFlyerPlaceholder1 || 'Info'}">
            <textarea name="Flyer_style_${i}" placeholder="${t.formFlyerPlaceholder2 || 'Style'}"></textarea>
        `,
      cover: (i) => `
             <label>${t.formCoverDetails} #${i}</label>
             <input type="text" name="Cover_username_${i}" placeholder="${t.formCoverPlaceholder1 || 'Info'}">
             <textarea name="Cover_style_${i}" placeholder="${t.formCoverPlaceholder2 || 'Style'}"></textarea>
        `
    };

    Object.keys(selectedItems).forEach(key => {
      const qty = selectedItems[key];
      if (!templates[key]) return;

      for (let i = 1; i <= qty; i++) {
        const blockId = `details-${key}-${i}`;
        if (!document.getElementById(blockId)) {
          const div = document.createElement("div");
          div.className = "form-group conditional-details visible dynamic-detail-block";
          div.id = blockId;
          div.setAttribute('data-product-key', key);
          div.setAttribute('data-index', i);
          div.innerHTML = templates[key](i);
          dynamicDetailsContainer.appendChild(div);
        }
      }
    });

    // Cleanup removed items
    Array.from(dynamicDetailsContainer.children).forEach(block => {
      const key = block.getAttribute('data-product-key');
      const index = parseInt(block.getAttribute('data-index'));
      if (!selectedItems[key] || index > selectedItems[key]) {
        block.remove();
      }
    });
  }

  function updateSpecs() {
    let techSpecs = [];
    const lang = getCurrentLang();
    const t = translations[lang];

    Object.keys(selectedItems).forEach(key => {
      const qty = selectedItems[key];
      const item = designLibrary[key];
      const localizedName = t[item.nameKey] || item.nameKey;

      for (let i = 1; i <= qty; i++) {
        const customTag = item.customizable ? `<span class="badge-custom"></span>` : "";
        techSpecs.push(`
          <div class="spec-line">
              <strong>${localizedName} #${i}</strong><br>
              Resolution: ${item.res} | Size: ${item.dimensions} ${customTag}
          </div>
        `);
      }
    });

    resOutput.innerHTML = techSpecs.length > 0 ? techSpecs.join("") : (t.FormalSelectProductAbove || "Select products above.");
  }

  // Handle language change event for immediate grid update
  document.addEventListener('langChanged', () => {
      renderGrid(); // Re-render grid to update text
  });

  // Event Delegation
  gridContainer.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const action = btn.dataset.action;
    const key = btn.dataset.key;

    if (action === "add" || action === "plus") {
      const currentQty = selectedItems[key] || 0;
      if (currentQty < MAX_QTY) {
        selectedItems[key] = currentQty + 1;
      }
    } else if (action === "minus") {
      selectedItems[key] > 1 ? selectedItems[key]-- : delete selectedItems[key];
    }
    renderGrid();
  });

  // Updated Submit Handler
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const lang = getCurrentLang();

    if (Object.keys(selectedItems).length === 0) {
      alert(translations[lang].FormalSelectProduct || "Please select at least one product.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerText = translations[lang].formSubmitting;
    formStatus.textContent = translations[lang].formSubmitting;
    formStatus.className = "";

    const formData = new FormData(form);
    const baseData = Object.fromEntries(formData.entries());

    const orderSummary = Object.keys(selectedItems).map(key => ({
      productKey: key,
      // Store both keys and resolved names for backend clarity
      name: translations[lang][designLibrary[key].nameKey] || designLibrary[key].nameKey,
      quantity: selectedItems[key],
      specs: designLibrary[key].res
    }));

    const specificDetails = {};
    const detailBlocks = dynamicDetailsContainer.querySelectorAll('.dynamic-detail-block');

    detailBlocks.forEach(block => {
      const key = block.getAttribute('data-product-key');
      const index = block.getAttribute('data-index');
      const uniqueKey = `${key}_${index}`;

      const inputs = block.querySelectorAll("input, textarea");
      const blockData = Array.from(inputs).map(input => {
        if (input.type === 'file') {
          return {
            label: "Attachment",
            value: "",
            isFile: true,
            fileName: input.files[0] ? input.files[0].name : "No file attached"
          };
        } else {
          return {
            label: input.placeholder || input.name,
            value: input.value,
            isFile: false,
            fileName: null
          };
        }
      });

      specificDetails[uniqueKey] = blockData;
    });

    const requestData = {
      email: baseData.email,
      budget: baseData.budget,
      instructions: baseData.instructions,
      orderSummary: orderSummary,
      specificDetails: specificDetails,
      agreements: {
        terms: !!baseData.agreeTerms,
        showcase: !!baseData.agreeShowcase,
        marketing: !!baseData.agreeEmail
      },
      language: lang,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: "pending"
    };

    try {
      await db.collection("requests").add(requestData);

      formStatus.textContent = translations[lang].formSuccess;
      formStatus.className = "success";

      form.reset();
      selectedItems = {};
      dynamicDetailsContainer.innerHTML = "";
      renderGrid();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = translations[lang].formSubmitButton;
        formStatus.textContent = "";
      }, 5000);

    } catch (err) {
      console.error("Submission error:", err);
      formStatus.textContent = translations[lang].formError;
      formStatus.className = "error";
      submitBtn.disabled = false;
      submitBtn.innerText = translations[lang].formSubmitButton;
    }
  });

  renderGrid();
}