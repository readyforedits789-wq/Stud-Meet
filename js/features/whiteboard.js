/* whiteboard */
let board={pages:1,items:[]},zoom=1,tool='pen',grid=true;const W=900,H=1200,cv=[];
const save=()=>S('ss_board_'+code,board);
function buildPages(){const sc=$('#scroll');sc.innerHTML='';cv.length=0;
 for(let i=0;i<board.pages;i++){const d=document.createElement('div'),c=document.createElement('canvas');c.width=W;c.height=H;d.className='pg'+(grid?' grid':'');d.append(c);
  const n=document.createElement('div');n.className='pn';n.textContent=`Page ${i+1} of ${board.pages}`;sc.append(d,n);cv.push(c);attach(c,i)}
 sizePages();board.items.forEach(it=>it.t=='i'?0:0);for(let i=0;i<board.pages;i++)render(i)}
function sizePages(){document.querySelectorAll('.pg').forEach(d=>{d.style.width=W*zoom+'px';d.style.height=H*zoom+'px'});$('#zl').textContent=Math.round(zoom*100)+'%'}
function seg(g,s,a,b){g.globalCompositeOperation=s.e?'destination-out':'source-over';g.globalAlpha=s.h?.35:1;g.strokeStyle=s.c;g.lineWidth=s.e?s.w*4:s.h?s.w*4:s.w;g.lineCap=g.lineJoin='round';g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke()}
function render(p){const c=cv[p];if(!c)return;const g=c.getContext('2d');g.clearRect(0,0,W,H);
 board.items.filter(it=>it.p==p).forEach(it=>{if(it.t=='s'){if(it.pts.length==1)it.pts.push(it.pts[0]);for(let i=1;i<it.pts.length;i++)seg(g,it,it.pts[i-1],it.pts[i])}
  else if(it.t=='i'){const im=new Image();im.onload=()=>{g.globalCompositeOperation='source-over';g.globalAlpha=1;g.drawImage(im,40,40,Math.min(500,im.width),Math.min(500,im.width)*im.height/im.width)};im.src=it.src}})}
function attach(c,p){let cur=null;const pt=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*W/r.width,(e.clientY-r.top)*H/r.height]};
 c.onpointerdown=e=>{if(!canW()){toast('Only the host can write. Ask for permission.');return}c.setPointerCapture(e.pointerId);
  cur={t:'s',p,c:$('#col').value,w:+$('#sz').value,e:tool=='er',h:tool=='hl',pts:[pt(e)]}};
 c.onpointermove=e=>{if(!cur)return;const q=pt(e),a=cur.pts.at(-1);seg(c.getContext('2d'),cur,a,q);cur.pts.push(q)};
 c.onpointerup=()=>{if(!cur)return;board.items.push(cur);save();bc.postMessage({k:'item',code,id,it:cur});cur=null}}
bc.onmessage=({data:m})=>{if(m.code!=code||m.id==id)return;
 if(m.k=='item'){board.items.push(m.it);render(m.it.p)}
 if(m.k=='pages'){board=J('ss_board_'+code);buildPages()}
 if(m.k=='chat')addMsg(m.msg);if(m.k=='clear'){board=J('ss_board_'+code);render(m.p)}}
document.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{tool=b.dataset.tool;document.querySelectorAll('[data-tool]').forEach(x=>x.classList.toggle('on',x==b))});
$('#gd').onclick=()=>{grid=!grid;document.querySelectorAll('.pg').forEach(d=>d.classList.toggle('grid',grid))};
$('#zi').onclick=()=>{zoom=Math.min(3,zoom+.15);sizePages()};$('#zo').onclick=()=>{zoom=Math.max(.4,zoom-.15);sizePages()};
$('#scroll').addEventListener('wheel',e=>{if(e.ctrlKey){e.preventDefault();zoom=Math.min(3,Math.max(.4,zoom-e.deltaY/500));sizePages()}},{passive:false});
$('#ap').onclick=()=>{board.pages++;save();bc.postMessage({k:'pages',code,id});buildPages();$('#scroll').scrollTop=1e6};
$('#cl').onclick=()=>{const p=Math.round($('#scroll').scrollTop/((H*zoom)+40));board.items=board.items.filter(i=>i.p!=p);save();render(p);bc.postMessage({k:'clear',code,id,p})};
$('#im').onclick=()=>$('#fi').click();
$('#fi').onchange=e=>{const f=e.target.files[0];if(!f)return;if(f.size>2e6){toast('Image too large (max 2MB in demo)');return}
 const r=new FileReader();r.onload=()=>{const p=Math.min(board.pages-1,Math.max(0,Math.round($('#scroll').scrollTop/((H*zoom)+40))));const it={t:'i',p,src:r.result};board.items.push(it);save();render(p);bc.postMessage({k:'item',code,id,it})};r.readAsDataURL(f);e.target.value=''};
