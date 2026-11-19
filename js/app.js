/* ============================================================
   quedi minhas coisas — protótipo navegável
   Tudo é simulado no navegador. Nada é enviado nem guardado.
   ============================================================ */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const CATS = [
  { id: 'celular', label: 'Celular' },
  { id: 'carteira', label: 'Carteira' },
  { id: 'chaves', label: 'Chaves' },
  { id: 'documentos', label: 'Documentos' },
  { id: 'mochila', label: 'Mochila ou bolsa' },
  { id: 'fone', label: 'Fone' },
  { id: 'oculos', label: 'Óculos' },
  { id: 'guardachuva', label: 'Guarda-chuva' },
  { id: 'outro', label: 'Outro' }
];

const COLORS = [
  { id: 'preto', label: 'Preto', hex: '#222' },
  { id: 'branco', label: 'Branco', hex: '#fff' },
  { id: 'cinza', label: 'Cinza', hex: '#9AA3AE' },
  { id: 'azul', label: 'Azul', hex: '#2F6DB5' },
  { id: 'verde', label: 'Verde', hex: '#3E8E5E' },
  { id: 'vermelho', label: 'Vermelho', hex: '#C8413B' },
  { id: 'amarelo', label: 'Amarelo', hex: '#F2C14E' },
  { id: 'rosa', label: 'Rosa', hex: '#E79AB7' },
  { id: 'marrom', label: 'Marrom', hex: '#8A5A3B' }
];
const colorHex = id => (COLORS.find(c => c.id === id) || {}).hex || '#ccc';

const INSTS = PLACES.filter(p => p.type === 'inst');

/* Itens cadastrados por quem achou (dados de exemplo) */
const FOUND = [
  { id: 'f1', cat: 'mochila', color: 'azul', title: 'Mochila azul-marinho', place: 'bibl', when: 'Ontem, 16h', desc: 'mochila azul adesivo planeta bolso lateral', finder: true },
  { id: 'f2', cat: 'mochila', color: 'azul', title: 'Mochila azul com chaveiro', place: 'rodo', when: 'Há 2 dias', desc: 'mochila azul chaveiro zíper' },
  { id: 'f3', cat: 'mochila', color: 'preto', title: 'Bolsa de notebook preta', place: 'univ', when: 'Há 3 dias', desc: 'bolsa notebook preta alça' },
  { id: 'f4', cat: 'celular', color: 'branco', title: 'Celular branco com capinha transparente', place: 'shop', when: 'Hoje, 11h', desc: 'celular branco capinha transparente iphone', photo: 'celular-shopping', alt: 'Celular branco com capinha transparente, segurado num corredor de shopping' },
  { id: 'f5', cat: 'celular', color: 'azul', title: 'Celular azul com tela trincada', place: 'rodo', when: 'Ontem, 20h', desc: 'celular azul tela trincada' },
  { id: 'f6', cat: 'carteira', color: 'marrom', title: 'Carteira de couro marrom', place: 'univ', when: 'Hoje, 9h', desc: 'carteira couro marrom costura', photo: 'carteira-furb', alt: 'Carteira de couro marrom segurada no saguão da FURB' },
  { id: 'f7', cat: 'chaves', color: 'cinza', title: 'Molho com 3 chaves e chaveiro de gato', place: 'shop', when: 'Ontem, 18h', desc: 'chaves chaveiro gato' },
  { id: 'f8', cat: 'fone', color: 'branco', title: 'Fone sem fio branco no estojo', place: 'bibl', when: 'Hoje, 14h', desc: 'fone sem fio branco estojo airpods', photo: 'fone-biblioteca', alt: 'Estojo de fone sem fio branco, aberto, segurado na Biblioteca Municipal' },
  { id: 'f9', cat: 'oculos', color: 'preto', title: 'Óculos de grau com armação preta', place: 'univ', when: 'Há 4 dias', desc: 'óculos grau armação preta estojo' },
  { id: 'f10', cat: 'documentos', color: 'azul', title: 'Documento em capa azul', place: 'rodo', when: 'Há 2 dias', desc: 'documento rg capa azul' },
  { id: 'f11', cat: 'guardachuva', color: 'verde', title: 'Guarda-chuva verde', place: 'shop', when: 'Há 3 dias', desc: 'guarda-chuva verde' }
];
const placeName = id => (PLACES.find(p => p.id === id) || {}).name || 'Outro lugar';

const state = {
  lost: null,          // cadastro do item perdido
  lostStep: 1,
  pick: null,          // ponto marcado no mapa
  item: FOUND[0],      // item aberto
  delivery: 'estacao',
  mapShow: ['inst', 'estacao', 'perda'],
  myFound: null
};

/* ---------- utilidades ---------- */
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove('show'), 2800);
}
function todayISO() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
function countUp(el, to, render) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { el.innerHTML = render(to); return; }
  let n = 0;
  clearInterval(el._t);
  el._t = setInterval(() => { n++; el.innerHTML = render(n); if (n >= to) clearInterval(el._t); }, 50);
}
function catChoices(container, name) {
  container.innerHTML = CATS.map(c => `
    <div class="choice">
      <input type="radio" name="${name}" id="${name}-${c.id}" value="${c.id}">
      <label for="${name}-${c.id}">${icon(c.id)}${c.label}</label>
    </div>`).join('');
}
function wideChoices(container, name, opts, checked) {
  container.innerHTML = opts.map(o => `
    <div class="choice">
      <input type="radio" name="${name}" id="${name}-${o.id}" value="${o.id}" ${o.id === checked ? 'checked' : ''}>
      <label for="${name}-${o.id}"><span class="ic">${icon(o.icon)}</span><span>${o.title}<small>${o.sub}</small></span></label>
    </div>`).join('');
}
function previewFiles(input, box) {
  input.addEventListener('change', () => {
    box.innerHTML = '';
    [...input.files].slice(0, 6).forEach(f => {
      const img = document.createElement('img');
      img.alt = 'Prévia da foto ' + f.name;
      img.src = URL.createObjectURL(f);
      box.appendChild(img);
    });
  });
}
function thumbHTML(it, big) {
  if (it.photo) return `<div class="thumb thumb-img"><img src="assets/img/${it.photo}${big ? '' : '-sq'}.jpg" alt="${it.alt}" loading="lazy" width="${big ? 960 : 360}" height="${big ? 1280 : 360}"></div>`;
  return `<div class="thumb">${icon(it.cat)}</div>`;
}
function itemCard(it, pct) {
  return `
    <article class="item-card">
      ${thumbHTML(it)}
      <div class="top">
        <h3>${it.title}</h3>
      </div>
      ${pct != null ? `<div class="bar" aria-hidden="true"><span style="width:${pct}%"></span></div><p class="meta">${pct}% parecido com o seu</p>` : ''}
      <p class="meta"><span class="color-dot" style="background:${colorHex(it.color)}"></span> ${placeName(it.place)}<br>${it.when}</p>
      <a class="btn ${pct != null ? 'btn-lago' : 'btn-quiet'} btn-small" href="#item" data-open="${it.id}">${pct != null ? 'Pode ser o meu' : 'Ver item'}</a>
    </article>`;
}

/* ---------- roteamento por #hash ---------- */
const VIEWS = ['inicio', 'perdi', 'resultados', 'item', 'confirmado', 'achei', 'achei-ok', 'mapa', 'perfil'];
function route() {
  let name = location.hash.slice(1);
  if (!VIEWS.includes(name)) name = 'inicio';
  $$('.view').forEach(v => v.classList.toggle('is-active', v.id === 'v-' + name));
  $$('[data-nav]').forEach(a => {
    if (a.dataset.nav === name) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  const enter = ON_ENTER[name];
  if (enter) enter();
  window.scrollTo(0, 0);
  const h = $('#v-' + name + ' h1');
  if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
}
document.addEventListener('click', e => {
  const a = e.target.closest('[data-open]');
  if (a) state.item = FOUND.find(f => f.id === a.dataset.open) || FOUND[0];
});

const ON_ENTER = {
  inicio() {
    $('#home-map').innerHTML = cityMap({ show: ['inst', 'estacao', 'perda'], aria: 'Mapa da cidade com achados e perdidos de instituições e Estações quedi' });
    $('#recent').innerHTML = [FOUND[3], FOUND[5], FOUND[7]].map(it => itemCard(it)).join('');
  },
  perdi() { showLostStep(state.lostStep); },
  resultados() { renderResults(); },
  item() { renderItem(); },
  mapa() { renderMap(); },
  perfil() { renderProfile(); }
};

/* ============================================================
   PERDI ALGO — formulário em 4 passos
   ============================================================ */
catChoices($('#lost-cats'), 'lostcat');
$('#lost-colors').innerHTML = COLORS.map(c => `
  <span class="swatch"><input type="radio" name="lostcolor" id="lc-${c.id}" value="${c.id}">
  <label for="lc-${c.id}"><i style="background:${c.hex}"></i>${c.label}</label></span>`).join('');
$('#lost-inst').innerHTML = INSTS.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
$('#lost-date').value = todayISO();
previewFiles($('#lost-photos'), $('#lost-previews'));

function showLostStep(n) {
  state.lostStep = n;
  $$('#lost-form .step').forEach(s => { s.hidden = +s.dataset.step !== n; });
  $$('#lost-progress span').forEach((s, i) => s.classList.toggle('done', i < n));
  $('#lost-step-label').textContent = `Passo ${n} de 4`;
  $('#lost-prev').hidden = n === 1;
  $('#lost-next').textContent = n === 4 ? 'Ver itens parecidos' : 'Continuar';
  $('#lost-error').textContent = '';
}
function renderPickMap() {
  $('#lost-map').innerHTML = cityMap({ show: ['inst'], pick: state.pick, radius: !!state.pick, aria: 'Mapa: toque para marcar onde perdeu' });
  $('#lost-map svg').addEventListener('click', e => {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    setPick({ x: Math.round(p.x), y: Math.round(p.y) });
  });
}
function setPick(pt) {
  state.pick = pt;
  renderPickMap();
  $('#lost-map-msg').textContent = 'Ponto marcado. Vamos avisar quem passou por esse círculo no dia e hora que você informar.';
}
const LANDMARKS = [
  { label: 'Praça da Matriz', x: 300, y: 230 },
  { label: 'Rua das Flores', x: 455, y: 290 },
  { label: 'Parque da Lagoa', x: 605, y: 230 },
  { label: 'Av. Brasil', x: 150, y: 62 },
  { label: 'Ponto de ônibus da Rodoviária', x: 690, y: 345 }
];
$('#landmarks').innerHTML = LANDMARKS.map((l, i) => `<button type="button" class="map-filter" data-lm="${i}" aria-pressed="false">${l.label}</button>`).join('');
$$('[data-lm]').forEach(b => b.addEventListener('click', () => {
  $$('[data-lm]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  const l = LANDMARKS[+b.dataset.lm];
  setPick({ x: l.x, y: l.y });
}));
$$('input[name="where"]').forEach(r => r.addEventListener('change', () => {
  const map = $('#where-map').checked;
  $('#where-inst-box').hidden = map;
  $('#where-map-box').hidden = !map;
  if (map) renderPickMap();
}));

$('#lost-prev').addEventListener('click', () => showLostStep(state.lostStep - 1));
$('#lost-form').addEventListener('submit', e => {
  e.preventDefault();
  const n = state.lostStep;
  const err = $('#lost-error');
  if (n === 1 && !$('input[name="lostcat"]:checked')) { err.textContent = 'Escolha o tipo de item para continuar.'; $('#lostcat-celular').focus(); return; }
  if (n === 3 && $('#where-map').checked && !state.pick) { err.textContent = 'Toque no mapa ou escolha um ponto de referência para marcar onde você perdeu.'; $('[data-lm]').focus(); return; }
  if (n === 3 && $('#lost-from').value && $('#lost-to').value && $('#lost-to').value <= $('#lost-from').value) {
    err.textContent = 'O horário final precisa ser depois do inicial. Ajuste o período em que você perdeu.'; $('#lost-to').focus(); return;
  }
  if (n < 4) { showLostStep(n + 1); window.scrollTo(0, 0); return; }

  const cat = $('input[name="lostcat"]:checked').value;
  state.lost = {
    cat,
    name: $('#lost-name').value.trim() || CATS.find(c => c.id === cat).label,
    color: ($('input[name="lostcolor"]:checked') || {}).value || null,
    text: [$('#lost-name').value, $('#lost-brand').value, $('#lost-model').value, $('#lost-marks').value].join(' ').toLowerCase(),
    place: $('#where-map').checked ? null : $('#lost-inst').value,
    secret: $('#lost-secret').value.trim(),
    when: `${$('#lost-from').value}–${$('#lost-to').value}`
  };
  location.hash = 'resultados';
});

/* ---------- match ---------- */
function score(it, lost) {
  let s = 0;
  if (it.cat === lost.cat) s += 55;
  if (lost.color && it.color === lost.color) s += 25;
  else if (!lost.color) s += 10;
  const words = lost.text.split(/\W+/).filter(w => w.length > 3);
  const hits = words.filter(w => it.desc.includes(w)).length;
  s += Math.min(hits * 6, 12);
  if (lost.place && it.place === lost.place) s += 6;
  return Math.min(s, 97);
}
function renderResults() {
  const lost = state.lost || { cat: 'mochila', color: 'azul', text: 'mochila azul', place: 'bibl', name: 'Mochila azul' };
  const ranked = FOUND.map(it => ({ it, pct: score(it, lost) }))
    .filter(r => r.pct >= 30)
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 4);
  const where = lost.place ? INSTS.find(p => p.id === lost.place).near : 'do ponto que você marcou';
  countUp($('#res-hope'), 30, n => `Seu item já foi mostrado para <strong>${n} ${n === 1 ? 'pessoa' : 'pessoas'}</strong> que passaram perto ${where}.`);
  if (ranked.length) {
    $('#t-res').textContent = `Achamos ${ranked.length} ${ranked.length === 1 ? 'item parecido' : 'itens parecidos'} com o seu`;
    $('#res-lead').textContent = 'Veja se algum deles é seu. Se não for, fique tranquilo: avisamos assim que chegar algo novo.';
  } else {
    $('#t-res').textContent = 'Ainda não chegou nada parecido';
    $('#res-lead').textContent = 'Seu item está publicado. Assim que alguém cadastrar algo que combine, você recebe um aviso.';
  }
  $('#res-items').innerHTML = ranked.map(r => itemCard(r.it, r.pct)).join('');
}

/* ============================================================
   ITEM — validação, chat anônimo e entrega
   ============================================================ */
function renderItem() {
  const it = state.item;
  $('#item-thumb').outerHTML = thumbHTML(it, true).replace('class="thumb', 'id="item-thumb" class="thumb');
  $('#t-item').textContent = it.title;
  $('#item-facts').innerHTML = `
    <dt>Achado em</dt><dd>${placeName(it.place)}</dd>
    <dt>Quando</dt><dd>${it.when}</dd>
    <dt>Cor</dt><dd><span class="color-dot" style="background:${colorHex(it.color)}"></span> ${(COLORS.find(c => c.id === it.color) || {}).label || '—'}</dd>
    <dt>Está com</dt><dd>Marina R., quem achou</dd>`;
  $('#item-validate').hidden = false;
  $('#item-chat').hidden = true;
  $('#validate-text').value = state.lost && state.lost.secret ? state.lost.secret : '';
  $('#validate-error').textContent = '';

  const isInst = INSTS.some(p => p.id === it.place);
  wideChoices($('#delivery'), 'deliv', [
    { id: 'estacao', icon: 'estacao', title: 'Buscar na Estação quedi Centro', sub: 'Marina deixa lá e você retira com um código, sem encontro' },
    ...(isInst ? [{ id: 'inst', icon: 'predio', title: `Retirar em ${placeName(it.place)}`, sub: 'No balcão de achados e perdidos, em horário de atendimento' }] : []),
    { id: 'encontro', icon: 'mao', title: 'Encontrar em um lugar público', sub: 'Sugestão: Praça da Matriz, em horário comercial' }
  ], 'estacao');
  state.delivery = 'estacao';
  $('#fee-box').hidden = false;
  $$('input[name="deliv"]').forEach(r => r.addEventListener('change', () => {
    state.delivery = r.value;
    $('#fee-box').hidden = r.value !== 'estacao';
  }));
}

$('#validate-form').addEventListener('submit', e => {
  e.preventDefault();
  const txt = $('#validate-text').value.trim();
  const photo = $('#validate-photo').files.length;
  if (!txt && !photo) { $('#validate-error').textContent = 'Escreva uma característica ou envie uma foto para continuar.'; $('#validate-text').focus(); return; }
  $('#item-validate').hidden = true;
  $('#item-chat').hidden = false;
  $('#chat').innerHTML = `
    <div class="msg sys">Marina conferiu o detalhe que você enviou e confirmou que o item é seu.</div>
    <div class="msg them"><small>Marina (quem achou)</small>Oi! É seu sim. Achei ontem numa mesa do segundo andar, guardei direitinho.</div>
    <div class="msg them"><small>Marina (quem achou)</small>Posso deixar na Estação Centro hoje até as 18h, se for bom pra você.</div>`;
  toast('Detalhe confirmado. Agora é só combinar a entrega.');
});

let replied = false;
$('#chat-form').addEventListener('submit', e => {
  e.preventDefault();
  const input = $('#chat-input');
  const v = input.value.trim();
  if (!v) return;
  const chat = $('#chat');
  const me = document.createElement('div');
  me.className = 'msg me';
  me.innerHTML = '<small>Você</small>';
  me.append(v);
  chat.appendChild(me);
  input.value = '';
  chat.scrollTop = chat.scrollHeight;
  if (!replied) {
    replied = true;
    setTimeout(() => {
      chat.insertAdjacentHTML('beforeend', '<div class="msg them"><small>Marina (quem achou)</small>Combinado! Te aviso aqui assim que deixar.</div>');
      chat.scrollTop = chat.scrollHeight;
    }, 1200);
  }
});

$('#confirm-delivery').addEventListener('click', () => {
  const it = state.item;
  const code = 'Q' + Math.floor(Math.random() * 9 + 1) + '·' + Math.random().toString(36).slice(2, 5).toUpperCase();
  const texts = {
    estacao: 'Marina vai deixar o item na Estação quedi Centro (Rua das Flores, 120). Você recebe um aviso quando ele chegar.',
    inst: `O item vai estar no balcão de achados e perdidos de ${placeName(it.place)}.`,
    encontro: 'Combine o horário pelo chat. Lembre: lugar movimentado e horário comercial.'
  };
  $('#ok-text').textContent = texts[state.delivery];
  $('#ok-code').textContent = code;
  state.returnCode = code;
  location.hash = 'confirmado';
});

/* ============================================================
   ACHEI ALGO
   ============================================================ */
catChoices($('#found-cats'), 'foundcat');
$('#found-where').innerHTML = INSTS.map(p => `<option value="${p.id}">${p.name}</option>`).join('') + '<option value="outro">Outro lugar (rua, praça, ônibus…)</option>';
$('#found-date').value = todayISO();
previewFiles($('#found-photo'), $('#found-previews'));
wideChoices($('#found-action'), 'faction', [
  { id: 'estacao', icon: 'estacao', title: 'Deixar numa Estação quedi', sub: 'O dono busca com um código. Você não precisa encontrar ninguém' },
  { id: 'inst', icon: 'predio', title: 'Entregar no achados e perdidos do local', sub: 'O balcão cadastra o item aqui no site' },
  { id: 'comigo', icon: 'chat', title: 'Guardar comigo e combinar pelo chat', sub: 'Vocês marcam um lugar público, em horário comercial' }
], 'estacao');
$$('input[name="faction"]').forEach(r => r.addEventListener('change', () => { $('#found-fee').hidden = r.value !== 'estacao'; }));
$('#fee').addEventListener('input', e => { $('#fee-out').textContent = 'R$ ' + e.target.value; });

$('#found-form').addEventListener('submit', e => {
  e.preventDefault();
  if (!$('input[name="foundcat"]:checked')) { $('#found-error').textContent = 'Escolha o tipo de item que você achou.'; $('#foundcat-celular').focus(); return; }
  $('#found-error').textContent = '';
  const cat = $('input[name="foundcat"]:checked').value;
  state.myFound = { cat, title: $('#found-desc').value.trim() || CATS.find(c => c.id === cat).label };
  location.hash = 'achei-ok';
});

/* ============================================================
   MAPA
   ============================================================ */
$('#map-filters').innerHTML = Object.entries(PIN_STYLE).map(([k, v]) =>
  `<button type="button" class="map-filter" data-type="${k}" aria-pressed="true"><i style="background:${v.fill};border:1px solid ${v.stroke === '#fff' ? 'transparent' : v.stroke}"></i>${v.label}</button>`).join('');
$$('.map-filter').forEach(b => b.addEventListener('click', () => {
  const on = b.getAttribute('aria-pressed') === 'true';
  b.setAttribute('aria-pressed', String(!on));
  state.mapShow = $$('.map-filter').filter(x => x.getAttribute('aria-pressed') === 'true').map(x => x.dataset.type);
  renderMap();
}));
function renderMap() {
  $('#big-map').innerHTML = cityMap({ show: state.mapShow, labels: true, focusPins: true });
  const list = PLACES.filter(p => state.mapShow.includes(p.type));
  $('#place-list').innerHTML = list.length ? list.map(p => `
    <div class="place" id="pl-${p.id}" tabindex="-1">
      <div class="thumb" style="background:${PIN_STYLE[p.type].fill};color:${PIN_STYLE[p.type].icoColor}">${icon(PIN_STYLE[p.type].ico)}</div>
      <div><h3>${p.name}</h3><p>${p.info}</p></div>
    </div>`).join('') : '<p class="muted">Ative um dos filtros acima para ver os lugares.</p>';
  $$('#big-map .map-pin').forEach(g => {
    const open = () => {
      const el = $('#pl-' + g.dataset.id);
      $$('.place').forEach(x => x.classList.remove('is-focus'));
      el.classList.add('is-focus');
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      el.focus({ preventScroll: true });
    };
    g.addEventListener('click', open);
    g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
}

/* ============================================================
   PERFIL
   ============================================================ */
function renderProfile() {
  const rewards = [
    { icon: 'cafe', title: 'Café na cantina parceira', pts: 100 },
    { icon: 'moeda', title: 'R$ 10 via Pix', pts: 200 },
    { icon: 'presente', title: 'Vale-presente de R$ 15', pts: 300 }
  ];
  $('#redeem').innerHTML = rewards.map(r => `
    <div class="redeem-row">
      <span class="ico">${icon(r.icon)}</span>
      <div><strong>${r.title}</strong><br><span class="muted small">${r.pts} pontos</span></div>
      <button class="btn btn-quiet btn-small" type="button" data-redeem="${r.title}">Trocar</button>
    </div>`).join('');
  $$('[data-redeem]').forEach(b => b.addEventListener('click', () => toast(`Troca simulada: ${b.dataset.redeem}.`)));

  const rows = [];
  if (state.lost) rows.push({ cat: state.lost.cat, title: state.lost.name, status: state.returnCode ? `Devolução combinada · código ${state.returnCode}` : `Perdido entre ${state.lost.when.replace('–', ' e ')} · mostrado para 30 pessoas`, chip: state.returnCode ? 'chip-menta' : 'chip' , label: state.returnCode ? 'A caminho' : 'Perdido' });
  if (state.myFound) rows.push({ cat: state.myFound.cat, title: state.myFound.title, status: '12 pessoas avisadas', chip: 'chip-sol', label: 'Achado' });
  rows.push({ cat: 'oculos', title: 'Óculos de sol', status: 'Devolvido para Ana em outubro', chip: 'chip-menta', label: 'Devolvido' });
  $('#my-items').innerHTML = rows.map(r => `
    <div class="my-item">
      <div class="thumb">${icon(r.cat)}</div>
      <div><strong>${r.title}</strong><br><span class="muted small">${r.status}</span></div>
      <span class="chip ${r.chip}">${r.label}</span>
    </div>`).join('');
}

/* ---------- inicialização ---------- */
$$('[data-logo]').forEach(el => el.insertAdjacentHTML('afterbegin', LOGO));
$$('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });
$$('[data-icon-inline]').forEach(el => el.insertAdjacentHTML('afterbegin', icon(el.dataset.iconInline)));
window.addEventListener('hashchange', route);
route();
