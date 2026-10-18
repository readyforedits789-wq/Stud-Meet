/* presence */
function pres(){return Object.fromEntries(Object.entries(J('ss_pres')||{}).filter(([k,v])=>Date.now()-v.ts<7000))}
function beat(){const p=pres();p[id]={name:me.name,room:code,mic,cam,hand,ts:Date.now()};S('ss_pres',p);tick()}
setInterval(beat,2000);
function rooms(){return J('ss_rooms')||{}}
function tick(){const p=pres(),r=rooms();
 if(!code){$('#sOn').textContent=Object.keys(p).length;
  const live=Object.entries(r).filter(([c,x])=>x.pub&&Object.values(p).some(u=>u.room==c));
  $('#sRm').textContent=live.length;
  $('#rl').innerHTML=live.length?live.map(([c,x])=>`<div class="room"><div><b>${esc(x.name)}</b><br><small>Host: ${esc(x.hostName)} · ${Object.values(p).filter(u=>u.room==c).length} inside · code ${esc(c)}</small></div><button class="p" data-j="${esc(c)}">Join</button></div>`).join(''):'<div class="empty">No public rooms are live. Create one and invite your group.</div>';
 }else roomTick(p,r)}
$('#rl').onclick=e=>{const c=e.target.dataset.j;if(c)join(c)};
