(function(){
  var root=document.getElementById('booyahcardfanoptions');
  if(!root)return;
  var stage=root.querySelector('#bcfo-stage');
  var refresh=root.querySelector('#bcfo-refresh');
  if(!stage||!refresh)return;
  var base='https://raw.githubusercontent.com/DoodleBun/wafrcardbooyahtcgpreview/main/';
  var refreshTimer=0;
  var burstTimer=0;
  var popWords=['WOW!','SENSATIONAL!','FANTASTIC!','YES!'];
  var rareCards={
    'ap_17.png':1,'ap_18.png':1,'be_10.png':1,'co_10.png':1,'do2_17.png':1,'do2_18.png':1,
    'do_17.png':1,'do_18.png':1,'fe_10.png':1,'fe2_10.png':1,'fe3_10.png':1,'ka_10.png':1,
    'ki_10.png':1,'mm_10.png':1,'va_17.png':1,'va_18.png':1,'ze_10.png':1
  };
  var groups=[['ap',18],['be',10],['co',10],['do',18],['do2',18],['fe',10],['fe2',10],['fe3',10],['ka',10],['ki',10],['mm',10],['va',18],['ze',10]];
  var cards=[];
  function pad(n){return n<10?'0'+n:String(n)}
  function rare(name){
    return !!rareCards[name];
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
    var i,slot,img,flip,burst;
    for(i=0;i<slots.length&&i<chosen.length;i++){
      slot=slots[i];
      img=slot.querySelector('.bcfo-front img');
      flip=slot.querySelector('.bcfo-flip');
      burst=slot.querySelector('.bcfo-burst');
      slot.setAttribute('data-card-file',chosen[i]);
      if(img)img.src=base+chosen[i];
      if(flip)flip.checked=false;
      slot.className='bcfo-card-slot'+(rare(chosen[i])?' is-rare':'');
      if(burst){
        burst.className='bcfo-burst';
        burst.textContent='';
      }
    }
  }
  function triggerBurst(slot){
    var burst=slot.querySelector('.bcfo-burst');
    if(!burst)return;
    clearTimeout(burstTimer);
    burst.textContent=popWords[Math.floor(Math.random()*popWords.length)];
    burst.className='bcfo-burst';
    burst.offsetWidth;
    burst.className='bcfo-burst is-live';
    burstTimer=setTimeout(function(){
      burst.className='bcfo-burst';
    },1000);
  }
  buildCards();
  render();
  stage.addEventListener('change',function(event){
    var target=event.target;
    var slot,cardFile;
    if(!target||target.className.indexOf('bcfo-flip')===-1)return;
    slot=target.parentNode;
    cardFile=slot&&slot.getAttribute('data-card-file');
    if(!slot)return;
    if(target.checked&&rare(cardFile||'')){
      slot.className='bcfo-card-slot is-rare is-rare-revealed';
      triggerBurst(slot);
    }else if(rare(cardFile||'')){
      slot.className='bcfo-card-slot is-rare';
    }else{
      slot.className='bcfo-card-slot';
    }
  });
  refresh.onclick=function(){
    refresh.disabled=true;
    clearTimeout(refreshTimer);
    refreshTimer=setTimeout(function(){
      render();
      refresh.disabled=false;
    },500);
  };
}());
