/* chat */
function addMsg(m){const d=document.createElement('div');d.className='m';d.innerHTML=`<b>${esc(m.n)}</b><small>${m.t}</small><br>${esc(m.x)}`;$('#chat').append(d);$('#chat').scrollTop=1e9}
$('#cf').onsubmit=e=>{e.preventDefault();const x=$('#ci').value.trim();if(!x)return;const m={n:me.name,x,t:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})};
 const h=J('ss_chat_'+code)||[];h.push(m);S('ss_chat_'+code,h.slice(-100));addMsg(m);bc.postMessage({k:'chat',code,id,msg:m});$('#ci').value=''};
