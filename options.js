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
      hash: "#about",
      image: "https://github.com/DoodleBun/booyahstuff/raw/main/b_ab.jpg.png",
      alt: "Info card"
    },
    {
      label: "Rules",
      hash: "#rules",
      image: "https://github.com/DoodleBun/booyahstuff/raw/main/b_r.png",
      alt: "Rules card"
    },
    {
      label: "Artists",
      hash: "#artists",
      image: "https://github.com/DoodleBun/booyahstuff/raw/main/b_a.png",
      alt: "Artists card"
    },
    {
      label: "Card list",
      hash: "#cardlist",
      image: "https://github.com/DoodleBun/booyahstuff/raw/main/b_c.png",
      alt: "Card list card"
    },
    {
      label: "Socials",
      hash: "#social",
      image: "https://github.com/DoodleBun/booyahstuff/raw/main/b_s.png",
      alt: "Socials card"
    }
  ];

  OPTION_CARDS.forEach((option) => {
    const link = document.createElement("button");
    link.className = "stage-link";
    link.type = "button";
    link.setAttribute("aria-label", option.label);
    link.dataset.hash = option.hash;

    const image = document.createElement("img");
    image.src = option.image;
    image.alt = option.alt;
    image.loading = "lazy";
    image.referrerPolicy = "no-referrer";

    link.appendChild(image);
    ["pointerdown", "mousedown", "mouseup", "touchstart", "touchend", "auxclick"].forEach((eventName) => {
      link.addEventListener(eventName, suppressEvent, true);
    });
    link.addEventListener("click", (event) => {
      suppressEvent(event);
      setExploreOpen(false);
      navigateToOption(option.hash);
    }, true);
    link.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        suppressEvent(event);
        setExploreOpen(false);
        navigateToOption(option.hash);
      }
    }, true);
    stageMenu.appendChild(link);
  });

  ["click", "auxclick", "pointerdown", "mousedown", "mouseup", "touchstart", "touchend"].forEach((eventName) => {
    stageMenu.addEventListener(eventName, (event) => {
      if (event.target.closest(".stage-link")) {
        suppressEvent(event);
      }
    }, true);
  });

  ["click", "auxclick", "pointerdown", "mousedown", "mouseup", "touchstart", "touchend"].forEach((eventName) => {
    document.addEventListener(eventName, (event) => {
      if (event.target.closest(".stage-link") || event.target.closest("#exploreBtn")) {
        suppressEvent(event);
      }
    }, true);
  });

  function suppressEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === "function") {
      event.stopImmediatePropagation();
    }
  }

  function navigateToOption(hash) {
    const id = hash.replace(/^#/, "");
    const target = findTarget(document, id, hash);

    if (target) {
      window.location.hash = hash;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.location.hash = hash;
  }

  function findTarget(rootDocument, id, hash) {
    return rootDocument.getElementById(id) || rootDocument.querySelector(hash);
  }

  function setExploreOpen(isOpen) {
    hero.classList.toggle("menu-mode", isOpen);
    exploreBtn.setAttribute("aria-expanded", String(isOpen));
  }

  exploreBtn.addEventListener("click", () => {
    setExploreOpen(!hero.classList.contains("menu-mode"));
  });

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
