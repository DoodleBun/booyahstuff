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

    const image = document.createElement("img");
    image.src = option.image;
    image.alt = option.alt;
    image.loading = "lazy";
    image.referrerPolicy = "no-referrer";

    link.appendChild(image);
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setExploreOpen(false);
      navigateToOption(option.hash);
    });
    link.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setExploreOpen(false);
        navigateToOption(option.hash);
      }
    });
    stageMenu.appendChild(link);
  });

  function navigateToOption(hash) {
    const id = hash.replace(/^#/, "");
    const target =
      document.getElementById(id) ||
      document.querySelector(hash);

    if (target) {
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", hash);
      } else {
        window.location.hash = hash;
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.location.hash = hash;
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
