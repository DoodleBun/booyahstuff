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
      href: "https://booyahtcg.com/#about",
      image: "https://github.com/DoodleBun/booyahstuff/raw/main/b_ab.jpg.png",
      alt: "Info card"
    },
    {
      label: "Rules",
      href: "https://booyahtcg.com/#rules",
      image: "https://github.com/DoodleBun/booyahstuff/raw/main/b_r.png",
      alt: "Rules card"
    },
    {
      label: "Artists",
      href: "https://booyahtcg.com/#artists",
      image: "https://github.com/DoodleBun/booyahstuff/raw/main/b_a.png",
      alt: "Artists card"
    },
    {
      label: "Card list",
      href: "https://booyahtcg.com/#cardlist",
      image: "https://github.com/DoodleBun/booyahstuff/raw/main/b_c.png",
      alt: "Card list card"
    },
    {
      label: "Socials",
      href: "https://booyahtcg.com/#social",
      image: "https://github.com/DoodleBun/booyahstuff/raw/main/b_s.png",
      alt: "Socials card"
    }
  ];

  OPTION_CARDS.forEach((option) => {
    const link = document.createElement("a");
    link.className = "stage-link";
    link.href = option.href;
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
      navigateToOption(option.href);
    });
    stageMenu.appendChild(link);
  });

  function navigateToOption(url) {
    try {
      if (window.top && window.top !== window.self) {
        window.top.location.href = url;
        return;
      }
    } catch (error) {
      // Fall back to the current window if cross-origin access is blocked.
    }

    window.location.href = url;
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
