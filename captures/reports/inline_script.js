
  // Robot follows the cursor + glowing cursor trail (desktop only, respects reduced motion)
  (function(){
    const fine = window.matchMedia('(pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!fine || calm) return;

    const eyes = document.getElementById('eyes');
    const orb = document.querySelector('.robot-orb');
    const canvas = document.getElementById('trail');
    const ctx = canvas.getContext('2d');
    const points = [];
    const LIFE = 450; // ms a trail point stays visible
    let running = false, mouseX = 0, mouseY = 0, pending = false;

    function resize(){
      const dpr = window.devicePixelRatio || 1;
      canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize(); addEventListener('resize', resize);

    function lookAt(){
      pending = false;
      const r = orb.getBoundingClientRect();
      if(r.bottom < 0 || r.top > innerHeight) return; // robot off screen
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = mouseX - cx, dy = mouseY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const pull = Math.min(dist / 300, 1);
      eyes.style.transform = `translate(${dx / dist * 22 * pull}px, ${dy / dist * 14 * pull}px)`;
      orb.style.transform = `perspective(700px) rotateY(${dx / dist * 10 * pull}deg) rotateX(${-dy / dist * 10 * pull}deg)`;
    }

    function draw(){
      const now = performance.now();
      while(points.length && now - points[0].t > LIFE) points.shift();
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      for(let i = 1; i < points.length; i++){
        const a = points[i - 1], b = points[i];
        const life = 1 - (now - b.t) / LIFE;
        ctx.strokeStyle = `rgba(53,208,242,${0.55 * life})`;
        ctx.shadowColor = 'rgba(53,208,242,0.9)';
        ctx.shadowBlur = 12 * life;
        ctx.lineWidth = 1 + 5 * life;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      if(points.length){ requestAnimationFrame(draw); } else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
    }

    addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      points.push({x: mouseX, y: mouseY, t: performance.now()});
      if(points.length > 60) points.shift();
      if(!running){ running = true; requestAnimationFrame(draw); }
      if(!pending){ pending = true; requestAnimationFrame(lookAt); }
    }, {passive: true});

    document.addEventListener('mouseleave', () => {
      eyes.style.transform = ''; orb.style.transform = '';
    });
  })();

  // Mobile menu
  const burger=document.getElementById('burger');
  const mobileMenu=document.getElementById('mobileMenu');
  burger.addEventListener('click',()=>{
    burger.classList.toggle('on');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    burger.classList.remove('on');mobileMenu.classList.remove('open');
  }));

  // Chat
  const body=document.getElementById('chatBody');
  const input=document.getElementById('chatInput');
  const sendBtn=document.getElementById('chatSend');
  const history=[];
  function add(text,who){
    const d=document.createElement('div');
    d.className='msg '+who;d.textContent=text;
    body.appendChild(d);body.scrollTop=body.scrollHeight;return d;
  }
  const SYSTEM_PROMPT="You are the friendly AI assistant for Ali & AI, an AI automation agency run by Alina. You help small and medium businesses understand how automation could save them time and money. Services: email/inbox automation, AI phone systems, website chatbots, social media automation, lead qualification, and custom integrations. Pricing is custom per business — never quote fixed prices, instead invite them to get a free quote via the contact form or WhatsApp. Keep replies short, warm, and practical. If asked what you can automate, give concrete examples relevant to their business. When a visitor shows interest, naturally gather their business type, what they want automated, and their name plus a contact (email or WhatsApp) so Alina can follow up — then save the lead.";
  async function send(){
    const text=input.value.trim();if(!text)return;
    add(text,'user');history.push({role:'user',content:text});
    input.value='';sendBtn.disabled=true;
    const typing=add('Assistant is typing…','bot typing');
    try{
      const res=await fetch("/.netlify/functions/chat",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({system:SYSTEM_PROMPT,messages:history})
      });
      const data=await res.json();typing.remove();
      const reply=(data.content||[]).filter(i=>i.type==='text').map(i=>i.text).join('\n').trim()||"Thanks! I've noted that. Alina will follow up with you shortly — or reach out on WhatsApp for a faster reply.";
      add(reply,'bot');history.push({role:'assistant',content:reply});
    }catch(e){
      typing.remove();
      add("Sorry, something went wrong. Please reach out via WhatsApp or email and we'll get right back to you.",'bot');
    }
    sendBtn.disabled=false;input.focus();
  }
  sendBtn.addEventListener('click',send);
  input.addEventListener('keydown',e=>{if(e.key==='Enter')send();});
