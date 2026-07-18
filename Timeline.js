(function () {

  /* ============================================================
     1. EDIT YOUR TIMELINE HERE
     ------------------------------------------------------------
     Each object below is one stop on the timeline. Add, remove,
     or reorder entries freely — the layout rebuilds itself.

       title       -> the big bold label under the dot (short!)
       date        -> shown under the title (e.g. "June 2024")
       cardTitle   -> the heading inside the card
       description -> the paragraph inside the card
       image       -> leave as "" for the placeholder box, or
                      paste an image URL to show your own artwork,
                      e.g. "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/yourimage.jpg"
       upcoming    -> set to true ONLY for a not-yet-happened
                      milestone (gives it the dashed gold styling)
     ============================================================ */
  const TIMELINE_DATA = [
    {
      title: "Creation of Booyah",
      date: "June 2024",
      cardTitle: "It All Began...",
      description: "DoodleBun sketches out the very first rules and card concepts for Booyah, laying the foundation for a game built for artists, by artists.",
      image: "",
      upcoming: false
    },
    {
      title: "Prototyping",
      date: "September 2024",
      cardTitle: "First Playable Draft",
      description: "The rules get put to the test. Early prototype cards are printed and shuffled to see whether the rock-paper-scissors battle system actually holds up.",
      image: "",
      upcoming: false
    },
    {
      title: "Product Test & Research",
      date: "January 2025",
      cardTitle: "Refining The Game",
      description: "Playtesting with real groups, gathering feedback, and fine-tuning deck sizes, star ratings, and balance ahead of a wider release.",
      image: "",
      upcoming: false
    },
    {
      title: "What's Next",
      date: "2026",
      cardTitle: "The Journey Continues",
      description: "New artists, new booster packs, and new features for the Booyah community. Stay tuned!",
      image: "",
      upcoming: true
    }
  ];

  /* ============================================================
     2. RENDER LOGIC — you shouldn't need to edit anything below
     unless you want to change the HTML structure itself.
     ============================================================ */
  const placeholderIcon = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/>
      <circle cx="8.5" cy="10" r="1.6" fill="currentColor"/>
      <path d="M21 15L16 10L7 19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  function buildItem(entry, index) {
    const item = document.createElement("div");
    item.className = "booyah-tl-item" + (entry.upcoming ? " is-upcoming" : "");

    const imageInner = entry.image
      ? `<img src="${entry.image}" alt="${entry.cardTitle}">`
      : placeholderIcon;

    item.innerHTML = `
      <div class="booyah-tl-rail">
        <div class="booyah-tl-dot"></div>
      </div>
      <div class="booyah-tl-content">
        <div class="booyah-tl-label">
          <p class="booyah-tl-milestone">${entry.title}</p>
          <p class="booyah-tl-date">${entry.date}</p>
        </div>
        <div class="booyah-tl-card">
          <div class="booyah-tl-badge">${index + 1}</div>
          <div class="booyah-tl-image">${imageInner}</div>
          <div class="booyah-tl-body">
            ${entry.upcoming ? '<span class="booyah-tl-pill">Coming Soon</span><br>' : ''}
            <h3>${entry.cardTitle}</h3>
            <p>${entry.description}</p>
          </div>
        </div>
      </div>
    `;
    return item;
  }

  const track = document.getElementById("booyah-tl-track");
  TIMELINE_DATA.forEach((entry, i) => track.appendChild(buildItem(entry, i)));

  /* ============================================================
     3. LINE POSITIONING
     ------------------------------------------------------------
     Measures the actual rendered position of the first and last
     dots and draws a single line straight through their centers.
     This is what keeps the line continuous (no per-item gaps) and
     keeps every dot sitting exactly on top of it, in both the
     horizontal (desktop) and vertical (mobile) layouts.
     ============================================================ */
  const line = document.getElementById("booyah-tl-line");

  function layoutLine() {
    const dots = track.querySelectorAll(".booyah-tl-dot");
    if (dots.length < 2) return;

    const trackRect = track.getBoundingClientRect();
    const firstRect = dots[0].getBoundingClientRect();
    const lastRect = dots[dots.length - 1].getBoundingClientRect();
    const isVertical = window.matchMedia("(max-width: 860px)").matches;

    if (isVertical) {
      const x = firstRect.left + firstRect.width / 2 - trackRect.left;
      const yStart = firstRect.top + firstRect.height / 2 - trackRect.top;
      const yEnd = lastRect.top + lastRect.height / 2 - trackRect.top;
      line.style.left = (x - 1.5) + "px";
      line.style.top = yStart + "px";
      line.style.width = "3px";
      line.style.height = (yEnd - yStart) + "px";
    } else {
      const y = firstRect.top + firstRect.height / 2 - trackRect.top;
      const xStart = firstRect.left + firstRect.width / 2 - trackRect.left;
      const xEnd = lastRect.left + lastRect.width / 2 - trackRect.left;
      line.style.top = (y - 1.5) + "px";
      line.style.left = xStart + "px";
      line.style.height = "3px";
      line.style.width = (xEnd - xStart) + "px";
    }
  }

  // Recalculate whenever anything could shift dot positions.
  window.addEventListener("load", layoutLine);
  document.fonts && document.fonts.ready.then(layoutLine);

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layoutLine, 100);
  });

  requestAnimationFrame(layoutLine);

})();
