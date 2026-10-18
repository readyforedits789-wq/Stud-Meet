/* ===== CONFIG =====
 Demo mode: rooms, chat and board sync between tabs of the SAME browser (BroadcastChannel + localStorage).
 For real internet sync: replace the store()/send()/onmsg layer with Firebase Realtime DB, and add PeerJS for voice/video. */
const $=s=>document.querySelector(s),ls=localStorage;
const id=Math.random().toString(36).slice(2,8);let me={id,name:ls.ss_name||''},code=null,mic=false,cam=false,stream=null,hand=false;
const bc=new BroadcastChannel('studyspace');
const J=k=>{try{return JSON.parse(ls[k]||'null')}catch(e){return null}},S=(k,v)=>{try{ls[k]=JSON.stringify(v)}catch(e){toast('Storage full')}};
const toast=t=>{const d=document.createElement('div');d.id='toast';d.textContent=t;document.body.append(d);setTimeout(()=>d.remove(),2200)};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
$('#th').onclick=()=>{const b=document.body;b.dataset.t=b.dataset.t=='dark'?'light':'dark'};
$('#nm').value=me.name;
