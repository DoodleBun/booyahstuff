(function(){
  var root=document.getElementById('booyahoptionsmenu');
  if(!root)return;
  var toggle=root.querySelector('#boexplore-toggle');
  if(!toggle)return;
  var links=root.querySelectorAll('.boexplore-option');
  function closeExplore(){
    var active=document.activeElement;
    toggle.checked=false;
    if(active&&root.contains(active)&&typeof active.blur==='function')active.blur();
  }
  Array.prototype.forEach.call(links,function(link){
    link.addEventListener('pointerdown',closeExplore);
    link.addEventListener('click',closeExplore);
  });
  window.addEventListener('hashchange',closeExplore);
  window.addEventListener('popstate',closeExplore);
  window.addEventListener('pageshow',closeExplore);
  window.addEventListener('pagehide',closeExplore);
  document.addEventListener('visibilitychange',function(){
    if(document.visibilityState==='visible')closeExplore();
  });
}());
