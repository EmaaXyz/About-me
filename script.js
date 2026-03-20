(function(){
  var dot=document.getElementById('cursor-dot');
  var ring=document.getElementById('cursor-ring');
  if(!dot||!ring)return;
  var mx=window.innerWidth/2,my=window.innerHeight/2;
  var rx=mx,ry=my;
  var RAF=requestAnimationFrame;
  document.addEventListener('mousemove',function(e){
    mx=e.clientX;my=e.clientY;
    dot.style.left=mx+'px';dot.style.top=my+'px';
  },{passive:true});
  function lerpRing(){
    rx+=(mx-rx)*.10;
    ry+=(my-ry)*.10;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    RAF(lerpRing);
  }
  RAF(lerpRing);
  document.addEventListener('mouseover',function(e){
    var t=e.target.closest('a,button,[onclick],.tog,.proj-card,.c-link,.adm-b,.ap-btn,.ap-sb,.lm-btn,.sd-logout');
    if(t){document.body.classList.add('c-hover');document.body.classList.remove('c-text');}
    else if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'){document.body.classList.add('c-text');document.body.classList.remove('c-hover');}
    else{document.body.classList.remove('c-hover','c-text');}
  });
})();

(function(){
  var loader=document.getElementById('loading');
  function hide(){
    if(!loader)return;
    loader.classList.add('out');
    setTimeout(function(){
      if(loader.parentNode)loader.parentNode.removeChild(loader);
    },1100);
  }
  window.addEventListener('load',hide);
  setTimeout(hide,2800);
})();

if(typeof particlesJS!=='undefined'){
  particlesJS('particles-js',{
    particles:{
      number:{value:26,density:{enable:true,value_area:1000}},
      color:{value:'#447794'},
      shape:{type:'circle'},
      opacity:{value:.15,random:true},
      size:{value:1.2,random:true},
      line_linked:{enable:true,distance:170,color:'#447794',opacity:.1,width:1},
      move:{enable:true,speed:.45,direction:'none',random:true,straight:false}
    },
    interactivity:{
      events:{onhover:{enable:true,mode:'grab'},onclick:{enable:false}},
      modes:{grab:{distance:190,line_linked:{opacity:.2}}}
    }
  });
}
var sc=document.getElementById('sc');

sc.addEventListener('scroll',function(){
  var idx=Math.round(sc.scrollTop/window.innerHeight);
  document.querySelectorAll('.sid').forEach(function(d){d.classList.remove('on');});
  var a=document.querySelector('.sid[data-s="'+Math.min(idx,3)+'"]');
  if(a)a.classList.add('on');
},{passive:true});

document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    var t=document.querySelector(this.getAttribute('href'));
    if(t&&sc){e.preventDefault();sc.scrollTo({top:t.offsetTop,behavior:'smooth'});}
  });
});

var twText='Developer',twI=0;
(function(){var s=localStorage.getItem('ema_tw');if(s)twText=s;})();
function typeWriter(){
  var el=document.getElementById('typewriter');if(!el)return;
  if(twI<twText.length){
    el.textContent+=twText.charAt(twI);
    twI++;
    setTimeout(typeWriter,110);
  }
}
setTimeout(typeWriter,1600);

(function(){
  var sections=document.querySelectorAll('section:not(#home)');
  sections.forEach(function(s){s.classList.add('section-hidden');});
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.remove('section-hidden');
        e.target.classList.add('section-visible');
        io.unobserve(e.target);
      }
    });
  },{threshold:.08});
  sections.forEach(function(s){io.observe(s);});
})();

fetch('https://api.github.com/users/EmaaXyz/repos?sort=updated&per_page=30')
  .then(function(r){if(!r.ok)throw 0;return r.json();})
  .then(function(repos){
    var c=document.getElementById('projects-container');
    if(!c||!Array.isArray(repos))return;
    repos.filter(function(r){return!r.fork;}).forEach(function(repo){
      var card=document.createElement('div');card.className='proj-card';
      var a=document.createElement('a');a.href=repo.html_url;a.target='_blank';a.rel='noopener noreferrer';
      var n=document.createElement('div');n.className='proj-name';n.textContent=repo.name;
      var d=document.createElement('div');d.className='proj-desc';d.textContent=repo.description||'GitHub Project';
      var ft=document.createElement('div');ft.className='proj-foot';
      var l=document.createElement('div');l.className='proj-lang';l.textContent=repo.language||'Code';
      if(repo.stargazers_count>0){var s=document.createElement('div');s.className='proj-stars';s.innerHTML='&#9733; '+repo.stargazers_count;ft.appendChild(s);}
      ft.appendChild(l);
      a.appendChild(n);a.appendChild(d);a.appendChild(ft);card.appendChild(a);c.appendChild(card);
    });
  }).catch(function(){});

var skillsDone=false;

function activateSkills(){
  if(skillsDone)return;skillsDone=true;
  document.querySelectorAll('.sk-fill').forEach(function(f){
    f.style.width=f.dataset.w+'%';
  });
  document.querySelectorAll('.sk-pct').forEach(function(p){
    p.style.opacity='1';
    var target=parseInt(p.dataset.value,10);
    var start=performance.now();
    var dur=1800;
    (function step(now){
      var prog=Math.min((now-start)/dur,1);
      var ease=1-Math.pow(1-prog,4);
      p.textContent=Math.round(ease*target)+'%';
      if(prog<1)requestAnimationFrame(step);
    })(start);
  });
}

sc.addEventListener('scroll',function(){
  var j=document.getElementById('journey');
  if(j&&sc.scrollTop+window.innerHeight*.55>j.offsetTop)activateSkills();
},{passive:true});

function sendMsg(){
  var n=document.getElementById('cf-name').value.trim();
  var e=document.getElementById('cf-email').value.trim();
  var m=document.getElementById('cf-msg').value.trim();
  if(!n||!m)return;
  window.open('https://t.me/stark020009?text='+encodeURIComponent('Contact from '+n+(e?' ('+e+')':'')+': '+m),'_blank');
  var ok=document.getElementById('cf-ok');ok.style.display='block';
  setTimeout(function(){ok.style.display='none';},3000);
}

var SETTINGS_KEY='ema_settings';
var settings={
  particles:true,animations:true,secnums:true,fontsize:'normal',
  visitctr:true,optout:false,notif:false,sound:false,
  reducemotion:false,highcontrast:false,largecursor:false,
  debug:false,profilevis:false
};

function loadSettings(){
  try{var s=JSON.parse(localStorage.getItem(SETTINGS_KEY)||'null');if(s&&typeof s==='object')Object.assign(settings,s);}catch(e){}
  applyAll();
}

function saveSettings(){localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings));}

function applyAll(){
  var pjs=document.getElementById('particles-js');
  if(pjs)pjs.style.opacity=settings.particles?'1':'0';
  document.body.classList.toggle('no-anim',!settings.animations);
  document.body.classList.toggle('slow-mo',settings.reducemotion);
  var sc2=document.getElementById('sc');if(sc2)sc2.classList.toggle('sec-num-hidden',!settings.secnums);
  document.body.classList.toggle('large-text',settings.fontsize==='large');
  var vc=document.getElementById('visit-counter');if(vc)vc.style.display=settings.visitctr?'flex':'none';
  document.body.classList.toggle('high-contrast',settings.highcontrast);
  document.body.classList.toggle('large-cursor',settings.largecursor);
  if(settings.debug)console.log('[Settings]',JSON.stringify(settings,null,2));
  Object.keys(settings).forEach(function(k){
    if(typeof settings[k]==='boolean'){var t=document.getElementById('tog-'+k);if(t)t.classList.toggle('on',settings[k]);}
  });
  var sel=document.getElementById('sel-fontsize');if(sel)sel.value=settings.fontsize;
}

function toggleSetting(key){
  settings[key]=!settings[key];
  if(key==='notif'){
    if(settings.notif&&'Notification' in window){
      if(Notification.permission==='default'){Notification.requestPermission().then(function(p){if(p!=='granted'){settings.notif=false;saveSettings();applyAll();}});}
      else if(Notification.permission==='denied'){settings.notif=false;alert('Notifications blocked by browser.');}
    }
  }
  if(key==='sound'&&settings.sound)playTone(880,.12);
  saveSettings();applyAll();
  if(key!=='sound'&&settings.sound)playTone(660,.07);
}

function applySetting(key,value){settings[key]=value;saveSettings();applyAll();}

function playTone(freq,dur){
  try{
    var ctx=new(window.AudioContext||window.webkitAudioContext)();
    var o=ctx.createOscillator();var g=ctx.createGain();
    o.connect(g);g.connect(ctx.destination);
    o.type='sine';o.frequency.setValueAtTime(freq,ctx.currentTime);
    g.gain.setValueAtTime(.06,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+dur);
    o.start(ctx.currentTime);o.stop(ctx.currentTime+dur);
  }catch(e){}
}

function openSettings(){document.getElementById('sd-overlay').classList.add('open');document.getElementById('sd-panel').classList.add('open');}
function closeSettings(){document.getElementById('sd-overlay').classList.remove('open');document.getElementById('sd-panel').classList.remove('open');}

function deleteReviews(){
  if(!confirm('Delete all saved reviews?'))return;
  localStorage.removeItem('shop_reviews');
  var b=document.getElementById('btn-del-rv');
  if(b){b.textContent='Deleted';b.disabled=true;setTimeout(function(){b.textContent='Delete';b.disabled=false;},2200);}
}

var ADMIN_USER='Ema',ADMIN_PASS='24692469';

function updateAccountUI(username){
  var isAdmin=username&&username===ADMIN_USER;
  var loggedIn=!!username;
  document.getElementById('login-btn').style.display=loggedIn?'none':'flex';
  var up=document.getElementById('user-pill');up.style.display=loggedIn?'flex':'none';
  if(loggedIn){
    document.getElementById('user-av').textContent=username.charAt(0).toUpperCase();
    document.getElementById('user-name').textContent=username+(isAdmin?' ⚡':'');
    document.getElementById('sd-av').textContent=username.charAt(0).toUpperCase();
    document.getElementById('sd-acc-name').textContent=username;
    var role=document.getElementById('sd-acc-role');
    if(role)role.innerHTML=isAdmin?'Administrator <span class="admin-badge">ADMIN</span>':'Member';
    document.getElementById('sd-logout-btn').style.display='block';
    document.getElementById('sd-login-prompt').style.display='none';
    document.querySelectorAll('.sd-locked').forEach(function(r){r.classList.remove('sd-locked');});
    loadGhToken();
    var ab=document.getElementById('sd-admin');if(ab)ab.classList.toggle('vis',isAdmin);
  } else {
    document.getElementById('sd-av').textContent='?';
    document.getElementById('sd-acc-name').textContent='Not logged in';
    var role=document.getElementById('sd-acc-role');if(role)role.textContent='Guest';
    document.getElementById('sd-logout-btn').style.display='none';
    document.getElementById('sd-login-prompt').style.display='block';
    ['row-displayname','row-profilevis','row-changepass','row-delprivacy','row-apitoken'].forEach(function(id){var el=document.getElementById(id);if(el)el.classList.add('sd-locked');});
    var ab=document.getElementById('sd-admin');if(ab)ab.classList.remove('vis');
  }
}

(function(){
  var u=sessionStorage.getItem('ema_user');
  var logged=sessionStorage.getItem('ema_logged');
  updateAccountUI(u&&logged?u:null);
  loadSettings();
  fetchVisitCount();
})();

function switchView(v){
  document.getElementById('view-signin').style.display=v==='signin'?'block':'none';
  document.getElementById('view-signup').style.display=v==='signup'?'block':'none';
  ['login-error','signup-error','signup-success'].forEach(function(id){var el=document.getElementById(id);if(el)el.style.display='none';});
}

function openLogin(){switchView('signin');document.getElementById('login-bd').classList.add('open');setTimeout(function(){var el=document.getElementById('login-user');if(el)el.focus();},100);}
function backdropClose(e){if(e.target===document.getElementById('login-bd'))closeLogin();}
function closeLogin(){document.getElementById('login-bd').classList.remove('open');}
function getUsers(){return JSON.parse(localStorage.getItem('site_users')||'{}');}

function doLogin(){
  var u=document.getElementById('login-user').value.trim();
  var p=document.getElementById('login-pass').value;
  var users=getUsers();
  if((u===ADMIN_USER&&p===ADMIN_PASS)||(users[u]&&users[u]===p)){
    sessionStorage.setItem('ema_logged','1');sessionStorage.setItem('ema_user',u);
    closeLogin();updateAccountUI(u);
    if(settings.sound)playTone(880,.15);
  } else {
    var err=document.getElementById('login-error');err.style.display='block';
    document.getElementById('login-pass').value='';
    setTimeout(function(){err.style.display='none';},3000);
    if(settings.sound)playTone(220,.25);
  }
}

function doSignup(){
  var u=document.getElementById('su-user').value.trim();
  var p=document.getElementById('su-pass').value;
  var p2=document.getElementById('su-pass2').value;
  var err=document.getElementById('signup-error');
  var succ=document.getElementById('signup-success');
  err.style.display='none';succ.style.display='none';
  if(!u||!p){err.textContent='Fill in all fields.';err.style.display='block';return;}
  if(p!==p2){err.textContent='Passwords do not match.';err.style.display='block';return;}
  if(u===ADMIN_USER){err.textContent='Username not available.';err.style.display='block';return;}
  var users=getUsers();
  if(users[u]){err.textContent='Username already taken.';err.style.display='block';return;}
  users[u]=p;localStorage.setItem('site_users',JSON.stringify(users));
  succ.style.display='block';
  ['su-user','su-pass','su-pass2'].forEach(function(id){var el=document.getElementById(id);if(el)el.value='';});
  setTimeout(function(){switchView('signin');},2000);
}

function doLogout(){sessionStorage.removeItem('ema_logged');sessionStorage.removeItem('ema_user');updateAccountUI(null);closeSettings();}
function saveGhToken(val){if(val)localStorage.setItem('ema_ghtoken',val);else localStorage.removeItem('ema_ghtoken');}
function loadGhToken(){var t=localStorage.getItem('ema_ghtoken');var inp=document.getElementById('inp-ghtoken');if(inp&&t)inp.value=t;}
function openChangePass(){var f=document.getElementById('changepass-form');if(f)f.style.display='block';}
function closeChangePass(){var f=document.getElementById('changepass-form');if(f)f.style.display='none';['cp-old','cp-new','cp-new2'].forEach(function(id){var el=document.getElementById(id);if(el)el.value='';});var ce=document.getElementById('cp-err');if(ce)ce.style.display='none';var co=document.getElementById('cp-ok');if(co)co.style.display='none';}

function doChangePass(){
  var u=sessionStorage.getItem('ema_user');
  var oldp=document.getElementById('cp-old').value;
  var newp=document.getElementById('cp-new').value;
  var newp2=document.getElementById('cp-new2').value;
  var err=document.getElementById('cp-err');var ok=document.getElementById('cp-ok');
  if(err)err.style.display='none';if(ok)ok.style.display='none';
  if(!oldp||!newp||!newp2){if(err){err.textContent='Fill in all fields.';err.style.display='block';}return;}
  if(newp!==newp2){if(err){err.textContent='New passwords do not match.';err.style.display='block';}return;}
  var isAdminAcc=(u===ADMIN_USER&&oldp===ADMIN_PASS);
  var users=getUsers();var isUser=users[u]&&users[u]===oldp;
  if(!isAdminAcc&&!isUser){if(err){err.textContent='Current password is wrong.';err.style.display='block';}return;}
  if(u!==ADMIN_USER){users[u]=newp;localStorage.setItem('site_users',JSON.stringify(users));}
  if(ok){ok.textContent='Password updated ✓';ok.style.display='block';}
  setTimeout(closeChangePass,1800);
}

function fetchVisitCount(){
  var KEY='index',NS='emanueledev';
  var el=document.getElementById('visit-count');
  var SK='visited_index';
  function display(n){var x=parseInt(n,10);if(el)el.textContent=isNaN(x)?'—':x.toLocaleString();}
  var isNew=!sessionStorage.getItem(SK);if(isNew)sessionStorage.setItem(SK,'1');
  fetch(isNew?'https://api.counterapi.dev/v1/'+NS+'/'+KEY+'/up':'https://api.counterapi.dev/v1/'+NS+'/'+KEY+'/get')
    .then(function(r){if(!r.ok)throw 0;return r.json();})
    .then(function(d){display(d.count);}).catch(function(){display('—');});
}

var _adminIn=false;

(function(){
  var logo=document.getElementById('logo-link'),cnt=0,t=null;
  if(!logo)return;
  logo.addEventListener('click',function(){
    cnt++;clearTimeout(t);t=setTimeout(function(){cnt=0;},2000);
    if(cnt>=5){cnt=0;_adminIn?openAdminPanel():openAdminLogin();}
  });
})();

document.addEventListener('keydown',function(e){
  if(e.ctrlKey&&e.shiftKey&&e.key==='A'){e.preventDefault();_adminIn?openAdminPanel():openAdminLogin();}
},{capture:false});

document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    closeLogin();closeSettings();
    if(document.getElementById('admin-lo').classList.contains('open'))closeAdminLogin();
    if(document.getElementById('admin-panel').classList.contains('open'))closeAdminPanel();
  }
},{capture:true});

function openAdminLogin(){
  ['admin-user-input','admin-pass-input'].forEach(function(id){var el=document.getElementById(id);if(el)el.value='';});
  document.getElementById('al-err').style.display='none';
  document.getElementById('admin-lo').classList.add('open');
  setTimeout(function(){var el=document.getElementById('admin-user-input');if(el)el.focus();},80);
}

function closeAdminLogin(){document.getElementById('admin-lo').classList.remove('open');}

function adminLogin(){
  var u=document.getElementById('admin-user-input').value.trim();
  var p=document.getElementById('admin-pass-input').value;
  if(u===ADMIN_USER&&p===ADMIN_PASS){
    _adminIn=true;closeAdminLogin();
    document.getElementById('admin-fab').classList.add('vis');
    apRefreshStats();openAdminPanel();apToast('Welcome back, Ema.','green');
  } else {
    var e=document.getElementById('al-err');e.style.display='block';
    document.getElementById('admin-pass-input').value='';
    setTimeout(function(){e.style.display='none';},3000);
  }
}

function adminLogout(){_adminIn=false;document.getElementById('admin-fab').classList.remove('vis');closeAdminPanel();apToast('Logged out.','');}
function openAdminPanel(){if(!_adminIn)return;apRefreshStats();apLoadUsers();apLoadSkillInputs();apLoadTwInput();apLoadTlEntry();document.getElementById('admin-panel').classList.add('open');document.getElementById('ap-bd').classList.add('open');}
function closeAdminPanel(){document.getElementById('admin-panel').classList.remove('open');document.getElementById('ap-bd').classList.remove('open');}
function apSub(id){document.getElementById(id).classList.toggle('open');}
function apRefreshStats(){var users=Object.keys(JSON.parse(localStorage.getItem('site_users')||'{}')).length;document.getElementById('ap-s-users').textContent=users;var projs=document.querySelectorAll('.proj-card').length;document.getElementById('ap-s-projects').textContent=projs||'—';var vc=document.getElementById('visit-count');document.getElementById('ap-s-visits').textContent=vc?vc.textContent:'—';}
function apLoadTwInput(){var s=localStorage.getItem('ema_tw');document.getElementById('ap-tw-input').value=s||'Developer';}
function apSaveTypewriter(){var val=document.getElementById('ap-tw-input').value.trim();if(!val)return apToast('Enter text.','red');localStorage.setItem('ema_tw',val);var el=document.getElementById('typewriter');if(el){el.textContent='';twText=val;twI=0;typeWriter();}apToast('Typewriter updated!','green');}
function apLoadTlEntry(){var idx=parseInt(document.getElementById('ap-tl-select').value);var items=document.querySelectorAll('.tl-item');if(items[idx])document.getElementById('ap-tl-text').value=items[idx].querySelector('.tl-text').textContent;}
function apSaveTl(){var idx=parseInt(document.getElementById('ap-tl-select').value);var val=document.getElementById('ap-tl-text').value.trim();if(!val)return apToast('Enter text.','red');var items=document.querySelectorAll('.tl-item');if(items[idx])items[idx].querySelector('.tl-text').textContent=val;apToast('Timeline updated!','green');}
function apLoadSkillInputs(){var fills=document.querySelectorAll('.sk-fill');var fields=[['ap-sk-java',0],['ap-sk-python',1],['ap-sk-cs',2]];fields.forEach(function(f){var el=document.getElementById(f[0]);if(el&&fills[f[1]])el.value=fills[f[1]].dataset.w||'';});}
function apSaveSkills(){
  var vals={java:parseInt(document.getElementById('ap-sk-java').value),python:parseInt(document.getElementById('ap-sk-python').value),cs:parseInt(document.getElementById('ap-sk-cs').value)};
  var fills=document.querySelectorAll('.sk-fill');var pcts=document.querySelectorAll('.sk-pct');
  ['java','python','cs'].forEach(function(k,i){
    if(!isNaN(vals[k])&&fills[i]){
      fills[i].dataset.w=vals[k];fills[i].style.width=vals[k]+'%';
      if(pcts[i]){pcts[i].style.opacity='1';pcts[i].textContent=vals[k]+'%';pcts[i].dataset.value=vals[k];}
    }
  });
  skillsDone=false;apToast('Skills updated!','green');
}
function apShowBanner(){var text=document.getElementById('ap-ann-text').value.trim();if(!text)return apToast('Enter banner text.','red');document.getElementById('site-banner-text').textContent=text;document.getElementById('site-banner').style.display='block';apToast('Banner shown!','green');}
function apHideBanner(){document.getElementById('site-banner').style.display='none';apToast('Banner hidden.','');}
function apLoadUsers(){
  var users=JSON.parse(localStorage.getItem('site_users')||'{}');var keys=Object.keys(users);var el=document.getElementById('ap-users-list');
  if(!el)return;
  if(!keys.length){el.textContent='No registered users.';return;}
  el.innerHTML=keys.map(function(u){
    var s=u.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/'/g,'&#39;');
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid var(--border)"><span style="font-size:.73rem">'+s+'</span><button onclick="apDeleteUser(\''+s+'\')" style="background:none;border:none;color:#f87171;cursor:none;font-size:.65rem;padding:2px 5px"><i class="fa-solid fa-trash"></i></button></div>';
  }).join('');
}
function apDeleteUser(u){var users=JSON.parse(localStorage.getItem('site_users')||'{}');delete users[u];localStorage.setItem('site_users',JSON.stringify(users));apLoadUsers();apRefreshStats();apToast('User deleted.','');}
function apDeleteAllUsers(){if(!confirm('Delete ALL registered users?'))return;localStorage.setItem('site_users','{}');apLoadUsers();apRefreshStats();apToast('All users deleted.','red');}
function apResetSettings(){localStorage.removeItem(SETTINGS_KEY);settings={particles:true,animations:true,secnums:true,fontsize:'normal',visitctr:true,optout:false,notif:false,sound:false,reducemotion:false,highcontrast:false,largecursor:false,debug:false,profilevis:false};saveSettings();applyAll();apToast('Settings reset.','green');}
function apMaintOn(){document.getElementById('maint-overlay').classList.add('on');apToast('Maintenance ON','red');}
function apMaintOff(){document.getElementById('maint-overlay').classList.remove('on');apToast('Maintenance OFF','green');}
function apExport(){
  var data={exported:new Date().toISOString(),settings:settings,users:Object.keys(JSON.parse(localStorage.getItem('site_users')||'{}')),tw:localStorage.getItem('ema_tw')||'Developer'};
  var blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  var url=URL.createObjectURL(blob);var a=document.createElement('a');a.href=url;a.download='emanueledev-data.json';document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
  apToast('Exported!','green');
}
function apClearAll(){if(!confirm('Delete ALL site data?'))return;localStorage.clear();updateAccountUI(null);closeAdminPanel();apToast('All data cleared.','red');}

var _apToastT;
function apToast(msg,cls){
  var el=document.getElementById('ap-toast');if(!el)return;
  el.textContent=msg;
  el.className='ap-toast show';
  if(cls)el.classList.add(cls);
  clearTimeout(_apToastT);
  _apToastT=setTimeout(function(){el.classList.remove('show');},2600);
}