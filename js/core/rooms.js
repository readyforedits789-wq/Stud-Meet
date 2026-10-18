/* create / join */
function needName(){const n=$('#nm').value.trim();if(!n){toast('Enter your name first');$('#nm').focus();return false}me.name=n;ls.ss_name=n;return true}
$('#mk').onclick=()=>{if(needName())$('#cm').classList.remove('hide')};$('#cx').onclick=()=>$('#cm').classList.add('hide');
$('#cg').onclick=()=>{const r=rooms();let c=$('#rc').value.trim().toUpperCase().replace(/\s/g,'');
 if(!c)c=Math.random().toString(36).slice(2,8).toUpperCase();
 if(r[c]&&Object.values(pres()).some(u=>u.room==c)){$('#ce').textContent='This code is already taken. Try another.';return}
 r[c]={name:$('#rn').value.trim()||'Study room',pub:$('#rv').value=='1',hostId:id,hostName:me.name,writers:[]};S('ss_rooms',r);S('ss_board_'+c,{pages:1,items:[]});S('ss_chat_'+c,[]);
 $('#cm').classList.add('hide');join(c)};
$('#jb').onclick=()=>{const c=$('#jc').value.trim().toUpperCase();if(c)join(c)};
function join(c){if(!needName())return;const r=rooms();if(!r[c]){toast('Room not found');return}
 code=c;$('#home').classList.add('hide');$('#room').classList.remove('hide');$('#rt').textContent=r[c].name;$('#rcode').textContent='Code: '+c;
 board=J('ss_board_'+c)||{pages:1,items:[]};buildPages();(J('ss_chat_'+c)||[]).forEach(addMsg);beat()}
$('#cp').onclick=()=>{navigator.clipboard?.writeText(code);toast('Code copied')};
$('#lv').onclick=()=>{stopMedia();const p=pres();delete p[id];S('ss_pres',p);code=null;$('#room').classList.add('hide');$('#home').classList.remove('hide');$('#scroll').innerHTML='';$('#chat').innerHTML='';tick()};
addEventListener('beforeunload',()=>{const p=pres();delete p[id];S('ss_pres',p)});
