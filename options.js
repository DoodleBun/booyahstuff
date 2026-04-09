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
    link.href = window.location.href.split("#")[0] + option.hashes[0];
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", option.label);

    const image = document.createElement("img");
    image.src = option.image;
    image.alt = option.alt;
    image.loading = "lazy";
    image.referrerPolicy = "no-referrer";

    link.appendChild(image);

    link.addEventListener("click", (event) => {
      event.stopPropagation();
      setExploreOpen(false);
    }, true);

    link.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setExploreOpen(false);
        window.open(link.href, "_blank", "noopener");
      }
    });

    stageMenu.appendChild(link);
  });

  exploreBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === "function") {
      event.stopImmediatePropagation();
    }
    setExploreOpen(!hero.classList.contains("menu-mode"));
  }, true);

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
