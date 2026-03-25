const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const langToggle = document.getElementById("langToggle");

const method = document.getElementById("method");
const sqftBox = document.getElementById("sqftBox");
const dimBox = document.getElementById("dimBox");
const calcBtn = document.getElementById("calcBtn");
const waBtn = document.getElementById("waBtn");

let currentLang = "en";
let lastTotal = 0;
let lastArea = 0;

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("show");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

method.addEventListener("change", () => {
  if (method.value === "dim") {
    sqftBox.style.display = "none";
    dimBox.style.display = "grid";
  } else {
    sqftBox.style.display = "block";
    dimBox.style.display = "none";
  }
});

function getSelectedServiceName() {
  const selected = document.getElementById("service").selectedOptions[0];
  if (!selected || !selected.value) return "";
  return currentLang === "si" ? selected.dataset.nameSi : selected.dataset.nameEn;
}

function calculateEstimate() {
  const service = document.getElementById("service");
  const rate = Number(service.value);
  let area = 0;

  if (method.value === "sqft") {
    area = Number(document.getElementById("sqft").value);
  } else {
    const length = Number(document.getElementById("length").value);
    const height = Number(document.getElementById("height").value);
    area = length * height;
  }

  if (!rate || !area || area <= 0) {
    alert(currentLang === "si" ? "කරුණාකර වලංගු දත්ත ඇතුළත් කරන්න." : "Please enter valid details.");
    return;
  }

  lastArea = area;
  lastTotal = rate * area;

  document.getElementById("result").textContent =
    (currentLang === "si" ? "රු. " : "Rs. ") + lastTotal.toLocaleString();
}

function sendWhatsApp() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();
  const serviceName = getSelectedServiceName();
  const rate = Number(document.getElementById("service").value);

  if (!name || !phone || !lastTotal || !serviceName || !rate) {
    alert(currentLang === "si"
      ? "මුලින් ඔබගේ විස්තර පුරවා estimate එක ගණනය කරන්න."
      : "Please fill in your details and calculate the estimate first."
    );
    return;
  }

  const textEn = `Hello, I need a quotation from Ceylon Colors.

Name: ${name}
Phone: ${phone}
Service: ${serviceName}
Rate: Rs. ${rate}/sqft
Area: ${lastArea} sqft
Estimated Cost: Rs. ${lastTotal.toLocaleString()}
Message: ${message || "-"}`;

  const textSi = `ආයුබෝවන්, මට Ceylon Colors වෙතින් මිල ගණන් අවශ්‍යයි.

නම: ${name}
දුරකථන අංකය: ${phone}
සේවාව: ${serviceName}
අනුපාතය: රු. ${rate}/sqft
ප්‍රමාණය: ${lastArea} sqft
ඇස්තමේන්තුගත මුදල: රු. ${lastTotal.toLocaleString()}
පණිවිඩය: ${message || "-"}`;

  const finalText = currentLang === "si" ? textSi : textEn;
  window.open(`https://wa.me/94776996107?text=${encodeURIComponent(finalText)}`, "_blank");
}

calcBtn.addEventListener("click", calculateEstimate);
waBtn.addEventListener("click", sendWhatsApp);

const t = {
  en: {
    brandSub: "Premium wall finishing",
    navServices: "Services",
    navWork: "Work",
    navEstimate: "Estimate",
    navContact: "Contact",
    heroPill: "Trusted painting service in Sri Lanka",
    heroTitle: "Perfect finishes for modern walls.",
    heroDesc: "Wall putty, filler, interior painting, exterior painting, water base, ceiling sheet, and wood ceiling services with clean workmanship and premium results.",
    heroPrimary: "Get Instant Estimate",
    heroSecondary: "WhatsApp Now",
    stat1: "Quick response",
    stat2: "Neat finishing",
    stat3: "On-time service",
    miniBadge: "Instant rough quote",
    miniTitle: "Quick pricing flow",
    mini1: "Choose service type",
    mini2: "Enter sqft or dimensions",
    mini3: "Get estimate instantly",
    mini4: "Send inquiry via WhatsApp",
    miniPriceLabel: "Starting idea",
    servicesTag: "Services",
    servicesTitle: "Professional solutions for homes and shops",
    servicesDesc: "Clean wall preparation, smooth finishing, durable paint work, and practical ceiling and water base solutions.",
    service1Title: "Wall Putty (2 Coats)",
    service1Desc: "Smooth wall preparation with two putty coats for a cleaner and more even finish.",
    service2Title: "Putty + Filler",
    service2Desc: "Extra smooth finishing with putty and filler for customers who need a premium wall surface.",
    service3Title: "Interior & Exterior Paint",
    service3Desc: "Clean and durable paint finishes for interior walls, exterior walls, and building surfaces.",
    service4Title: "Ceiling & Water Base",
    service4Desc: "Ceiling sheet, wood ceiling, and water base applications with a neat professional finish.",
    galleryTag: "Work",
    galleryTitle: "Premium finish style",
    galleryDesc: "Replace these with your real work photos for maximum trust and better conversions.",
    quoteTag: "Estimate",
    quoteTitle: "Get an instant rough estimate",
    quoteDesc: "Choose a service, enter square feet or wall dimensions, and send your request directly via WhatsApp.",
    labelService: "Service Type",
    labelMethod: "Calculation Method",
    labelSqft: "Total Square Feet",
    labelLength: "Wall Length (ft)",
    labelHeight: "Wall Height (ft)",
    calcBtn: "Calculate Estimate",
    resultLabel: "Estimated Cost",
    result: "Rs. 0",
    resultNote: "This is a rough estimate. Final price may vary depending on wall condition, materials, and site inspection.",
    labelName: "Your Name",
    labelPhone: "Phone Number",
    labelMessage: "Message (Optional)",
    labelPhotos: "Upload Photos (Optional)",
    waBtn: "Send via WhatsApp",
    callBtn: "Call 0776996107",
    contactTitle: "Contact Ceylon Colors",
    contactDesc: "Call or message directly for painting, putty, filler, ceiling, and waterproofing inquiries.",
    contactCallTitle: "Call",
    contactWaTitle: "WhatsApp",
    contactFbTitle: "Facebook",
    contactWhyTitle: "Why choose Ceylon Colors?",
    why1: "Clean finishing and smooth wall preparation",
    why2: "Fast communication and easy quotation process",
    why3: "Practical solutions based on site condition",
    why4: "Professional small business presentation",
    langBtn: "සිංහල"
  },
  si: {
    brandSub: "ප්‍රිමියම් බිත්ති නිමාව",
    navServices: "සේවාවන්",
    navWork: "වැඩ",
    navEstimate: "ඇස්තමේන්තුව",
    navContact: "සම්බන්ධ වන්න",
    heroPill: "ශ්‍රී ලංකාවේ විශ්වාසවන්ත පේන්ට් සේවාවක්",
    heroTitle: "නවීන බිත්ති සඳහා පරිපූර්ණ නිමාව.",
    heroDesc: "වෝල් පුට්ටි, ෆිලර්, අභ්‍යන්තර පේන්ට්, බාහිර පේන්ට්, වෝටර් බේස්, සීලින් ශීට් සහ වුඩ් සීලින් සේවාවන් — පිරිසිදු වැඩ සහ ප්‍රිමියම් ප්‍රතිඵල සමඟ.",
    heroPrimary: "ක්ෂණික ඇස්තමේන්තුව ගන්න",
    heroSecondary: "WhatsApp දැන්",
    stat1: "ක්ෂණික ප්‍රතිචාර",
    stat2: "පිරිසිදු නිමාව",
    stat3: "නියමිත වේලාවට සේවාව",
    miniBadge: "ක්ෂණික දළ මිල ගණනය",
    miniTitle: "මිල ගණන් ලබාගැනීමේ පියවර",
    mini1: "සේවා වර්ගය තෝරන්න",
    mini2: "sqft හෝ මාන ඇතුළත් කරන්න",
    mini3: "ක්ෂණික estimate එක ගන්න",
    mini4: "WhatsApp මඟින් ඉල්ලීම යවන්න",
    miniPriceLabel: "ආරම්භක අදහස",
    servicesTag: "සේවාවන්",
    servicesTitle: "නිවාස හා වෙළඳසැල් සඳහා වෘත්තීය විසඳුම්",
    servicesDesc: "පිරිසිදු බිත්ති සූදානම, සුමට නිමාව, දිගුකාලීන පේන්ට් වැඩ සහ ප්‍රායෝගික සීලින් හා වෝටර් බේස් විසඳුම්.",
    service1Title: "වෝල් පුට්ටි (කෝට් 2)",
    service1Desc: "බිත්ති සුමට සහ සමතලා නිමාවකට පුට්ටි කෝට් දෙකක් යොදා සූදානම් කිරීම.",
    service2Title: "පුට්ටි + ෆිලර්",
    service2Desc: "ඉතා smooth premium wall finish එකක් අවශ්‍ය අය සඳහා පුට්ටි සහ ෆිලර් නිමාව.",
    service3Title: "අභ්‍යන්තර සහ බාහිර පේන්ට්",
    service3Desc: "අභ්‍යන්තර බිත්ති, බාහිර බිත්ති සහ ගොඩනැගිලි මතුපිට සඳහා පිරිසිදු හා දිගුකාලීන පේන්ට් නිමාව.",
    service4Title: "සීලින් සහ වෝටර් බේස්",
    service4Desc: "සීලින් ශීට්, වුඩ් සීලින් සහ වෝටර් බේස් වැඩ සඳහා neat professional finish එකක්.",
    galleryTag: "වැඩ",
    galleryTitle: "ප්‍රිමියම් නිමාවක හැඩය",
    galleryDesc: "වැඩි විශ්වාසයක් සහ inquiries සඳහා මේවා ඔබගේ සත්‍ය වැඩ ඡායාරූප වලින් මාරු කරන්න.",
    quoteTag: "ඇස්තමේන්තුව",
    quoteTitle: "ක්ෂණික දළ ඇස්තමේන්තුවක් ලබාගන්න",
    quoteDesc: "සේවාව තෝරන්න, sqft හෝ බිත්ති මාන ඇතුළත් කරන්න, පසුව WhatsApp මඟින් ඉල්ලීම යවන්න.",
    labelService: "සේවා වර්ගය",
    labelMethod: "ගණනය කිරීමේ ක්‍රමය",
    labelSqft: "මුළු වර්ග අඩි ප්‍රමාණය",
    labelLength: "බිත්තියේ දිග (ft)",
    labelHeight: "බිත්තියේ උස (ft)",
    calcBtn: "ඇස්තමේන්තුව ගණනය කරන්න",
    resultLabel: "ඇස්තමේන්තුගත මුදල",
    result: "රු. 0",
    resultNote: "මෙය දළ මිල ගණනයක් පමණි. අවසාන මිල බිත්ති තත්ත්වය, භාවිත ද්‍රව්‍ය සහ ස්ථාන පරීක්ෂාව අනුව වෙනස් විය හැක.",
    labelName: "ඔබගේ නම",
    labelPhone: "දුරකථන අංකය",
    labelMessage: "පණිවිඩය (අත්‍යවශ්‍ය නොවේ)",
    labelPhotos: "ඡායාරූප එක් කරන්න (අත්‍යවශ්‍ය නොවේ)",
    waBtn: "WhatsApp මඟින් යවන්න",
    callBtn: "අමතන්න 0776996107",
    contactTitle: "Ceylon Colors සමඟ සම්බන්ධ වන්න",
    contactDesc: "පේන්ට්, පුට්ටි, ෆිලර්, සීලින් සහ වෝටර් බේස් inquiries සඳහා සෘජුව call හෝ message කරන්න.",
    contactCallTitle: "අමතන්න",
    contactWaTitle: "WhatsApp",
    contactFbTitle: "Facebook",
    contactWhyTitle: "Ceylon Colors තෝරන්නේ ඇයි?",
    why1: "පිරිසිදු නිමාව සහ සුමට බිත්ති සූදානම",
    why2: "ක්ෂණික සම්බන්ධතාව සහ පහසු quotation process",
    why3: "site condition අනුව ප්‍රායෝගික විසඳුම්",
    why4: "වෘත්තීය small business presentation එකක්",
    langBtn: "English"
  }
};

function setLang(lang) {
  currentLang = lang;
  const dict = t[lang];

  Object.keys(dict).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = dict[id];
  });

  const methodSelect = document.getElementById("method");
  if (lang === "si") {
    methodSelect.options[0].text = "මම මුළු square feet දන්නවා";
    methodSelect.options[1].text = "බිත්ති මාන යොදා ගණනය කරන්න";
    document.getElementById("sqft").placeholder = "මුළු sqft ඇතුළත් කරන්න";
    document.getElementById("length").placeholder = "දිග ඇතුළත් කරන්න";
    document.getElementById("height").placeholder = "උස ඇතුළත් කරන්න";
    document.getElementById("name").placeholder = "ඔබගේ නම ඇතුළත් කරන්න";
    document.getElementById("phone").placeholder = "දුරකථන අංකය ඇතුළත් කරන්න";
    document.getElementById("message").placeholder = "වැඩ විස්තර එක් කරන්න";
  } else {
    methodSelect.options[0].text = "I know total square feet";
    methodSelect.options[1].text = "Calculate using wall dimensions";
    document.getElementById("sqft").placeholder = "Enter total sqft";
    document.getElementById("length").placeholder = "Enter length";
    document.getElementById("height").placeholder = "Enter height";
    document.getElementById("name").placeholder = "Enter your name";
    document.getElementById("phone").placeholder = "Enter phone number";
    document.getElementById("message").placeholder = "Add project details";
  }

  if (!lastTotal) {
    document.getElementById("result").textContent = dict.result;
  } else {
    document.getElementById("result").textContent =
      (lang === "si" ? "රු. " : "Rs. ") + lastTotal.toLocaleString();
  }

  langToggle.textContent = dict.langBtn;
}

langToggle.addEventListener("click", () => {
  setLang(currentLang === "en" ? "si" : "en");
});

setLang("en");