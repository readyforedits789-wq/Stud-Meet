/* media: local preview only in demo; real delivery to others needs WebRTC (PeerJS/LiveKit) */
async function media(){if(stream)return stream;try{stream=await navigator.mediaDevices.getUserMedia({audio:true,video:true});return stream}catch(e){toast('Allow mic/camera permission in your browser');return null}}
function stopMedia(){stream?.getTracks().forEach(t=>t.stop());stream=null;mic=cam=false;ui();$('#vids').innerHTML=''}
function ui(){$('#mic').textContent=mic?'Mic on':'Mic off';$('#mic').className=mic?'on':'off';$('#cam').textContent=cam?'Camera on':'Camera off';$('#cam').className=cam?'on':'off';$('#hand').className=hand?'on':''}
$('#mic').onclick=async()=>{const s=await media();if(!s)return;mic=!mic;s.getAudioTracks().forEach(t=>t.enabled=mic);ui();beat()};
$('#cam').onclick=async()=>{const s=await media();if(!s)return;cam=!cam;s.getVideoTracks().forEach(t=>t.enabled=cam);ui();
 $('#vids').innerHTML=cam?'<video autoplay muted playsinline></video>':'';if(cam)$('#vids video').srcObject=new MediaStream(s.getVideoTracks());beat()};
$('#hand').onclick=()=>{hand=!hand;ui();beat()};ui();
