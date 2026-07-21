/* =========================================================================
   CARDS
   ========================================================================= */

const CARD_BASE = "https://raw.githubusercontent.com/DoodleBun/wafrcardbooyahtcgpreview/main/";
const ICON_BASE = "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/";

const ARTISTS = [
  { name: "Aperture Plushies", icon: "Aperture.jpg", profileUrl: "https://booyahtcg.com/#apertureplushies", volumes: [{ id: "ap", label: "Volume 1", n: 18 }] },
  { name: "B.A",               icon: "ba.png",      profileUrl: "https://booyahtcg.com/#ba",               volumes: [{ id: "ba", label: "Volume 1", n: 10 }] },
  { name: "Beeps Creatures",   icon: "Beep.jpg",     profileUrl: "https://booyahtcg.com/#beepscreatures",  volumes: [{ id: "be", label: "Volume 1", n: 10 }] },
  { name: "CORKiE",            icon: "Co.jpg",       profileUrl: "https://booyahtcg.com/#corkie",           volumes: [{ id: "co", label: "Volume 1", n: 10 }] },
  { name: "DapperTetu",        icon: "da.jpg",       profileUrl: "https://booyahtcg.com/#dappertetu",       comingSoon: true },
  { name: "Dead Bois",         icon: "de.jpg",       profileUrl: "https://booyahtcg.com/#deadbois",        volumes: [{ id: "de", label: "Volume 1", n: 10 }] },
  {
    name: "DoodleBun",
    icon: "do.jpg",
    profileUrl: "https://booyahtcg.com/#doodlebun",
    volumes: [
      { id: "do",  label: "Volume 1", n: 18 },
      { id: "do2", label: "Volume 2", n: 18 },
    ],
  },
  {
    name: "Feral Foliage",
    icon: "fe.jpg",
    profileUrl: "https://booyahtcg.com/#feralfoliage",
    volumes: [
      { id: "fe",  label: "Volume 1", n: 10 },
      { id: "fe2", label: "Volume 2", n: 10 },
      { id: "fe3", label: "Volume 3", n: 10 },
    ],
  },
  { name: "Igor1908",          icon: "ig.jpg",       profileUrl: "https://booyahtcg.com/#igor1908",         comingSoon: true },
  { name: "Kaladania",         icon: "ka.jpg",       profileUrl: "https://booyahtcg.com/#kaladania",        volumes: [{ id: "ka", label: "Volume 1", n: 10 }] },
  { name: "Kirava1",           icon: "ki.jpg",       profileUrl: "https://booyahtcg.com/#kirava1",          volumes: [{ id: "ki", label: "Volume 1", n: 10 }] },
  { name: "LewdSideQuest",     icon: "le.jpg",       profileUrl: "https://booyahtcg.com/#lewdsidequest",    comingSoon: true },
  { name: "M.McRobo",          icon: "mc.png",       profileUrl: "https://booyahtcg.com/#m-mcrobo",         volumes: [{ id: "mc", label: "Volume 1", n: 10 }] },
  { name: "Valkyrie Art",      icon: "va.jpg",       profileUrl: "https://booyahtcg.com/#valkyrie-art",     volumes: [{ id: "va", label: "Volume 1", n: 10 }] },
  { name: "WhisperFluff",      icon: "Wf.jpg",       profileUrl: "https://booyahtcg.com/#whisperfluff",     comingSoon: true },
  { name: "Zenelionn",         icon: "ze.jpg",       profileUrl: "https://booyahtcg.com/#zenelionn",        volumes: [{ id: "ze", label: "Volume 1", n: 10 }] },
];

function pad(n) { return n < 10 ? "0" + n : "" + n; }

function totalCards(artist) {
  if (artist.comingSoon || !artist.volumes || !Array.isArray(artist.volumes)) return 0;
  return artist.volumes.reduce(function(sum, vol) { return sum + (vol.n || 0); }, 0);
}

function cardUrl(vol, i) {
  return CARD_BASE + vol.id + "_" + pad(i) + ".png";
}

const gridEl = document.getElementById("artist-grid");
const searchEl = document.getElementById("artist-search");
const emptyEl = document.getElementById("empty-state");
const backdrop = document.getElementById("backdrop");
const drawer = document.getElementById("drawer");
const drawerHeader = document.getElementById("drawer-header");
const drawerAvatar = document.getElementById("drawer-avatar");
const drawerTitle = document.getElementById("drawer-title");
const drawerProfileBtn = document.getElementById("drawer-profile-btn");
const drawerBody = document.getElementById("drawer-body");
let activeArtist = null;
let currentArtistCards = [];
let currentCardIndex = 0;
let isDragging = false;
let startY = 0;
let currentDeltaY = 0;
let touchStartX = 0;
let touchEndX = 0;

/* -------------------------------------------------------------
   CARD PROTECTION & DRM JAVASCRIPT HANDLERS
   ------------------------------------------------------------- */
document.addEventListener("contextmenu", function(e) {
  if (e.target.closest(".card-slot") || e.target.closest(".lightbox")) {
    e.preventDefault();
    return false;
  }
});

document.addEventListener("dragstart", function(e) {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
    return false;
  }
});

document.addEventListener("keyup", function(e) {
  if (e.key === "PrintScreen" || e.code === "PrintScreen") {
    blurCardsOnScreenshot();
  }
});

window.addEventListener("blur", blurCardsOnScreenshot);
document.addEventListener("visibilitychange", function() {
  if (document.hidden) blurCardsOnScreenshot();
});

function blurCardsOnScreenshot() {
  document.querySelectorAll(".card-slot img, #lightbox-img").forEach(function(img) {
    img.style.filter = "blur(24px)";
  });
  setTimeout(function() {
    document.querySelectorAll(".card-slot img, #lightbox-img").forEach(function(img) {
      img.style.filter = "";
    });
  }, 2500);
}

function renderArtistGrid(filter) {
  const gridEl = document.getElementById("artist-grid");
  const emptyEl = document.getElementById("empty-state");
  if (!gridEl) return;
  const q = (filter || "").trim().toLowerCase();
  let visible = 0;

  gridEl.querySelectorAll(".artist-tile").forEach(function(btn) {
    const name = btn.dataset.name.toLowerCase();
    const show = !q || name.includes(q);
    btn.classList.toggle("is-hidden", !show);
    if (show) visible++;
  });

  if (emptyEl) emptyEl.classList.toggle("visible", visible === 0);
}

function buildCardSlot(artistName, vol, i, globalIndex) {
  const slot = document.createElement("button");
  slot.type = "button";
  slot.className = "card-slot";
  slot.setAttribute("aria-label", artistName + " " + vol.label + " card " + i);

  const shield = document.createElement("div");
  shield.className = "card-shield";

  const url = cardUrl(vol, i);
  const img = document.createElement("img");
  img.src = url;
  img.alt = artistName + " " + vol.label + " card " + i;
  img.loading = i <= 6 ? "eager" : "lazy";
  img.onerror = function() {
    slot.classList.add("is-missing");
    slot.setAttribute("aria-hidden", "true");
  };

  slot.appendChild(shield);
  slot.appendChild(img);
  slot.addEventListener("click", function(e) {
    e.stopPropagation();
    if (!slot.classList.contains("is-missing")) {
      openLightboxAtIndex(globalIndex);
    }
  });

  return slot;
}

function openDrawer(artist) {
  activeArtist = artist;
  currentArtistCards = [];

  const drawerAvatar = document.getElementById("drawer-avatar");
  const drawerTitle = document.getElementById("drawer-title");
  const drawerProfileBtn = document.getElementById("drawer-profile-btn");
  const drawerBody = document.getElementById("drawer-body");
  const drawer = document.getElementById("drawer");
  const backdrop = document.getElementById("backdrop");

  if (!drawer || !backdrop) return;

  const count = totalCards(artist);
  const isComingSoon = artist.comingSoon || !artist.volumes || artist.volumes.length === 0 || count === 0;

  if (drawerAvatar) { drawerAvatar.src = ICON_BASE + artist.icon; drawerAvatar.alt = artist.name; }
  if (drawerTitle) drawerTitle.textContent = artist.name;
  if (drawerProfileBtn) drawerProfileBtn.href = artist.profileUrl || "#";

  if (drawerBody) {
    drawerBody.innerHTML = "";

    if (isComingSoon) {
      const comingSoonBlock = document.createElement("div");
      comingSoonBlock.className = "coming-soon-block";

      const badge = document.createElement("div");
      badge.className = "coming-soon-badge";
      badge.textContent = "Coming Soon!";

      const text = document.createElement("p");
      text.className = "coming-soon-text";
      text.textContent = "Cards for this artist are currently in development. Stay tuned for future volume releases!";

      comingSoonBlock.appendChild(badge);
      comingSoonBlock.appendChild(text);
      drawerBody.appendChild(comingSoonBlock);
    } else {
      const multiVolume = artist.volumes.length > 1;

      artist.volumes.forEach(function(vol) {
        const block = document.createElement("section");
        block.className = "volume-block";

        if (multiVolume) {
          const divider = document.createElement("div");
          divider.className = "volume-divider";
          divider.textContent = vol.label;
          block.appendChild(divider);
        }

        const grid = document.createElement("div");
        grid.className = "card-grid";

        for (let i = 1; i <= vol.n; i++) {
          const globalIdx = currentArtistCards.length;
          const url = cardUrl(vol, i);
          const altText = artist.name + " " + vol.label + " card " + i;
          currentArtistCards.push({ url: url, alt: altText });

          grid.appendChild(buildCardSlot(artist.name, vol, i, globalIdx));
        }

        block.appendChild(grid);
        drawerBody.appendChild(block);
      });
    }
  }

  drawer.style.transform = "";
  drawer.style.transition = "";

  backdrop.hidden = false;
  drawer.setAttribute("aria-hidden", "false");
  requestAnimationFrame(function() {
    backdrop.classList.add("open");
    drawer.classList.add("open");
  });
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  const drawer = document.getElementById("drawer");
  const backdrop = document.getElementById("backdrop");
  const drawerBody = document.getElementById("drawer-body");
  if (!drawer || !backdrop) return;

  const isDesktop = window.innerWidth > 600;
  drawer.style.transition = "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)";
  drawer.style.transform = isDesktop ? "translate(-50%, 105%)" : "translateY(105%)";

  backdrop.classList.remove("open");
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  setTimeout(function() {
    backdrop.hidden = true;
    if (drawerBody) drawerBody.innerHTML = "";
    drawer.style.transform = "";
    drawer.style.transition = "";
    activeArtist = null;
  }, 320);
}

function handleDragStart(clientY) {
  const drawer = document.getElementById("drawer");
  if (!drawer || !drawer.classList.contains("open")) return;
  isDragging = true;
  startY = clientY;
  currentDeltaY = 0;
  drawer.style.transition = "none";
}

function handleDragMove(clientY) {
  if (!isDragging) return;
  const drawer = document.getElementById("drawer");
  if (!drawer) return;

  const delta = clientY - startY;
  currentDeltaY = delta > 0 ? delta : 0;
  const isDesktop = window.innerWidth > 600;

  if (isDesktop) {
    drawer.style.transform = `translate(-50%, ${currentDeltaY}px)`;
  } else {
    drawer.style.transform = `translateY(${currentDeltaY}px)`;
  }
}

function handleDragEnd() {
  if (!isDragging) return;
  isDragging = false;
  const drawer = document.getElementById("drawer");
  if (!drawer) return;

  drawer.style.transition = "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)";
  const isDesktop = window.innerWidth > 600;

  if (currentDeltaY > 120) {
    closeDrawer();
  } else {
    if (isDesktop) {
      drawer.style.transform = "translate(-50%, 0)";
    } else {
      drawer.style.transform = "translateY(0)";
    }
  }
  currentDeltaY = 0;
}

function openLightboxAtIndex(index) {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox || currentArtistCards.length === 0) return;
  currentCardIndex = index;
  updateLightboxContent();
  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");
  requestAnimationFrame(function() { lightbox.classList.add("open"); });
}

function updateLightboxContent() {
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCounter = document.getElementById("lightbox-counter");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");

  const card = currentArtistCards[currentCardIndex];
  if (!card) return;
  if (lightboxImg) { lightboxImg.src = card.url; lightboxImg.alt = card.alt; }
  if (lightboxCounter) lightboxCounter.textContent = (currentCardIndex + 1) + " / " + currentArtistCards.length;
  
  if (lightboxPrev) lightboxPrev.style.display = currentArtistCards.length > 1 ? "grid" : "none";
  if (lightboxNext) lightboxNext.style.display = currentArtistCards.length > 1 ? "grid" : "none";
}

function showPrevCard() {
  if (currentArtistCards.length <= 1) return;
  currentCardIndex = (currentCardIndex - 1 + currentArtistCards.length) % currentArtistCards.length;
  updateLightboxContent();
}

function showNextCard() {
  if (currentArtistCards.length <= 1) return;
  currentCardIndex = (currentCardIndex + 1) % currentArtistCards.length;
  updateLightboxContent();
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  if (!lightbox) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  setTimeout(function() {
    lightbox.hidden = true;
    if (lightboxImg) lightboxImg.src = "";
  }, 220);
}

function handleSwipe() {
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 40) {
    if (diff > 0) showNextCard();
    else showPrevCard();
  }
}

function initBooyahCardList() {
  const gridEl = document.getElementById("artist-grid");
  const searchEl = document.getElementById("artist-search");
  const backdrop = document.getElementById("backdrop");
  const drawerHeader = document.getElementById("drawer-header");
  const lightbox = document.getElementById("lightbox");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  const lightboxClose = document.getElementById("lightbox-close");

  if (!gridEl) return;

  gridEl.innerHTML = "";

  ARTISTS.forEach(function(artist) {
    const count = totalCards(artist);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "artist-tile";
    btn.dataset.name = artist.name;
    btn.setAttribute("role", "listitem");
    btn.setAttribute("aria-label", "Open " + artist.name + " collection, " + count + " cards");

    const frame = document.createElement("div");
    frame.className = "icon-frame";

    const img = document.createElement("img");
    img.src = ICON_BASE + artist.icon;
    img.alt = "";
    img.loading = "lazy";

    const badge = document.createElement("span");
    badge.className = "card-badge";
    badge.textContent = count;

    frame.appendChild(img);
    frame.appendChild(badge);

    const label = document.createElement("span");
    label.className = "artist-name";
    label.textContent = artist.name;

    btn.appendChild(frame);
    btn.appendChild(label);
    btn.addEventListener("click", function() { openDrawer(artist); });
    gridEl.appendChild(btn);
  });

  if (searchEl) {
    searchEl.addEventListener("input", function() {
      renderArtistGrid(searchEl.value);
    });
  }

  if (drawerHeader) {
    drawerHeader.addEventListener("mousedown", function(e) {
      if (e.target.closest(".profile-btn")) return;
      handleDragStart(e.clientY);
    });
    drawerHeader.addEventListener("touchstart", function(e) {
      if (e.target.closest(".profile-btn")) return;
      handleDragStart(e.touches[0].clientY);
    }, { passive: true });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeDrawer);
  }

  if (lightboxPrev) lightboxPrev.addEventListener("click", function(e) { e.stopPropagation(); showPrevCard(); });
  if (lightboxNext) lightboxNext.addEventListener("click", function(e) { e.stopPropagation(); showNextCard(); });
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

  if (lightbox) {
    lightbox.addEventListener("click", function(e) {
      if (e.target === lightbox || e.target.classList.contains("lightbox-content-wrap") || e.target.classList.contains("card-shield")) {
        closeLightbox();
      }
    });
    lightbox.addEventListener("touchstart", function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    lightbox.addEventListener("touchend", function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }
}

// Global Drag & Key Listeners
window.addEventListener("mousemove", function(e) { if (isDragging) handleDragMove(e.clientY); });
window.addEventListener("mouseup", function() { if (isDragging) handleDragEnd(); });
window.addEventListener("touchmove", function(e) { if (isDragging) handleDragMove(e.touches[0].clientY); }, { passive: true });
window.addEventListener("touchend", function() { if (isDragging) handleDragEnd(); });

document.addEventListener("keydown", function(e) {
  const lightbox = document.getElementById("lightbox");
  const drawer = document.getElementById("drawer");
  if (lightbox && !lightbox.hidden) {
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") showPrevCard();
    else if (e.key === "ArrowRight") showNextCard();
  } else if (drawer && drawer.classList.contains("open")) {
    if (e.key === "Escape") closeDrawer();
  }
});

// Double check DOM readiness
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBooyahCardList);
} else {
  initBooyahCardList();
}
// Backup trigger for Carrd dynamic container rendering
setTimeout(initBooyahCardList, 300);
