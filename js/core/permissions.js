/* host / permissions */
const R=()=>rooms()[code]||{},isHost=()=>R().hostId==id,canW=()=>isHost()||(R().writers||[]).includes(id);
function roomTick(p,r){const x=r[code];if(!x){$('#lv').click();toast('Room closed');return}
 const m=Object.entries(p).filter(([k,u])=>u.room==code);
 if(!m.some(([k])=>k==x.hostId)&&m.length){const nh=m.map(a=>a[0]).sort()[0];if(nh==id){x.hostId=id;x.hostName=me.name;S('ss_rooms',r)}} // host transfer
 $('#pc').textContent='('+m.length+')';
 $('#ppl').innerHTML=m.map(([k,u])=>`<div class="pp"><span>${esc(u.name)}${k==id?' (you)':''}${k==x.hostId?' · host':''}${u.hand?' ✋':''}</span><small>${u.mic?'🎙':'🔇'}${u.cam?'📷':''}</small>${isHost()&&k!=id?`<button data-w="${k}">${(x.writers||[]).includes(k)?'Revoke':'Allow write'}</button>`:''}</div>`).join('');
 $('#ro').textContent=canW()?'You can write':'View only – host controls writing';
 $('#cl').disabled=$('#ap').disabled=$('#im').disabled=!canW()}
$('#ppl').onclick=e=>{const k=e.target.dataset.w;if(!k)return;const r=rooms(),w=r[code].writers||[];r[code].writers=w.includes(k)?w.filter(a=>a!=k):[...w,k];S('ss_rooms',r);tick()};
