// LOADER
window.addEventListener('load',()=>setTimeout(()=>{document.getElementById('loader').classList.add('hide');},1900));

// CURSOR
const cur=document.getElementById('cur'),curR=document.getElementById('curR');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function ac(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;curR.style.left=rx+'px';curR.style.top=ry+'px';requestAnimationFrame(ac);})();
document.querySelectorAll('a,button,.svc-card,.tcard,.pc,.gi').forEach(el=>{
  el.addEventListener('mouseenter',()=>{curR.style.width='52px';curR.style.height='52px';curR.style.opacity='.4';});
  el.addEventListener('mouseleave',()=>{curR.style.width='32px';curR.style.height='32px';curR.style.opacity='1';});
});

// BURGER
const burg=document.getElementById('burg'),mn=document.getElementById('mnav');
burg.addEventListener('click',()=>{burg.classList.toggle('open');mn.classList.toggle('open');});
function cm(){burg.classList.remove('open');mn.classList.remove('open');}

// HEADER
window.addEventListener('scroll',()=>{document.getElementById('hdr').classList.toggle('scrolled',scrollY>60);});

// REVEAL
const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('on');obs.unobserve(x.target);}}),{threshold:.08});
document.querySelectorAll('.rv,.rl,.rr').forEach(el=>obs.observe(el));

// COUNTERS
const cobs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){animN(x.target);cobs.unobserve(x.target);}}),{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>cobs.observe(el));
function animN(el){
  const t=+el.dataset.count,suf=t===99?'%':'+';
  let c=0;const st=Math.ceil(t/60);
  const tm=setInterval(()=>{c=Math.min(c+st,t);el.textContent=c+suf;if(c>=t)clearInterval(tm);},18);
}

// TABS
function pt(name,btn){
  document.querySelectorAll('.ptab-c').forEach(e=>e.classList.remove('on'));
  document.querySelectorAll('.ptab').forEach(b=>b.classList.remove('active'));
  document.getElementById('p-'+name).classList.add('on');
  if(btn)btn.classList.add('active');
  setTimeout(()=>{document.querySelectorAll('#p-'+name+' .rv').forEach(el=>el.classList.add('on'));},60);
}

// FORM
function sendF(){
  if(!document.getElementById('fn').value.trim()||!document.getElementById('em').value.trim()||!document.getElementById('sv').value){
    alert('Veuillez remplir votre prénom, email et prestation souhaitée.');return;
  }
  document.getElementById('fCon').style.display='none';
  document.getElementById('fOk').style.display='block';
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}});
});

// HERO CANVAS
(function(){
  const c=document.getElementById('heroCanvas'),ctx=c.getContext('2d');
  let W,H,pts=[];
  function resize(){W=c.width=c.offsetWidth;H=c.height=c.offsetHeight;}
  function init(){pts=[];for(let i=0;i<90;i++)pts.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.3+.2,o:Math.random()*.45+.05,sp:Math.random()*.22+.04,vx:(Math.random()-.5)*.25});}
  function drawCar(){
    const cx=W*.5,cy=H*.6,sc=Math.min(W,H)*.0017;
    ctx.save();ctx.translate(cx,cy);ctx.scale(sc,sc);
    const bg=ctx.createLinearGradient(0,-100,0,100);bg.addColorStop(0,'#1a1a1a');bg.addColorStop(1,'#050505');
    ctx.beginPath();ctx.moveTo(-320,90);ctx.bezierCurveTo(-320,28,-278,-18,-188,-62);ctx.lineTo(-88,-128);ctx.bezierCurveTo(-28,-162,52,-162,132,-140);ctx.lineTo(258,-78);ctx.bezierCurveTo(296,-46,315,8,315,90);ctx.closePath();ctx.fillStyle=bg;ctx.fill();ctx.strokeStyle='#1e1e1e';ctx.lineWidth=2;ctx.stroke();
    ctx.beginPath();ctx.moveTo(-188,-60);ctx.lineTo(-88,-126);ctx.bezierCurveTo(-28,-160,52,-160,132,-138);ctx.lineTo(212,-84);ctx.lineTo(212,-28);ctx.lineTo(-188,-28);ctx.closePath();ctx.fillStyle='rgba(6,14,28,.88)';ctx.fill();ctx.strokeStyle='#181818';ctx.lineWidth=1.5;ctx.stroke();
    ctx.beginPath();ctx.moveTo(-25,-26);ctx.lineTo(-25,82);ctx.strokeStyle='#181818';ctx.lineWidth=2;ctx.stroke();
    [-168,188].forEach(wx=>{
      ctx.beginPath();ctx.arc(wx,100,60,0,Math.PI*2);ctx.fillStyle='#050505';ctx.fill();ctx.strokeStyle='#111';ctx.lineWidth=3;ctx.stroke();
      ctx.beginPath();ctx.arc(wx,100,50,0,Math.PI*2);ctx.fillStyle='#030303';ctx.fill();
      ctx.beginPath();ctx.arc(wx,100,35,0,Math.PI*2);ctx.fillStyle='#0a0a0a';ctx.fill();ctx.strokeStyle='#141414';ctx.lineWidth=1.5;ctx.stroke();
      for(let s=0;s<5;s++){const a=(s/5)*Math.PI*2;ctx.beginPath();ctx.moveTo(wx+Math.cos(a)*10,100+Math.sin(a)*10);ctx.lineTo(wx+Math.cos(a)*31,100+Math.sin(a)*31);ctx.strokeStyle='#181818';ctx.lineWidth=6;ctx.lineCap='round';ctx.stroke();}
      ctx.beginPath();ctx.arc(wx,100,9,0,Math.PI*2);ctx.fillStyle='#050505';ctx.fill();
    });
    ctx.beginPath();ctx.ellipse(0,163,320,15,0,0,Math.PI*2);ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fill();
    ctx.restore();
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    const bg=ctx.createRadialGradient(W*.5,H*.28,0,W*.5,H*.28,W*.88);bg.addColorStop(0,'#0e0e0e');bg.addColorStop(1,'#010101');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(255,255,255,0.018)';ctx.lineWidth=1;
    for(let x=0;x<W;x+=70){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=0;y<H;y+=70){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    pts.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${p.o})`;ctx.fill();p.y-=p.sp;p.x+=p.vx;if(p.y<-5){p.y=H+5;p.x=Math.random()*W;}if(p.x<-5||p.x>W+5){p.x=Math.random()*W;}});
    requestAnimationFrame(draw);
}
  window.addEventListener('resize',()=>{resize();init();});resize();init();draw();
})();

// MAP CANVAS
(function(){
  const c=document.getElementById('mapC'),ctx=c.getContext('2d');
  function draw(){
    const W=c.width=c.parentElement.offsetWidth,H=c.height=260;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#08080f';ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(255,255,255,0.04)';ctx.lineWidth=1;
    for(let x=0;x<W;x+=50){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=0;y<H;y+=50){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=4;ctx.lineCap='round';
    [[0,H*.4,W,H*.4],[W*.3,0,W*.3,H],[W*.6,0,W*.78,H],[0,H*.68,W*.52,H*.58],[W*.52,H*.58,W,H*.48]].forEach(r=>{ctx.beginPath();ctx.moveTo(r[0],r[1]);ctx.lineTo(r[2],r[3]);ctx.stroke();});
    ctx.strokeStyle='rgba(80,120,200,0.12)';ctx.lineWidth=7;
    ctx.beginPath();ctx.moveTo(0,H*.55);ctx.bezierCurveTo(W*.25,H*.5,W*.5,H*.6,W*.75,H*.52);ctx.bezierCurveTo(W*.88,H*.48,W,H*.5,W,H*.5);ctx.stroke();
    const px=W*.5,py=H*.42,pulse=.5+Math.sin(Date.now()*.003)*.5;
    ctx.beginPath();ctx.arc(px,py,18*pulse,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${0.04*pulse})`;ctx.fill();
    ctx.beginPath();ctx.arc(px,py,10,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.08)';ctx.fill();
    ctx.beginPath();ctx.arc(px,py,5,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();
    ctx.fillStyle='rgba(0,0,0,.75)';ctx.beginPath();ctx.roundRect(px-46,py-40,92,20,3);ctx.fill();
    ctx.fillStyle='#fff';ctx.font='700 10px Segoe UI';ctx.textAlign='center';ctx.fillText('Night LED',px,py-26);
    ctx.fillStyle='rgba(255,255,255,.35)';ctx.font='9px Segoe UI';ctx.fillText('Namur',px,py-14);
    requestAnimationFrame(draw);
  }
  draw();window.addEventListener('resize',draw);
})();