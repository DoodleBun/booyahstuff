// supermarquee.js - Updated for Carrd (runs immediately, no pause on hover, icon | name)

(function() {
  const container = document.getElementById('supermarquee');
  if (!container) {
    console.log("💖 supermarquee: div not found yet - trying again in 500ms");
    setTimeout(() => {
      const retry = document.getElementById('supermarquee');
      if (retry) initMarquee(retry);
    }, 500);
    return;
  }
  initMarquee(container);

  function initMarquee(container) {
    const artists = [
      { name: "Aperture", img: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/Aperture.jpg" },
      { name: "Beep",     img: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/Beep.jpg" },
      { name: "Co",       img: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/Co.jpg" },
      { name: "Da",       img: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/da.jpg" },
      { name: "De",       img: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/de.jpg" },
      { name: "Do",       img: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/do.jpg" },
      { name: "Fe",       img: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/fe.jpg" },
      { name: "Ig",       img: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/ig.jpg" },
      { name: "Ka",       img: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/ka.jpg" },
      { name: "Ki",       img: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/ki.jpg" },
      { name: "Le",       img: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/le.jpg" },
      { name: "Va",       img: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/va.jpg" },
      { name: "Ze",       img: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/ze.jpg" },
    ];

    let html = `
      <style>
        #supermarquee {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(8px);
          padding: 18px 0;
          overflow: hidden;
          position: relative;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        .marquee-track {
          display: flex;
          gap: 70px;
          animation: scroll 45s linear infinite;
          padding: 10px 0;
          white-space: nowrap;
        }
        .artist {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          color: #fff;
          text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
          font-family: "Comic Sans MS", cursive, sans-serif;
          font-size: 16px;
          font-weight: bold;
        }
        .artist img {
          width: 52px;
          height: 52px;
          object-fit: cover;
          border-radius: 50%;
          border: 3px solid #fff;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.6);
          transition: transform 0.3s ease;
        }
        .artist:hover img { transform: scale(1.15) rotate(8deg); }
        .separator { font-size: 22px; opacity: 0.7; margin-top: -3px; }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (max-width: 768px) {
          .artist { font-size: 14px; gap: 10px; }
          .artist img { width: 44px; height: 44px; }
          .marquee-track { gap: 50px; }
        }
      </style>
      <div class="marquee-track" id="track"></div>
    `;

    container.innerHTML = html;
    const track = document.getElementById('track');

    let itemsHTML = '';
    artists.forEach(artist => {
      itemsHTML += `
        <div class="artist">
          <img src="${artist.img}" alt="${artist.name}" onerror="this.src='https://via.placeholder.com/52?text=${artist.name}'">
          <span class="separator">|</span>
          <span>${artist.name}</span>
        </div>
      `;
    });

    track.innerHTML = itemsHTML + itemsHTML; // seamless loop
    console.log("💖 supermarquee loaded successfully!");
  }
})();
