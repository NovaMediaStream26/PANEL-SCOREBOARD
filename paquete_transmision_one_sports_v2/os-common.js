(function(w){
var KEY='os_state_v1',EKEY='os_event_v1';
var OS={KEY:KEY,EKEY:EKEY};
OS.def=function(){return{comp:'',ref:'',refx:{a1:'',a2:'',a4:'',var:''},
 h:{name:'LOCAL',c1:'#E10600',c2:'#FFFFFF',logo:'',starters:'',subs:'',coach:'',form:''},
 a:{name:'VISITANTE',c1:'#FFC20E',c2:'#0B1F4B',logo:'',starters:'',subs:'',coach:'',form:''},
 hs:0,as:0,goals:[],clock:{base:0,t0:0,run:false},period:'1T',added:0,showAdded:false,
 global:{on:false,ho:0,ao:0},pen:{h:[],a:[]},subsLog:[],cards:[],
 show:{info:true,scorers:false,lineup:null,ref:false}};};
OS.esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]});};
OS.parse=function(t){return (t||'').split('\n').map(function(l){return l.trim()}).filter(Boolean).map(function(l){var m=/^(\d{1,2})\s*[\.\-–:]?\s+(.+)$/.exec(l);return m?{n:m[1],name:m[2]}:{n:'',name:l};});};
OS.PL={'1T':'1ER TIEMPO','ET':'ENTRETIEMPO','2T':'2DO TIEMPO','1TE':'1ER T. EXTRA','2TE':'2DO T. EXTRA','PEN':'PENALES','FIN':'FINAL'};
OS.secs=function(S){var c=S.clock;return Math.floor(c.base+(c.run?(Date.now()-c.t0)/1000:0));};
OS.fmt=function(n){n=Math.max(0,n);var m=Math.floor(n/60),s=n%60;return (m<10?'0':'')+m+':'+(s<10?'0':'')+s;};
OS.kit=function(el,t){el.style.background='linear-gradient(to bottom,'+t.c1+' 50%,'+t.c2+' 50%)';};
OS.setImg=function(el,u){if(u){el.src=u;el.style.display='block';}else{el.style.display='none';el.removeAttribute('src');}};
OS.start=function(o){
  var S=null,prev=null,lastRaw=null,lastEv='',ready=false;
  if(location.hash==='#preview')document.body.classList.add('preview');
  function load(){
    var raw=localStorage.getItem(KEY)||'';
    if(raw!==lastRaw||!S){lastRaw=raw;var n;try{n=raw?JSON.parse(raw):OS.def();}catch(e){n=OS.def();}
      var d=OS.def();for(var k in d){if(n[k]===undefined)n[k]=d[k];}
      n.show=Object.assign({},d.show,n.show);n.refx=Object.assign({},d.refx,n.refx);
      prev=S;S=n;OS.S=S;if(o.render)o.render(S,prev);}
    var ev=localStorage.getItem(EKEY)||'';
    if(ev!==lastEv){lastEv=ev;if(ready&&ev&&o.event){try{o.event(JSON.parse(ev),S);}catch(e){}}}
  }
  load();ready=true;setInterval(load,120);
  setInterval(function(){if(S&&o.tick)o.tick(S);},200);
  w.addEventListener('storage',load);
};
// tercio inferior genérico
var ltTimer;
OS.showLT=function(box,cls,left,teamName,logo,l1,l2,ms){
  box.innerHTML='<div class="lt '+cls+'"><div class="l">'+left+'</div><div class="r"><div class="tn">'+(logo?'<img src="'+logo+'">':'')+OS.esc(teamName)+'</div><div class="who">'+l1+'</div>'+(l2?'<div class="sub2">'+l2+'</div>':'')+'</div></div>';
  var e=box.firstChild;void e.offsetWidth;e.classList.add('on');
  clearTimeout(ltTimer);ltTimer=setTimeout(function(){e.classList.remove('on');},ms||7000);
};
w.OS=OS;
})(window);
