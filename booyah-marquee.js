// ==================== BOOYAH ARTIST MARQUEE ====================
(function() {
  const root = document.getElementById('booyahcardfanoptions');
  if (!root || document.getElementById('booyah-new-marquee')) return;

  const artists = [
    {name:'Aperture Plushies', file:'Aperture.jpg'},
    {name:'Beeps Creatures',   file:'Beep.jpg'},
    {name:'CORKiE',            file:'Co.jpg'},
    {name:'DapperTetu',        file:'da.jpg'},
    {name:'Dead Boi Creations',file:'de.jpg'},
    {name:'DoodleBun',         file:'do.jpg'},
    {name:'Feral Foliage',     file:'fe.jpg'},
    {name:'Igor1908',          file:'ig.jpg'},
    {name:'Kaladania',         file:'ka.jpg'},
    {name:'Kirava1',           file:'ki.jpg'},
    {name:'LewdSideQuest',     file:'le.jpg'},
    {name:'M.McRobo',          file:'mc.png'},
    {name:'Valkyrie Art',      file:'va.jpg'},
    {name:'Zenelionn',         file:'ze.jpg'}
  ];

  const base = 'https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/';

  // === CSS ===
  const style = document.createElement('style');
  style.textContent = `
    #booyah-new-marquee {
      width: 100vw; max-width: 100vw;
      margin: 25px 0 0 calc(50% - 50vw);
      padding: 14px 0;
      overflow: hidden;
      background: rgba(0,0,0,0.3);
      backdrop-filter: blur(10px);
      border-top: 1px solid rgba(255,255,255,0.15);
      border-bottom: 1px solid rgba(255,255,255,0.15);
    }

    #booyah-new-marquee .track {
      display: flex;
      width: max-content;
      animation: booyahScroll 38s linear infinite;
    }

    #booyah-new-marquee .item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 28px 8px 8px;
      flex-shrink: 0;
    }

    #booyah-new-marquee .item + .item::before {
      content: "✦";
      font-size: 0.75rem;
      color: rgba(255,255,255,0.55);
      margin-right: 24px;
    }

    #booyah-new-marquee .icon {
      width: 48px; height: 48px;
      border-radius: 50%;
      object-fit: cover;
      border: 2.5px solid rgba(255,255,255,0.45);
      box-shadow: 0 4px 15px rgba(0,0,0,0.4);
    }

    #booyah-new-marquee .name {
      font: 800 1.08rem/1 "Baloo 2", system-ui, sans-serif;
      color: #fff;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
      white-space: nowrap;
    }

    @keyframes booyahScroll {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }

    @media (max-width: 640px) {
      #booyah-new-marquee { padding: 10px 0; margin-top: 18px; }
      #booyah-new-marquee .icon { width: 38px; height: 38px; }
      #booyah-new-marquee .name { font-size: 0.93rem; }
      #booyah-new-marquee .item { gap: 9px; padding: 6px 20px 6px 6px; }
      #booyah-new-marquee .item + .item::before { margin-right: 16px; }
    }
  `;
  document.head.appendChild(style);

  // === HTML Structure ===
  const marquee = document.createElement('section');
  marquee.id = 'booyah-new-marquee';
  marquee.setAttribute('aria-label', 'Featured Artists');

  const track = document.createElement('div');
  track.className = 'track';

  function createItem(artist) {
    const item = document.createElement('div');
    item.className = 'item';

    const img = document.createElement('img');
    img.className = 'icon';
    img.src = base + artist.file;
    img.alt = artist.name;
    img.loading = 'lazy';

    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = artist.name;

    item.appendChild(img);
    item.appendChild(name);
    return item;
  }

  // Duplicate for seamless loop
  artists.forEach(artist => track.appendChild(createItem(artist)));
  artists.forEach(artist => track.appendChild(createItem(artist)));

  marquee.appendChild(track);
  root.insertAdjacentElement('afterend', marquee);

  console.log('💖 Booyah Artist Marquee loaded successfully!');
})();
