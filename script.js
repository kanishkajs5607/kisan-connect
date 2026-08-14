let map;
let radiusCircle;
let allMarkers = [];
let userMarker = null;
let currentLang = 'en';

// Default starting center (Updates automatically when user searches or uses GPS)
let activeLocation = [19.8917, 74.4796]; 

// Multilingual Dictionary
const translations = {
    en: {
        dash: "AI Dashboard", fleet: "IoT Fleet & Maps", collab: "Collaboration Pool", escrow: "Escrow Vault",
        weatherBadge: "⚡ IMD LIVE FEED", humidity: "Humidity: 45%", weatherAlert: "⚠️ Heavy harvest weather window in 4 days. AI recommends pre-booking.",
        tickerTitle: "Live Network Stats:", tickerBody: "14 Tractors Active | ₹1,20,000 Escrow Protected",
        bannerTitle: "🤖 AI Shortage Predictor Engine Active", bannerDesc: "Continuously processing farmer-entered crop stages & IMD weather forecast data.",
        stat1Title: "ACTIVE TRACTORS NEAR YOU", stat1Unit: "Units", stat1Sub: "8 available right now",
        stat2Title: "LABOUR SHORTAGE RISK", stat2Val: "Moderate", stat2Sub: "Surge expected in Day 5",
        stat3Title: "ESCROW VAULT BALANCE", stat3Sub: "100% Secured",
        recTitle: "🌱 Current Crop Stage & Recommendations", cropStage: "SUGARCANE - HARVEST STAGE", cropReq: "Harvester & 4 Labours Required",
        cropWindow: "Estimated window: July 28 - July 30 based on local forecast data.", btnBook: "Book Equipment Now",
        fleetTitle: "IoT Machine Fleet & GPS Tracking", fleetDesc: "Real-time coordinates powered by ESP32 + GPS trackers installed on machinery.",
        filterAll: "All Pins", filterOwners: "🚜 Machine Owners", filterDemands: "🔴 Farmer Demands", filterLabours: "👷 Labour Groups",
        radiusTag: "Search Radius: ", legGreenTxt: "Machine Owners", legRedTxt: "Farmers Needing Machines", legOrangeTxt: "Labours Ready for Hire",
        card1Status: "🟢 Available Now • Aadhaar Verified", card1Owner: "Owner", card1Trust: "Trust Score", card1Btn: "Book with Escrow Protection",
        card2Status: "🟡 Busy (Free in 2 hours)", card2Owner: "Owner", card2Trust: "Trust Score", card2Btn: "Pre-book Slot", hour: "Hour",
        collabTitle: "Farmer Collaboration & Cost Splitting", collabDesc: "Neighbouring farms pool together to book heavy machinery and split transport costs.",
        poolHead: "Active Pooling Requests near Kopargaon", poolItemTitle: "Combined Sugarcane Harvester Pool", poolItemDesc: "Participants: Ramesh Patil + 2 nearby farms", poolBadge: "💰 Cost Reduction: Save ~35% on deployment",
        escrowTitle: "Escrow Secured Payments Vault", escrowDesc: "Funds remain locked safely until agricultural work is verified complete.",
        escrowItemTitle: "Booking #KC-8921 (Mahindra Tractor)", escrowItemDesc: "Secured Amount: ₹1,400", escrowBadge: "🔒 Locked in Vault"
    },
    hi: {
        dash: "एआई डैशबोर्ड", fleet: "आईओटी बेड़ा और मानचित्र", collab: "सहयोग पूल", escrow: "एस्क्रो वॉल्ट",
        weatherBadge: "⚡ आईएमडी लाइव फीड", humidity: "आर्द्रता: 45%", weatherAlert: "⚠️ 4 दिनों में भारी फसल कटाई का मौसम। एआई पूर्व-बुकिंग की सिफारिश करता है।",
        tickerTitle: "लाइव नेटवर्क आंकड़े:", tickerBody: "14 ट्रैक्टर सक्रिय | ₹1,20,000 एस्क्रो सुरक्षित",
        bannerTitle: "🤖 एआई कमी भविष्यवाणी इंजन सक्रिय", bannerDesc: "किसान द्वारा दर्ज फसल चरणों और मौसम पूर्वानुमान डेटा का लगातार विश्लेषण।",
        stat1Title: "आपके पास सक्रिय ट्रैक्टर", stat1Unit: "इकाइयां", stat1Sub: "8 अभी उपलब्ध हैं",
        stat2Title: "श्रमिकों की कमी का जोखिम", stat2Val: "मध्यम", stat2Sub: "दिन 5 में मांग बढ़ने की संभावना",
        stat3Title: "एस्क्रो वॉल्ट बैलेंस", stat3Sub: "100% सुरक्षित",
        recTitle: "🌱 वर्तमान फसल चरण और सिफारिशें", cropStage: "गन्ना - कटाई का चरण", cropReq: "हार्वेस्टर और 4 मजदूरों की आवश्यकता",
        cropWindow: "अनुमानित समय: स्थानीय पूर्वानुमान के अनुसार 28 जुलाई - 30 जुलाई।", btnBook: "अभी उपकरण बुक करें",
        fleetTitle: "आईओटी मशीन बेड़ा और जीपीएस ट्रैकिंग", fleetDesc: "मशीनों पर स्थापित ईएसपी32 + जीपीएस ट्रैकर्स द्वारा लाइव स्थान।",
        filterAll: "सभी पिन", filterOwners: "🚜 मशीन मालिक", filterDemands: "🔴 किसान की मांग", filterLabours: "👷 मजदूर समूह",
        radiusTag: "खोज त्रिज्या: ", legGreenTxt: "मशीन मालिक", legRedTxt: "मशीन की जरूरत वाले किसान", legOrangeTxt: "किराए के लिए उपलब्ध मजदूर",
        card1Status: "🟢 अभी उपलब्ध • आधार सत्यापित", card1Owner: "मालिक", card1Trust: "विश्वास स्कोर", card1Btn: "एस्क्रो सुरक्षा के साथ बुक करें",
        card2Status: "🟡 व्यस्त (2 घंटे में उपलब्ध)", card2Owner: "मालिक", card2Trust: "विश्वास स्कोर", card2Btn: "स्लॉट प्री-बुक करें", hour: "घंटा",
        collabTitle: "किसान सहयोग और लागत बंटवारा", collabDesc: "पड़ोसी खेत भारी मशीनरी बुक करने और परिवहन लागत बांटने के लिए एक साथ आते हैं।",
        poolHead: "कोपरगांव के पास सक्रिय पूलिंग अनुरोध", poolItemTitle: "संयुक्त गन्ना हार्वेस्टर पूल", poolItemDesc: "प्रतिभागी: रमेश पाटिल + 2 नजदीकी खेत", poolBadge: "💰 लागत में कमी: तैनाती पर ~35% बचाएं",
        escrowTitle: "एस्क्रो सुरक्षित भुगतान वॉल्ट", escrowDesc: "कृषि कार्य पूरा होने तक धनराशि सुरक्षित रूप से लॉक रहती है।",
        escrowItemTitle: "बुकिंग #KC-8921 (महिंद्रा ट्रैक्टर)", escrowItemDesc: "सुरक्षित राशि: ₹1,400", escrowBadge: "🔒 वॉल्ट में बंद"
    },
    mr: {
        dash: "AI डॅशबोर्ड", fleet: "IoT ताफा आणि नकाशे", collab: "सहकार्य पूल", escrow: "एस्क्रो व्हॉल्ट",
        weatherBadge: "⚡ IMD लाइव्ह फीड", humidity: "आर्द्रता: 45%", weatherAlert: "⚠️ 4 दिवसांत मुसळधार कापणीचे हवामान. AI पूर्व-बुकिंगची शिफारस करते.",
        tickerTitle: "लाइव्ह नेटवर्क आकडेवारी:", tickerBody: "14 ट्रॅक्टर सक्रिय | ₹1,20,000 एस्क्रो सुरक्षित",
        bannerTitle: "🤖 AI टंचाई अंदाज इंजिन सक्रिय", bannerDesc: "शेतकऱ्यांनी नोंदवलेल्या पिकांच्या टप्प्यांचा आणि IMD हवामान अंदाजांचा सतत अभ्यास.",
        stat1Title: "तुमच्या जवळ सक्रिय ट्रॅक्टर", stat1Unit: "युनिट्स", stat1Sub: "8 आत्ताच उपलब्ध आहेत",
        stat2Title: "मजुरांच्या टंचाईचा धोका", stat2Val: "मध्यम", stat2Sub: "दिवस 5 मध्ये मागणी वाढण्याची शक्यता",
        stat3Title: "एस्क्रो व्हॉल्ट शिल्लक", stat3Sub: "100% सुरक्षित",
        recTitle: "🌱 सध्याचा पिकाचा टप्पा आणि शिफारसी", cropStage: "ऊस - कापणीचा टप्पा", cropReq: "हार्वेस्टर आणि 4 मजुरांची गरज",
        cropWindow: "अंदाजे वेळ: स्थानिक अंदाजानुसार 28 जुलै - 30 जुलै.", btnBook: "आत्ताच उपकरणे बुक करा",
        fleetTitle: "IoT मशिन ताफा आणि GPS ट्रॅकिंग", fleetDesc: "मशीनरीवर बसवलेल्या ESP32 + GPS ट्रॅकर्सद्वारे रिअल-टाईम स्थान.",
        filterAll: "सर्व पिन", filterOwners: "🚜 मशीन मालक", filterDemands: "🔴 शेतकऱ्यांची मागणी", filterLabours: "👷 मजूर गट",
        radiusTag: "शोध त्रिज्या: ", legGreenTxt: "मशीन मालक", legRedTxt: "मशीनची गरज असलेले शेतकरी", legOrangeTxt: "कामासाठी उपलब्ध मजूर",
        card1Status: "🟢 आत्ता उपलब्ध • आधार सत्यापित", card1Owner: "मालक", card1Trust: "विश्वास गुण", card1Btn: "एस्क्रो संरक्षणासह बुक करा",
        card2Status: "🟡 व्यस्त (2 तासांत मोकळे)", card2Owner: "मालक", card2Trust: "विश्वास गुण", card2Btn: "स्लॉट प्री-बुक करा", hour: "तास",
        collabTitle: "शेतकरी सहकार्य आणि खर्च विभागणी", collabDesc: "शेजारील शेतकरी अवडंबरी यंत्रसामग्री बुक करण्यासाठी आणि वाहतूक खर्च वाटून घेण्यासाठी एकत्र येतात.",
        poolHead: "कोपरगावजवळ सक्रिय पुलिंग विनंत्या", poolItemTitle: "संयुक्त ऊस हार्वेस्टर पूल", poolItemDesc: "सहभागी: रमेश पाटील + 2 जवळील शेतकरी", poolBadge: "💰 खर्च कमी: तैनातीवर ~35% वाचवा",
        escrowTitle: "एस्क्रो सुरक्षित पेमेंट व्हॉल्ट", escrowDesc: "शेतातील काम पूर्ण झाल्याची खात्री होईपर्यंत निधी सुरक्षितपणे लॉक राहतो.",
        escrowItemTitle: "बुकिंग #KC-8921 (महिंद्रा ट्रॅक्टर)", escrowItemDesc: "सुरक्षित रक्कम: ₹1,400", escrowBadge: "🔒 व्हॉल्टमध्ये लॉक"
    },
    ta: {
        dash: "AI டேஷ்போர்டு", fleet: "IoT வாகனங்கள் & வரைபடம்", collab: "கூட்டு சேவை", escrow: "பாதுகாப்பான நிதி சுவிட்ச்",
        weatherBadge: "⚡ IMD நேரலை தகவல்", humidity: "ஈரப்பதம்: 45%", weatherAlert: "⚠️ 4 நாட்களில் அறுவடை வானிலை. AI முன்-பதிவு செய்ய பரிந்துரைக்கிறது.",
        tickerTitle: "நேரலை புள்ளிவிவரங்கள்:", tickerBody: "14 டிராக்டர்கள் செயலில் | ₹1,20,000 பாதுகாப்பான நிதியில்",
        bannerTitle: "🤖 AI பற்றாக்குறை கணிப்பு இயங்கி கொண்டிருக்கிறது", bannerDesc: "விவசாயிகள் உள்ளீடு செய்த பயிர் நிலைகள் மற்றும் வானிலை தரவை தொடர்ந்து பகுப்பாய்வு செய்கிறது.",
        stat1Title: "உங்கள் அருகில் உள்ள டிராக்டர்கள்", stat1Unit: "அலகுகள்", stat1Sub: "8 இப்போது கிடைக்கின்றன",
        stat2Title: "தொழிலாளர் பற்றாக்குறை ஆபத்து", stat2Val: "மிதமான", stat2Sub: "5 ஆம் நாளில் தேவை அதிகரிக்க வாய்ப்பு",
        stat3Title: "பாதுகாப்பான நிதி இருப்பு", stat3Sub: "100% பாதுகாப்பானது",
        recTitle: "🌱 தற்போதைய பயிர் நிலை & பரிந்துரைகள்", cropStage: "கரும்பு - அறுவடை நிலை", cropReq: "அறுவடை இயந்திரம் & 4 தொழிலாளர்கள் தேவை",
        cropWindow: "மதிப்பிடப்பட்ட காலம்: உள்ளூர் கணிப்பின்படி ஜூலை 28 - ஜூலை 30.", btnBook: "இயந்திரத்தை இப்போது முன்பதிவு செய்க",
        fleetTitle: "IoT இயந்திரங்கள் & GPS கண்காணிப்பு", fleetDesc: "இயந்திரங்களில் நிறுவப்பட்ட ESP32 + GPS மூலம் நேரலை இருப்பிடம்.",
        filterAll: "அனைத்தும்", filterOwners: "🚜 இயந்திர உரிமையாளர்கள்", filterDemands: "🔴 விவசாய தேவைகள்", filterLabours: "👷 தொழிலாளர் குழுக்கள்",
        radiusTag: "தேடல் ஆரம்: ", legGreenTxt: "இயந்திர உரிமையாளர்கள்", legRedTxt: "இயந்திரம் தேவைப்படும் விவசாயிகள்", legOrangeTxt: "வேலைக்கு தயாராக உள்ள தொழிலாளர்கள்",
        card1Status: "🟢 இப்போது கிடைக்கிறது • ஆதார் சரிபார்க்கப்பட்டது", card1Owner: "உரிமையாளர்", card1Trust: "நம்பகத்தன்மை புள்ளி", card1Btn: "பாதுகாப்பாக முன்பதிவு செய்க",
        card2Status: "🟡 பிஸியாக உள்ளது (2 மணி நேரத்தில் கிடைக்கும்)", card2Owner: "உரிமையாளர்", card2Trust: "நம்பகத்தன்மை புள்ளி", card2Btn: "முன்பதிவு ஸ்லாட்", hour: "மணிநேரம்",
        collabTitle: "விவசாயிகள் கூட்டு & செலவு பகிர்வு", collabDesc: "அருகிலுள்ள விவசாயிகள் ஒன்று சேர்ந்து கனரக இயந்திரங்களை வாடகைக்கு எடுத்து செலவைப் பகிர்ந்து கொள்கிறார்கள்.",
        poolHead: "செயலில் உள்ள பகிர்வு கோரிக்கைகள்", poolItemTitle: "கூட்டு கரும்பு அறுவடை குழு", poolItemDesc: "பங்கேற்பாளர்கள்: ரமேஷ் பாட்டீல் + 2 அருகிலுள்ள பண்ணைகள்", poolBadge: "💰 செலவு குறைப்பு: ~35% சேமிக்கவும்",
        escrowTitle: "பாதுகாப்பான கட்டண பெட்டகம்", escrowDesc: "விவசாய வேலைகள் முடிவடையும் வரை பணம் பாதுகாப்பாக இருக்கும்.",
        escrowItemTitle: "முன்பதிவு #KC-8921 (மகிந்திரா டிராக்டர்)", escrowItemDesc: "பாதுகாக்கப்பட்ட தொகை: ₹1,400", escrowBadge: "🔒 பெட்டகத்தில் பூட்டப்பட்டுள்ளது"
    }
};

// SVG Drop Pin Generator
function createCustomPin(color) {
    return L.divIcon({
        className: 'custom-pro-pin',
        html: `
            <div style="position: relative; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="${color}" style="filter: drop-shadow(0px 3px 5px rgba(0,0,0,0.3));">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
            </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
    });
}

function selectLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];

    document.getElementById('lbl-dash').innerText = t.dash;
    document.getElementById('lbl-fleet').innerText = t.fleet;
    document.getElementById('lbl-collab').innerText = t.collab;
    document.getElementById('lbl-escrow').innerText = t.escrow;

    document.getElementById('lbl-weather-badge').innerText = t.weatherBadge;
    document.getElementById('lbl-humidity').innerText = t.humidity;
    document.getElementById('lbl-weather-alert').innerText = t.weatherAlert;

    document.getElementById('lbl-ticker-title').innerText = t.tickerTitle;
    document.getElementById('lbl-ticker-body').innerText = t.tickerBody;

    document.getElementById('lbl-banner-title').innerText = t.bannerTitle;
    document.getElementById('lbl-banner-desc').innerText = t.bannerDesc;
    document.getElementById('lbl-stat1-title').innerText = t.stat1Title;
    document.getElementById('lbl-stat1-unit').innerText = t.stat1Unit;
    document.getElementById('lbl-stat1-sub').innerText = t.stat1Sub;
    document.getElementById('lbl-stat2-title').innerText = t.stat2Title;
    document.getElementById('lbl-stat2-val').innerText = t.stat2Val;
    document.getElementById('lbl-stat2-sub').innerText = t.stat2Sub;
    document.getElementById('lbl-stat3-title').innerText = t.stat3Title;
    document.getElementById('lbl-stat3-sub').innerText = t.stat3Sub;
    document.getElementById('lbl-rec-title').innerText = t.recTitle;
    document.getElementById('lbl-crop-stage').innerText = t.cropStage;
    document.getElementById('lbl-crop-req').innerText = t.cropReq;
    document.getElementById('lbl-crop-window').innerText = t.cropWindow;
    document.getElementById('lbl-btn-book').innerText = t.btnBook;

    document.getElementById('lbl-fleet-title').innerText = t.fleetTitle;
    document.getElementById('lbl-fleet-desc').innerText = t.fleetDesc;
    document.getElementById('lbl-filter-all').innerText = t.filterAll;
    document.getElementById('lbl-filter-owners').innerText = t.filterOwners;
    document.getElementById('lbl-filter-demands').innerText = t.filterDemands;
    document.getElementById('lbl-filter-labours').innerText = t.filterLabours;
    document.getElementById('lbl-radius-tag').innerText = t.radiusTag;
    document.getElementById('lbl-leg-green-txt').innerText = t.legGreenTxt;
    document.getElementById('lbl-leg-red-txt').innerText = t.legRedTxt;
    document.getElementById('lbl-leg-orange-txt').innerText = t.legOrangeTxt;

    document.getElementById('lbl-card1-status').innerText = t.card1Status;
    document.getElementById('lbl-card1-owner').innerText = t.card1Owner;
    document.getElementById('lbl-card1-trust').innerText = t.card1Trust;
    document.getElementById('lbl-card1-btn').innerText = t.card1Btn;

    document.getElementById('lbl-card2-status').innerText = t.card2Status;
    document.getElementById('lbl-card2-owner').innerText = t.card2Owner;
    document.getElementById('lbl-card2-trust').innerText = t.card2Trust;
    document.getElementById('lbl-card2-btn').innerText = t.card2Btn;

    document.querySelectorAll('.lbl-hour').forEach(el => el.innerText = t.hour);

    document.getElementById('lbl-collab-title').innerText = t.collabTitle;
    document.getElementById('lbl-collab-desc').innerText = t.collabDesc;
    document.getElementById('lbl-pool-head').innerText = t.poolHead;
    document.getElementById('lbl-pool-item-title').innerText = t.poolItemTitle;
    document.getElementById('lbl-pool-item-desc').innerText = t.poolItemDesc;
    document.getElementById('lbl-pool-badge').innerText = t.poolBadge;

    document.getElementById('lbl-escrow-title').innerText = t.escrowTitle;
    document.getElementById('lbl-escrow-desc').innerText = t.escrowDesc;
    document.getElementById('lbl-escrow-item-title').innerText = t.escrowItemTitle;
    document.getElementById('lbl-escrow-item-desc').innerText = t.escrowItemDesc;
    document.getElementById('lbl-escrow-badge').innerText = t.escrowBadge;

    if (map) {
        updateLocationAndMarkers();
    }

    const names = { en: "English", hi: "हिंदी", mr: "मराठी", ta: "தமிழ்" };
    document.getElementById('current-lang-text').innerText = names[lang];
    document.getElementById('language-modal').style.display = 'none';
}

function openLangModal() {
    document.getElementById('language-modal').style.display = 'flex';
}

function switchTab(tabName) {
    document.querySelectorAll('.content-tab').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

    document.getElementById(`view-${tabName}`).classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');

    if (tabName === 'fleet') {
        if (!map) {
            setTimeout(initMap, 200);
        } else {
            setTimeout(() => { map.invalidateSize(); }, 200);
        }
    }
}

function initMap() {
    map = L.map('map', { zoomControl: false }).setView(activeLocation, 12);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    useCurrentLocation();
}

function useCurrentLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                activeLocation = [position.coords.latitude, position.coords.longitude];
                map.setView(activeLocation, 12);
                updateLocationAndMarkers();
            },
            () => {
                updateLocationAndMarkers();
            }
        );
    } else {
        updateLocationAndMarkers();
    }
}

function searchLocation() {
    const query = document.getElementById('mapSearchInput').value.trim();
    if (!query) return;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
            if (data && data.length > 0) {
                activeLocation = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                map.setView(activeLocation, 12);
                updateLocationAndMarkers();
            } else {
                alert("Location not found. Please try entering a different place name.");
            }
        })
        .catch(() => alert("Error looking up location."));
}

function handleSearchKey(e) {
    if (e.key === 'Enter') searchLocation();
}

function updateLocationAndMarkers() {
    if (userMarker) map.removeLayer(userMarker);

    const homeText = {
        en: "<b>🏡 Selected Location</b>",
        hi: "<b>🏡 चयनित स्थान</b>",
        mr: "<b>🏡 निवडलेले स्थान</b>",
        ta: "<b>🏡 தேர்ந்தெடுக்கப்பட்ட இடம்</b>"
    };

    userMarker = L.marker(activeLocation, { icon: createCustomPin('#0f172a') })
        .addTo(map)
        .bindPopup(homeText[currentLang] || homeText['en'])
        .openPopup();

    refreshMapMarkers();
    drawRadius(parseInt(document.getElementById("radiusSelect").value || 10));
}

function refreshMapMarkers() {
    allMarkers.forEach(m => map.removeLayer(m));
    allMarkers = [];

    const t = translations[currentLang];
    const [lat, lng] = activeLocation;

    // Fetch live weather for current area
    fetchLocalWeather(lat, lng);

    // Machine Owners
    const owners = [
        { name: "🚜 Mahindra 575 DI Tractor", owner: "Suresh Deshmukh", phone: "919876543210", rate: "₹700/hr", lat: lat + 0.015, lng: lng + 0.01 },
        { name: "⚙️ Rotavator 6-Feet Heavy", owner: "Anil Kale", phone: "919876543211", rate: "₹450/hr", lat: lat - 0.02, lng: lng - 0.015 }
    ];

    owners.forEach(m => {
        const metrics = calculateDistanceAndETA(lat, lng, m.lat, m.lng);
        const waLink = `https://wa.me/${m.phone}?text=Hi%20${encodeURIComponent(m.owner)},%20I%20want%20to%20book%20your%20${encodeURIComponent(m.name)}%20via%20KisanConnect.`;

        let marker = L.marker([m.lat, m.lng], { icon: createCustomPin('#059669') })
            .bindPopup(`
                <b>🟢 ${t.legGreenTxt}:</b> ${m.name}<br>
                <b>${t.card1Owner}:</b> ${m.owner}<br>
                <b>Rate:</b> ${m.rate}<br>
                <b>📍 Distance:</b> ${metrics.distance} km (${metrics.eta} away)<br><br>
                <a href="${waLink}" target="_blank" class="btn-wa">💬 WhatsApp Owner</a>
            `);
        marker.category = 'owner';
        marker.addTo(map);
        allMarkers.push(marker);
    });

    // Farmer Demands
    const demands = [
        { name: "🔴 Harvester Needed", farmer: "Ramesh Patil", lat: lat + 0.025, lng: lng + 0.02 }
    ];

    demands.forEach(d => {
        const metrics = calculateDistanceAndETA(lat, lng, d.lat, d.lng);
        let marker = L.marker([d.lat, d.lng], { icon: createCustomPin('#dc2626') })
            .bindPopup(`<b>🔴 ${t.legRedTxt}:</b> ${d.name}<br><b>Distance:</b> ${metrics.distance} km`);
        marker.category = 'demand';
        marker.addTo(map);
        allMarkers.push(marker);
    });

    // Labour Groups
    const labours = [
        { name: "👷 5 Harvest Labours", leader: "Ganesh & Team", rate: "₹400/day", lat: lat + 0.008, lng: lng - 0.018 }
    ];

    labours.forEach(l => {
        const metrics = calculateDistanceAndETA(lat, lng, l.lat, l.lng);
        let marker = L.marker([l.lat, l.lng], { icon: createCustomPin('#d97706') })
            .bindPopup(`<b>🟡 ${t.legOrangeTxt}:</b> ${l.name}<br><b>Wage:</b> ${l.rate}<br><b>Distance:</b> ${metrics.distance} km`);
        marker.category = 'labour';
        marker.addTo(map);
        allMarkers.push(marker);
    });
}

    const demands = [
        { name: "🔴 Harvester Needed", farmer: "Ramesh Patil", lat: lat + 0.025, lng: lng + 0.02 },
        { name: "🔴 Tractor Needed", farmer: "Prakash Shinde", lat: lat - 0.012, lng: lng - 0.025 }
    ];

    demands.forEach(d => {
        let marker = L.marker([d.lat, d.lng], { icon: createCustomPin('#dc2626') })
            .bindPopup(`<b>🔴 ${t.legRedTxt}:</b> ${d.name}`);
        marker.category = 'demand';
        marker.addTo(map);
        allMarkers.push(marker);
    });

    const labours = [
        { name: "👷 5 Harvest Labours", leader: "Ganesh & Team", rate: "₹400/day", lat: lat + 0.008, lng: lng - 0.018 },
        { name: "👷 3 Skilled Operators", leader: "Sunil Labour Pool", rate: "₹500/day", lat: lat - 0.022, lng: lng + 0.012 }
    ];

    labours.forEach(l => {
        let marker = L.marker([l.lat, l.lng], { icon: createCustomPin('#d97706') })
            .bindPopup(`<b>🟡 ${t.legOrangeTxt}:</b> ${l.name}<br>Wage: ${l.rate}`);
        marker.category = 'labour';
        marker.addTo(map);
        allMarkers.push(marker);
    });

// Add these right at the bottom of script.js

// 1. Distance & ETA Calculator
function calculateDistanceAndETA(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = (R * c).toFixed(1);
    const etaMin = Math.round((distance / 25) * 60);

    return { distance, eta: etaMin < 5 ? "Under 5 mins" : `${etaMin} mins` };
}

// 2. Weather API
function fetchLocalWeather(lat, lng) {
    const banner = document.getElementById('weatherText');
    if (!banner) return;
    banner.innerText = "⏳ Fetching live weather forecast...";

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`)
        .then(res => res.json())
        .then(data => {
            const temp = data.current_weather.temperature;
            const code = data.current_weather.weathercode;
            let condition = "Clear sky. Optimal conditions for field work.";
            
            if (code >= 51) {
                condition = "🌧 Rain expected nearby! Pre-book machinery early.";
            }

            banner.innerHTML = `🌤 <b>Live Weather:</b> ${temp}°C • ${condition}`;
        })
        .catch(() => {
            banner.innerText = "⚠️ Weather feed offline. Normal field conditions.";
        });
}

// 4. Voice Search Support
function startVoiceSearch() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = currentLang === 'hi' ? 'hi-IN' : currentLang === 'mr' ? 'mr-IN' : 'en-US';
        
        const input = document.getElementById('mapSearchInput');
        input.placeholder = "🎙️ Listening... Speak village name now";
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            input.value = transcript;
            searchLocation();
        };

        recognition.onerror = () => {
            input.placeholder = "Enter village, city, or district...";
            alert("Voice recognition did not capture input. Please type instead.");
        };

        recognition.start();
    } else {
        alert("Voice search is not supported on this browser.");
    }
}
function filterMapMarkers(cat, btn) {
    // 1. Highlight active button visually
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // 2. Hide/Show markers on Leaflet map
    allMarkers.forEach(m => {
        if (cat === 'all' || m.category === cat) {
            if (!map.hasLayer(m)) map.addLayer(m);
        } else {
            if (map.hasLayer(m)) map.removeLayer(m);
        }
    });
}