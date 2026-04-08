(function(){
  var root=document.getElementById('booyahcardfanoptions');
  if(!root||document.getElementById('booyah-artist-marquee'))return;

  var artists=[
    {name:'Aperture Plushies',file:'Aperture.jpg'},
    {name:'Beeps Creatures',file:'Beep.jpg'},
    {name:'CORKiE',file:'Co.jpg'},
    {name:'DapperTetu',file:'da.jpg'},
    {name:'DoodleBun',file:'do.jpg'},
    {name:'Feral Foliage',file:'fe.jpg'},
    {name:'Igor1908',file:'ig.jpg'},
    {name:'Kaladania',file:'ka.jpg'},
    {name:'Kirava1',file:'ki.jpg'},
    {name:'LewdSideQuest',file:'le.jpg'},
    {name:'M.McRobo',file:'mc.png'},
    {name:'Valkyrie Art',file:'va.jpg'},
    {name:'Zenelionn',file:'ze.jpg'}
  ];

  var iconBase='https://cdn.jsdelivr.net/gh/DoodleBun/booyahstuff@main/';
  var style=document.createElement('style');

  style.textContent=
    '#booyah-artist-marquee{width:min(100%,1120px);margin:20px auto 0;overflow:hidden;position:relative;padding:12px 0;background:transparent}'+
    '#booyah-artist-marquee::before,#booyah-artist-marquee::after{content:"";position:absolute;top:0;bottom:0;width:72px;pointer-events:none;z-index:2}'+
    '#booyah-artist-marquee::before{left:0;background:linear-gradient(90deg,rgba(255,255,255,.9),rgba(255,255,255,0))}'+
    '#booyah-artist-marquee::after{right:0;background:linear-gradient(270deg,rgba(255,255,255,.9),rgba(255,255,255,0))}'+
    '#booyah-artist-marquee .bam-viewport{display:flex;width:max-content;align-items:center;gap:0;animation:booyahArtistFlow 30s linear infinite;animation-play-state:running;will-change:transform}'+
    '#booyah-artist-marquee:hover .bam-viewport,#booyah-artist-marquee:focus-within .bam-viewport{animation-play-state:running}'+
    '#booyah-artist-marquee .bam-group{display:flex;align-items:center;flex:0 0 auto}'+
    '#booyah-artist-marquee .bam-chip{flex:0 0 auto;display:inline-flex;align-items:center;gap:12px;margin:0 10px;padding:10px 16px 10px 10px;border-radius:999px;background:rgba(255,255,255,.24);border:1px solid rgba(210,170,80,.28);box-shadow:inset 0 1px 0 rgba(255,255,255,.42),0 10px 24px rgba(112,74,0,.08);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}'+
    '#booyah-artist-marquee .bam-avatar{width:46px;height:46px;flex:0 0 auto;border-radius:50%;padding:3px;background:linear-gradient(180deg,rgba(255,248,235,.98),rgba(249,224,160,.76));box-shadow:0 6px 16px rgba(112,74,0,.18),inset 0 1px 0 rgba(255,255,255,.78)}'+
    '#booyah-artist-marquee .bam-avatar img{display:block;width:100%;height:100%;border-radius:50%;object-fit:cover;border:1px solid rgba(205,165,80,.32);background:#fff8ef}'+
    '#booyah-artist-marquee .bam-name{font:800 1rem/1 "Baloo 2",cursive;color:#7b4e00;white-space:nowrap;text-shadow:0 1px 0 rgba(255,255,255,.55)}'+
    '@keyframes booyahArtistFlow{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}'+
    '@media (max-width:640px){#booyah-artist-marquee{margin-top:14px;padding:8px 0}#booyah-artist-marquee::before,#booyah-artist-marquee::after{width:28px}#booyah-artist-marquee .bam-chip{margin:0 8px;gap:9px;padding:8px 12px 8px 8px}#booyah-artist-marquee .bam-avatar{width:38px;height:38px}#booyah-artist-marquee .bam-name{font-size:.88rem}}';

  document.head.appendChild(style);

  function createChip(artist){
    var chip=document.createElement('div');
    var avatar=document.createElement('span');
    var icon=document.createElement('img');
    var name=document.createElement('span');

    chip.className='bam-chip';
    avatar.className='bam-avatar';
    name.className='bam-name';

    icon.src=iconBase+artist.file;
    icon.alt=artist.name+' icon';
    icon.loading='lazy';
    icon.decoding='async';
    icon.referrerPolicy='no-referrer';

    name.textContent=artist.name;

    avatar.appendChild(icon);
    chip.appendChild(avatar);
    chip.appendChild(name);

    return chip;
  }

  function createGroup(){
    var group=document.createElement('div');
    var i;

    group.className='bam-group';
    group.setAttribute('aria-hidden','true');

    for(i=0;i<artists.length;i++)group.appendChild(createChip(artists[i]));

    return group;
  }

  var marquee=document.createElement('section');
  var viewport=document.createElement('div');
  var firstGroup=createGroup();
  var secondGroup=createGroup();

  marquee.id='booyah-artist-marquee';
  marquee.setAttribute('aria-label','Featured artists');

  firstGroup.removeAttribute('aria-hidden');
  viewport.className='bam-viewport';
  viewport.appendChild(firstGroup);
  viewport.appendChild(secondGroup);
  marquee.appendChild(viewport);

  root.insertAdjacentElement('afterend',marquee);
}());
