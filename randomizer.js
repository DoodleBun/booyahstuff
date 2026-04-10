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
    const overlay = document.getElementById("starOverlay");
    if (overlay) {
      overlay.className = "star-overlay";
    }

    document.querySelectorAll(".spark, .particle").forEach((el) => el.remove());
  }

  function showStarBurst(cardEl) {
    const overlay = document.getElementById("starOverlay");
    if (!overlay) return;

    // Show overlay
    overlay.className = "star-overlay show";

    // Pick a random exclamation
    const phrases = ["WOW!", "GREAT!", "SUPER!", "AWESOME!"];
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    const wowEl = overlay.querySelector(".wow-line");
    if (wowEl) wowEl.textContent = phrase;

    // Spawn sparkles continuously while overlay is visible
    const sparkEmojis = ["✨", "⭐", "🌟", "💫", "✨", "⭐", "🌟", "💥", "✨", "💛"];
    let sparkInterval = setInterval(() => {
      for (let i = 0; i < 3; i++) {
        const spark = document.createElement("div");
        spark.className = "spark";
        spark.textContent = sparkEmojis[Math.floor(Math.random() * sparkEmojis.length)];

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const startX = vw * 0.1 + Math.random() * vw * 0.8;
        const startY = vh * 0.1 + Math.random() * vh * 0.8;

        const angle = Math.random() * Math.PI * 2;
        const dist = 80 + Math.random() * 200;
        const size = 20 + Math.random() * 36;
        const dur = 0.7 + Math.random() * 0.4;
        const spin = `${(Math.random() - 0.5) * 360}deg`;

        spark.style.left = `${startX}px`;
        spark.style.top = `${startY}px`;
        spark.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
        spark.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
        spark.style.setProperty("--sz", `${size}px`);
        spark.style.setProperty("--dur", `${dur}s`);
        spark.style.setProperty("--delay", "0s");
        spark.style.setProperty("--spin", spin);
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), dur * 1000 + 100);
      }
    }, 100);

    // Hide after 0.8 seconds
    setTimeout(() => {
      clearInterval(sparkInterval);
      overlay.classList.add("hide");
      overlay.classList.remove("show");
      setTimeout(() => {
        overlay.className = "star-overlay";
      }, 400);
    }, 800);
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
