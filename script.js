// --- 1. Translation Setup ---
const translations = {
    en: {
        navHome: "Home",
        navPortfolio: "Portfolio",
        navGFX: "GFX",
        navRequest: "Request",
        headerTitle: "/// Whazorz Designs",
        homeAboutTitle: "About",
        homeAboutText: "Hi, I’m Whazorz — an artist deeply inspired by creativity in all its forms. My journey began in 2012, when I started my career in technical fields and gradually moved toward graphic design.",
        homeLatestWorkTitle: "Latest Work",
        homeViewAll: "View Full Portfolio &rarr;",
        homeRequestInfoTitle: "REQUESTING INFO.",
        homeTermsTitle: "Key Terms",
        homeTermsApproval: "<strong>Approval:</strong> All requests are subject to review. Projects begin only after designer approval.",
        homeTermsTimeframe: "<strong>Timeframe:</strong> Standard delivery is 2-3 business days, but complex projects may take longer.",
        homeTermsRevisions: "<strong>Revisions:</strong> Up to two revisions are included.",
        homeTermsPayment: "<strong>Payment:</strong> Payment is processed *after* you approve the design.",
        homeTermsComm: "<strong>Communication:</strong> All project communication will be via email.",
        homeTermsContact: "Contacts: whazorz.design@gmail.com",
        priceLogo: "Logo",
        priceA3: "A3 Poster",
        priceA4: "A4 Poster",
        priceBanner: "Banner",
        priceCover: "Cover",
        priceFlyer: "Flyer",
        priceBrandCard: "Brand Card",
        priceProfile: "Profile Image",
        homeDonateTitle: "Support My Work",
        homeDonateText: "“Buy me a coffee ☕🎨”",
        homeDonateButton: "Donate with PayPal",
        portfolioTitle: "Portfolio",
        filterAll: "All",
        filterLogos: "Logos",
        filterPosters: "A3 Posters",
        filterPosters2: "A4 Posters",
        filterFlyer: "Flyers",
        filterCover: "Covers",
        filterBrandCard: "Brand Cards",
        filterBanners: "Banners",
        filterProfile: "Profile",
        gfxTitle: "GFX",
        gfxIntro: "Here you can find various digital design assets. Tip: use Screen filter to make transparent.",
        downloadsError: "<p>Error loading GFX.</p>",
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
        FormalSelectProductAbove: "Choose Product",
        FormalSmartGuide: "*Smart Guide: Sizes are Width x Height & mm",
        FormalResolution: "Formal Resolution:",
        FormalSelectProduct: "Select a product.",
        requestTitle: "Request a Design",
        requestTermsSummary: "Please read the full Commission Terms & Conditions before proceeding.",
        requestTermsTitle: "Commission Terms & Conditions",
        formEmail: "Your Email Address",
        formEmailPlaceholder: "your.email@example.com",
        formProduct: "Select Product Type",
        formBudget: "Your Budget (EUR)",
        formLogoDetails: "Logo Details",
        formLogoPlaceholder1: "Brand Name",
        formInstructions: "Additional information or General Instructions",
        formInstructionsPlaceholder: "Please provide a clear and detailed brief...",
        formAgreeTerms: "I agree to the Terms and Conditions",
        formAgreeShowcase: "I agree to allow showcase in portfolio.",
        formAgreeEmail: "I agree to receive future emails.",
        formSubmitButton: "Submit Request",
        footerCopyright: "Copyright © WHAZORZ 2025-2026",
        firebaseError: "Error: Could not connect to submission service.",
        portfolioError: "<p>Error loading portfolio.</p>",
        latestWorkError: "<p>Error loading latest work.</p>",
        formSubmitting: "Submitting...",
        formSuccess: "Success! You can send another request in 30 seconds.",
        formError: "An error occurred. Please try again or contact us directly.",
        selectProductError: "Please select at least one product."
    },
    lv: {
        navHome: "Sākums",
        navPortfolio: "Portfolio",
        navGFX: "GFX",
        navRequest: "Pieprasījums",
        headerTitle: "/// Whazorz Designs",
        homeAboutTitle: "Par mani",
        homeAboutText: "Sveiki, es esmu Whazorz — mākslinieks, kuru dziļi iedvesmo radošums visās tā formās.",
        homeLatestWorkTitle: "Jaunākie darbi",
        homeViewAll: "Skatīt pilnu portfolio &rarr;",
        homeRequestInfoTitle: "INFORMĀCIJA PAR PASŪTĪJUMU",
        homeTermsTitle: "Galvenie noteikumi",
        homeTermsApproval: "<strong>Apstiprināšana:</strong> Visi pieprasījumi tiek pārskatīti.",
        homeTermsTimeframe: "<strong>Izpildes laiks:</strong> Standarta piegāde ir 2-3 darba dienas.",
        homeTermsRevisions: "<strong>Labojumi:</strong> Iekļautas līdz divām labojumu kārtām.",
        homeTermsPayment: "<strong>Apmaksa:</strong> Apmaksa tiek veikta *pēc* tam, kad esat apstiprinājis dizainu.",
        homeTermsComm: "<strong>Komunikācija:</strong> Visa komunikācija notiks pa e-pastu.",
        homeTermsContact: "Kontakti: whazorz.design@gmail.com",
        priceLogo: "Logo",
        priceA3: "A3 Posteris",
        priceA4: "A4 Posteris",
        priceBanner: "Banneris",
        priceCover: "Kovers",
        priceFlyer: "Flajers",
        priceBrandCard: "Uzņēmuma Karte",
        priceProfile: "Profil Bilde",
        homeDonateTitle: "Atbalsti manu darbu",
        homeDonateText: "“Uzsauc man kafiju ☕🎨”",
        homeDonateButton: "Ziedot ar PayPal",
        portfolioTitle: "Portfolio",
        filterAll: "Visi",
        filterLogos: "Logo",
        filterPosters: "A3 Posters",
        filterPosters2: "A4 Posters",
        filterFlyer: "Flajeri",
        filterCover: "Kovers",
        filterBrandCard: "Uzņēmuma Kartes",
        filterBanners: "Banneri",
        filterProfile: "Profila Bildes",
        gfxTitle: "GFX",
        gfxIntro: "Šeit varat atrast dažādus digitālus dizaina elementus.",
        downloadsError: "<p>Kļūda, ielādējot GFX.</p>",
        filterEnvironment: "VIDE",
        filterNatural: "DABĪGIE EFEKTI",
        filterParticle: "DAĻIŅU STILI",
        filterTech: "TEHNISKI DIGITĀLIE EFEKTI",
        filterSpace: "KOSMOSA EFEKTI",
        filterAbstract: "TĪRAS ABSTRAKTAS TEKSTŪRAS",
        filterImpact: "TRIECIENA BOJĀJUMU EFEKTI",
        filterEnergy: "ENERĢIJAS EFEKTI",
        filterSmoke: "DŪMU EFEKTI",
        filterFire: "UGUNS EFEKTI",
        FormalSelectProductAbove: "Izvēlaties Produktu Augšup.",
        FormalSmartGuide: "*Gudrais ceļvedis: izmēri ir platums × augstums (mm)",
        requestTitle: "Pieprasīt dizainu",
        FormalResolution: "Formāls lēmums:",
        FormalSelectProduct: "Izvēleties produktu.",
        requestTermsSummary: "Lūdzu, izlasiet visus noteikumus pirms turpināt.",
        requestTermsTitle: "Pasūtījuma noteikumi",
        formEmail: "Jūsu e-pasta adrese",
        formEmailPlaceholder: "jusu.epasts@piemers.com",
        formProduct: "Izvēlieties produkta veidu",
        formBudget: "Tavs Budžets (EUR)",
        formLogoDetails: "Logo detaļas",
        formLogoPlaceholder1: "Zīmola nosaukums",
        formInstructions: "Projekta apraksts",
        formInstructionsPlaceholder: "Lūdzu, sniedziet skaidru aprakstu...",
        formAgreeTerms: "Es piekrītu Noteikumiem",
        formAgreeShowcase: "Es piekrītu demonstrēt darbu portfolio.",
        formAgreeEmail: "Es piekrītu saņemt e-pastus.",
        formSubmitButton: "Iesniegt pieprasījumu",
        footerCopyright: "Autortiesības © WHAZORZ 2025-2026",
        firebaseError: "Kļūda: Nevar izveidot savienojumu.",
        portfolioError: "<p>Kļūda, ielādējot portfolio.</p>",
        latestWorkError: "<p>Kļūda, ielādējot jaunākos darbus.",
        formSubmitting: "Iesniedz...",
        formSuccess: "Veiksmīgi! Jūs varat sūtīt pēc 30 sekundēm.",
        formError: "Radās kļūda. Lūdzu, mēģiniet vēlreiz.",
        selectProductError: "Lūdzu izvēlaties vismaz vienu produktu."
    }
};

let currentLang = localStorage.getItem('lang') || 'en';

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    setupLanguageSwitcher();
    setupNavigation();
});

// --- 2. Improved Translation Logic ---
function translatePage(lang) {
    if (!translations[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('lang', lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        const translation = translations[lang][key];
        if (translation) {
            if (/<[a-z][\s\S]*>/i.test(translation) || translation.includes('→')) {
                el.innerHTML = translation;
            } else {
                el.innerText = translation;
            }
        }
    });

    document.querySelectorAll('[data-key-placeholder]').forEach(el => {
        const key = el.getAttribute('data-key-placeholder');
        if (translations[lang][key]) el.placeholder = translations[lang][key];
    });
}

function setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            translatePage(btn.getAttribute('data-lang'));
        });
    });
    translatePage(currentLang);
}

// --- Navigation ---
function setupNavigation() {
    const navLinks = document.querySelectorAll("nav a");
    const contentSections = document.querySelectorAll(".content");
    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const target = link.getAttribute("data-target");
            navLinks.forEach(l => l.classList.remove("active"));
            contentSections.forEach(s => s.classList.remove("active"));
            link.classList.add("active");
            document.getElementById(target).classList.add("active");
        });
    });
}

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

try {
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    console.log("✅ Firebase initialized successfully");

    setupRequestForm(db, translations, () => currentLang);
    loadPortfolio(db, translations, () => currentLang);
    loadLatestWork(db, translations, () => currentLang);
    loadGFX(db, translations, () => currentLang);
    setupLightbox();
    setupHomePageLinks();
} catch (e) {
    console.error("❌ Firebase Error:", e);
}

// --- Request Form ---
function setupRequestForm(db, translations, getCurrentLang) {
    const form = document.getElementById("request-form");
    if (!form) return;

    const gridContainer = document.getElementById("product-selection-grid");
    const formStatus = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");
    const resOutput = document.getElementById("res-output");

    let selectedItems = {};
    const MAX_QTY = 7;

    const designLibrary = {
        logo: { name: "Logo", res: "Vector (.SVG/.PNG)", dimensions: "Size not predefined" },
        a3: { name: "A3 Poster", res: "3508 x 4961 px", dimensions: "297 x 420 mm" },
        a4: { name: "A4 Poster", res: "2480 x 3508 px", dimensions: "210 x 297 mm" },
        banner: { name: "Banner", res: "2560 x 1440 px", dimensions: "216.75 x 121.92 mm" },
        cover: { name: "Cover", res: "3000 x 3000 px", dimensions: "120 x 120 mm" },
        flyer: { name: "Flyer", res: "1748 x 2480 px", dimensions: "148 x 210 mm" },
        brandcard: { name: "Brand Card", res: "1050 x 600 px", dimensions: "85 x 55 mm" },
        profile: { name: "Profile", res: "800 x 800 px", dimensions: "67.73 x 67.73 mm" }
    };

    function renderGrid() {
        gridContainer.innerHTML = "";
        Object.keys(designLibrary).forEach(key => {
            const item = designLibrary[key];
            const count = selectedItems[key] || 0;
            const isSelected = count > 0;
            const card = document.createElement("div");
            card.className = `product-card ${isSelected ? 'active' : ''}`;
            card.innerHTML = `
                <div class="card-main"><strong>${item.name}</strong><small style="display:block; opacity: 0.8;">${item.dimensions}</small></div>
                ${isSelected ? 
                  `<div class="card-qty">
                    <button type="button" class="qty-btn" data-action="minus" data-key="${key}">-</button>
                    <span class="qty-val">${count}</span>
                    <button type="button" class="qty-btn" data-action="plus" data-key="${key}" ${count >= MAX_QTY ? 'disabled' : ''}>+</button>
                  </div>` : 
                  `<button type="button" class="add-btn" data-action="add" data-key="${key}">Add</button>`}
            `;
            gridContainer.appendChild(card);
        });
        updateSpecs();
    }

    function updateSpecs() {
        let techSpecs = [];
        Object.keys(selectedItems).forEach(key => {
            const item = designLibrary[key];
            for (let i = 1; i <= selectedItems[key]; i++) {
                techSpecs.push(`<div class="spec-line"><strong>${item.name} #${i}</strong>: ${item.res}</div>`);
            }
        });
        resOutput.innerHTML = techSpecs.length > 0 ? techSpecs.join("") : "Select products above.";
    }

    gridContainer.addEventListener("click", e => {
        const btn = e.target.closest("button");
        if (!btn) return;
        const { action, key } = btn.dataset;
        if (action === "add" || action === "plus") selectedItems[key] = Math.min((selectedItems[key] || 0) + 1, MAX_QTY);
        else if (action === "minus") selectedItems[key] > 1 ? selectedItems[key]-- : delete selectedItems[key];
        renderGrid();
    });

    form.addEventListener("submit", async e => {
        e.preventDefault();
        submitBtn.disabled = true;
        formStatus.textContent = translations[getCurrentLang()].formSubmitting;
        const formData = new FormData(form);
        const requestData = Object.fromEntries(formData.entries());
        delete requestData.file;
        requestData.orderSummary = Object.keys(selectedItems).map(key => `${designLibrary[key].name} (Qty: ${selectedItems[key]})`);
        requestData.timestamp = firebase.firestore.FieldValue.serverTimestamp();

        try {
            await db.collection("requests").add(requestData);
            formStatus.textContent = translations[getCurrentLang()].formSuccess;
            form.reset();
            selectedItems = {};
            renderGrid();
        } catch (err) {
            formStatus.textContent = translations[getCurrentLang()].formError;
            submitBtn.disabled = false;
        }
    });

    renderGrid();
}

// --- Portfolio & GFX ---
async function loadPortfolio(db, translations, getCurrentLang) {
    const gallery = document.getElementById("portfolio-gallery");
    if (!gallery) return;
    try {
        const snap = await db.collection("portfolioItems").get();
        gallery.innerHTML = "";
        snap.forEach(doc => gallery.appendChild(createGalleryItem(doc.data(), '/images/')));
        setupPortfolioFilter();
    } catch (e) { gallery.innerHTML = translations[getCurrentLang()].portfolioError; }
}

async function loadLatestWork(db, translations, getCurrentLang) {
    const gallery = document.getElementById("latest-work-gallery");
    if (!gallery) return;
    try {
        const snap = await db.collection("portfolioItems").limit(3).get();
        gallery.innerHTML = "";
        snap.forEach(doc => gallery.appendChild(createGalleryItem(doc.data(), '/images/')));
    } catch (e) { gallery.innerHTML = translations[getCurrentLang()].latestWorkError; }
}

function createGalleryItem(item, rootPath) {
    const div = document.createElement("div");
    div.className = "gallery-item";
    div.setAttribute("data-type", item.type || "general");
    div.innerHTML = `<img src="${rootPath}${item.imageUrl}" alt="project" data-lightbox-src="${rootPath}${item.imageUrl}">`;
    return div;
}

async function loadGFX(db, translations, getCurrentLang) {
    const container = document.getElementById("gfx-container");
    if (!container) return;
    try {
        const snap = await db.collection("downloads").orderBy("title").get();
        container.innerHTML = "";
        snap.forEach(doc => {
            const item = doc.data();
            const div = document.createElement("div");
            div.className = "download-item gfx-item";
            div.setAttribute("data-type", item.type || "general");
            div.innerHTML = `<img src="/gfx/${item.imageUrl}" alt="${item.title}" class="download-item-image">`;
            container.appendChild(div);
        });
        setupGfxFilters(container);
    } catch (e) { container.innerHTML = translations[getCurrentLang()].downloadsError; }
}

function setupGfxFilters(container) {
    document.querySelectorAll("#GFX .filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;
            document.querySelectorAll("#GFX .filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            container.querySelectorAll('.gfx-item').forEach(i => {
                i.style.display = (filter === "all" || i.dataset.type === filter) ? 'flex' : 'none';
            });
        });
    });
}

function setupPortfolioFilter() {
    const btns = document.querySelectorAll("#Portfolio .filter-btn");
    const gallery = document.getElementById("portfolio-gallery");
    btns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener("click", () => {
            const filter = newBtn.dataset.filter;
            document.querySelectorAll("#Portfolio .filter-btn").forEach(b => b.classList.remove("active"));
            newBtn.classList.add("active");
            gallery.querySelectorAll(".gallery-item").forEach(item => {
                item.style.display = (filter === "all" || item.getAttribute("data-type") === filter) ? "block" : "none";
            });
        });
    });
}

function setupLightbox() {
    const overlay = document.getElementById("lightbox-overlay");
    const lightboxImg = document.getElementById("lightbox-image");
    if (!overlay || !lightboxImg) return;
    document.addEventListener("click", e => {
        if (e.target.tagName === "IMG" && e.target.closest("#portfolio-gallery")) {
            lightboxImg.src = e.target.dataset.lightboxSrc;
            overlay.classList.add("visible");
        }
    });
    document.getElementById("lightbox-close")?.addEventListener("click", () => overlay.classList.remove("visible"));
}

function setupHomePageLinks() {
    document.querySelector(".view-all-portfolio")?.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector('nav a[data-target="Portfolio"]')?.click();
    });
}