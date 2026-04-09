(function () {
  // Wait until the randomizer has finished creating the cards
  function initOptions() {
    const hero = document.querySelector(".hero") || document.body; // fallback
    const exploreBtn = document.getElementById("exploreBtn");
    const stageMenu = document.getElementById("stageMenu");

    if (!exploreBtn || !stageMenu) {
      console.warn("Explore elements not found yet — retrying...");
      setTimeout(initOptions, 800);
      return;
    }

    const OPTION_CARDS = [
      {
        href: "https://booyahtcg.com/#about",
        image: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/b_ab.jpg.png",
        label: "About"
      },
      {
        href: "https://booyahtcg.com/#rules",
        image: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/b_r.png",
        label: "Rules"
      },
      {
        href: "https://booyahtcg.com/#artists",
        image: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/b_a.png",
        label: "Artists"
      },
      {
        href: "https://booyahtcg.com/#cardlist",
        image: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/b_c.png",
        label: "Cards"
      },
      {
        href: "https://booyahtcg.com/#social",
        image: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/b_s.png",
        label: "Socials"
      }
    ];

    // Clear and rebuild menu
    stageMenu.innerHTML = "";

    OPTION_CARDS.forEach((opt) => {
      const link = document.createElement("a");
      link.href = opt.href;
      link.className = "stage-link";
      link.setAttribute("aria-label", opt.label);

      const img = document.createElement("img");
      img.src = opt.image;
      img.alt = opt.label;
      img.loading = "lazy";
      img.referrerPolicy = "no-referrer";

      link.appendChild(img);
      stageMenu.appendChild(link);
    });

    // Toggle logic
    let isOpen = false;

    exploreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      isOpen = !isOpen;
      hero.classList.toggle("menu-mode", isOpen);
      exploreBtn.setAttribute("aria-expanded", isOpen);
    });

    // Close when clicking outside
    document.addEventListener("click", (event) => {
      if (!exploreBtn.contains(event.target) && !stageMenu.contains(event.target)) {
        isOpen = false;
        hero.classList.remove("menu-mode");
        exploreBtn.setAttribute("aria-expanded", "false");
      }
    });

    // Escape key support
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isOpen) {
        isOpen = false;
        hero.classList.remove("menu-mode");
        exploreBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Run after page load + a small delay so cards appear first
  window.addEventListener("load", () => {
    setTimeout(initOptions, 600);
  });
})();
