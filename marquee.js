(function(){
  var root=document.getElementById('booyahcardfanoptions');
  if(!root||document.getElementById('booyah-artist-marquee'))return;
  var artists=[
    {name:'Aperture Plushies',icon:'AP',color1:'#ffcc70',color2:'#ff8a65'},
    {name:'Beeps Creatures',icon:'BC',color1:'#8be6c6',color2:'#2fbf9b'},
    {name:'CORKiE',icon:'CK',color1:'#f8a8ff',color2:'#b55cff'},
    {name:'DapperTetu',icon:'DT',color1:'#ffd98a',color2:'#e29a2d'},
    {name:'DoodleBun',icon:'DB',color1:'#ffb8d1',color2:'#ff6f9f'},
    {name:'Feral Foliage',icon:'FF',color1:'#a6ee9a',color2:'#55b94c'},
    {name:'Igor1908',icon:'I9',color1:'#9ad7ff',color2:'#448ff0'},
    {name:'Kaladania',icon:'KA',color1:'#d5b0ff',color2:'#8f63e8'},
    {name:'Kirava1',icon:'K1',color1:'#8ef0ff',color2:'#33b8d8'},
    {name:'LewdSideQuest',icon:'LS',color1:'#ffc57f',color2:'#f06f3b'},
    {name:'M.McRobo',icon:'MM',color1:'#cfd7e6',color2:'#7387a6'},
    {name:'Valkyrie Art',icon:'VA',color1:'#ffb0b0',color2:'#e25757'},
    {name:'Zenelionn',icon:'ZE',color1:'#ffe680',color2:'#d4a514'}
  ];
  var style=document.createElement('style');
  style.textContent=
    '#booyah-artist-marquee{width:min(100%,1120px);margin:18px auto 0;overflow:hidden;border-radius:28px;background:linear-gradient(180deg,rgba(255,253,246,.95),rgba(255,244,223,.96));border:1px solid rgba(209,169,74,.28);box-shadow:0 18px 34px rgba(120,90,20,.12);padding:14px 0;position:relative}'+
    '#booyah-artist-marquee:before,#booyah-artist-marquee:after{content:\"\";position:absolute;top:0;bottom:0;width:72px;z-index:2;pointer-events:none}'+
    '#booyah-artist-marquee:before{left:0;background:linear-gradient(90deg,rgba(255,247,232,1),rgba(255,247,232,0))}'+
    '#booyah-artist-marquee:after{right:0;background:linear-gradient(270deg,rgba(255,247,232,1),rgba(255,247,232,0))}'+
    '#booyah-artist-marquee .bam-track{display:flex;width:max-content;animation:booyahMarquee 34s linear infinite}'+
    '#booyah-artist-marquee:hover .bam-track{animation-play-state:paused}'+
    '#booyah-artist-marquee .bam-item{flex:0 0 auto;display:flex;align-items:center;gap:12px;margin:0 10px;padding:11px 18px;border-radius:999px;background:rgba(255,255,255,.72);border:1px solid rgba(215,184,114,.35);box-shadow:0 6px 14px rgba(120,90,20,.08)}'+
    '#booyah-artist-marquee .bam-icon{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:800 0.92rem/1 \"Baloo 2\",cursive;color:#fff;text-shadow:0 1px 1px rgba(0,0,0,.2);box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 5px 10px rgba(0,0,0,.12)}'+
    '#booyah-artist-marquee .bam-name{font:800 1rem/1.05 \"Baloo 2\",cursive;color:#7b4e00;white-space:nowrap}'+
    '@keyframes booyahMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}'+
    '@media (max-width:640px){#booyah-artist-marquee{margin-top:14px;border-radius:22px;padding:12px 0}#booyah-artist-marquee:before,#booyah-artist-marquee:after{width:32px}#booyah-artist-marquee .bam-item{gap:10px;margin:0 8px;padding:10px 14px}#booyah-artist-marquee .bam-icon{width:34px;height:34px;font-size:.78rem}#booyah-artist-marquee .bam-name{font-size:.88rem}}';
  document.head.appendChild(style);
  function chip(artist){
    var item=document.createElement('div');
    var icon=document.createElement('span');
    var name=document.createElement('span');
    item.className='bam-item';
    icon.className='bam-icon';
    icon.textContent=artist.icon;
    icon.style.background='linear-gradient(135deg,'+artist.color1+','+artist.color2+')';
    name.className='bam-name';
    name.textContent=artist.name;
    item.appendChild(icon);
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
