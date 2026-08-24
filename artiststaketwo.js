    const CARD_BASE = "https://raw.githubusercontent.com/DoodleBun/wafrcardbooyahtcgpreview/main/";

    const ARTISTS = [
      {
        name: "Aperture Plushies",
        anchor: "#apertureplushies",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/Aperture.jpg",
        trading: true,
        volumes: [{ id: "ap", label: "Volume 1", n: 18 }]
      },
      {
        name: "B.A",
        anchor: "#ba",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/ba.jpg",
        trading: false,
        volumes: [{ id: "ba", label: "Volume 1", n: 10 }]
      },
      {
        name: "Beeps Creatures",
        anchor: "#beepscreatures",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/Beep.jpg",
        trading: true,
        volumes: [{ id: "be", label: "Volume 1", n: 10 }]
      },
      {
        name: "CORKiE",
        anchor: "#corkie",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/Co.jpg",
        trading: true,
        volumes: [{ id: "co", label: "Volume 1", n: 10 }]
      },
      {
        name: "DapperTetu",
        anchor: "#dappertetu",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/da.jpg",
        trading: false,
        comingSoon: true
      },
      {
        name: "Dead Bois",
        anchor: "#deadbois",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/de.jpg",
        trading: true,
        volumes: [{ id: "de", label: "Volume 1", n: 10 }]
      },
      {
        name: "DoodleBun",
        anchor: "#doodlebun",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/do.jpg",
        trading: true,
        volumes: [
          { id: "do",  label: "Volume 1", n: 18 },
          { id: "do2", label: "Volume 2", n: 18 }
        ]
      },
      {
        name: "Feral Foliage",
        anchor: "#feralfoliage",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/fe.jpg",
        trading: false,
        volumes: [
          { id: "fe",  label: "Volume 1", n: 10 },
          { id: "fe2", label: "Volume 2", n: 10 },
          { id: "fe3", label: "Volume 3", n: 10 }
        ]
      },
      {
        name: "Igor1908",
        anchor: "#igor1908",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/ig.jpg",
        trading: false,
        comingSoon: true
      },
      {
        name: "JackTheWolf528",
        anchor: "#jackthewolf528",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/jtw.jpg",
        trading: false,
        comingSoon: true
      },
      {
        name: "Kaladania",
        anchor: "#kaladania",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/ka.jpg",
        trading: false,
        volumes: [{ id: "ka", label: "Volume 1", n: 10 }]
      },
      {
        name: "Kirava1",
        anchor: "#kirava1",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/ki.jpg",
        trading: true,
        volumes: [{ id: "ki", label: "Volume 1", n: 10 }]
      },
      {
        name: "LewdSideQuest",
        anchor: "#lewdsidequest",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/le.jpg",
        trading: false,
        comingSoon: true
      },
      {
        name: "M.McRobo",
        anchor: "#mmcrobo",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/mc.png",
        trading: true,
        volumes: [{
          id: "mm",
          label: "Volume 1",
          n: 10,
          // Use the repository's exact M.McRobo filenames.
          files: ["mm_01.png", "mm_02.png", "mm_03.png", "mm_04.png", "mm_05.png", "mm_06.png", "mm_07.png", "mm_08.png", "mm_09.png", "mm_10.png"]
        }]
      },
      {
        name: "NekoPumpkin",
        anchor: "#nekopumpkin",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/np.png",
        trading: false,
        comingSoon: true
      },
      {
        name: "Valkyrie Art",
        anchor: "#valkyrieart",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/va.jpg",
        trading: true,
        volumes: [{ id: "va", label: "Volume 1", n: 18 }]
      },
      {
        name: "WhisperFluff",
        anchor: "#whisperfluff",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/Wf.jpg",
        trading: false,
        comingSoon: true
      },
      {
        name: "Zenelionn",
        anchor: "#zenelionn",
        image: "https://github.com/DoodleBun/booyahstuff/raw/main/ze.jpg",
        trading: true,
        volumes: [{ id: "ze", label: "Volume 1", n: 10 }]
      }
    ];

    const FILTERS = ["ALL","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    let activeFilter = "ALL";
    let tradingOnly = false;

    // State variables for Drawer and Lightbox
    let currentArtistCards = [];
    let currentCardIndex = 0;
    let isDragging = false;
    let startY = 0;
    let currentDeltaY = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    /* =========================================================================
       HELPER FUNCTIONS
       ========================================================================= */
    function pad(n) { return n < 10 ? "0" + n : "" + n; }

    function totalCards(artist) {
      if (artist.comingSoon || !artist.volumes || !Array.isArray(artist.volumes)) return 0;
      return artist.volumes.reduce(function(sum, vol) { return sum + (vol.n || 0); }, 0);
    }

    function cardUrl(vol, i) {
      if (Array.isArray(vol.files) && vol.files[i - 1]) {
        return CARD_BASE + vol.files[i - 1];
      }
      return CARD_BASE + vol.id + "_" + pad(i) + ".png";
    }

    /* =========================================================================
       GRID RENDERING & WIDGET CONTROLS
       ========================================================================= */
    function buildFilterBar() {
      const bar = document.getElementById("filterBar");
      FILTERS.forEach(f => {
        const btn = document.createElement("button");
        btn.className = "filter-btn" + (f === "ALL" ? " active" : "");
        btn.textContent = f;
        btn.dataset.filter = f;
        btn.onclick = () => {
          activeFilter = f;
          document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          render();
        };
        bar.appendChild(btn);
      });
    }

    function toggleTrading() {
      tradingOnly = !tradingOnly;
      document.getElementById("tradeToggle").classList.toggle("on", tradingOnly);
      render();
    }

    function render() {
      const q = document.getElementById("search").value.toLowerCase().trim();
      const grid = document.getElementById("grid");

      const filtered = ARTISTS.filter(a => {
        const matchSearch = a.name.toLowerCase().includes(q);
        const matchFilter = activeFilter === "ALL" ? true : a.name.toUpperCase().startsWith(activeFilter);
        const matchTrading = tradingOnly ? a.trading : true;
        return matchSearch && matchFilter && matchTrading;
      });

      grid.innerHTML = "";

      if (filtered.length === 0) {
        return;
      }

      filtered.forEach((a, i) => {
        const card = document.createElement("a");
        card.className = "artist-card";
        card.href = "https://booyahtcg.com/" + a.anchor;
        card.style.animationDelay = (i * 40) + "ms";

        // Prevent default navigation and open the drawer instead
        card.onclick = (e) => {
          e.preventDefault();
          openDrawer(a);
        };

        const img = document.createElement("img");
        img.className = "card-img";
        img.src = a.image;
        img.alt = a.name;
        img.onerror = function() {
          this.style.display = "none";
          const fallback = document.createElement("div");
          fallback.style.cssText = "width:100%;aspect-ratio:1;background:linear-gradient(135deg,#4a90d922,#4a90d944);display:flex;align-items:center;justify-content:center;font-family:'Russo One',sans-serif;font-size:2rem;color:#2c6fad;";
          fallback.textContent = a.name[0].toUpperCase();
          this.parentNode.insertBefore(fallback, this);
        };

        const body = document.createElement("div");
        body.className = "card-body";

        const name = document.createElement("div");
        name.className = "card-name";
        name.textContent = a.name;

        const meta = document.createElement("div");
        meta.className = "card-meta";

        const dot = document.createElement("div");
        dot.className = "trade-dot " + (a.trading ? "yes" : "no");

        const label = document.createElement("span");
        label.textContent = a.trading ? "Trading" : "Not trading";

        meta.appendChild(dot);
        meta.appendChild(label);
        card.appendChild(img);
        card.appendChild(body);
        body.appendChild(name);
        body.appendChild(meta);
        grid.appendChild(card);
      });
    }

    /* =========================================================================
       DRAWER OPERATIONS
       ========================================================================= */
    function openDrawer(artist) {
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

      if (drawerAvatar) { 
        drawerAvatar.src = artist.image; 
        drawerAvatar.alt = artist.name; 
      }
      if (drawerTitle) {
        drawerTitle.textContent = artist.name;
      }
      if (drawerProfileBtn) {
        let url = artist.anchor || "#";
        if (url.startsWith("#")) {
          url = "https://booyahtcg.com/" + url;
        }
        drawerProfileBtn.href = url;
      }

      if (drawerBody) {
        drawerBody.innerHTML = "";

        const loader = createDrawerLoader();
        drawerBody.appendChild(loader);

        if (isComingSoon) {
          // Every artist gets a Volume 1 heading, including artists whose cards
          // are still being prepared.
          const volumeBlock = document.createElement("section");
          volumeBlock.className = "volume-block";

          const divider = document.createElement("div");
          divider.className = "volume-divider";
          divider.textContent = "Volume 1";
          volumeBlock.appendChild(divider);

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
          volumeBlock.appendChild(comingSoonBlock);
          drawerBody.appendChild(volumeBlock);
        } else {
          artist.volumes.forEach(function(vol) {
            const block = document.createElement("section");
            block.className = "volume-block";

            const divider = document.createElement("div");
            divider.className = "volume-divider";
            divider.textContent = vol.label;
            block.appendChild(divider);

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

        waitForDrawerImages(drawerBody).then(function() {
          loader.classList.add("is-hidden");
          setTimeout(function() { loader.remove(); }, 220);
        });
      }

      // Reset transforms
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

    function createDrawerLoader() {
      const loader = document.createElement("div");
      loader.className = "drawer-loading";
      loader.setAttribute("aria-live", "polite");

      const logo = document.createElement("img");
      logo.src = "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/BooyahLogo2.png";
      logo.alt = "Loading";

      const label = document.createElement("span");
      label.textContent = "Loading cards";

      loader.appendChild(logo);
      loader.appendChild(label);
      return loader;
    }

    function waitForDrawerImages(container) {
      const images = Array.prototype.slice.call(container.querySelectorAll(".card-slot img"));
      if (images.length === 0) return Promise.resolve();

      const waits = images.map(function(img) {
        if (img.complete) return Promise.resolve();
        return new Promise(function(resolve) {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      });

      // Never leave the drawer blocked if a remote image server is slow.
      const timeout = new Promise(function(resolve) { setTimeout(resolve, 15000); });
      return Promise.race([Promise.all(waits), timeout]);
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
      }, 320);
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
      // Card images are created only after an artist is clicked, then loaded
      // together behind the drawer loader instead of during page load.
      img.loading = "eager";
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

    /* =========================================================================
       DRAG-TO-CLOSE FUNCTIONALITY
       ========================================================================= */
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
        drawer.style.transform = "translate(-50%, " + currentDeltaY + "px)";
      } else {
        drawer.style.transform = "translateY(" + currentDeltaY + "px)";
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

    /* =========================================================================
       LIGHTBOX OPERATIONS
       ========================================================================= */
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

    /* =========================================================================
       CARD SECURITY & DRM (Prevent right click / drag / screenshots)
       ========================================================================= */
    document.addEventListener("contextmenu", function(e) {
      if (e.target.closest(".card-slot") || e.target.closest(".lightbox")) {
        e.preventDefault();
        return false;
      }
    });

    document.addEventListener("dragstart", function(e) {
      if (e.target.tagName === "IMG" && e.target.closest("#booyah-artists-embed")) {
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

    /* =========================================================================
       EVENT LISTENERS INITIALIZATION
       ========================================================================= */
    function initListeners() {
      const drawerHeader = document.getElementById("drawer-header");
      const backdrop = document.getElementById("backdrop");
      const lightboxPrev = document.getElementById("lightbox-prev");
      const lightboxNext = document.getElementById("lightbox-next");
      const lightboxClose = document.getElementById("lightbox-close");
      const lightbox = document.getElementById("lightbox");

      // Drawer Drag-to-close listeners
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

      // Close drawer on clicking backdrop
      if (backdrop) {
        backdrop.addEventListener("click", closeDrawer);
      }

      // Lightbox listeners
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

      // Global Drag & Key Listeners
      window.addEventListener("mousemove", function(e) { if (isDragging) handleDragMove(e.clientY); });
      window.addEventListener("mouseup", function() { if (isDragging) handleDragEnd(); });
      window.addEventListener("touchmove", function(e) { if (isDragging) handleDragMove(e.touches[0].clientY); }, { passive: true });
      window.addEventListener("touchend", function() { if (isDragging) handleDragEnd(); });

      document.addEventListener("keydown", function(e) {
        const lb = document.getElementById("lightbox");
        const dr = document.getElementById("drawer");
        if (lb && !lb.hidden) {
          if (e.key === "Escape") closeLightbox();
          else if (e.key === "ArrowLeft") showPrevCard();
          else if (e.key === "ArrowRight") showNextCard();
        } else if (dr && dr.classList.contains("open")) {
          if (e.key === "Escape") closeDrawer();
        }
      });
    }

    // Run Initial Setup
    buildFilterBar();
    render();
    initListeners();
