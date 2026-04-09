(function () {
  const BACK_URL = "https://doodlebun.github.io/booyahstuff/BACK.jpg";
  const RAW = "https://doodlebun.github.io/wafrcardbooyahtcgpreview/";
  const stage = document.getElementById("stage");
  if (!stage) {
    return;
  }

  const ALL_CARDS = [
    ...Array.from({ length: 16 }, (_, i) => ({ file: `ap_${String(i + 1).padStart(2, "0")}.png`, stars: i < 16 ? 1 : 3 })),
    { file: "ap_17.png", stars: 3 },
    { file: "ap_18.png", stars: 3 },
    ...Array.from({ length: 9 }, (_, i) => ({ file: `be_${String(i + 1).padStart(2, "0")}.png`, stars: 1 })),
    { file: "be_10.png", stars: 3 },
    ...Array.from({ length: 9 }, (_, i) => ({ file: `co_${String(i + 1).padStart(2, "0")}.png`, stars: 1 })),
    { file: "co_10.png", stars: 3 },
    ...Array.from({ length: 16 }, (_, i) => ({ file: `do_${String(i + 1).padStart(2, "0")}.png`, stars: 1 })),
    { file: "do_17.png", stars: 3 },
    { file: "do_18.png", stars: 3 },
    ...Array.from({ length: 16 }, (_, i) => ({ file: `do2_${String(i + 1).padStart(2, "0")}.png`, stars: 1 })),
    { file: "do2_17.png", stars: 3 },
    { file: "do2_18.png", stars: 3 },
    ...Array.from({ length: 5 }, (_, i) => ({ file: `fe_${String(i + 1).padStart(2, "0")}.png`, stars: 1 })),
    ...Array.from({ length: 9 }, (_, i) => ({ file: `fe2_${String(i + 1).padStart(2, "0")}.png`, stars: 1 })),
    { file: "fe2_10.png", stars: 3 },
    ...Array.from({ length: 9 }, (_, i) => ({ file: `fe3_${String(i + 1).padStart(2, "0")}.png`, stars: 1 })),
    { file: "fe3_10.png", stars: 3 }
  ];

  const seen = new Set();
  const CARDS = ALL_CARDS.filter((card) => {
    if (seen.has(card.file)) {
      return false;
    }
    seen.add(card.file);
    return true;
  });

  function pickRandom(arr, n) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  }

  function resetStageEffects() {
    const pop = document.getElementById("starPop");
    if (pop) {
      pop.className = "star-pop";
      pop.textContent = "";
    }

    document.querySelectorAll(".particle").forEach((particle) => {
      particle.remove();
    });
  }

  function showStarBurst(cardEl) {
    const pop = document.getElementById("starPop");
    if (!pop) {
      return;
    }

    pop.textContent = "\u2B50\u2B50\u2B50 Wow! \u2B50\u2B50\u2B50";
    pop.className = "star-pop show";
    setTimeout(() => pop.classList.add("hide"), 900);
    setTimeout(() => {
      pop.className = "star-pop";
    }, 1400);

    const rect = cardEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const emojis = ["\u2728", "\u2B50", "\u{1F31F}", "\u{1F4AB}", "\u2728", "\u2B50"];

    emojis.forEach((emoji, j) => {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.textContent = emoji;

      const angle = (j / emojis.length) * Math.PI * 2;
      const dist = 80 + Math.random() * 60;
      particle.style.left = `${cx}px`;
      particle.style.top = `${cy}px`;
      particle.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      particle.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    });
  }

  function renderCards() {
    stage.innerHTML = "";
    resetStageEffects();

    const chosen = pickRandom(CARDS, 5);

    chosen.forEach((card) => {
      const wrap = document.createElement("div");
      wrap.className = `card-wrap${card.stars === 3 ? " three-star" : ""}`;
      wrap.setAttribute("role", "button");
      wrap.setAttribute("tabindex", "0");
      wrap.setAttribute("aria-label", "Reveal card");
      wrap.innerHTML = `
        <div class="card-inner">
          <div class="card-face card-back">
            <img src="${BACK_URL}" alt="Card back" loading="eager" referrerpolicy="no-referrer">
          </div>
          <div class="card-face card-front">
            <img src="${RAW}${card.file}" alt="Booyah card" loading="lazy" referrerpolicy="no-referrer">
          </div>
        </div>
      `;

      let clicked = false;
      const revealCard = () => {
        if (clicked) {
          return;
        }

        clicked = true;
        wrap.classList.add("flipping");

        setTimeout(() => {
          wrap.classList.add("flipped");
          wrap.classList.remove("flipping");

          if (card.stars === 3) {
            showStarBurst(wrap);
          }
        }, 50);
      };

      wrap.addEventListener("click", revealCard);
      wrap.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          revealCard();
        }
      });

      stage.appendChild(wrap);
    });
  }

  window.refreshBooyahCards = renderCards;
  renderCards();
}());
