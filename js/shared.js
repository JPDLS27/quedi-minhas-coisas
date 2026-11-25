/* Ícones, logo e mapa da cidade — usados pela landing e pelo protótipo */

const ICON_PATHS = {
  celular: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  carteira: '<path d="M3.5 7.5h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/><path d="M3.5 7.5l11-3.5 1 3.5"/><circle cx="16.5" cy="13.5" r="1.2"/>',
  chaves: '<circle cx="8" cy="9" r="4.5"/><path d="M11.3 12.2l8.2 8.3M16 17l2-2M18.3 19.3l1.7-1.7"/>',
  documentos: '<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6.5 16c.6-1.6 1.6-2.3 2.5-2.3s1.9.7 2.5 2.3M14 10h3.5M14 13h3.5"/>',
  mochila: '<path d="M6 9a6 6 0 0 1 12 0v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/><path d="M9.5 3.5h5M8.5 14h7v4h-7z"/>',
  fone: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4.5" height="6.5" rx="1.5"/><rect x="16.5" y="14" width="4.5" height="6.5" rx="1.5"/>',
  oculos: '<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 14h4M3 13l1.5-5M21 13l-1.5-5"/>',
  guardachuva: '<path d="M3 12a9 9 0 0 1 18 0z"/><path d="M12 12v7a2 2 0 0 1-4 0"/>',
  bolsa: '<path d="M4.5 9.5h15l-1.3 10.2a1.5 1.5 0 0 1-1.5 1.3H7.3a1.5 1.5 0 0 1-1.5-1.3z"/><path d="M8.5 9.5V7a3.5 3.5 0 0 1 7 0v2.5"/>',
  roupa: '<path d="M8.5 3.5L4 6l-1.5 4.5 3 1.2V20.5h13V11.7l3-1.2L20 6l-4.5-2.5a3.5 3.5 0 0 1-7 0z"/>',
  acessorio: '<rect x="8" y="7" width="8" height="10" rx="2.5"/><path d="M9.5 7l.7-3.5h3.6l.7 3.5M9.5 17l.7 3.5h3.6l.7-3.5"/><path d="M12 10v2.2l1.4 1"/>',
  outro: '<path d="M4 8l8-4.5L20 8v8l-8 4.5L4 16z"/><path d="M4 8l8 4.5L20 8M12 12.5v8"/>',
  lupapin: '<circle cx="10.5" cy="10.5" r="7.5"/><path d="M16 16l5 5"/><path d="M10.5 14.6s-3-2.5-3-5a3 3 0 0 1 6 0c0 2.5-3 5-3 5z"/><circle cx="10.5" cy="9.6" r="1.1"/>',
  pin: '<path d="M12 21s-6.5-6.2-6.5-11.5a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/>',
  predio: '<path d="M4 20.5V6l8-3 8 3v14.5M2.5 20.5h19M8 9h2M14 9h2M8 13h2M14 13h2M10.5 20.5v-3.5h3v3.5"/>',
  estacao: '<rect x="3.5" y="4" width="17" height="16.5" rx="2"/><path d="M3.5 10h17M12 4v16.5M8 7h0M15.5 7h0M8 13.5v2M15.5 13.5v2"/>',
  escudo: '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z"/><path d="M8.8 12l2.2 2.2 4.2-4.4"/>',
  chat: '<path d="M4 5.5h16v10.5H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
  estrela: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
  coracao: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>',
  cafe: '<path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5c-.6.8-.6 1.7 0 2.5M12 3.5c-.6.8-.6 1.7 0 2.5"/>',
  presente: '<rect x="3.5" y="8.5" width="17" height="4" rx="1"/><path d="M5 12.5v8h14v-8M12 8.5v12M12 8.5c-1-3-5-4-5.5-1.8S10 8.5 12 8.5c2 0 6-.3 5.5-2.3S13 5.5 12 8.5z"/>',
  moeda: '<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.2c-.5-.9-1.5-1.4-2.6-1.4-1.5 0-2.6.8-2.6 2 0 2.8 5.4 1.5 5.4 4.3 0 1.2-1.2 2.1-2.7 2.1-1.2 0-2.3-.6-2.8-1.6M12 6.2v1.6M12 16.2v1.6"/>',
  olho: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  sino: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  seta: '<path d="M15 5l-7 7 7 7"/>',
  cadeado: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  camera: '<path d="M3.5 8.5h3.5l1.8-2.5h6.4l1.8 2.5h3.5v11h-17z"/><circle cx="12" cy="13.5" r="3.5"/>',
  mao: '<path d="M7 11V5.5a1.5 1.5 0 0 1 3 0V10M10 9.5v-5a1.5 1.5 0 0 1 3 0v5M13 9.5V6a1.5 1.5 0 0 1 3 0v6M16 10a1.5 1.5 0 0 1 3 0v3.5c0 4-2.8 7-6.5 7-2.6 0-4.2-1.2-5.6-3.3L4.3 13.4a1.5 1.5 0 0 1 2.5-1.6L7 12"/>'
};

function icon(name, extra = '') {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${ICON_PATHS[name] || ICON_PATHS.outro}</svg>`;
}

/* Logo: lupa com um olho */
const LOGO = `<svg viewBox="0 0 40 40" aria-hidden="true">
  <path d="M25.5 25.5l9 9" stroke="#2B1D12" stroke-width="5.5" stroke-linecap="round"/>
  <circle cx="16.5" cy="16.5" r="12.5" fill="#FFF8EE" stroke="#2B1D12" stroke-width="4"/>
  <ellipse cx="16.5" cy="17" rx="7" ry="6" fill="#fff"/>
  <circle cx="17.2" cy="17.4" r="4" fill="#8C2F06"/>
  <circle cx="17.5" cy="17.7" r="2" fill="#2B1D12"/>
  <circle cx="15.8" cy="15.6" r="1.2" fill="#fff"/>
  <path d="M10 11.5a8 8 0 0 1 5.5-3" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".9"/>
</svg>`;

/* ---------- Dados do mapa: lugares reais de Blumenau, traçado ilustrativo ---------- */
const PLACES = [
  { id: 'univ', type: 'inst', x: 150, y: 128, name: 'FURB, Campus 1', info: '23 itens guardados · seg a sex, 8h às 18h', short: 'FURB', near: 'da FURB' },
  { id: 'shop', type: 'inst', x: 585, y: 108, name: 'Shopping Neumarkt', info: '41 itens guardados · todos os dias, 10h às 22h', short: 'Shopping', near: 'do Shopping' },
  { id: 'rodo', type: 'inst', x: 655, y: 392, name: 'Rodoviária de Blumenau', info: '58 itens guardados · 24 horas', short: 'Rodoviária', near: 'da Rodoviária' },
  { id: 'bibl', type: 'inst', x: 300, y: 335, name: 'Biblioteca Fritz Müller', info: '9 itens guardados · ter a sáb, 9h às 19h', short: 'Biblioteca', near: 'da Biblioteca' },
  { id: 'est1', type: 'estacao', x: 375, y: 205, name: 'Estação quedi Centro', info: 'Rua XV de Novembro · 8h às 20h', short: 'Estação Centro' },
  { id: 'est2', type: 'estacao', x: 185, y: 430, name: 'Estação quedi Itoupava Seca', info: 'Rua São Paulo · 8h às 20h', short: 'Estação Itoupava Seca' },
  { id: 'est3', type: 'estacao', x: 560, y: 268, name: 'Estação quedi Vila Germânica', info: 'Ao lado da Vila Germânica · 9h às 18h', short: 'Estação Vila Germânica' },
  { id: 'p1', type: 'perda', x: 455, y: 150, name: 'Chaves com chaveiro de gato', info: 'Perdidas ontem, por volta das 17h', short: '' },
  { id: 'p2', type: 'perda', x: 250, y: 238, name: 'Fone sem fio branco', info: 'Perdido hoje, perto do ponto de ônibus', short: '' },
  { id: 'p3', type: 'perda', x: 720, y: 205, name: 'Guarda-chuva verde', info: 'Perdido há 2 dias', short: '' }
];

const PIN_STYLE = {
  inst: { fill: '#C2410C', stroke: '#fff', label: 'Achados e perdidos de instituições', ico: 'predio', icoColor: '#fff' },
  estacao: { fill: '#FFC93C', stroke: '#2B1D12', label: 'Estações quedi', ico: 'estacao', icoColor: '#2B1D12' },
  perda: { fill: '#8C2F06', stroke: '#fff', label: 'Perdas recentes por perto', ico: 'pin', icoColor: '#fff' }
};

/**
 * Desenha o mapa da cidade como SVG.
 * opts.show: tipos visíveis; opts.labels: mostra nomes; opts.pick: {x,y} pino escolhido pelo usuário;
 * opts.radius: desenha raio de alerta ao redor do pino escolhido.
 */
function cityMap(opts = {}) {
  const show = opts.show || ['inst', 'estacao', 'perda'];
  const streetsH = [62, 172, 290, 400, 488];
  const streetsV = [70, 225, 395, 520, 690];
  let s = `<svg viewBox="0 0 800 520" role="img" aria-label="${opts.aria || 'Mapa da cidade com pontos de achados e perdidos'}" xmlns="http://www.w3.org/2000/svg">`;
  s += '<rect width="800" height="520" fill="#FFF1DE"/>';
  // quarteirões
  for (let i = 0; i < streetsV.length - 1; i++) {
    for (let j = 0; j < streetsH.length - 1; j++) {
      s += `<rect x="${streetsV[i] + 9}" y="${streetsH[j] + 9}" width="${streetsV[i + 1] - streetsV[i] - 18}" height="${streetsH[j + 1] - streetsH[j] - 18}" rx="8" fill="#FBE3C4"/>`;
    }
  }
  // parque e rio
  s += '<rect x="529" y="181" width="152" height="100" rx="10" fill="#CFE8D5"/>';
  s += '<circle cx="575" cy="215" r="10" fill="#B5DCC0"/><circle cx="640" cy="240" r="14" fill="#B5DCC0"/><circle cx="610" cy="206" r="8" fill="#B5DCC0"/>';
  s += '<path d="M-10 455 C 120 430, 200 500, 330 470 S 520 430, 600 470 S 740 520, 820 490 L 820 530 L -10 530 Z" fill="#CFE3F2"/>';
  // ruas
  streetsH.forEach(y => { s += `<line x1="0" y1="${y}" x2="800" y2="${y}" stroke="#fff" stroke-width="12"/>`; });
  streetsV.forEach(x => { s += `<line x1="${x}" y1="0" x2="${x}" y2="520" stroke="#fff" stroke-width="12"/>`; });
  s += '<line x1="0" y1="520" x2="520" y2="0" stroke="#fff" stroke-width="16" opacity=".9"/>';
  s += '<text x="92" y="57" class="pin-label" fill="#A8927E" style="font-weight:400;font-size:12px">Rua 7 de Setembro</text>';
  s += '<text x="236" y="285" class="pin-label" fill="#A8927E" style="font-weight:400;font-size:12px">Rua XV de Novembro</text>';
  s += '<text x="590" y="300" class="pin-label" fill="#4E7A5B" style="font-weight:400;font-size:12px">Parque Ramiro Ruediger</text>';
  s += '<text x="560" y="505" class="pin-label" fill="#5B7F99" style="font-weight:400;font-size:12px">Rio Itajaí-Açu</text>';

  // raio de alerta
  if (opts.pick) {
    const { x, y } = opts.pick;
    if (opts.radius) {
      s += `<circle cx="${x}" cy="${y}" r="95" fill="#8C2F06" opacity=".12"/><circle cx="${x}" cy="${y}" r="95" fill="none" stroke="#8C2F06" stroke-width="2" stroke-dasharray="6 6"/>`;
    }
  }

  PLACES.filter(p => show.includes(p.type)).forEach(p => {
    const st = PIN_STYLE[p.type];
    const r = p.type === 'perda' ? 13 : 17;
    const a11y = opts.focusPins ? ` tabindex="0" role="button" aria-label="${p.name}"` : ' aria-hidden="true"';
    s += `<g class="map-pin" data-id="${p.id}"${a11y} transform="translate(${p.x} ${p.y})">`;
    s += `<circle r="${r + 4}" fill="${st.fill}" opacity=".22"/>`;
    s += `<circle r="${r}" fill="${st.fill}" stroke="${st.stroke}" stroke-width="2.5"/>`;
    s += `<g transform="translate(${-r * .55} ${-r * .55}) scale(${r * 1.1 / 24})" color="${st.icoColor}" style="color:${st.icoColor}">${icon(st.ico).replace('<svg ', '<svg width="24" height="24" ')}</g>`;
    if (opts.labels && p.short) {
      s += `<text x="${r + 7}" y="5" class="pin-label" paint-order="stroke" stroke="#FFF1DE" stroke-width="4">${p.short}</text>`;
    }
    s += '</g>';
  });

  if (opts.pick) {
    const { x, y } = opts.pick;
    s += `<g transform="translate(${x} ${y})"><path d="M0 0 C -14 -18 -16 -24 -16 -30 a16 16 0 0 1 32 0 c0 6 -2 12 -16 30z" fill="#B3261E" stroke="#fff" stroke-width="2.5"/><circle cy="-30" r="6" fill="#fff"/></g>`;
  }
  s += '</svg>';
  return s;
}

/**
 * Dá vida a um mapa já desenhado por cityMap():
 * - pessoas andando pelas ruas (pausa fora da tela e com "reduzir movimento");
 * - toque/Enter num ponto mostra o nome do local;
 * - com opts.pick, destaca e conta quem está dentro do raio (opts.onCount).
 * opts.onPin(place) é chamado quando um ponto é escolhido.
 */
function mapLife(box, opts = {}) {
  if (box._stop) box._stop();
  const svg = box.querySelector('svg');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* pessoas andando */
  const H = [62, 172, 290, 400, 488], V = [70, 225, 395, 520, 690];
  let seed = opts.seed || 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const layer = document.createElementNS(NS, 'g');
  layer.setAttribute('aria-hidden', 'true');
  const firstPin = svg.querySelector('.map-pin');
  svg.insertBefore(layer, firstPin || null);
  /* "você está aqui": ponto no meio com a área de alcance em volta */
  if (opts.me) {
    const me = document.createElementNS(NS, 'g');
    me.setAttribute('class', 'me-dot');
    me.setAttribute('aria-hidden', 'true');
    me.innerHTML = `<circle cx="${opts.me.x}" cy="${opts.me.y}" r="${opts.me.r || 110}" fill="#C2410C" fill-opacity=".1" stroke="#C2410C" stroke-width="2" stroke-dasharray="6 6"/>
      <circle class="me-pulse" cx="${opts.me.x}" cy="${opts.me.y}" r="12" fill="#C2410C" fill-opacity=".35"/>`;
    svg.insertBefore(me, layer);
    const dot = document.createElementNS(NS, 'g');
    dot.setAttribute('aria-hidden', 'true');
    dot.innerHTML = `<circle cx="${opts.me.x}" cy="${opts.me.y}" r="11" fill="#C2410C" stroke="#fff" stroke-width="4"/>
      <text x="${opts.me.x}" y="${opts.me.y - 20}" text-anchor="middle" class="pin-label" paint-order="stroke" stroke="#FFF1DE" stroke-width="5">Você</text>`;
    svg.appendChild(dot);
    opts.pick = opts.pick || { x: opts.me.x, y: opts.me.y };
  }
  const walkers = [];
  for (let i = 0; i < (opts.walkers || 24); i++) {
    const horiz = i % 2 === 0, line = (horiz ? H : V)[Math.floor(rnd() * 5)], max = horiz ? 780 : 500;
    const a = 20 + rnd() * (max - 260), b = Math.min(a + 160 + rnd() * 220, max);
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('r', 6); c.setAttribute('fill', '#A8927E'); c.setAttribute('stroke', '#fff'); c.setAttribute('stroke-width', 2);
    layer.appendChild(c);
    walkers.push({ c, horiz, line, a, b, t: rnd() * Math.PI * 2, speed: 16 / (b - a), cur: 0, inside: null });
  }
  const R = opts.me ? (opts.me.r || 110) : 95;
  let lastN = -1;
  function place(dt) {
    let n = 0;
    walkers.forEach(w => {
      w.t += dt * w.speed * Math.PI;
      w.cur = w.a + (w.b - w.a) * (0.5 - 0.5 * Math.cos(w.t));
      const x = w.horiz ? w.cur : w.line, y = w.horiz ? w.line : w.cur;
      w.c.setAttribute('cx', x.toFixed(1)); w.c.setAttribute('cy', y.toFixed(1));
      if (opts.pick) {
        const inside = Math.hypot(x - opts.pick.x, y - opts.pick.y) < R;
        if (inside) n++;
        if (inside !== w.inside) { w.inside = inside; w.c.setAttribute('fill', inside ? '#8C2F06' : '#A8927E'); w.c.setAttribute('r', inside ? 8 : 6); }
      }
    });
    if (opts.pick && opts.onCount && n !== lastN) { lastN = n; opts.onCount(n); }
  }
  place(0);
  let raf = 0, prev = 0, visible = true;
  const loop = ts => { const dt = prev ? Math.min((ts - prev) / 1000, .05) : 0; prev = ts; place(dt); raf = requestAnimationFrame(loop); };
  const start = () => { if (!reduce && !raf && visible) { prev = 0; raf = requestAnimationFrame(loop); } };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }) : null;
  if (io) io.observe(box); else start();

  /* nome do local ao tocar num ponto */
  let tip = box.querySelector('.map-tip');
  if (!tip) { tip = document.createElement('div'); tip.className = 'map-tip'; tip.setAttribute('role', 'status'); box.appendChild(tip); }
  tip.hidden = true;
  const showTip = p => {
    tip.innerHTML = `<strong>${p.name}</strong><span>${p.info}</span>`;
    tip.style.left = (p.x / 800 * 100) + '%';
    tip.style.top = (p.y / 520 * 100) + '%';
    tip.classList.toggle('is-below', p.y < 130);
    tip.hidden = false;
  };
  svg.querySelectorAll('.map-pin').forEach(g => {
    const p = PLACES.find(x => x.id === g.dataset.id);
    g.setAttribute('tabindex', '0'); g.setAttribute('role', 'button'); g.setAttribute('aria-label', p.name);
    g.removeAttribute('aria-hidden');
    const choose = e => { e.stopPropagation(); showTip(p); if (opts.onPin) opts.onPin(p); };
    g.addEventListener('click', choose);
    g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(e); } });
  });
  svg.addEventListener('click', () => { tip.hidden = true; });
  box.addEventListener('keydown', e => { if (e.key === 'Escape') tip.hidden = true; });

  box._stop = () => { stop(); if (io) io.disconnect(); };
}
