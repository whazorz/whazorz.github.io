// --- CONFIGURATION ---
const CONFIG = {
  // Replace this with your Discord/Slack webhook URL to receive order notifications!
  WEBHOOK_URL: "YOUR_WEBHOOK_URL_HERE"
};

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
      priceHeaderCost: "Cost",
      notpredefined: "Not Predefined size",
      // UPDATED PRICES/PRODUCTS
      priceBanner: "World of Warcraft Banner",
      priceWallpaper: "World of Warcraft Wallpaper / Character Background",
      homeDonateTitle: "Support My Work",
      homeDonateText: "“Buy me a coffee ☕🎨”",
      homeDonateButton: "Donate with PayPal",
      // Portfolio Page
      portfolioTitle: "Portfolio",
      filterAll: "All",
      filterBanners: "Banners",
      filterWallpapers: "Wallpapers",
      // NEW: GFX Page
      gfxTitle: "GFX",
      gfxIntro: "Here you can find various digital hand wrapped design assets and resources I've created over time. Tech tip: use it as Screen filter to make it transperent as background so the GFX image works indeed.",
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
      FormalSelectProductAbove: "Choose Product Above.",
      FormalSmartGuide: "*Smart Guide: Sizes are Width x Height & mm",
      FormalResolution: "Formal Resolution:",
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
      formFlyerPlaceholder1: "What text, dates, and information must be on the flyer?",
      formFlyerPlaceholder2: "Color scheme, style, or any specific ideas?",
      formCoverPlaceholder1: "What text, dates, and information must be on the cover?",
      formCoverPlaceholder2: "Color scheme, style, or any specific ideas?",
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
      formOptionBanner: "WoW Banner (5.00 Eur, 2x: 7.50 Eur)",
      formOptionWallpaper: "WoW Wallpaper (13.50 Eur)",
      formBudget: "Total Cost (EUR)",
      formLogoDetails: "Logo Details",
      formLogoPlaceholder1: "Brand Name",
      formBrandcardPlaceholder1: "Brand Name",
      formBrandcardPlaceholder2: "Phone Number",
      formBrandcardPlaceholder3: "E-mail",
      formBrandcardPlaceholder4: "Extra Information",
      formBrandCardPlaceholder5: "Describe the style (e.g., modern, minimalist, retro) and any color preferences?",
      formLogoPlaceholder2: "Describe the style (e.g., modern, minimalist, retro) and any color preferences?",
      formPosterDetails: "A3 Poster Details",
      formPosterDetails2: "A4 Poster Details",
      formPosterPlaceholder: "What text, dates, and information must be on the poster?",
      FormPosterPlaceholder2: "Describe any style (e.g., modern, minimalist, retro) or any color preferences?",
      formBannerDetails: "Banner Details",
      formBannerPlaceholder1: "Platform (e.g., YouTube, Twitter, Website)",
      formBannerPlaceholder2: "What text or @usernames should be on the banner?",
      formBannerPlaceholder3: "Describe any style (e.g., modern, minimalist, retro) or any color preferences?",
      formProfileDetails: "Profile Details",
      formProfilePlaceholder1: "Username or Text for profile pic",
      formProfilePlaceholder2: "Color scheme, style, or any specific ideas?",
      // NEW UI FIELDS
      formUIDetails: "Brand-focused UI layout Details",
      formUIPlaceholder1: "UI Platform (e.g., Twitch, YouTube channel layout, App)",
      formUIPlaceholder2: "Describe the layout requirements, brand feel, and necessary assets (Logo/Profile/UI).",
      formInstructions: "Additional information or General Instructions / Project Brief",
      formInstructionsPlaceholder: "Please provide a clear and detailed brief of your requirements. Include information, dates and links to any inspiration or references.",
      formAgreeTerms: "I agree to the Terms and Conditions",
      formAgreeShowcase: "I agree to allow WhazorzDesigns to showcase the final work in their portfolio.",
      formAgreeEmail: "I agree to recieve future emails.",
      formSubmitButton: "Submit Request",
      // Footer
      footerCopyright: "Copyright © WHAZORZ 2025-2026",
      // Dynamic JS Messages
      firebaseError: "Error: Could not connect to submission service. Check API key.",
      portfolioError: "<p>Error loading portfolio.</p>",
      latestWorkError: "<p>Error loading latest work.</p>",
      formSubmitting: "Submitting...",
      formSuccess: "Veiksmīgi! Pēc apstiprināšanas jūs saņemsiet paziņojumu uz norādīto e-pasta adresi.",
      formError: "An error occurred. Please try again or contact us directly through contact e-mail whazorz.design@gmail.com",
      wowCustomizerTitle: "Character Customizer",
      wowChooseClass: "Choose Class",
      wowChooseRace: "Choose Race",
      wowGender: "Character Gender",
      wowGearSet: "PvE Tier / PvP Season Gear",
      wowGearCustomization: "Gear Customization",
      wowAlliance: "Alliance",
      wowHorde: "Horde",
      wowMale: "Male",
      wowFemale: "Female",
      wowFullSet: "Full Matching Set",
      wowCustomGear: "Custom Gear List",
      wowHeadSlot: "Head Slot",
      wowShoulderSlot: "Shoulder Slot",
      wowChestSlot: "Chest Slot",
      wowHandsSlot: "Gloves Slot",
      wowLegsSlot: "Legs Slot",
      wowWaistSlot: "Waist / Belt Slot",
      wowFeetSlot: "Feet / Boots Slot",
      wowCloakSlot: "Cloak / Back Slot",
      wowTabardSlot: "Tabard Slot",
      wowShirtSlot: "Shirt Slot",
      wowWristsSlot: "Wrists / Bracers Slot",
      wowWeaponSlot: "Main Hand Weapon",
      wowOffhandSlot: "Off Hand / Shield",
      wowPvPSeasons: "PvP Arena Seasons",
      wowPvETiers: "PvE Tiers",
      formPayNotice: "Form validated! Please complete the payment using the PayPal buttons below."
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
      homeTermsPayment: "<strong>Apmaksa:</strong> Apmaksa tiek veikta *pēc* tam, kad esat apstiprinājis dizainu. Norādītās cenas ir aptuvenas un var mainīties.",
      homeTermsComm: "<strong>Komunikācija:</strong> Visa projekta komunikācija notiks pa e-pastu.",
      homeTermsContact: "Kontakti: whazorz.design@gmail.com",
      priceHeaderProduct: "Pieejamie produkti",
      priceHeaderRes: "Tehniskās Rezolūcijas (Iekš MM)",
      priceHeaderCost: "Cena",
      notpredefined: "Nav definēts izmērs.",
      // UPDATED PRICES/PRODUCTS
      priceBanner: "World of Warcraft Banneris",
      priceWallpaper: "World of Warcraft Fona Attēls / Varonis",
      homeDonateTitle: "Atbalsti manu darbu",
      homeDonateText: "“Uzsauc man kafiju ☕🎨”",
      homeDonateButton: "Ziedot ar PayPal",
      // Portfolio Page
      portfolioTitle: "Portfolio",
      filterAll: "Visi",
      filterBanners: "Banneri",
      filterWallpapers: "Fona attēli",
      // NEW: GFX Page
      gfxTitle: "GFX",
      gfxIntro: "Šeit varat atrast dažādus digitālus, ar rokām veidotus dizaina elementus un resursus, kurus esmu izstrādājis laika gaitā. Tehnisks padoms: izmantojiet Screen sapludināšanas režīmu, lai padarītu to caurspīdīgu kā fonu, tādējādi GFX attēls darbosies korekti.",
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
      FormalSelectProductAbove: "Izvēlaties Produktu Augšup.",
      FormalSmartGuide: "*Gudrais ceļvedis: izmēri ir platums × augstums (mm)",
      requestTitle: "Pieprasīt dizainu",
      FormalResolution: "Formāls lēmums:",
      FormalSelectProduct: "Izvēleties produktu.",
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
      formEmail: "Jūsu e-pasta adrese",
      formEmailPlaceholder: "jusu.epasts@piemers.com",
      formProduct: "Izvēlieties produkta veidu",
      // UPDATED OPTIONS
      formOptionBanner: "WoW Banneris (5.00 Eur, 2x: 7.50 Eur)",
      formOptionWallpaper: "WoW Fona Attēls (13.50 Eur)",
      formBudget: "Kopējā Cena (EUR)",
      formLogoDetails: "Logo detaļas",
      formLogoPlaceholder1: "Zīmola nosaukums",
      formBrandcardPlaceholder1: "Zīmola nosaukums",
      formBrandcardPlaceholder2: "Telefona Nummurs",
      formBrandcardPlaceholder3: "E-pasta addrese",
      formBrandcardPlaceholder4: "Pielukuma Informācija",
      formBrandCardPlaceholder5: "Aprakstiet stilu (piemēram, moderns, minimālistisks, retro) un krāsu vēlmes.",
      formLogoPlaceholder2: "Aprakstiet stilu (piemēram, moderns, minimālistisks, retro) un krāsu vēlmes.",
      formPosterDetails: "A4 Plakāta / Promo detaļas",
      formPosterPlaceholder: "Kāds teksts, datumi un informācija jāiekļauj plakātā?",
      FormPosterPlaceholder2: "Aprakstiet vēlamo stilu (piemēram, modernu, minimālistisku, retro) vai jebkādas krāsu izvēles.",
      formBannerDetails: "Banera detaļas",
      formBannerPlaceholder1: "Platforma (piem., YouTube, Twitter, Mājaslapa)",
      formBannerPlaceholder2: "Aprakstiet stilu (piemēram, moderns, minimālistisks, retro) un krāsu vēlmes.",
      formProfileDetails: "Profila detaļas",
      formProfilePlaceholder1: "Lietotājvārds vai teksts profila bildei",
      formProfilePlaceholder2: "Krāsu shēma, stils vai citas konkrētas idejas.",
      // NEW UI FIELDS
      formUIDetails: "Uz zīmolu orientēts UI izkārtojums detaļas",
      formUIPlaceholder1: "UI Platforma (piem., Twitch, YouTube kanāla izkārtojums, Lietotne)",
      formUIPlaceholder2: "Aprakstiet izkārtojuma prasības, zīmola sajūtu un nepieciešamos resursus (Logo/Profils/UI).",
      formInstructions: "Vispārīgas instrukcijas / Projekta apraksts",
      formInstructionsPlaceholder: "Lūdzu, sniedziet skaidru un detalizētu aprakstu par savām prasībām. Iekļaujiet informāciju, datumus un saites uz jebkādu iedvesmu vai atsaucēm.",
      formAgreeTerms: "Es piekrītu Noteikumiem un Nosacījumiem",
      formAgreeShowcase: "Es piekrītu atļaut WhazorzDesigns demonstrēt gala darbu savā portfolio.",
      formAgreeEmail: "Es piekrītu saņemt turpmākus e-pastus.",
      formSubmitButton: "Iesniegt pieprasījumu",
      // Footer
      footerCopyright: "Autortiesības © WHAZORZ 2025-2026",
      // Dynamic JS Messages
      firebaseError: "Kļūda: Nevar izveidot savienojumu ar iesniegšanas pakalpojumu. Pārbaudiet API atslēgu.",
      portfolioError: "<p>Kļūda, ielādējot portfolio.</p>",
      latestWorkError: "<p>Kļūda, ielādējot jaunākos darbus.</p>",
      formSubmitting: "Iesniedz...",
      formSuccess: "Veiksmīgi! ",
      formError: "Radās kļūda. Lūdzu, mēģiniet vēlreiz vai sazinieties ar mums tieši, rakstot uz kontaktpersonas e-pastu whazorz.design@gmail.com.",
      wowCustomizerTitle: "Tēla Pielāgotājs",
      wowChooseClass: "Izvēlēties Klasi",
      wowChooseRace: "Izvēlēties Rasi",
      wowGender: "Tēla Dzimums",
      wowGearSet: "PvE Tier / PvP Sezonas Ekipējums",
      wowGearCustomization: "Ekipējuma Pielāgošana",
      wowAlliance: "Alianse",
      wowHorde: "Orda",
      wowMale: "Vīrietis",
      wowFemale: "Sieviete",
      wowFullSet: "Pilns atbilstošs komplekts",
      wowCustomGear: "Pielāgots ekipējuma saraksts",
      wowHeadSlot: "Galvas slots",
      wowShoulderSlot: "Plecu slots",
      wowChestSlot: "Krūšu slots",
      wowHandsSlot: "Cimdu slots",
      wowLegsSlot: "Kāju slots",
      wowWaistSlot: "Jostas slots",
      wowFeetSlot: "Apavu slots",
      wowCloakSlot: "Meteļa / Muguras slots",
      wowTabardSlot: "Tabarda slots",
      wowShirtSlot: "Krekla slots",
      wowWristsSlot: "Aproču slots",
      wowWeaponSlot: "Galvenā ieroča slots",
      wowOffhandSlot: "Otrās rokas / Vairoga slots",
      wowPvPSeasons: "PvP Sezonas",
      wowPvETiers: "PvE Tiers",
      formPayNotice: "Forma apstiprināta! Lūdzu, veiciet maksājumu, izmantojot PayPal pogas zemāk."
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
        if (el.tagName === 'OPTGROUP') {
          el.label = translations[lang][translationKey];
        } else if (translationKey.includes('homeTerms') || translationKey === 'homeViewAll' || translationKey === 'requestFormIntro' || translationKey.includes('priceNote')) {
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
      document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
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
        const galleryItem = createGalleryItem(item, '/images/'); // Pass root folder
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
        const galleryItem = createGalleryItem(item, '/images/'); // Pass root folder
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
    img.src = `${rootPath}${item.imageUrl}`;
    img.alt = `${item.type || "Portfolio"} project`;
    img.setAttribute("data-lightbox-src", `${rootPath}${item.imageUrl}`);

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

            const imageUrl = `/gfx/${item.imageUrl}`; // Path to local folder

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


// --- 12. Request Form (Updated 2026 - Clickable & Bulk with PayPal) ---
function setupRequestForm(db, translations, getCurrentLang) {
  const form = document.getElementById("request-form");
  if (!form) return;

  const gridContainer = document.getElementById("product-selection-grid"); 
  const budgetInput = document.getElementById("budget");
  const formStatus = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");
  const resOutput = document.getElementById("res-output");

  let selectedItems = {}; 
  let isPaymentPending = false;
  let paypalButtonsRendered = false;

  const designLibrary = {
    banner: { name: "WoW Banner", res: "2560 x 1440 px", dimensions: "216.75 x 121.92 mm", customizable: true, maxQty: 2, price: 5.00 },
    wallpaper: { name: "WoW Wallpaper", res: "3840 x 2160 px", dimensions: "Not predefined", customizable: true, maxQty: 1, price: 13.50 }
  };

  function getItemPrice(key, qty) {
    if (!qty) return 0;
    if (key === 'banner') {
      return qty === 2 ? 7.50 : qty * designLibrary['banner'].price;
    }
    return qty * (designLibrary[key] ? designLibrary[key].price : 0);
  }

function renderGrid() {
    gridContainer.innerHTML = "";
    Object.keys(designLibrary).forEach(key => {
      const item = designLibrary[key];
      const count = selectedItems[key] || 0;
      const isSelected = count > 0;

      const lang = getCurrentLang();
      const translationKey = `price${key.charAt(0).toUpperCase() + key.slice(1)}`;
      const displayName = (translations[lang] && translations[lang][translationKey]) || item.name;

      const card = document.createElement("div");
      card.className = `product-card ${isSelected ? 'active' : ''}`;
      
      card.innerHTML = `
        <div class="card-main">
          <strong>${displayName}</strong>
          <small style="display:block; opacity: 0.8;">${item.dimensions}</small>
        </div>
        ${isSelected ? `
          <div class="card-qty">
            <button type="button" class="qty-btn" data-action="minus" data-key="${key}">-</button>
            <span class="qty-val">${count}</span>
            <button type="button" class="qty-btn" data-action="plus" data-key="${key}" ${count >= item.maxQty ? 'disabled' : ''}>+</button>
          </div>
        ` : `<button type="button" class="add-btn add-space" data-action="add" data-key="${key}">Add</button>`}
      `;
      gridContainer.appendChild(card);
    });
    updateSpecs();
    updateBudget();
  }

  function updateSpecs() {
    let techSpecs = [];

    const wowDetailsContainer = document.getElementById("wow-details-container");
    if (wowDetailsContainer) {
      let showWoWDetails = false;
      Object.keys(selectedItems).forEach(key => {
        if (selectedItems[key] > 0 && (key === 'banner' || key === 'wallpaper')) {
          showWoWDetails = true;
        }
      });
      if (showWoWDetails) {
        wowDetailsContainer.classList.add("visible");
      } else {
        wowDetailsContainer.classList.remove("visible");
      }
    }

    Object.keys(selectedItems).forEach(key => {
      const qty = selectedItems[key];
      const item = designLibrary[key];
      
      for (let i = 1; i <= qty; i++) {
        const customTag = item.customizable ? `<span class="badge-custom"></span>` : "";
        techSpecs.push(`
          <div class="spec-line">
              <strong>${item.name} #${i}</strong><br>
              Resolution: ${item.res} | Size: ${item.dimensions} ${customTag}
          </div>
        `);
      }
    });

    resOutput.innerHTML = techSpecs.length > 0 ? techSpecs.join("") : "Select products above.";
  }

  function updateBudget() {
    let total = 0;
    Object.keys(selectedItems).forEach(key => {
      total += getItemPrice(key, selectedItems[key]);
    });
    
    if (budgetInput) {
      budgetInput.value = total > 0 ? total.toFixed(2) : "";
    }
  }

  // Event Delegation
  gridContainer.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const action = btn.dataset.action;
    const key = btn.dataset.key;

    if (action === "add" || action === "plus") {
      const currentQty = selectedItems[key] || 0;
      const maxAllowed = designLibrary[key] ? designLibrary[key].maxQty : 7;
      if (currentQty < maxAllowed) {
        selectedItems[key] = currentQty + 1;
      }
    } else if (action === "minus") {
      selectedItems[key] > 1 ? selectedItems[key]-- : delete selectedItems[key];
    }
    renderGrid();
  });

  // Helper functions to disable/enable inputs
  function disableFormInputs() {
    isPaymentPending = true;
    form.querySelectorAll("input, textarea").forEach(el => {
      if (el.id !== "budget") {
        el.readOnly = true;
      }
    });
    form.classList.add("form-disabled");
  }

  function enableFormInputs() {
    isPaymentPending = false;
    form.querySelectorAll("input, textarea").forEach(el => {
      if (el.id !== "budget") {
        el.readOnly = false;
      }
    });
    form.classList.remove("form-disabled");
  }

  function resetWowSelectionUI() {
    document.querySelectorAll(".wow-class-card").forEach(c => c.classList.remove("active"));
    document.querySelectorAll(".wow-race-card").forEach(r => r.classList.remove("active"));
    document.getElementById("selected-class").value = "";
    document.getElementById("selected-race").value = "";
    
    const genderBtns = document.querySelectorAll(".gender-btn");
    genderBtns.forEach(b => b.classList.remove("active"));
    if (genderBtns[0]) genderBtns[0].classList.add("active");
    document.getElementById("selected-gender").value = "Male";
    
    const gearModeBtns = document.querySelectorAll(".gear-mode-btn");
    gearModeBtns.forEach(b => b.classList.remove("active"));
    if (gearModeBtns[0]) gearModeBtns[0].classList.add("active");
    document.getElementById("selected-gear-mode").value = "full";
    
    const customGearFields = document.getElementById("wow-custom-gear-fields");
    if (customGearFields) customGearFields.style.display = "none";
  }

  // Client-Side Webhook POST Trigger
  async function triggerWebhook(url, requestData) {
    if (!url || url.includes("YOUR_WEBHOOK_URL_HERE") || url.trim() === "") {
      console.warn("Webhook not configured. Skipping webhook trigger.");
      return;
    }
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: `🆕 **Jauns WoW grafikas pieprasījums saņemts! / New WoW Request Received!**`,
          embeds: [{
            title: `Order #${requestData.paymentDetails.orderId}`,
            color: 13016893,
            fields: [
              { name: "Payer Email", value: requestData.email, inline: true },
              { name: "Paid Amount", value: `${requestData.paymentDetails.amount} EUR`, inline: true },
              { name: "Transaction ID", value: requestData.paymentDetails.transactionId, inline: true },
              { name: "Products Ordered", value: requestData.orderSummary.map(item => `${item.name} (${item.quantity}x)`).join(", ") },
              { name: "Character Details", value: requestData.characterDetails ? `Class: ${requestData.characterDetails.class}\nRace: ${requestData.characterDetails.race}\nGender: ${requestData.characterDetails.gender}\nSet: ${requestData.characterDetails.tier_season}` : "N/A" },
              { name: "Instructions", value: requestData.instructions || "None" }
            ],
            timestamp: new Date().toISOString()
          }]
        })
      });
      console.log("Webhook triggered successfully");
    } catch (e) {
      console.error("Failed to trigger webhook:", e);
    }
  }

  // PayPal SDK dynamic loading candidates (covering all visual ambiguities: fIHp/flHp, yl2/yI2/yi2)
  const clientIdsToTry = [
    "Af1bV1-fIHpB70yOyDR_oD59ucbhBIVCzWbVGhAd_s5G9yl2WG5L8rj4Ne4va3xJ7duddaWxEhC--Mlz",
    "Af1bV1-flHpB70yOyDR_oD59ucbhBIVCzWbVGhAd_s5G9yl2WG5L8rj4Ne4va3xJ7duddaWxEhC--Mlz",
    "Af1bV1-fIHpB70yOyDR_oD59ucbhBIVCzWbVGhAd_s5G9yI2WG5L8rj4Ne4va3xJ7duddaWxEhC--Mlz",
    "Af1bV1-flHpB70yOyDR_oD59ucbhBIVCzWbVGhAd_s5G9yI2WG5L8rj4Ne4va3xJ7duddaWxEhC--Mlz",
    "Af1bV1-fIHpB70yOyDR_oD59ucbhBIVCzWbVGhAd_s5G9yi2WG5L8rj4Ne4va3xJ7duddaWxEhC--Mlz",
    "Af1bV1-flHpB70yOyDR_oD59ucbhBIVCzWbVGhAd_s5G9yi2WG5L8rj4Ne4va3xJ7duddaWxEhC--Mlz",
    "sb"
  ];
  let currentClientIdIndex = 0;

  function loadPaypalScript(callback) {
    if (window.paypal) {
      callback();
      return;
    }
    
    if (currentClientIdIndex >= clientIdsToTry.length) {
      const lang = getCurrentLang();
      formStatus.textContent = lang === 'lv' ? "Kļūda: Neizdevās ielādēt PayPal maksājumu sistēmu." : "Error: PayPal SDK failed to load. Please try again later.";
      formStatus.className = "error";
      if (paypalContainer) paypalContainer.style.display = "none";
      submitBtn.style.display = "block";
      submitBtn.disabled = false;
      enableFormInputs();
      return;
    }

    const clientId = clientIdsToTry[currentClientIdIndex];
    console.log(`Loading PayPal SDK with client ID: ${clientId}...`);
    
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR&locale=en_US`;
    
    let timeoutId = setTimeout(() => {
      console.warn(`PayPal SDK load timeout for client ID: ${clientId}`);
      cleanupAndTryNext();
    }, 6000);

    function cleanupAndTryNext() {
      clearTimeout(timeoutId);
      script.onload = null;
      script.onerror = null;
      if (script.parentNode) {
        script.remove();
      }
      currentClientIdIndex++;
      loadPaypalScript(callback);
    }

    script.onload = () => {
      clearTimeout(timeoutId);
      console.log(`PayPal SDK loaded successfully with client ID: ${clientId}`);
      callback();
    };
    
    script.onerror = () => {
      console.warn(`PayPal SDK failed to load with client ID: ${clientId}. Trying next candidate...`);
      cleanupAndTryNext();
    };
    
    document.head.appendChild(script);
  }

  // PayPal Buttons Integration (Render on validation to avoid iframe size issues)
  const paypalContainer = document.getElementById("paypal-button-container");
  function renderPaypalButtons() {
    if (paypalButtonsRendered) return;
    
    loadPaypalScript(() => {
      if (!window.paypal) {
        console.error("PayPal SDK not loaded properly.");
        return;
      }
      
      window.paypal.Buttons({
        createOrder: function(data, actions) {
          let total = 0;
          Object.keys(selectedItems).forEach(key => {
            total += getItemPrice(key, selectedItems[key]);
          });
          
          if (total <= 0) {
            console.error("Order total must be greater than zero.");
            return;
          }

          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: 'EUR',
                value: total.toFixed(2)
              },
              description: 'WDESIGN WoW Graphics Request'
            }]
          });
        },
        onApprove: function(data, actions) {
          return actions.order.capture().then(async function(details) {
            const lang = getCurrentLang();
            formStatus.textContent = translations[lang].formSubmitting;
            formStatus.className = "info";

            const formData = new FormData(form);
            const baseData = Object.fromEntries(formData.entries());

            const orderSummary = Object.keys(selectedItems).map(key => {
              const qty = selectedItems[key];
              const itemTotal = getItemPrice(key, qty);
              return {
                productKey: key,
                name: designLibrary[key].name,
                quantity: qty,
                specs: designLibrary[key].res,
                price: qty > 0 ? Number((itemTotal / qty).toFixed(2)) : designLibrary[key].price
              };
            });

            const hasWowItem = selectedItems['banner'] || selectedItems['wallpaper'];
            const characterDetails = hasWowItem ? {
              class: document.getElementById("selected-class")?.value || "",
              race: document.getElementById("selected-race")?.value || "",
              gender: document.getElementById("selected-gender")?.value || "Male",
              tier_season: document.getElementById("wow-gear-set")?.value || "",
              gear_mode: document.getElementById("selected-gear-mode")?.value || "full",
              gear_head: form.querySelector("[name='gear_head']")?.value || "",
              gear_shoulders: form.querySelector("[name='gear_shoulders']")?.value || "",
              gear_chest: form.querySelector("[name='gear_chest']")?.value || "",
              gear_hands: form.querySelector("[name='gear_hands']")?.value || "",
              gear_legs: form.querySelector("[name='gear_legs']")?.value || "",
              gear_waist: form.querySelector("[name='gear_waist']")?.value || "",
              gear_feet: form.querySelector("[name='gear_feet']")?.value || "",
              gear_cloak: form.querySelector("[name='gear_cloak']")?.value || "",
              gear_tabard: form.querySelector("[name='gear_tabard']")?.value || "",
              gear_shirt: form.querySelector("[name='gear_shirt']")?.value || "",
              gear_wrists: form.querySelector("[name='gear_wrists']")?.value || "",
              gear_weapon: form.querySelector("[name='gear_weapon']")?.value || "",
              gear_offhand: form.querySelector("[name='gear_offhand']")?.value || ""
            } : null;

            const requestData = {
              email: baseData.email,
              budget: Number(budgetInput.value) || 0,
              instructions: baseData.instructions,
              orderSummary: orderSummary,
              characterDetails: characterDetails,
              specificDetails: {},
              agreements: {
                terms: !!baseData.agreeTerms,
                showcase: !!baseData.agreeShowcase,
                marketing: !!baseData.agreeEmail
              },
              paymentDetails: {
                orderId: details.id,
                transactionId: details.purchase_units[0].payments.captures[0].id,
                payerEmail: details.payer.email_address,
                status: details.status,
                amount: details.purchase_units[0].amount.value
              },
              language: lang,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              status: "pending"
            };

            try {
              await db.collection("requests").add(requestData);

              // Webhook Endpoint Configuration from CONFIG
              const webhookUrl = CONFIG.WEBHOOK_URL;
              await triggerWebhook(webhookUrl, requestData);

              formStatus.textContent = translations[lang].formSuccess;
              formStatus.className = "success";

              // Smooth scroll to success message
              formStatus.scrollIntoView({ behavior: "smooth", block: "center" });

              form.reset();
              enableFormInputs();
              resetWowSelectionUI();
              
              selectedItems = {};
              renderGrid();
              
              if (paypalContainer) paypalContainer.style.display = "none";
              submitBtn.style.display = "block";
              submitBtn.disabled = false;

            } catch (err) {
              console.error("Submission error:", err);
              formStatus.textContent = translations[lang].formError;
              formStatus.className = "error";
              enableFormInputs();
            }
          });
        },
        onCancel: function(data) {
          console.log("PayPal payment cancelled by user.");
          const lang = getCurrentLang();
          formStatus.textContent = lang === 'lv' ? "Maksājums atcelts. Varat veikt izmaiņas un mēģināt vēlreiz." : "Payment cancelled. You can modify your request and try again.";
          formStatus.className = "info";
          
          if (paypalContainer) paypalContainer.style.display = "none";
          submitBtn.style.display = "block";
          submitBtn.disabled = false;
          enableFormInputs();
        },
        onError: function(err) {
          console.error("PayPal Error:", err);
          const lang = getCurrentLang();
          formStatus.textContent = lang === 'lv' ? "Maksājums neizdevās. Lūdzu, mēģiniet vēlreiz." : "Payment failed. Please try again.";
          formStatus.className = "error";
          
          if (paypalContainer) paypalContainer.style.display = "none";
          submitBtn.style.display = "block";
          submitBtn.disabled = false;
          enableFormInputs();
        }
      }).render("#paypal-button-container");

      paypalButtonsRendered = true;
    });
  }

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const lang = getCurrentLang();
    
    if (Object.keys(selectedItems).length === 0) {
      alert(translations[lang].FormalSelectProduct || "Please select at least one product.");
      return;
    }

    const hasWowItem = selectedItems['banner'] || selectedItems['wallpaper'];
    if (hasWowItem) {
      const selectedClass = document.getElementById("selected-class")?.value;
      const selectedRace = document.getElementById("selected-race")?.value;
      if (!selectedClass) {
        alert(lang === 'lv' ? "Lūdzu, izvēlieties klasi!" : "Please choose a class!");
        return;
      }
      if (!selectedRace) {
        alert(lang === 'lv' ? "Lūdzu, izvēlieties rasi!" : "Please choose a race!");
        return;
      }
    }

    const termsAgree = document.getElementById("terms-agree");
    if (termsAgree && !termsAgree.checked) {
      alert(lang === 'lv' ? "Lūdzu, piekrītiet noteikumiem un nosacījumiem!" : "Please agree to the Terms and Conditions!");
      return;
    }

    disableFormInputs();
    submitBtn.style.display = "none";
    if (paypalContainer) paypalContainer.style.display = "block";

    formStatus.textContent = translations[lang].formPayNotice;
    formStatus.className = "info";

    renderPaypalButtons();
  });

  // --- WoW Selection Click Handlers Binding ---
  const classCards = document.querySelectorAll(".wow-class-card");
  const classInput = document.getElementById("selected-class");
  classCards.forEach(card => {
    card.addEventListener("click", () => {
      if (isPaymentPending) return;
      classCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const selectedClass = card.getAttribute("data-class");
      if (classInput) classInput.value = selectedClass;
    });
  });

  const raceCards = document.querySelectorAll(".wow-race-card");
  const raceInput = document.getElementById("selected-race");
  raceCards.forEach(card => {
    card.addEventListener("click", () => {
      if (isPaymentPending) return;
      raceCards.forEach(r => r.classList.remove("active"));
      card.classList.add("active");
      const selectedRace = card.getAttribute("data-race");
      if (raceInput) raceInput.value = selectedRace;
    });
  });

  const genderBtns = document.querySelectorAll(".gender-btn");
  const genderInput = document.getElementById("selected-gender");
  genderBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (isPaymentPending) return;
      genderBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const selectedGender = btn.getAttribute("data-gender");
      if (genderInput) genderInput.value = selectedGender;
    });
  });

  const gearModeBtns = document.querySelectorAll(".gear-mode-btn");
  const gearModeInput = document.getElementById("selected-gear-mode");
  const customGearFields = document.getElementById("wow-custom-gear-fields");
  gearModeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (isPaymentPending) return;
      gearModeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.getAttribute("data-mode");
      if (gearModeInput) gearModeInput.value = mode;
      
      if (customGearFields) {
        if (mode === "custom") {
          customGearFields.style.display = "block";
        } else {
          customGearFields.style.display = "none";
        }
      }
    });
  });

  document.addEventListener('langChanged', () => {
    renderGrid();
  });

  renderGrid();
}