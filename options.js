(function () {
  const hero = document.querySelector(".hero");
  const exploreNav = document.getElementById("exploreNav");
  const exploreBtn = document.getElementById("exploreBtn");
  const stageMenu = document.getElementById("stageMenu");

  if (!hero || !exploreNav || !exploreBtn || !stageMenu) {
    return;
  }

  const OPTION_CARDS = [
    {
      label: "Info",
      hashes: ["#about", "#home"],
      image: "https://github.com/DoodleBun/booyahstuff/raw/main/b_ab.jpg.png",
      alt: "Info card"
    },
    {
      label: "Rules",
      hashes: ["#rules"],
      image: "https://github.com/DoodleBun/booyahstuff/raw/main/b_r.png",
      alt: "Rules card"
    },
    {
      label: "Artists",
      hashes: ["#artists"],
      image: "https://github.com/DoodleBun/booyahstuff/raw/main/b_a.png",
      alt: "Artists card"
    },
    {
      label: "Card list",
      hashes: ["#card-list", "#cardlist"],
      image: "https://github.com/DoodleBun/booyahstuff/raw/main/b_c.png",
      alt: "Card list card"
    },
    {
      label: "Socials",
      hashes: ["#social-media", "#social"],
      image: "https://github.com/DoodleBun/booyahstuff/raw/main/b_s.png",
      alt: "Socials card"
    }
  ];

  OPTION_CARDS.forEach((option) => {
    const link = document.createElement("a");
    link.className = "stage-link";
    link.href = option.hashes[0];
    link.target = "_self";
    link.setAttribute("aria-label", option.label);
    link.dataset.hash = option.hashes[0];

    const image = document.createElement("img");
    image.src = option.image;
    image.alt = option.alt;
    image.loading = "lazy";
    image.referrerPolicy = "no-referrer";

    link.appendChild(image);
    link.addEventListener("click", (event) => {
      event.stopPropagation();
      setExploreOpen(false);
      navigateToOption(option.hashes, event);
    }, true);
    link.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        suppressEvent(event);
        setExploreOpen(false);
        navigateToOption(option.hashes, event);
      }
    });
    stageMenu.appendChild(link);
  });

  bindButtonShield(exploreBtn, () => {
    setExploreOpen(!hero.classList.contains("menu-mode"));
  });

  function suppressEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === "function") {
      event.stopImmediatePropagation();
    }
  }

  function bindButtonShield(button, onActivate) {
    button.addEventListener("click", (event) => {
      suppressEvent(event);
      onActivate();
    }, true);
  }

  function navigateToOption(hashes, event) {
    const matchedHash = hashes.find((hash) => {
      const id = hash.replace(/^#/, "");
      return Boolean(findTarget(document, id, hash));
    });
    const hash = matchedHash || hashes[0];
    const id = hash.replace(/^#/, "");
    const target = findTarget(document, id, hash);

    if (target) {
      suppressEvent(event);
      window.location.hash = hash;
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    suppressEvent(event);
    window.location.hash = hash;
  }

  function findTarget(rootDocument, id, hash) {
    const escapedId = escapeSelector(id);

    return (
      rootDocument.getElementById(id) ||
      rootDocument.querySelector(hash) ||
      rootDocument.querySelector(`[data-scroll-id="${escapedId}"]`) ||
      rootDocument.querySelector(`[data-section="${escapedId}"]`) ||
      rootDocument.querySelector(`[name="${escapedId}"]`)
    );
  }

  function escapeSelector(value) {
    if (window.CSS && typeof window.CSS.escape === "function") {
      return window.CSS.escape(value);
    }

    return String(value).replace(/["\\]/g, "\\$&");
  }

  function setExploreOpen(isOpen) {
    hero.classList.toggle("menu-mode", isOpen);
    exploreBtn.setAttribute("aria-expanded", String(isOpen));
  }

  document.addEventListener("click", (event) => {
    if (!exploreNav.contains(event.target) && !event.target.closest(".stage-menu")) {
      setExploreOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setExploreOpen(false);
    }
  });
}());
