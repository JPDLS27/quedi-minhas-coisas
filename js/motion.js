/* ============================================================
   quedi minhas coisas: movimento e interações da landing
   GSAP + ScrollTrigger (arquivos locais em assets/vendor).
   Sem GSAP ou com "reduzir movimento": tudo aparece direto e as
   interações (mapa, compartimentos, pontos) continuam funcionando.
   ============================================================ */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasG = !!(window.gsap && window.ScrollTrigger) && !reduce;
  if (hasG) gsap.registerPlugin(ScrollTrigger);
  const EASE = 'power3.out';

  /* ---------- base: logo, ícones ---------- */
  $$('[data-logo]').forEach(el => el.insertAdjacentHTML('afterbegin', LOGO));
  $$('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });
  $$('[data-icon-inline]').forEach(el => el.insertAdjacentHTML('afterbegin', icon(el.dataset.iconInline)));

  /* ---------- faixa: duplica o conjunto para o loop ---------- */
  const track = $('.marquee-track');
  if (track && !reduce) {
    const clone = $('.m-set', track).cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    $$('img', clone).forEach(i => i.setAttribute('alt', ''));
    track.appendChild(clone);
  }

  /* ---------- utilidades ---------- */
  function countTo(el, to, render, dur = 1.2) {
    if (!hasG) { el.innerHTML = render(to); return; }
    const o = { v: parseFloat(el._v || 0) };
    gsap.to(o, { v: to, duration: dur, ease: 'power2.out', onUpdate() { el._v = o.v; el.innerHTML = render(Math.round(o.v)); } });
  }
  function onceVisible(el, fn, margin = '0px 0px -15% 0px') {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); fn(); } }, { rootMargin: margin, threshold: 0.2 });
    io.observe(el);
  }

  /* ---------- contador do aviso do hero ---------- */
  const heroCount = $('[data-count]');
  if (heroCount) {
    const to = +heroCount.dataset.count;
    onceVisible(heroCount, () => countTo(heroCount, to, n => `${n} ${n === 1 ? 'pessoa' : 'pessoas'}`, 1.6));
  }

  /* ---------- Devolução segura: acordeão + mini testes ---------- */
  $$('.safe-btn').forEach(btn => btn.addEventListener('click', () => {
    const item = btn.closest('.safe-item'), open = !item.classList.contains('is-open');
    $$('.safe-item').forEach(it => { it.classList.remove('is-open'); $('.safe-btn', it).setAttribute('aria-expanded', 'false'); });
    if (open) { item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
  }));
  $$('[data-ans]').forEach(b => b.addEventListener('click', () => {
    const res = $('.safe-res', b.closest('.safe-demo'));
    $$('[data-ans]').forEach(x => x.classList.remove('is-right', 'is-wrong'));
    void b.offsetWidth;
    const ok = b.dataset.ans === '1';
    b.classList.add(ok ? 'is-right' : 'is-wrong');
    res.className = 'safe-res ' + (ok ? 'is-ok' : 'is-bad');
    res.textContent = ok ? 'Acertou! Dono confirmado, o item pode ser retirado.' : 'Não é esse. Quem não sabe o detalhe não leva o item.';
  }));
  $$('[data-meet]').forEach(b => b.addEventListener('click', () => {
    const res = $('.safe-res', b.closest('.safe-demo'));
    $$('[data-meet]').forEach(x => x.classList.toggle('is-right', x === b));
    res.className = 'safe-res is-ok';
    res.textContent = 'Combinado: ' + b.dataset.meet + '.';
  }));

  /* ---------- FAQ com altura animada ---------- */
  if (!reduce) {
    $$('.faq details').forEach(d => {
      const s = $('summary', d);
      s.addEventListener('click', e => {
        e.preventDefault();
        if (d._a) d._a.cancel();
        const start = d.offsetHeight;
        d.style.overflow = 'hidden';
        const opening = !d.open;
        if (opening) d.open = true;
        const end = opening ? d.offsetHeight : s.offsetHeight;
        d._a = d.animate({ height: [start + 'px', end + 'px'] }, { duration: opening ? 260 : 200, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
        d._a.onfinish = () => { if (!opening) d.open = false; d.style.height = d.style.overflow = ''; };
      });
    });
  }

  /* ---------- compartimentos da Estação ---------- */
  const lockers = $$('.locker');
  const toggleLocker = (b, force) => {
    const open = force ?? !b.classList.contains('is-open');
    b.classList.toggle('is-open', open);
    b.setAttribute('aria-expanded', String(open));
  };
  lockers.forEach(b => b.addEventListener('click', () => {
    lockers.forEach(o => { if (o !== b) toggleLocker(o, false); });
    toggleLocker(b);
  }));
  const stationCard = $('.station-card');
  if (stationCard) onceVisible(stationCard, () => setTimeout(() => toggleLocker(lockers[1], true), reduce ? 0 : 900), '0px 0px -25% 0px');

  /* ---------- recompensas ---------- */
  (function rewards() {
    const pts = $('#pts'), fill = $('#meter-fill'), next = $('#pts-next'), btn = $('#sim-return');
    if (!pts) return;
    const bar = $('.meter');
    const seals = $$('#seals .seal');
    let points = 40, returns = 0;
    const START = 40;
    const paint = (animate = true) => {
      const pct = Math.min(points / 100, 1);
      bar.setAttribute('aria-valuenow', String(Math.min(points, 100)));
      if (hasG && animate) {
        gsap.to(fill, { scaleX: pct, duration: .6, ease: EASE });
        const o = { v: +pts.textContent };
        gsap.to(o, { v: points, duration: .6, ease: 'power2.out', onUpdate() { pts.textContent = Math.round(o.v); } });
      } else { fill.style.transform = `scaleX(${pct})`; pts.textContent = points; }
      next.textContent = points >= 100 ? 'Você ganhou um café na cantina da FURB' : `Faltam ${100 - points} pontos para um café na cantina`;
      seals.forEach(s => {
        const unlocked = returns >= +s.dataset.need;
        const was = !s.classList.contains('is-locked');
        s.classList.toggle('is-locked', !unlocked);
        if (unlocked && !was && !reduce) { s.classList.remove('pop'); void s.offsetWidth; s.classList.add('pop'); }
      });
      btn.textContent = returns >= 5 ? 'Recomeçar a demonstração' : 'Simular uma devolução';
    };
    btn.addEventListener('click', () => {
      if (returns >= 5) { points = START; returns = 0; } else { points += 30; returns += 1; }
      paint();
    });
    paint(false);
  })();

  /* ---------- mapa vivo: toque, raio e pessoas avisadas ---------- */
  (function liveMap() {
    const box = $('#live-map');
    if (!box) return;
    box.innerHTML = cityMap({ labels: true, show: ['inst', 'estacao'], aria: 'Mapa da cidade. Toque para marcar onde você perdeu algo.' });
    const svg = $('svg', box);
    const NS = 'http://www.w3.org/2000/svg';
    const mk = (tag, attrs, parent = svg) => { const el = document.createElementNS(NS, tag); for (const k in attrs) el.setAttribute(k, attrs[k]); parent.appendChild(el); return el; };

    // pessoas andando pelas ruas (exemplo)
    const H = [62, 172, 290, 400, 488], V = [70, 225, 395, 520, 690];
    const walkers = [];
    const walkTl = hasG ? gsap.timeline({ paused: true }) : null;
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 28; i++) {
      const horiz = i % 2 === 0;
      const line = (horiz ? H : V)[Math.floor(rnd() * 5)];
      const max = horiz ? 780 : 500;
      const a = 20 + rnd() * (max - 260), b = a + 160 + rnd() * 220;
      const end = Math.min(b, max);
      const g = mk('g', {});
      mk('circle', { r: 6, fill: '#A8927E', stroke: '#fff', 'stroke-width': 2 }, g);
      const w = { g, horiz, line, a, b: end, cur: (a + end) / 2 };
      walkers.push(w);
      const set = v => { w.cur = v; g.setAttribute('transform', horiz ? `translate(${v} ${line})` : `translate(${line} ${v})`); };
      set(w.cur);
      if (hasG) {
        const o = { v: a + rnd() * (end - a) };
        walkTl.fromTo(o, { v: a }, { v: end, duration: (end - a) / 16, ease: 'sine.inOut', repeat: -1, yoyo: true, onUpdate() { set(o.v); } }, 0).progress(rnd());
      }
    }
    if (walkTl) {
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? walkTl.play() : walkTl.pause()), { threshold: 0.1 });
      io.observe(box);
    }

    // marcador e raio
    const R = 95;
    const rad = mk('circle', { r: 0, cx: 0, cy: 0, fill: '#8C2F06', 'fill-opacity': .14, stroke: '#8C2F06', 'stroke-width': 2, 'stroke-dasharray': '6 6', visibility: 'hidden' });
    const pinG = mk('g', { visibility: 'hidden' });
    const pinInner = mk('g', {}, pinG);
    mk('path', { d: 'M0 0 C -14 -18 -16 -24 -16 -30 a16 16 0 0 1 32 0 c0 6 -2 12 -16 30z', fill: '#B3261E', stroke: '#fff', 'stroke-width': 2.5 }, pinInner);
    mk('circle', { cy: -30, r: 6, fill: '#fff' }, pinInner);
    // pessoas por cima do raio
    walkers.forEach(w => svg.appendChild(w.g));
    svg.appendChild(pinG);

    const out = $('#notified');
    let pin = null, lastN = -1;
    const text = n => n === 0
      ? 'Ninguém passou por aqui agora. Tente um ponto mais perto de uma rua.'
      : `<strong>${n} ${n === 1 ? 'pessoa passou' : 'pessoas passaram'}</strong> por aqui nas últimas 2 horas e ${n === 1 ? 'vai' : 'vão'} receber o aviso.`;
    const count = () => {
      if (!pin) return 0;
      let n = 0;
      walkers.forEach(w => {
        const x = w.horiz ? w.cur : w.line, y = w.horiz ? w.line : w.cur;
        const inside = Math.hypot(x - pin.x, y - pin.y) < R;
        if (inside) n++;
        const c = w.g.firstChild;
        c.setAttribute('fill', inside ? '#8C2F06' : '#A8927E');
        c.setAttribute('r', inside ? 8 : 6);
      });
      return n;
    };
    function setPin(x, y, animate = true) {
      const first = !pin;
      pin = { x, y };
      rad.setAttribute('cx', x); rad.setAttribute('cy', y);
      pinG.setAttribute('transform', `translate(${x} ${y})`);
      rad.setAttribute('visibility', 'visible'); pinG.setAttribute('visibility', 'visible');
      if (hasG && animate) {
        gsap.fromTo(rad, { attr: { r: first ? 0 : 30 } }, { attr: { r: R }, duration: .7, ease: EASE });
        gsap.fromTo(pinInner, { y: -36, opacity: 0 }, { y: 0, opacity: 1, duration: .45, ease: 'power3.out' });
      } else { rad.setAttribute('r', R); }
      const n = count(); lastN = n;
      if (hasG && animate && n > 0) countTo(out, n, k => text(k), .8); else out.innerHTML = text(n);
    }
    const tick = setInterval(() => {
      if (!pin || !document.body.contains(box)) return;
      const n = count();
      if (n !== lastN) { lastN = n; out.innerHTML = text(n); }
    }, 400);
    window.addEventListener('pagehide', () => clearInterval(tick));

    svg.addEventListener('click', e => {
      const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      const p = pt.matrixTransform(svg.getScreenCTM().inverse());
      setPin(Math.round(p.x), Math.round(p.y));
    });

    const LM = [
      { label: 'Praça Hercílio Luz', x: 300, y: 232 },
      { label: 'Rua XV de Novembro', x: 395, y: 330 },
      { label: 'Parque Ramiro Ruediger', x: 605, y: 232 },
      { label: 'Terminal da Fonte', x: 690, y: 350 }
    ];
    const lm = $('#landmarks');
    lm.innerHTML = LM.map((l, i) => `<button type="button" class="map-filter" data-i="${i}" aria-pressed="false">${l.label}</button>`).join('');
    $$('button', lm).forEach(b => b.addEventListener('click', () => {
      $$('button', lm).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      const l = LM[+b.dataset.i]; setPin(l.x, l.y);
    }));
    onceVisible(box, () => setTimeout(() => setPin(395, 290), reduce ? 0 : 700), '0px 0px -25% 0px');
  })();

  if (!hasG) { document.documentElement.classList.add('static-motion'); return; }

  /* ============================================================
     SÓ COM GSAP
     ============================================================ */
  try {
    /* barra de progresso da página */
    gsap.to('.progress-bar', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .15 } });

    /* abertura: uma sequência orquestrada */
    const h1 = $('.hero h1');
    const label = h1.textContent.trim();
    h1.setAttribute('aria-label', label);
    h1.innerHTML = label.split(/\s+/).map(w => `<span class="w" aria-hidden="true"><span class="wi">${w}</span></span>`).join(' ');
    const intro = gsap.timeline({ defaults: { ease: EASE } });
    intro
      .from('.site-head', { yPercent: -100, duration: .6 }, 0)
      .from('.hero h1 .wi', { yPercent: 115, duration: .9, stagger: .08 }, .1)
      .from('.hero .lead', { y: 18, opacity: 0, duration: .7 }, .45)
      .from('.hero .tag', { y: -44, opacity: 0, duration: .9, stagger: .14, ease: 'back.out(1.3)', clearProps: 'transform,opacity' }, .65)
      .from('.hero .ha-sun', { scale: .6, opacity: 0, svgOrigin: '300 300', duration: 1 }, .1)
      .from('.hero .ha-body', { y: 60, opacity: 0, duration: .9 }, .3)
      .from('.hero .ha-lens', { rotate: -25, x: -60, opacity: 0, svgOrigin: '170 372', duration: 1, ease: 'back.out(1.4)' }, .6)
      .from('.hero .ha-bit', { scale: 0.4, opacity: 0, transformOrigin: '50% 50%', duration: .5, stagger: .06, ease: 'back.out(2)' }, .8)
        .from('.hero .ha-eye-r', { x: 12, y: -2, duration: .5, ease: 'power2.inOut' }, 1.0)
        .from('.hero .ha-eye-l', { x: -25, y: 4, duration: .5, ease: 'power2.inOut' }, 1.0)
        .from('.hero .ha-mouth', { x: -18, duration: .5, ease: 'power2.inOut' }, 1.0)
        .from('.hero .ha-cheek', { x: -20, duration: .5, ease: 'power2.inOut' }, 1.0)
        .from('.hero .ha-head', { rotate: -4, svgOrigin: '300 300', duration: .5, ease: 'power2.inOut' }, 1.0);

    /* foto do hero se afasta devagar quando a página desce */
    gsap.to('.hero .ha-bits', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    /* a lupa "procura" devagar, para sempre (só sem reduzir movimento) */
    gsap.to('.ha-lens', { rotate: -3, x: -5, y: -3, svgOrigin: '170 372', duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 });
    gsap.to('.ha-eye', { x: 6, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.4 });

    /* personagem do final entra quando a seção aparece */
    if ($('.final-art')) {
      gsap.timeline({ defaults: { ease: EASE }, scrollTrigger: { trigger: '.final-art', start: 'top 80%', once: true } })
        .from('.final .ha-sun', { scale: .6, opacity: 0, svgOrigin: '300 300', duration: 1 }, 0)
        .from('.final .ha-body', { y: 60, opacity: 0, duration: .9 }, .2)
        .from('.final .ha-lens', { rotate: -25, x: -60, opacity: 0, svgOrigin: '170 372', duration: 1, ease: 'back.out(1.4)' }, .45)
        .from('.final .ha-bit', { scale: .4, opacity: 0, transformOrigin: '50% 50%', duration: .5, stagger: .05, ease: 'back.out(2)' }, .6)
        .from('.final .ha-eye-r', { x: 12, y: -2, duration: .5, ease: 'power2.inOut' }, .8)
        .from('.final .ha-eye-l', { x: -25, y: 4, duration: .5, ease: 'power2.inOut' }, .8)
        .from('.final .ha-mouth', { x: -18, duration: .5, ease: 'power2.inOut' }, .8)
        .from('.final .ha-cheek', { x: -20, duration: .5, ease: 'power2.inOut' }, .8)
        .from('.final .ha-head', { rotate: -4, svgOrigin: '300 300', duration: .5, ease: 'power2.inOut' }, .8);
    }

    /* blocos que entram uma vez, em lote */
    const reveals = $$('[data-reveal]');
    gsap.set(reveals, { opacity: 0, y: 28 });
    ScrollTrigger.batch(reveals, {
      start: 'top 90%', once: true,
      onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: .8, ease: EASE, stagger: .09, overwrite: true, clearProps: 'transform' })
    });

    /* fotos do mural: revelação em cortina e paralaxe interna */
    $$('.found-big, .found-small').forEach(fig => {
      gsap.fromTo(fig, { clipPath: 'inset(0 0 100% 0 round 28px)' }, { clipPath: 'inset(0 0 0% 0 round 28px)', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: fig, start: 'top 88%', once: true } });
      gsap.fromTo($('img', fig), { yPercent: -7, scale: 1.14 }, { yPercent: 7, scale: 1.14, ease: 'none', scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    /* painel da instituição: itens entram um a um */
    const rows = $$('.inst-list li');
    gsap.set(rows, { opacity: 0, x: 24 });
    ScrollTrigger.create({ trigger: '.inst-panel', start: 'top 80%', once: true, onEnter: () => gsap.to(rows, { opacity: 1, x: 0, duration: .6, ease: EASE, stagger: .16, clearProps: 'transform' }) });

    /* ---------- como funciona ---------- */
    const mm = gsap.matchMedia();
    const story = $('.story');
    mm.add('(min-width: 960px)', () => {
      story.classList.add('is-pinned');
      const screens = $$('.screen', story), steps = $$('.story-steps li', story);
      gsap.set(screens.slice(1), { autoAlpha: 0, y: 36 });
      gsap.set(steps.slice(1), { opacity: .35 });

      const typed = $('[data-type]', story), full = typed.textContent, o = { n: 0 };
      typed.textContent = '';
      const rowsM = $$('.match-row', screens[1]);
      const bubbles = $$('.msg', screens[2]);
      const pickup = $('.pickup', screens[2]);
      const badge = $('.chip-menta', screens[2]);
      gsap.set(rowsM, { opacity: 0, y: 26 });
      gsap.set($$('.hope', screens[1]), { opacity: 0, y: 14 });
      gsap.set(bubbles, { opacity: 0, y: 20 });
      gsap.set([pickup, badge], { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: story, start: 'top top', end: '+=2100', pin: true, scrub: .7, anticipatePin: 1 }
      });
      // passo 1: digitar
      tl.to(o, { n: full.length, duration: .8, onUpdate() { typed.textContent = full.slice(0, Math.round(o.n)); } }, .1)
        .from($$('.dots i', screens[0]), { scale: .6, opacity: 0, stagger: .05, duration: .2 }, .5)
        .to({}, { duration: .2 }, .9);
      // passo 2: itens parecidos
      tl.to(screens[0], { autoAlpha: 0, y: -36, filter: 'blur(3px)', duration: .45 }, 1.15)
        .to(steps[0], { opacity: .35, duration: .3 }, 1.15).to(steps[1], { opacity: 1, duration: .3 }, 1.15)
        .fromTo(screens[1], { autoAlpha: 0, y: 36, filter: 'blur(3px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .5 }, 1.3)
        .to($$('.hope', screens[1]), { opacity: 1, y: 0, duration: .3 }, 1.5)
        .to(rowsM, { opacity: 1, y: 0, stagger: .18, duration: .35, ease: 'power2.out' }, 1.6);
      rowsM.forEach((row, i) => {
        const pct = $('[data-pct]', row), bar = $('.bar span', row), target = +pct.dataset.pct, c = { v: 0 };
        tl.fromTo(c, { v: 0 }, { v: target, duration: .6, onUpdate() { pct.textContent = Math.round(c.v) + '%'; bar.style.transform = `scaleX(${c.v / 100})`; } }, 1.75 + i * .18);
      });
      tl.to({}, { duration: .25 }, 2.5);
      // passo 3: chat e código
      tl.to(screens[1], { autoAlpha: 0, y: -36, filter: 'blur(3px)', duration: .45 }, 2.75)
        .to(steps[1], { opacity: .35, duration: .3 }, 2.75).to(steps[2], { opacity: 1, duration: .3 }, 2.75)
        .fromTo(screens[2], { autoAlpha: 0, y: 36, filter: 'blur(3px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .5 }, 2.9)
        .to(badge, { opacity: 1, y: 0, duration: .25 }, 3.1)
        .to(bubbles, { opacity: 1, y: 0, stagger: .22, duration: .3, ease: 'power2.out' }, 3.2)
        .to(pickup, { opacity: 1, y: 0, duration: .4, ease: 'power2.out' }, 4)
        .to({}, { duration: .5 }, 4.4);
      return () => story.classList.remove('is-pinned');
    });
    mm.add('(max-width: 959px)', () => {
      $$('.screen', story).forEach(s => {
        gsap.from(s, { y: 40, opacity: 0, duration: .8, ease: EASE, scrollTrigger: { trigger: s, start: 'top 88%', once: true } });
      });
      $$('.story-steps li').forEach(li => gsap.from(li, { y: 24, opacity: 0, duration: .7, ease: EASE, scrollTrigger: { trigger: li, start: 'top 90%', once: true } }));
    });

    /* rodapé: o nome volta em tamanho grande */
    gsap.from('.wordmark', { yPercent: 40, opacity: 0, duration: 1.1, ease: EASE, scrollTrigger: { trigger: '.site-foot-big', start: 'top 92%', once: true } });

    window.addEventListener('load', () => ScrollTrigger.refresh());
  } catch (err) {
    console.error('Movimento desativado:', err);
    $$('[data-reveal]').forEach(el => { el.style.opacity = ''; el.style.transform = ''; });
  }
})();
