/* ==========================================
   BOOYAH TCG - CARD LIST SCRIPT (concept2)
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Ensure Loading Screen exists in DOM
  initLoadingScreen();
  
  // Render Artists and Card Wall
  renderCardWall();
  
  // Wait until all loaded images complete before dismissing loading screen
  waitForAllCardsToLoad();
  
  // Setup Mobile Drawer Interactions
  setupMobileDrawer();
});

/* --- Sample Data Array (Adjust/Expand with your actual card data) --- */
const artistData = [
  {
    id: "aperture-plushies",
    name: "Aperture Plushies",
    avatarUrl: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/Aperture.jpg",
    profileUrl: "https://twitter.com/AperturePlushies", // Replace with actual profile URL
    cards: [
      { id: "ap-1", src: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/Aperture.jpg", title: "Plush Card 1" },
      { id: "ap-2", src: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/Aperture.jpg", title: "Plush Card 2" }
    ]
  }
];

let currentCardList = [];
let currentCardIndex = 0;

/* --- Loading Screen Logic --- */
function initLoadingScreen() {
  if (!document.getElementById("booyahLoader")) {
    const loaderHTML = `
      <div class="booyah-loader-screen" id="booyahLoader">
        <img 
          src="https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/BooyahLogo2.png" 
          alt="Booyah TCG Loading" 
          class="booyah-loader-logo"
        />
        <p class="booyah-loader-text">Loading Cards...</p>
      </div>
    `;
    const root = document.querySelector(".booyah-cardwall-root") || document.body;
    root.insertAdjacentHTML("afterbegin", loaderHTML);
  }
}

function waitForAllCardsToLoad() {
  const cardImages = document.querySelectorAll(".booyah-main-wall img");
  
  if (cardImages.length === 0) {
    hideLoader();
    return;
  }

  const promises = Array.from(cardImages).map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve) => {
      img.addEventListener("load", resolve);
      img.addEventListener("error", resolve);
    });
  });

  Promise.all(promises).then(() => {
    hideLoader();
  });
}

function hideLoader() {
  const loader = document.getElementById("booyahLoader");
  if (loader) {
    loader.classList.add("hidden");
  }
}

/* --- Render Nav & Card Wall --- */
function renderCardWall() {
  const navContainer = document.getElementById("booyahArtistNavList");
  const wallContainer = document.getElementById("booyahWallSections");

  if (!navContainer || !wallContainer) return;

  navContainer.innerHTML = "";
  wallContainer.innerHTML = "";
  currentCardList = [];

  artistData.forEach((artist, aIndex) => {
    // 1. Sidebar Nav Items
    const navItem = document.createElement("a");
    navItem.className = `artist-nav-item ${aIndex === 0 ? "active" : ""}`;
    navItem.href = `#artist-${artist.id}`;
    navItem.innerHTML = `
      <img src="${artist.avatarUrl}" alt="${artist.name}" class="artist-nav-avatar" />
      <span>${artist.name}</span>
    `;
    navItem.addEventListener("click", () => {
      document.querySelectorAll(".artist-nav-item").forEach(el => el.classList.remove("active"));
      navItem.classList.add("active");
      closeMobileDrawer();
    });
    navContainer.appendChild(navItem);

    // 2. Main Wall Sections with Direct External Link Header (No button)
    const section = document.createElement("section");
    section.className = "artist-wall-section";
    section.id = `artist-${artist.id}`;

    let cardsHTML = "";
    artist.cards.forEach((card) => {
      const globalIdx = currentCardList.length;
      currentCardList.push(card);

      cardsHTML += `
        <div class="card-item" onclick="openCardInspector(${globalIdx})">
          <img src="${card.src}" alt="${card.title}" loading="eager" />
        </div>
      `;
    });

    section.innerHTML = `
      <div class="artist-section-header">
        <a href="${artist.profileUrl}" target="_blank" rel="noopener noreferrer" class="artist-link-wrapper" title="Open ${artist.name}'s profile">
          <img src="${artist.avatarUrl}" alt="${artist.name}" class="artist-header-avatar" />
          <h2 class="artist-header-name">${artist.name}</h2>
        </a>
      </div>
      <div class="card-grid">
        ${cardsHTML}
      </div>
    `;

    wallContainer.appendChild(section);
  });
}

/* --- Modal Inspector Logic --- */
function openCardInspector(index) {
  currentCardIndex = index;
  const modal = document.getElementById("booyahInspectorModal");
  const img = document.getElementById("booyahInspectorImg");
  
  if (modal && img && currentCardList[index]) {
    img.src = currentCardList[index].src;
    modal.classList.add("active");
  }
}

function closeCardInspector(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById("booyahInspectorModal");
  if (modal) modal.classList.remove("active");
}

function prevCard(event) {
  if (event) event.stopPropagation();
  if (currentCardList.length === 0) return;
  currentCardIndex = (currentCardIndex - 1 + currentCardList.length) % currentCardList.length;
  document.getElementById("booyahInspectorImg").src = currentCardList[currentCardIndex].src;
}

function nextCard(event) {
  if (event) event.stopPropagation();
  if (currentCardList.length === 0) return;
  currentCardIndex = (currentCardIndex + 1) % currentCardList.length;
  document.getElementById("booyahInspectorImg").src = currentCardList[currentCardIndex].src;
}

/* --- Mobile Drawer Navigation --- */
function setupMobileDrawer() {
  const btn = document.getElementById("mobileHamburgerBtn");
  const backdrop = document.getElementById("sidebarBackdrop");
  const sidebar = document.getElementById("booyahSidebar");

  if (btn && sidebar && backdrop) {
    btn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      backdrop.classList.toggle("active");
    });

    backdrop.addEventListener("click", closeMobileDrawer);
  }
}

function closeMobileDrawer() {
  const sidebar = document.getElementById("booyahSidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  if (sidebar) sidebar.classList.remove("open");
  if (backdrop) backdrop.classList.remove("active");
}
