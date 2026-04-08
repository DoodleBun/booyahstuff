(function(){
  var root=document.getElementById('booyahcardfanoptions');
  if(!root)return;
  var stage=root.querySelector('#bcfo-stage');
  var refresh=root.querySelector('#bcfo-refresh');
  if(!stage||!refresh)return;
  var base='https://raw.githubusercontent.com/DoodleBun/wafrcardbooyahtcgpreview/main/';
  var refreshTimer=0;
  var groups=[['ap',18],['be',10],['co',10],['do',18],['do2',18],['fe',10],['fe2',10],['fe3',10],['ka',10],['ki',10],['mm',10],['va',18],['ze',10]];
  var cards=[];
  function pad(n){return n<10?'0'+n:String(n)}
  function rare(name){
    var n=name.slice(name.lastIndexOf('_')+1,-4);
    return n==='10'||n==='17'||n==='18';
  }
  function buildCards(){
    var i,j,g;
    for(i=0;i<groups.length;i++){
      g=groups[i];
      for(j=1;j<=g[1];j++)cards.push(g[0]+'_'+pad(j)+'.png');
    }
  }
  function shuffled(list){
    var copy=list.slice(),i,j,tmp;
    for(i=copy.length-1;i>0;i--){
      j=Math.floor(Math.random()*(i+1));
      tmp=copy[i];
      copy[i]=copy[j];
      copy[j]=tmp;
    }
    return copy;
  }
  function render(){
    var chosen=shuffled(cards).slice(0,5);
    var slots=stage.querySelectorAll('.bcfo-card-slot');
    var i,slot,img,flip;
    for(i=0;i<slots.length&&i<chosen.length;i++){
      slot=slots[i];
      img=slot.querySelector('.bcfo-front img');
      flip=slot.querySelector('.bcfo-flip');
      if(img)img.src=base+chosen[i];
      if(flip)flip.checked=false;
      slot.className='bcfo-card-slot'+(rare(chosen[i])?' is-rare':'');
    }
  }
  buildCards();
  render();
  refresh.onclick=function(){
    refresh.disabled=true;
    clearTimeout(refreshTimer);
    refreshTimer=setTimeout(function(){
      render();
      refresh.disabled=false;
    },500);
  };
}());
