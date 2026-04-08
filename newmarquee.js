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
    '#booyah-artist-marquee{width:100vw;max-width:100vw;margin:18px 0 0 calc(50% - 50vw);padding:10px 0;overflow:hidden;position:relative;background:transparent;border:0;box-shadow:none}'+
    '#booyah-artist-marquee .bam-track{display:flex;width:max-content;animation:booyahMarquee 34s linear infinite;will-change:transform}'+
    '#booyah-artist-marquee .bam-item{flex:0 0 auto;display:flex;align-items:center;gap:12px;margin:0 10px;padding:8px 14px;border-radius:999px;background:transparent;border:0}'+
    '#booyah-artist-marquee .bam-icon{width:42px;height:42px;border-radius:50%;display:block;object-fit:cover;background:#fff7ea;border:1px solid rgba(215,184,114,.4);box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 5px 10px rgba(0,0,0,.12)}'+
    '#booyah-artist-marquee .bam-name{font:800 1rem/1.05 "Baloo 2",cursive;color:#fff;white-space:nowrap;text-shadow:-1px -1px 0 rgba(0,0,0,.5),1px -1px 0 rgba(0,0,0,.5),-1px 1px 0 rgba(0,0,0,.5),1px 1px 0 rgba(0,0,0,.5)}'+
    '@keyframes booyahMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}'+
    '@media (max-width:640px){#booyah-artist-marquee{margin-top:12px;padding:8px 0}#booyah-artist-marquee .bam-item{gap:9px;margin:0 8px;padding:6px 10px}#booyah-artist-marquee .bam-icon{width:34px;height:34px}#booyah-artist-marquee .bam-name{font-size:.88rem}}';
  document.head.appendChild(style);
  function chip(artist){
    var item=document.createElement('div');
    var icon=document.createElement('img');
    var name=document.createElement('span');
    item.className='bam-item';
    icon.className='bam-icon';
    icon.src=iconBase+artist.file;
    icon.alt=artist.name+' icon';
    icon.loading='lazy';
    icon.referrerPolicy='no-referrer';
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
