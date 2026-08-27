/* =========================================================================
   BOOYAH! TCG — CONCEPT 2 CARD WALL (CLEAN, 5-COL & SMOOTH SCROLL)
   ========================================================================= */

(function () {
  var CARD_BASE = "https://raw.githubusercontent.com/DoodleBun/wafrcardbooyahtcgpreview/main/";
  var ICON_BASE = "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/";

  var ARTISTS = [
    { name: "Aperture Plushies", icon: "Aperture.jpg", profileUrl: "https://booyahtcg.com/#apertureplushies", volumes: [{ id: "ap", label: "Volume 1", n: 18 }] },
    { name: "B.A",               icon: "ba.jpg",       profileUrl: "https://booyahtcg.com/#a",                volumes: [{ id: "ba", label: "Volume 1", n: 10 }] },
    { name: "Beeps Creatures",   icon: "Beep.jpg",     profileUrl: "https://booyahtcg.com/#beeps-creatures",  volumes: [{ id: "be", label: "Volume 1", n: 10 }] },
    { name: "CORKiE",            icon: "Co.jpg",       profileUrl: "https://booyahtcg.com/#corkie",           volumes: [{ id: "co", label: "Volume 1", n: 10 }] },
    { name: "Dead Bois",         icon: "de.jpg",       profileUrl: "https://booyahtcg.com/#deadbois",         volumes: [{ id: "de", label: "Volume 1", n: 10 }] },
    {
      name: "DoodleBun",
      icon: "do.jpg",
      profileUrl: "https://booyahtcg.com/#doodlebun",
      volumes: [
        { id: "do",  label: "Volume 1", n: 18 },
        { id: "do2", label: "Volume 2", n: 18 }
      ]
    },
    {
      name: "Feral Foliage",
      icon: "fe.jpg",
      profileUrl: "https://booyahtcg.com/#feralfoliage",
      volumes: [
        { id: "fe",  label: "Volume 1", n: 10 },
        { id: "fe2", label: "Volume 2", n: 10 },
        { id: "fe3", label: "Volume 3", n: 10 }
      ]
    },
    { name: "Kaladania",         icon: "ka.jpg",       profileUrl: "https://booyahtcg.com/#kaladania",        volumes: [{ id: "ka", label: "Volume 1", n: 10 }] },
    { name: "Kirava1",           icon: "ki.jpg",       profileUrl: "https://booyahtcg.com/#kirava1",          volumes: [{ id: "ki", label: "Volume 1", n: 10 }] },
    { name: "M.McRobo",          icon: "mc.png",       profileUrl: "https://booyahtcg.com/#mmcrobo",          volumes: [{ id: "mm", label: "Volume 1", n: 10 }] },
    { name: "Valkyrie Art",      icon: "va.jpg",       profileUrl: "https://booyahtcg.com/#valkyrieart",      volumes: [{ id: "va", label: "Volume 1", n: 10 }] },
    { name: "Zenelionn",         icon: "ze.jpg",       profileUrl: "https://booyahtcg.com/#zenelionn",        volumes: [{ id: "ze", label: "Volume 1", n: 10 }] }
  ];

  var allCards = [];
  var currentCardIdx = 0;

  function pad(n) {
    return n < 10 ? "0" + n : "" + n;
  }

  function slugify(name) {
    return "sec-" + name.replace(/[^a-zA-Z0-9]/g, "");
  }

  function initCardWall() {
    var sidebarList = document.getElementById("booyahArtistNavList");
    var wallSections = document.getElementById("booyahWallSections");
    if (!sidebarList || !wallSections) return;

    sidebarList.innerHTML = "";
    wallSections.innerHTML = "";
    allCards = [];

    // Set initial mobile active artist avatar & name
    updateMobileActiveHeader(ARTISTS[0]);

    ARTISTS.forEach(function (artist, index) {
      var totalCards = artist.volumes ? artist.volumes.reduce(function (sum, v) { return sum + (v.n || 0); }, 0) : 0;
      var secId = slugify(artist.name);

      // 1. Sidebar Nav Item (With Card Count & Urbanist font on left sidebar)
      var navBtn = document.createElement("button");
      navBtn.className = "artist-nav-item" + (index === 0 ? " active" : "");
      navBtn.setAttribute("data-target", secId);
      navBtn.setAttribute("data-name", artist.name);
      navBtn.setAttribute("data-icon", artist.icon);
      navBtn.innerHTML =
        '<img class="artist-nav-avatar" src="' + (ICON_BASE + artist.icon) + '" alt="' + artist.name + '">' +
        '<div class="artist-nav-info">' +
          '<span class="artist-nav-name">' + artist.name + '</span>' +
          '<span class="artist-nav-count">' + totalCards + ' cards</span>' +
        '</div>';

      navBtn.addEventListener("click", function () {
        var targetSection = document.getElementById(secId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
        updateMobileActiveHeader(artist);
        closeMobileSidebar();
      });
      sidebarList.appendChild(navBtn);

      // 2. Card Wall Section (Russo One font for artist heading)
      var section = document.createElement("section");
      section.className = "booyah-artist-section";
      section.id = secId;

      section.innerHTML =
        '<div class="section-artist-banner">' +
          '<img class="section-artist-avatar" src="' + (ICON_BASE + artist.icon) + '" alt="' + artist.name + '">' +
          '<div class="section-artist-details">' +
            '<h3>' + artist.name + '</h3>' +
            '<a href="' + artist.profileUrl + '" target="_blank" rel="noopener">View Artist Profile ↗</a>' +
          '</div>' +
        '</div>';

      // Volumes & Raw Cards
      if (artist.volumes && artist.volumes.length) {
        artist.volumes.forEach(function (vol) {
          var volHeading = document.createElement("div");
          volHeading.className = "volume-heading";
          volHeading.innerHTML = '<span class="volume-pill">' + vol.label + '</span>';
          section.appendChild(volHeading);

          var grid = document.createElement("div");
          grid.className = "card-wall-grid";

          for (var i = 1; i <= vol.n; i++) {
            var cardUrl = CARD_BASE + vol.id + "_" + pad(i) + ".png";
            var cardIdx = allCards.length;
            allCards.push(cardUrl);

            var cardEl = document.createElement("div");
            cardEl.className = "booyah-card";
            cardEl.setAttribute("data-index", cardIdx);

            cardEl.innerHTML =
              '<img src="' + cardUrl + '" alt="' + artist.name + ' Card #' + i + '" loading="lazy">' +
              '<div class="card-shield-overlay"></div>';

            cardEl.addEventListener("click", (function (idx) {
              return function () {
                openCardInspector(idx);
              };
            })(cardIdx));

            // Mouse 3D tilt on grid card
            bindTiltEffect(cardEl);

            grid.appendChild(cardEl);
          }
          section.appendChild(grid);
        });
      }

      wallSections.appendChild(section);
    });

    setupScrollObserver();
    setupMobileDrawerEvents();
  }

  function updateMobileActiveHeader(artist) {
    var mobileLabel = document.getElementById("mobileActiveArtist");
    var mobileAvatar = document.getElementById("mobileActiveAvatar");
    if (mobileLabel && artist) mobileLabel.textContent = artist.name;
    if (mobileAvatar && artist) {
      mobileAvatar.src = ICON_BASE + artist.icon;
      mobileAvatar.alt = artist.name;
    }
  }

  // 3D Tilt calculation
  function bindTiltEffect(el, intensity) {
    var factor = intensity || 10;
    el.addEventListener("mousemove", function (e) {
      var rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width / 2;
      var cy = rect.height / 2;
      var rotateX = ((y - cy) / cy) * -factor;
      var rotateY = ((x - cx) / cx) * factor;
      el.style.transform = "perspective(900px) rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg) translateY(-6px) scale(1.03)";
    });

    el.addEventListener("mouseleave", function () {
      el.style.transform = "";
    });
  }

  // Active section spy on scroll (CLEAN - NO scrollIntoView CALLS TO PREVENT JITTER/LOCKS)
  function setupScrollObserver() {
    var sections = document.querySelectorAll(".booyah-artist-section");
    var navItems = document.querySelectorAll(".artist-nav-item");

    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var activeId = entry.target.id;
            navItems.forEach(function (item) {
              if (item.getAttribute("data-target") === activeId) {
                item.classList.add("active");
                var artistName = item.getAttribute("data-name");
                var artistIcon = item.getAttribute("data-icon");
                updateMobileActiveHeader({ name: artistName, icon: artistIcon });
              } else {
                item.classList.remove("active");
              }
            });
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(function (sec) {
      observer.observe(sec);
    });
  }

  // Mobile Hamburger Drawer Setup
  function setupMobileDrawerEvents() {
    var btn = document.getElementById("mobileHamburgerBtn");
    var closeBtn = document.getElementById("mobileCloseBtn");
    var backdrop = document.getElementById("sidebarBackdrop");

    if (btn) {
      btn.onclick = function (e) {
        if (e) e.stopPropagation();
        toggleMobileSidebar();
      };
    }
    if (closeBtn) {
      closeBtn.onclick = function (e) {
        if (e) e.stopPropagation();
        closeMobileSidebar();
      };
    }
    if (backdrop) {
      backdrop.onclick = function (e) {
        if (e) e.stopPropagation();
        closeMobileSidebar();
      };
    }
  }

  window.toggleMobileSidebar = function () {
    var sidebar = document.getElementById("booyahSidebar");
    if (sidebar && sidebar.classList.contains("open")) {
      closeMobileSidebar();
    } else {
      openMobileSidebar();
    }
  };

  window.openMobileSidebar = function () {
    var sidebar = document.getElementById("booyahSidebar");
    var backdrop = document.getElementById("sidebarBackdrop");

    if (sidebar) sidebar.classList.add("open");
    if (backdrop) backdrop.classList.add("active");
  };

  window.closeMobileSidebar = function () {
    var sidebar = document.getElementById("booyahSidebar");
    var backdrop = document.getElementById("sidebarBackdrop");

    if (sidebar) sidebar.classList.remove("open");
    if (backdrop) backdrop.classList.remove("active");
  };

  // Zoomed Lightbox Inspector (+20% bigger, Arrows Navigation, 3D tilt)
  var modal = document.getElementById("booyahInspectorModal");
  var inspectorInner = document.getElementById("booyahInspectorInner");
  var inspectorImg = document.getElementById("booyahInspectorImg");
  var inspectorContainer = document.querySelector(".inspector-card-container");

  if (inspectorContainer && inspectorInner) {
    inspectorContainer.addEventListener("mousemove", function (e) {
      var rect = inspectorContainer.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width / 2;
      var cy = rect.height / 2;
      var rotateX = ((y - cy) / cy) * -12;
      var rotateY = ((x - cx) / cx) * 12;
      inspectorInner.style.transform = "perspective(1000px) rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg) scale(1.02)";
    });

    inspectorContainer.addEventListener("mouseleave", function () {
      inspectorInner.style.transform = "";
    });
  }

  function updateInspectorCard(idx) {
    if (!inspectorImg || allCards.length === 0) return;
    if (idx < 0) idx = allCards.length - 1;
    if (idx >= allCards.length) idx = 0;
    currentCardIdx = idx;
    inspectorImg.src = allCards[currentCardIdx];
    if (inspectorInner) inspectorInner.style.transform = "";
  }

  // Locks/unlocks page scroll while the inspector is open, so the only
  // thing the user can scroll/click is the zoomed card itself and its
  // own close/arrow controls — the card wall behind it can't be touched.
  function lockBackgroundScroll() {
    document.documentElement.classList.add("booyah-modal-open");
    document.body.classList.add("booyah-modal-open");
  }

  function unlockBackgroundScroll() {
    document.documentElement.classList.remove("booyah-modal-open");
    document.body.classList.remove("booyah-modal-open");
  }

  window.openCardInspector = function (idx) {
    if (!modal || !inspectorImg) return;
    if (typeof idx === "string") {
      idx = allCards.indexOf(idx);
      if (idx === -1) idx = 0;
    }
    updateInspectorCard(idx);
    modal.classList.add("open");
    lockBackgroundScroll();
  };

  window.closeCardInspector = function (e) {
    if (!modal) return;
    if (!e || e.target === modal || e.target.classList.contains("inspector-close-btn")) {
      modal.classList.remove("open");
      unlockBackgroundScroll();
    }
  };

  window.prevCard = function (e) {
    if (e) e.stopPropagation();
    updateInspectorCard(currentCardIdx - 1);
  };

  window.nextCard = function (e) {
    if (e) e.stopPropagation();
    updateInspectorCard(currentCardIdx + 1);
  };

  // Keyboard navigation (Arrow keys & Escape)
  document.addEventListener("keydown", function (e) {
    if (!modal || !modal.classList.contains("open")) return;
    if (e.key === "ArrowLeft") {
      window.prevCard();
    } else if (e.key === "ArrowRight") {
      window.nextCard();
    } else if (e.key === "Escape") {
      window.closeCardInspector();
    }
  });

  // DRM & Right-click protection
  document.addEventListener("contextmenu", function (e) {
    if (e.target.closest(".booyah-card") || e.target.closest(".inspector-card-container")) {
      e.preventDefault();
      return false;
    }
  });

  // Init on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCardWall);
  } else {
    initCardWall();
  }
})();
