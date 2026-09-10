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
  var artistLoadStatus = {};

  function pad(n) {
    return n < 10 ? "0" + n : "" + n;
  }

  function slugify(name) {
    return "sec-" + name.replace(/[^a-zA-Z0-9]/g, "");
  }

  function getArtistHash(artist) {
    if (!artist || !artist.profileUrl) return "#";
    var idx = artist.profileUrl.indexOf("#");
    return idx !== -1 ? artist.profileUrl.substring(idx) : "#" + slugify(artist.name);
  }

  // Dynamically calculate and position elements below the main website header
  function updateBannerOffset() {
    var header = document.getElementById("booyah-header");
    var offset = 64;
    if (header) {
      var rect = header.getBoundingClientRect();
      offset = Math.max(0, Math.round(rect.bottom));
    } else {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      offset = Math.max(0, 64 - scrollY);
    }
    document.documentElement.style.setProperty("--by-banner-offset", offset + "px");
  }

  // Smoothly auto-scroll the left sidebar list as active artists progress
  function scrollNavIntoView(activeItem) {
    var list = document.getElementById("booyahArtistNavList");
    if (!list || !activeItem) return;
    var listRect = list.getBoundingClientRect();
    var itemRect = activeItem.getBoundingClientRect();

    // If item reaches near bottom of visible list, scroll down to keep it in view
    if (itemRect.bottom > listRect.bottom - 24) {
      list.scrollBy({
        top: itemRect.bottom - listRect.bottom + 48,
        behavior: "smooth"
      });
    }
    // If item reaches near top of visible list, scroll up to keep it in view
    else if (itemRect.top < listRect.top + 24) {
      list.scrollBy({
        top: itemRect.top - listRect.top - 48,
        behavior: "smooth"
      });
    }
  }

  function initCardWall() {
    ["booyahSidebar", "sidebarBackdrop", "booyahInspectorModal"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) document.body.appendChild(el);
    });
    var topBar = document.querySelector(".mobile-top-bar");
    if (topBar) document.body.appendChild(topBar);

    var sidebarList = document.getElementById("booyahArtistNavList");
    var wallSections = document.getElementById("booyahWallSections");
    if (!sidebarList || !wallSections) return;

    sidebarList.innerHTML = "";
    wallSections.innerHTML = "";
    allCards = [];
    artistLoadStatus = {};

    // Remove empty header bar in mobile drawer completely to lift everything up
    var closeHeader = document.querySelector(".sidebar-close-btn");
    if (closeHeader) {
      closeHeader.remove();
    }

    // Banner offset check & listeners
    updateBannerOffset();
    window.addEventListener("scroll", updateBannerOffset, { passive: true });
    window.addEventListener("resize", updateBannerOffset, { passive: true });

    // Set initial mobile active artist avatar & name
    updateMobileActiveHeader(ARTISTS[0]);

    ARTISTS.forEach(function (artist, index) {
      var totalCards = artist.volumes ? artist.volumes.reduce(function (sum, v) { return sum + (v.n || 0); }, 0) : 0;
      var secId = slugify(artist.name);
      var profileHash = getArtistHash(artist);

      // 1. Sidebar Nav Item
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
        loadArtistGradual(artist); // Start loading this artist immediately if clicked
        var targetSection = document.getElementById(secId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
        updateMobileActiveHeader(artist);
        closeMobileSidebar();
      });
      sidebarList.appendChild(navBtn);

      // 2. Card Wall Section with Clickable Artist Name (Profile Link) & Glowing Loader
      var section = document.createElement("section");
      section.className = "booyah-artist-section";
      section.id = secId;
      section.setAttribute("data-artist-name", artist.name);

      section.innerHTML =
        '<div class="section-artist-banner">' +
          '<a href="' + profileHash + '" class="section-artist-avatar-link" title="View ' + artist.name + ' profile">' +
            '<img class="section-artist-avatar" src="' + (ICON_BASE + artist.icon) + '" alt="' + artist.name + '">' +
          '</a>' +
          '<div class="section-artist-details">' +
            '<a href="' + profileHash + '" class="section-artist-name-link" title="View ' + artist.name + ' profile">' +
              '<h3>' + artist.name + '</h3>' +
            '</a>' +
          '</div>' +
        '</div>' +
        '<div class="artist-loader" id="loader-' + secId + '">' +
          '<div class="artist-loader-inner">' +
            '<img class="artist-loader-logo" src="' + (ICON_BASE + 'BooyahLogo2.png') + '" alt="Booyah! Logo">' +
            '<span class="artist-loader-text">Loading...</span>' +
          '</div>' +
        '</div>' +
        '<div class="artist-cards-container is-loading" id="cards-' + secId + '"></div>';

      var cardsContainer = section.querySelector("#cards-" + secId);

      // Volumes & Raw Cards (use data-src so images are NEVER requested before preloading finishes)
      if (artist.volumes && artist.volumes.length) {
        artist.volumes.forEach(function (vol) {
          var volHeading = document.createElement("div");
          volHeading.className = "volume-heading";
          volHeading.innerHTML = '<span class="volume-pill">' + vol.label + '</span>';
          cardsContainer.appendChild(volHeading);

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
              '<img data-src="' + cardUrl + '" alt="' + artist.name + ' Card #' + i + '">' +
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
          cardsContainer.appendChild(grid);
        });
      }

      wallSections.appendChild(section);
    });

    setupScrollObserver();
    setupMobileDrawerEvents();
    setupGradualScrollLoading();
  }

  // Gradual on-scroll loader: Loads each artist only as the user scrolls to them
  function setupGradualScrollLoading() {
    // 1. Immediately start loading ONLY the first artist (at the top of the page)
    if (ARTISTS.length > 0) {
      loadArtistGradual(ARTISTS[0]);
    }

    // 2. Observe sections and only trigger loading when scrolled towards
    if (!('IntersectionObserver' in window)) {
      ARTISTS.forEach(loadArtistGradual);
      return;
    }

    var scrollLoader = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var artistName = entry.target.getAttribute("data-artist-name");
            var artist = ARTISTS.find(function (a) { return a.name === artistName; });
            if (artist) loadArtistGradual(artist);
            scrollLoader.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "300px 0px 150px 0px", threshold: 0 }
    );

    document.querySelectorAll(".booyah-artist-section").forEach(function (sec) {
      scrollLoader.observe(sec);
    });
  }

  // Preloads 100% of cards for an artist; only reveals when every single image is completely in memory
  function loadArtistGradual(artist) {
    if (!artist) return;
    var secId = slugify(artist.name);
    if (artistLoadStatus[secId]) return; // already loading or loaded
    artistLoadStatus[secId] = "loading";

    var loaderEl = document.getElementById("loader-" + secId);
    var cardsContainer = document.getElementById("cards-" + secId);
    if (!cardsContainer) return;

    var urls = [];
    if (artist.volumes && artist.volumes.length) {
      artist.volumes.forEach(function (vol) {
        for (var i = 1; i <= vol.n; i++) {
          urls.push(CARD_BASE + vol.id + "_" + pad(i) + ".png");
        }
      });
    }

    if (urls.length === 0) {
      artistLoadStatus[secId] = "done";
      revealArtistCards(loaderEl, cardsContainer);
      return;
    }

    var loadedCount = 0;
    var totalCount = urls.length;
    var isRevealed = false;

    function finish() {
      if (isRevealed) return;
      isRevealed = true;
      artistLoadStatus[secId] = "done";
      revealArtistCards(loaderEl, cardsContainer);
    }

    // Generous fallback timeout (20s) so slower connections don't prematurely hide the loader
    var timeout = setTimeout(finish, 20000);

    function onImageReady() {
      loadedCount++;
      if (loadedCount >= totalCount) {
        clearTimeout(timeout);
        finish();
      }
    }

    // Preload into memory first
    urls.forEach(function (url) {
      var img = new Image();
      img.onload = onImageReady;
      img.onerror = onImageReady;
      img.src = url;
    });
  }

  // Once 100% of images are confirmed in memory, set src and fade in with ZERO stutter
  function revealArtistCards(loaderEl, cardsContainer) {
    if (!cardsContainer) return;

    // Apply cached sources to all DOM images
    var imgs = cardsContainer.querySelectorAll("img[data-src]");
    imgs.forEach(function (img) {
      var realSrc = img.getAttribute("data-src");
      if (realSrc) {
        img.src = realSrc;
        img.removeAttribute("data-src");
      }
    });

    // Allow browser compositor to paint cached bitmaps before dropping the loader
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (loaderEl) {
          loaderEl.classList.add("fade-out");
          setTimeout(function () {
            loaderEl.style.display = "none";
            cardsContainer.classList.remove("is-loading");
            cardsContainer.classList.add("fade-in");
          }, 200);
        } else {
          cardsContainer.classList.remove("is-loading");
          cardsContainer.classList.add("fade-in");
        }
      });
    });
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

  // Active section spy on scroll with AUTO-SCROLLING sidebar
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
                // Automatically scroll the sidebar list to keep the highlighted artist in view
                scrollNavIntoView(item);
