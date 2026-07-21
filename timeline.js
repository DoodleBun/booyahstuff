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
      cardTitle: "Project 'RPSB'",
      description: "DoodleBun sketches out the very first concepts for a card game called 'Rock-Paper-Scissors-Boom!', which then evolved and is now known as Booyah!",
      image: "https://raw.githubusercontent.com/DoodleBun/wafrcardbooyahtcgpreview/main/1.jpg",
      upcoming: false
    },
    {
      title: "Prototyping",
      date: "August 2024",
      cardTitle: "Beta Testing",
      description: "The rules get put to the test. Early prototype cards are created to see whether the game battle system actually works properly.",
      image: "https://raw.githubusercontent.com/DoodleBun/wafrcardbooyahtcgpreview/main/2.jpg",
      upcoming: false
    },
    {
      title: "First Sales",
      date: "October 2024",
      cardTitle: "Cards Cards Cards",
      description: "The first few packs from DoodleBun's set and the spread of flyers to invite artists to join this game.",
      image: "https://raw.githubusercontent.com/DoodleBun/wafrcardbooyahtcgpreview/main/3.jpg",
      upcoming: false
    },
    {
      title: "Social Media creation",
      date: "December 2024",
      cardTitle: "Spread The Word",
      description: "Created accounts for various social media (WIP!), such as Twitter, Bluesky, Instagram, and Discord, will be used for updates of all sorts in the future.",
      image: "https://raw.githubusercontent.com/DoodleBun/wafrcardbooyahtcgpreview/main/4.jpg",
      upcoming: false
    },
    {
      title: "Face Of The Game",
      date: "February 2025",
      cardTitle: "Meet The Cast",
      description: "Started with Nikki and Bunbot 3000 as the main mascots, then slowly evolving into its own little bubble with now a cast of 12 characters representing the game.",
      image: "https://raw.githubusercontent.com/DoodleBun/wafrcardbooyahtcgpreview/main/5.jpg",
      upcoming: false
    },
    {
      title: "What's Next",
      date: "2026",
      cardTitle: "The Journey Continues",
      description: "New artists, new booster packs, new game modes, new features and the official release of the main sets with official characters, Stay tuned for more!",
      image: "https://raw.githubusercontent.com/DoodleBun/wafrcardbooyahtcgpreview/main/6.jpg",
      upcoming: true
    }
  ];

  /* ============================================================
     2. RENDER LOGIC
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

  function init() {
    const track = document.getElementById("booyah-tl-track");
    if (!track) return; // container not on this page yet

    // Avoid double-rendering if this script somehow runs twice
    if (track.dataset.booyahRendered === "true") return;
    track.dataset.booyahRendered = "true";

    // The line div lives inside the track already (from the HTML block)
    const line = document.getElementById("booyah-tl-line");

    TIMELINE_DATA.forEach((entry, i) => track.appendChild(buildItem(entry, i)));

    /* ============================================================
       3. LINE POSITIONING
       ============================================================ */
    function layoutLine() {
      const dots = track.querySelectorAll(".booyah-tl-dot");
      if (!line || dots.length < 2) return;

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

    window.addEventListener("load", layoutLine);
    document.fonts && document.fonts.ready.then(layoutLine);

    let resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layoutLine, 100);
    });

    requestAnimationFrame(layoutLine);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", tryInit);
  } else {
    tryInit();
  }

  // Carrd injects embedded HTML via its own script, sometimes AFTER
  // DOMContentLoaded/load has already fired. So instead of assuming
  // #booyah-tl-track exists yet, keep checking for it every 250ms
  // (up to ~15 seconds) until init() actually finds it and succeeds.
  function tryInit() {
    if (document.getElementById("booyah-tl-track")) {
      init();
      return;
    }
    let attempts = 0;
    const waitForTrack = setInterval(function () {
      attempts++;
      if (document.getElementById("booyah-tl-track")) {
        clearInterval(waitForTrack);
        init();
      } else if (attempts > 60) {
        clearInterval(waitForTrack);
        console.warn("Booyah timeline: could not find #booyah-tl-track on the page.");
      }
    }, 250);
  }

})();
