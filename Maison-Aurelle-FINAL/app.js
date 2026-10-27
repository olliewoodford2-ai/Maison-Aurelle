document.querySelectorAll('form[data-ajax]').forEach(f=>f.addEventListener('submit',async e=>{
  e.preventDefault();const note=f.parentElement.querySelector('[data-note]');const b=f.querySelector('button');b.disabled=true;
  try{const r=await fetch(f.action,{method:'POST',body:new URLSearchParams(new FormData(f)),headers:{Accept:'application/json'}});const j=await r.json();
    if(j.ok){f.reset();note.textContent=f.dataset.thanks||'Thank you — you will hear from the maison soon.';note.className='form-note ok'}else{note.textContent=j.error;note.className='form-note err'}}
  catch(_){note.textContent='Something went wrong. Please try again.';note.className='form-note err'}
  b.disabled=false;}));
const q=new URLSearchParams(location.search),piece=q.get('piece'),sel=document.querySelector('select[name=subject]');
if(piece&&sel){sel.value=piece.startsWith('Bague')?'The Bague Éternelle solitaire':'A piece from the signatures';const m=document.querySelector('textarea[name=message]');if(m&&!m.value)m.value='I would like to know more about '+piece+'.';}
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu-open')));

(()=>{const j=document.querySelector('.journey');if(!j)return;
    const v=j.querySelector('video'),play=j.querySelector('.journey__play'),hdr=document.querySelector('.site-header');
    const st={started:false,ended:false,failed:false,blocked:false};
    const reveal=on=>j.classList.toggle('is-revealed',on);
    const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(still){j.classList.add('is-still');reveal(true);return}
    v.addEventListener('ended',()=>{st.ended=true;reveal(true)});
    v.addEventListener('error',()=>{st.failed=true});
    play.onclick=()=>{st.blocked=false;play.hidden=true;v.play().catch(()=>{st.blocked=true;play.hidden=false})};
    let raf=0;const tick=()=>{raf=0;
      const span=j.offsetHeight-innerHeight,p=span>0?Math.min(1,Math.max(0,-j.getBoundingClientRect().top/span)):0;
      j.style.setProperty('--p',p.toFixed(4));
      hdr&&hdr.classList.toggle('over-journey',j.getBoundingClientRect().bottom>90);
      if(p<.2){if(st.started||st.ended){st.started=st.ended=false;if(!v.paused)v.pause();if(v.currentTime>0)v.currentTime=0}reveal(false);play.hidden=true;return}
      if(!st.failed&&p>=.28&&!st.ended&&v.paused&&!st.blocked){st.started=true;const r=v.play();r&&r.catch&&r.catch(()=>{st.blocked=true;play.hidden=false})}
      if(st.ended||p>=.86||(st.failed&&p>=.5)||(st.blocked&&p>=.74))reveal(true);
      if(j.classList.contains('is-revealed'))play.hidden=true;
    };
    const req=()=>{raf||=requestAnimationFrame(tick)};
    addEventListener('scroll',req,{passive:true});addEventListener('resize',req);tick();
    j.querySelector('.journey__enter').onclick=()=>scrollTo({top:j.offsetTop+Math.round((j.offsetHeight-innerHeight)*.52),behavior:'smooth'});
  })();
  const setF=f=>{document.querySelectorAll('.filters button').forEach(b=>b.classList.toggle('on',b.dataset.f===f));
    document.querySelectorAll('#pieces .card').forEach(c=>c.style.display=(f==='all'||c.dataset.cat===f)?'':'none')};
  document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>setF(b.dataset.f));
  document.querySelectorAll('.room').forEach(r=>r.addEventListener('click',()=>setF(r.dataset.filter)));
