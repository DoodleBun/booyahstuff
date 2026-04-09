/* =====================================================
   Booyah Nav Buttons — nav-buttons.js
   Injects the "Explore" button + 5 artwork nav buttons
   below the card randomizer stage.
   ===================================================== */

(function () {
  /* ── Config ─────────────────────────────────────── */
  const NAV_ITEMS = [
    {
      label: "About",
      href: "https://booyahtcg.com/#about",
      src: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/b_ab.jpg.png",
    },
    {
      label: "Rules",
      href: "https://booyahtcg.com/#rules",
      src: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/b_r.png",
    },
    {
      label: "Artists",
      href: "https://booyahtcg.com/#artists",
      src: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/b_a.png",
    },
    {
      label: "Cards",
      href: "https://booyahtcg.com/#cardlist",
      src: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/b_c.png",
    },
    {
      label: "Socials",
      href: "https://booyahtcg.com/#social",
      src: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/b_s.png",
    },
  ];

  const FLOAT_DURATIONS = [6.9, 7.3, 6.6, 7.1, 6.8];
  const FLOAT_DELAYS    = [-1.1, -2.4, -0.7, -3.1, -1.8];

  /* ── CSS ─────────────────────────────────────────── */
  const style = document.createElement("style");
  style.textContent = `
    /* ── Explore button ── */
    .explore-wrap {
      display: flex;
      justify-content: center;
      padding: 18px 0 4px;
    }

    .explore-btn {
      position: relative;
      padding: 0 36px;
      height: 52px;
      border: none;
      border-radius: 999px;
      cursor: pointer;
      font-family: "Segoe UI", sans-serif;
      font-size: 17px;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: #4a3000;
      background: linear-gradient(
        135deg,
        #ffe066 0%,
        #ffd700 20%,
        #ffb800 40%,
        #e89400 55%,
        #ffd700 70%,
        #fff0a0 85%,
        #ffd700 100%
      );
      box-shadow:
        0 2px 0 #a06a00,
        0 4px 0 #7a4e00,
        0 6px 0 rgba(0,0,0,0.18),
        0 8px 18px rgba(200,130,0,0.28),
        inset 0 1px 0 rgba(255,255,220,0.65);
      transform: translateY(0);
      transition: transform 0.12s cubic-bezier(0.34,1.56,0.64,1),
                  box-shadow 0.12s ease,
                  filter 0.12s ease;
      user-select: none;
      overflow: hidden;
    }

    .explore-btn::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 999px;
      background: linear-gradient(
        115deg,
        transparent 30%,
        rgba(255,255,200,0.55) 48%,
        transparent 66%
      );
      pointer-events: none;
    }

    .explore-btn:hover {
      filter: brightness(1.06);
    }

    .explore-btn:active {
      transform: translateY(4px);
      box-shadow:
        0 0 0 #a06a00,
        0 1px 0 #7a4e00,
        0 2px 6px rgba(200,130,0,0.22),
        inset 0 1px 0 rgba(255,255,220,0.65);
    }

    /* ── Nav cards row ── */
    .booyah-nav-row {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 0;
      padding: 8px 0 20px;
      position: relative;
      height: 0;
      overflow: hidden;
      transition: height 0.42s cubic-bezier(0.4, 0, 0.2, 1),
                  opacity 0.35s ease,
                  padding 0.35s ease;
      opacity: 0;
      pointer-events: none;
      --nav-fan-outer: 220px;
      --nav-fan-inner: 110px;
      --nav-center-y: -18px;
      --nav-inner-y: -22px;
      --nav-outer-y: -28px;
    }

    .booyah-nav-row.open {
      height: 230px;
      opacity: 1;
      pointer-events: auto;
    }

    /* ── Individual nav card ── */
    .nav-card-wrap {
      position: absolute;
      bottom: 20px;
      width: 140px;
      height: 198px;
      transform-origin: center bottom;
      cursor: pointer;
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                  filter 0.25s;
      animation: nav-float var(--nfd, 6.8s) ease-in-out infinite alternate;
      text-decoration: none;
    }

    .nav-card-wrap:nth-child(1) {
      transform: rotate(-4deg) translateX(calc(var(--nav-fan-outer) * -1)) translateY(var(--nav-outer-y));
      --nav-rot: -4deg;
      --nav-tx: calc(var(--nav-fan-outer) * -1);
      --nav-ty: var(--nav-outer-y);
    }
    .nav-card-wrap:nth-child(2) {
      transform: rotate(-2deg) translateX(calc(var(--nav-fan-inner) * -1)) translateY(var(--nav-inner-y));
      --nav-rot: -2deg;
      --nav-tx: calc(var(--nav-fan-inner) * -1);
      --nav-ty: var(--nav-inner-y);
    }
    .nav-card-wrap:nth-child(3) {
      transform: rotate(0deg) translateX(0) translateY(var(--nav-center-y));
      --nav-rot: 0deg;
      --nav-tx: 0;
      --nav-ty: var(--nav-center-y);
    }
    .nav-card-wrap:nth-child(4) {
      transform: rotate(2deg) translateX(var(--nav-fan-inner)) translateY(var(--nav-inner-y));
      --nav-rot: 2deg;
      --nav-tx: var(--nav-fan-inner);
      --nav-ty: var(--nav-inner-y);
    }
    .nav-card-wrap:nth-child(5) {
      transform: rotate(4deg) translateX(var(--nav-fan-outer)) translateY(var(--nav-outer-y));
      --nav-rot: 4deg;
      --nav-tx: var(--nav-fan-outer);
      --nav-ty: var(--nav-outer-y);
    }

    .nav-card-wrap:hover {
      transform: rotate(var(--nav-rot)) translateX(var(--nav-tx)) translateY(calc(var(--nav-ty) - 18px)) scale(1.05);
      filter: drop-shadow(0 14px 22px rgba(0,0,0,0.22));
      z-index: 10;
    }

    .nav-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;
    }

    .nav-card-inner img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
      transform: scale(1.08);
      transform-origin: center;
      pointer-events: none;
    }

    /* sheen on hover */
    .nav-card-inner::after {
      content: "";
      position: absolute;
      inset: -20%;
      background: linear-gradient(
        115deg,
        transparent 22%,
        rgba(255,255,255,0.05) 36%,
        rgba(255,255,255,0.65) 48%,
        rgba(153,240,255,0.30) 54%,
        rgba(255,182,193,0.24) 60%,
        transparent 72%
      );
      opacity: 0;
      transform: translateX(-90%) rotate(8deg);
      transition: opacity 0.22s ease, transform 0.6s ease;
      mix-blend-mode: screen;
      pointer-events: none;
    }

    .nav-card-wrap:hover .nav-card-inner::after {
      opacity: 1;
      transform: translateX(88%) rotate(8deg);
    }

    @keyframes nav-float {
      from { margin-bottom: 0; }
      to   { margin-bottom: 14px; }
    }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .booyah-nav-row {
        --nav-fan-outer: 160px;
        --nav-fan-inner: 80px;
        --nav-center-y: -14px;
        --nav-inner-y: -18px;
        --nav-outer-y: -22px;
      }
      .nav-card-wrap { width: 110px; height: 155px; }
      .booyah-nav-row.open { height: 190px; }
    }

    @media (max-width: 640px) {
      .booyah-nav-row {
        --nav-fan-outer: 120px;
        --nav-fan-inner: 60px;
        --nav-center-y: -8px;
        --nav-inner-y: -12px;
        --nav-outer-y: -16px;
      }
      .nav-card-wrap { width: 74px; height: 104px; }
      .booyah-nav-row.open { height: 145px; }
    }

    @media (max-width: 480px) {
      .booyah-nav-row {
        --nav-fan-outer: 98px;
        --nav-fan-inner: 49px;
      }
      .nav-card-wrap { width: 62px; height: 88px; }
      .booyah-nav-row.open { height: 128px; }
    }
  `;
  document.head.appendChild(style);

  /* ── Build DOM ───────────────────────────────────── */
  function buildNavSection() {
    const shell = document.querySelector(".randomizer-shell");
    if (!shell) {
      console.warn("[nav-buttons] .randomizer-shell not found — retrying…");
      return false;
    }

    /* Explore button */
    const exploreWrap = document.createElement("div");
    exploreWrap.className = "explore-wrap";

    const exploreBtn = document.createElement("button");
    exploreBtn.className = "explore-btn";
    exploreBtn.textContent = "Explore";
    exploreBtn.setAttribute("aria-expanded", "false");
    exploreBtn.setAttribute("aria-controls", "booyah-nav-row");
    exploreWrap.appendChild(exploreBtn);
    shell.appendChild(exploreWrap);

    /* Nav row */
    const navRow = document.createElement("div");
    navRow.className = "booyah-nav-row";
    navRow.id = "booyah-nav-row";
    navRow.setAttribute("role", "navigation");
    navRow.setAttribute("aria-label", "Site navigation");

    NAV_ITEMS.forEach(function (item, i) {
      const link = document.createElement("a");
      link.className = "nav-card-wrap";
      link.href = item.href;
      link.title = item.label;
      link.setAttribute("aria-label", item.label);
      link.style.setProperty("--nfd", FLOAT_DURATIONS[i] + "s");
      link.style.animationDelay = FLOAT_DELAYS[i] + "s";

      const inner = document.createElement("div");
      inner.className = "nav-card-inner";

      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.label;
      img.loading = "lazy";
      img.draggable = false;

      inner.appendChild(img);
      link.appendChild(inner);
      navRow.appendChild(link);
    });

    shell.appendChild(navRow);

    /* ── Toggle logic ─────────────────────────────── */
    let open = false;

    exploreBtn.addEventListener("click", function () {
      open = !open;
      navRow.classList.toggle("open", open);
      exploreBtn.setAttribute("aria-expanded", String(open));
    });

    return true;
  }

  /* Wait for .randomizer-shell to exist */
  if (!buildNavSection()) {
    const observer = new MutationObserver(function () {
      if (buildNavSection()) {
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
