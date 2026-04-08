(function(){
  if(document.getElementById('booyah-artist-marquee'))return;

  var artists=[
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

  var base='https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/';

  var css=
    '#booyah-artist-marquee{'+
      'width:100vw;max-width:100vw;'+
      'margin:18px 0 0 calc(50% - 50vw);'+
      'padding:10px 0;'+
      'overflow:hidden;'+
      'position:relative;'+
      'background:transparent;'+
      'border:0;box-shadow:none;'+
    '}'+
    '#booyah-artist-marquee .bam-track{'+
      'display:flex;width:max-content;'+
      'animation:booyahScroll 36s linear infinite;'+
      'will-change:transform;'+
    '}'+
    '#booyah-artist-marquee .bam-item{'+
      'flex:0 0 auto;display:flex;align-items:center;'+
      'gap:10px;padding:6px 20px 6px 6px;'+
      'background:transparent;border:0;'+
    '}'+
    '#booyah-artist-marquee .bam-item+.bam-item::before{'+
      'content:"✦";font-size:.65rem;'+
      'color:rgba(255,255,255,.45);'+
      'margin-right:20px;flex-shrink:0;'+
    '}'+
    '#booyah-artist-marquee .bam-icon{'+
      'width:44px;height:44px;border-radius:50%;'+
      'display:block;object-fit:cover;flex-shrink:0;'+
      'border:2px solid rgba(255,255,255,.35);'+
      'box-shadow:0 2px 8px rgba(0,0,0,.25);'+
    '}'+
    '#booyah-artist-marquee .bam-name{'+
      'font:800 1rem/1 "Baloo 2",cursive;'+
      'color:#fff;white-space:nowrap;'+
      'text-shadow:'+
        '-1px -1px 0 rgba(0,0,0,.6),'+
        '1px -1px 0 rgba(0,0,0,.6),'+
        '-1px 1px 0 rgba(0,0,0,.6),'+
        '1px 1px 0 rgba(0,0,0,.6);'+
    '}'+
    '@keyframes booyahScroll{'+
      'from{transform:translateX(0)}'+
      'to{transform:translateX(-50%)}'+
    '}'+
    '@media(max-width:640px){'+
      '#booyah-artist-marquee{margin-top:12px;padding:7px 0}'+
      '#booyah-artist-marquee .bam-item{gap:7px;padding:4px 14px 4px 4px}'+
      '#booyah-artist-marquee .bam-icon{width:32px;height:32px}'+
      '#booyah-artist-marquee .bam-name{font-size:.8rem}'+
      '#booyah-artist-marquee .bam-item+.bam-item::before{margin-right:14px}'+
    '}';

  var style=document.createElement('style');
  style.textContent=css;
  document.head.appendChild(style);

  function makeChip(artist){
    var item=document.createElement('div');
    item.className='bam-item';
    var icon=document.createElement('img');
    icon.className='bam-icon';
    icon.src=base+artist.file;
    icon.alt=artist.name;
    icon.loading='lazy';
    icon.referrerPolicy='no-referrer';
    var name=document.createElement('span');
    name.className='bam-name';
    name.textContent=artist.name;
    item.appendChild(icon);
    item.appendChild(name);
    return item;
  }

  var marquee=document.createElement('section');
  marquee.id='booyah-artist-marquee';
  marquee.setAttribute('aria-label','Featured artists');

  var track=document.createElement('div');
  track.className='bam-track';

  for(var i=0;i<artists.length*2;i++){
    track.appendChild(makeChip(artists[i%artists.length]));
  }

  marquee.appendChild(track);

  /* Insert relative to the script tag itself, not booyahcardfanoptions */
  var scripts=document.getElementsByTagName('script');
  var thisScript=scripts[scripts.length-1];
  thisScript.parentNode.insertBefore(marquee,thisScript);
}());
