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
    '#booyah-artist-marquee{width:min(100%,1120px);margin:18px auto 0;overflow:hidden;border-radius:28px;background:rgba(255,248,231,.68);border:1px solid rgba(220,181,92,.34);box-shadow:0 16px 34px rgba(78,44,7,.14),inset 0 1px 0 rgba(255,255,255,.45);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);padding:12px 0;position:relative}'+
    '#booyah-artist-marquee:before,#booyah-artist-marquee:after{content:\"\";position:absolute;top:0;bottom:0;width:96px;z-index:2;pointer-events:none}'+
    '#booyah-artist-marquee:before{left:0;background:linear-gradient(90deg,rgba(255,248,231,.92),rgba(255,248,231,0))}'+
    '#booyah-artist-marquee:after{right:0;background:linear-gradient(270deg,rgba(255,248,231,.92),rgba(255,248,231,0))}'+
    '#booyah-artist-marquee .bam-track{display:flex;width:max-content;animation:booyahMarquee 34s linear infinite;animation-play-state:running;will-change:transform}'+
    '#booyah-artist-marquee:hover .bam-track,#booyah-artist-marquee:focus-within .bam-track{animation-play-state:running}'+
    '#booyah-artist-marquee .bam-item{flex:0 0 auto;display:flex;align-items:center;gap:12px;margin:0 10px;padding:8px 16px 8px 10px;border-radius:999px;background:rgba(255,255,255,.38);border:1px solid rgba(219,180,86,.28);box-shadow:inset 0 1px 0 rgba(255,255,255,.46),0 8px 16px rgba(78,44,7,.08);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}'+
    '#booyah-artist-marquee .bam-icon-wrap{width:46px;height:46px;flex:0 0 auto;display:grid;place-items:center;border-radius:50%;background:linear-gradient(180deg,rgba(255,248,231,.96),rgba(252,229,176,.82));box-shadow:inset 0 1px 0 rgba(255,255,255,.72),0 6px 12px rgba(78,44,7,.12)}'+
    '#booyah-artist-marquee .bam-icon{width:40px;height:40px;border-radius:50%;display:block;object-fit:cover;background:#fff7ea;border:1px solid rgba(215,184,114,.42)}'+
    '#booyah-artist-marquee .bam-name{font:800 1rem/1.05 \"Baloo 2\",cursive;color:#7b4e00;white-space:nowrap;text-shadow:0 1px 0 rgba(255,255,255,.44)}'+
    '@keyframes booyahMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}'+
    '@media (max-width:640px){#booyah-artist-marquee{margin-top:12px;padding:8px 0;border-radius:22px}#booyah-artist-marquee:before,#booyah-artist-marquee:after{width:40px}#booyah-artist-marquee .bam-item{gap:9px;margin:0 8px;padding:6px 12px 6px 8px}#booyah-artist-marquee .bam-icon-wrap{width:38px;height:38px}#booyah-artist-marquee .bam-icon{width:32px;height:32px}#booyah-artist-marquee .bam-name{font-size:.88rem}}';
  document.head.appendChild(style);
  function chip(artist){
    var item=document.createElement('div');
    var iconWrap=document.createElement('span');
    var icon=document.createElement('img');
    var name=document.createElement('span');
    item.className='bam-item';
    iconWrap.className='bam-icon-wrap';
    icon.className='bam-icon';
    icon.src=iconBase+artist.file;
    icon.alt=artist.name+' icon';
    icon.loading='lazy';
    icon.referrerPolicy='no-referrer';
    icon.decoding='async';
    name.className='bam-name';
    name.textContent=artist.name;
    iconWrap.appendChild(icon);
    item.appendChild(iconWrap);
    item.appendChild(name);
    return item;
  }
  var marquee=document.createElement('section');
  var track=document.createElement('div');
  var i;
  marquee.id='booyah-artist-marquee';
  marquee.setAttribute('aria-label','Featured artists');
  track.className='bam-track';
  for(i=0;i<artists.length*2;i++)track.appendChild(chip(artists[i%artists.length]));
  marquee.appendChild(track);
  root.insertAdjacentElement('afterend',marquee);
}());
