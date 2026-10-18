/* calculator */
let cm='Basic',deg=true,ex='';
const KS={Basic:['7','8','9','÷','C','4','5','6','×','⌫','1','2','3','−','(','0','.','%','+',')','='],
 Sci:['sin(','cos(','tan(','log(','ln(','√(','^','π','e','!','7','8','9','÷','C','4','5','6','×','⌫','1','2','3','−','(','0','.','+',')','=','Deg'],
 Prog:[]};
function calc(){const b=$('#cb');b.innerHTML=`<div class="tabs">${['Basic','Sci','Prog'].map(t=>`<button class="${t==cm?'on':''}" data-m="${t}">${t=='Sci'?'Scientific':t=='Prog'?'Electronics':t}</button>`).join('')}</div>`+
 (cm=='Prog'?`<select id="pb"><option value="10">Decimal</option><option value="2">Binary</option><option value="8">Octal</option><option value="16">Hex</option></select><input id="pv" placeholder="Value" style="margin:6px 0"><div id="po" style="font-family:monospace;font-size:13px"></div>
 <hr style="border-color:var(--bd)"><b style="font-size:13px">Ohm's law</b><div class="row"><input id="ov" placeholder="V"><input id="oi" placeholder="I (A)"><input id="or" placeholder="R (Ω)"></div><div id="oo" style="font-size:13px;color:var(--mu)">Fill any two fields.</div>`
 :`<div id="cd">${ex||'0'}</div><div class="keys">${KS[cm].map(k=>`<button data-k="${k}">${k=='Deg'?(deg?'Deg':'Rad'):k}</button>`).join('')}</div>`)}
$('#cb').onclick=e=>{const m=e.target.dataset.m,k=e.target.dataset.k;if(m){cm=m;ex='';calc();return}if(!k)return;
 if(k=='C')ex='';else if(k=='⌫')ex=ex.slice(0,-1);else if(k=='Deg')deg=!deg;else if(k=='=')ex=ev(ex);else ex+=k;calc()};
function fact(n){n=Math.round(n);let r=1;for(let i=2;i<=n;i++)r*=i;return r}
function ev(s){try{let q=s.replace(/÷/g,'/').replace(/×/g,'*').replace(/−/g,'-').replace(/\^/g,'**').replace(/π/g,'PI').replace(/√\(/g,'sqrt(').replace(/(\d+)!/g,'fact($1)').replace(/(\d+(\.\d+)?)%/g,'($1/100)').replace(/\be\b/g,'E');
 if(/[^0-9a-zA-Z+\-*/().\s]/.test(q.replace(/\*\*/g,'')))return'Error';
 const ok=['sin','cos','tan','log','ln','sqrt','PI','E','fact'];if((q.match(/[a-zA-Z]+/g)||[]).some(w=>!ok.includes(w)))return'Error';
 const r=deg?Math.PI/180:1,f=new Function('sin','cos','tan','log','ln','sqrt','PI','E','fact','return '+q);
 const v=f(x=>Math.sin(x*r),x=>Math.cos(x*r),x=>Math.tan(x*r),Math.log10,Math.log,Math.sqrt,Math.PI,Math.E,fact);return isFinite(v)?String(+v.toPrecision(12)):'Error'}catch(e){return'Error'}}
document.addEventListener('input',e=>{if(e.target.id=='pv'||e.target.id=='pb'){const n=parseInt($('#pv').value,+$('#pb').value);$('#po').innerHTML=isNaN(n)?'':`DEC ${n}<br>BIN ${n.toString(2)}<br>OCT ${n.toString(8)}<br>HEX ${n.toString(16).toUpperCase()}`}
 if(['ov','oi','or'].includes(e.target.id)){const v=parseFloat($('#ov').value),i=parseFloat($('#oi').value),r=parseFloat($('#or').value);
  $('#oo').textContent=!isNaN(v)&&!isNaN(i)?`R = ${(v/i).toFixed(4)} Ω, P = ${(v*i).toFixed(4)} W`:!isNaN(v)&&!isNaN(r)?`I = ${(v/r).toFixed(4)} A, P = ${(v*v/r).toFixed(4)} W`:!isNaN(i)&&!isNaN(r)?`V = ${(i*r).toFixed(4)} V, P = ${(i*i*r).toFixed(4)} W`:'Fill any two fields.'}});
$('#cc').onclick=()=>{$('#calc').classList.toggle('hide');calc()};$('#cz').onclick=()=>$('#calc').classList.add('hide');
(()=>{let d=null;const h=$('#ch'),c=$('#calc');h.onpointerdown=e=>{if(e.target.id=='cz')return;d=[e.clientX-c.offsetLeft,e.clientY-c.offsetTop];h.setPointerCapture(e.pointerId)};
 h.onpointermove=e=>{if(d){c.style.left=e.clientX-d[0]+'px';c.style.top=e.clientY-d[1]+'px'}};h.onpointerup=()=>d=null})();
