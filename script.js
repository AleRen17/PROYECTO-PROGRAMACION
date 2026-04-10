// ── JS migrado desde transparencia_gestion.html ──
// Galería de paisajes
const paisajes = [
  { src: 'img/Otras vistas/Paisaje.jpeg',    titulo: 'Amanecer en La Lomita',         desc: 'Mar de nubes desde las alturas de la vereda' },
  { src: 'img/Otras vistas/Paisaje P2.jpeg', titulo: 'Nubes sobre el valle',           desc: 'La niebla envuelve las montañas al amanecer' },
  { src: 'img/Otras vistas/Paisaje P3.jpeg', titulo: 'Atardecer dorado',               desc: 'El sol se despide entre colores cálidos y neblina' },
  { src: 'img/Otras vistas/Paisaje P4.jpeg', titulo: 'Panorámica desde la cima',       desc: 'Vista privilegiada del territorio veredal' },
  { src: 'img/Otras vistas/Paisaje P5.jpeg', titulo: 'Horizonte de montañas',          desc: 'La cordillera como telón de fondo de la vida campesina' },
];

const galImg    = document.getElementById('galImg');
const galTitulo = document.getElementById('galTitulo');
const galDesc   = document.getElementById('galDesc');
const galPrev   = document.getElementById('galPrev');
const galNext   = document.getElementById('galNext');
const thumbs    = document.querySelectorAll('.gal-thumb');
let   galCur    = 0;

function galGoTo(i) {
  galCur = Math.max(0, Math.min(i, paisajes.length - 1));
  const p = paisajes[galCur];
  if (galImg) {
    galImg.style.opacity = '0';
    setTimeout(() => {
      galImg.src = p.src;
      if (galTitulo) galTitulo.textContent = p.titulo;
      if (galDesc) galDesc.textContent   = p.desc;
      galImg.style.opacity  = '1';
    }, 250);
  }
  thumbs.forEach((t, j) => t.classList.toggle('a', j === galCur));
  if (galPrev) galPrev.disabled = galCur === 0;
  if (galNext) galNext.disabled = galCur === paisajes.length - 1;
}

if (galPrev && galNext) {
  galPrev.onclick = () => galGoTo(galCur - 1);
  galNext.onclick = () => galGoTo(galCur + 1);
}
thumbs.forEach((t, i) => t.addEventListener('click', () => galGoTo(i)));

// Auto-avance cada 5s
setInterval(() => galGoTo(galCur < paisajes.length - 1 ? galCur + 1 : 0), 5000);

if (galImg) galGoTo(0);

// Manejadores de error para imágenes de transparencia_gestion.html
const logoImgTG = document.getElementById('logo-img-tg');
if (logoImgTG) {
  logoImgTG.onerror = function() {
    this.style.background = 'var(--verde-claro)';
    this.style.borderRadius = '50%';
  };
}

const footerLogoImgTG = document.getElementById('footer-logo-img-tg');
if (footerLogoImgTG) {
  footerLogoImgTG.onerror = function() {
    this.style.display = 'none';
    if (this.nextElementSibling) {
      this.nextElementSibling.style.display = 'flex';
    }
  };
}

// ── JAVASCRIPT: FILTROS PARA PROYECTOS (no tocar) ──
const botones = document.querySelectorAll(".filtro-btn");
const tarjetas = document.querySelectorAll(".card");
const sinRes = document.getElementById("sin-resultados");

botones.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filtro = btn.dataset.filtro;

    botones.forEach((b) => b.classList.remove("activo"));
    btn.classList.add("activo");

    let visibles = 0;
    tarjetas.forEach((card) => {
      const estado = card.dataset.estado;
      const mostrar = filtro === "todos" || estado === filtro;
      card.classList.toggle("oculta", !mostrar);
      if (mostrar) visibles++;
    });

    sinRes.style.display = visibles === 0 ? "block" : "none";
  });
});

// ── JS migrado desde proyectos_comunitarios.html ──
// Carrusel principal
const thumbData = [
  { emoji:'🌾', bg:'#c8e6c9', label:'Agricultura' },
  { emoji:'🎣', bg:'#bbdefb', label:'Pesca' },
  { emoji:'🐄', bg:'#ffe082', label:'Crianza' },
  { emoji:'💧', bg:'#b2dfdb', label:'Acueducto' },
  { emoji:'🛣️', bg:'#f5c4b3', label:'Vía' },
  { emoji:'👩‍👧‍👦', bg:'#f8bbd9', label:'Madres comunitarias' },
];

const track   = document.getElementById('track');
const dotsEl  = document.getElementById('dots');
const thumbsEl= document.getElementById('thumbs');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const curNum  = document.getElementById('curNum');
const slides  = track ? Array.from(track.querySelectorAll('.slide')) : [];
const total   = slides.length;
let cur       = 0;

if (track && dotsEl && thumbsEl && prevBtn && nextBtn && curNum) {
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' a' : '');
    d.onclick = () => goTo(i);
    dotsEl.appendChild(d);
  });

  thumbData.forEach((t, i) => {
    const th = document.createElement('div');
    th.className = 'thumb' + (i === 0 ? ' a' : '');
    th.innerHTML = `<div class="thumb-img" style="background:${t.bg}">${t.emoji}</div><div class="thumb-label">${t.label}</div>`;
    th.onclick = () => goTo(i);
    thumbsEl.appendChild(th);
  });

  function goTo(i) {
    cur = Math.max(0, Math.min(i, total - 1));
    track.style.transform = `translateX(-${cur * 100}%)`;
    curNum.textContent = cur + 1;
    dotsEl.querySelectorAll('.dot').forEach((d, j) => d.classList.toggle('a', j === cur));
    thumbsEl.querySelectorAll('.thumb').forEach((t, j) => t.classList.toggle('a', j === cur));
    prevBtn.disabled = cur === 0;
    nextBtn.disabled = cur === total - 1;
    thumbsEl.querySelectorAll('.thumb')[cur].scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' });
  }

  prevBtn.onclick = () => goTo(cur - 1);
  nextBtn.onclick = () => goTo(cur + 1);

  track.addEventListener('touchstart', e => { track._sx = e.touches[0].clientX; }, { passive:true });
  track.addEventListener('touchend',   e => {
    const diff = track._sx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? cur + 1 : cur - 1);
  });

  goTo(0);
}

// Mini galerías (Agricultura, Pesca, Crianza, Acueducto, Vía, Madres comunitarias)
function miniGaleria(idPrefix) {
  const mtrack  = document.getElementById('mtrack' + idPrefix);
  const mdots   = document.getElementById('mdots' + idPrefix);
  const mbadge  = document.getElementById('mbadge' + idPrefix);
  const mprev   = document.getElementById('mprev' + idPrefix);
  const mnext   = document.getElementById('mnext' + idPrefix);
  if (!mtrack || !mdots || !mbadge || !mprev || !mnext) return;
  const mframes = Array.from(mtrack.querySelectorAll('.mini-frame'));
  const mtotal  = mframes.length;
  let   mcur    = 0;

  mframes.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'mdot' + (i === 0 ? ' a' : '');
    d.onclick = () => mGoTo(i);
    mdots.appendChild(d);
  });

  function mGoTo(i) {
    mcur = Math.max(0, Math.min(i, mtotal - 1));
    mtrack.style.transform = `translateX(-${mcur * 100}%)`;
    mbadge.textContent = (mcur + 1) + ' / ' + mtotal;
    mdots.querySelectorAll('.mdot').forEach((d, j) => d.classList.toggle('a', j === mcur));
    mprev.disabled = mcur === 0;
    mnext.disabled = mcur === mtotal - 1;
  }

  mprev.onclick = e => { e.stopPropagation(); mGoTo(mcur - 1); };
  mnext.onclick = e => { e.stopPropagation(); mGoTo(mcur + 1); };

  mtrack.addEventListener('touchstart', e => { mtrack._sx = e.touches[0].clientX; }, { passive:true });
  mtrack.addEventListener('touchend',   e => {
    e.stopPropagation();
    const diff = mtrack._sx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 30) mGoTo(diff > 0 ? mcur + 1 : mcur - 1);
  });

  mGoTo(0);
}

['', '2', '3', '4', '5', '6'].forEach(miniGaleria);

// Manejadores de error para imágenes
const logoImg = document.getElementById('logo-img');
if (logoImg) {
  logoImg.onerror = function() {
    this.style.background = 'var(--verde-claro)';
    this.style.borderRadius = '50%';
  };
}

const footerLogoImg = document.getElementById('footer-logo-img');
if (footerLogoImg) {
  footerLogoImg.onerror = function() {
    this.style.display = 'none';
    if (this.nextElementSibling) {
      this.nextElementSibling.style.display = 'flex';
    }
  };
}