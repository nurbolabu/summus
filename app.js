/* ==========================================================================
   SUMMUS — Kinetic 3D Pipe Engine, Catalog CAD Scanner & Batch Calculator
   ========================================================================== */

const PIPE_CATALOG = {
  sn8: {
    id: 'sn8',
    name: 'Двухслойные гофрированные трубы SN 8',
    shortName: 'Труба двухслойная SN8',
    bannerNote: 'Отрезки по 6 м • В комплекте 1 муфта и 2 кольца EPDM',
    items: [
      { od: 110, id: 91,  joint: 'coupling', jointLabel: 'Муфта + 2 кольца', priceM: 1050 },
      { od: 160, id: 139, joint: 'coupling', jointLabel: 'Муфта + 2 кольца', priceM: 1955 },
      { od: 200, id: 176, joint: 'coupling', jointLabel: 'Муфта + 2 кольца', priceM: 2935 },
      { od: 250, id: 216, joint: 'coupling', jointLabel: 'Муфта + 2 кольца', priceM: 4200 },
      { od: 315, id: 271, joint: 'coupling', jointLabel: 'Муфта + 2 кольца', priceM: 6600 },
      { od: 400, id: 343, joint: 'coupling', jointLabel: 'Муфта + 2 кольца', priceM: 9900 },
      { od: 500, id: 431, joint: 'bell',     jointLabel: 'Раструб + 2 кольца', priceM: 13780 },
      { od: 630, id: 541, joint: 'bell',     jointLabel: 'Раструб + 2 кольца', priceM: 26380 }
    ]
  },
  drainage: {
    id: 'drainage',
    name: 'Гофрированные дренажные трубы (перфорированные)',
    shortName: 'Труба дренажная L–6м',
    bannerNote: 'Калиброванная перфорация • Отрезки L = 6 метров',
    items: [
      { od: 110, id: 91,  joint: 'drain', jointLabel: 'Перфорация • L–6 м', priceM: 1500 },
      { od: 160, id: 139, joint: 'drain', jointLabel: 'Перфорация • L–6 м', priceM: 2600 },
      { od: 200, id: 176, joint: 'drain', jointLabel: 'Перфорация • L–6 м', priceM: 3800 },
      { od: 250, id: 216, joint: 'drain', jointLabel: 'Перфорация • L–6 м', priceM: 4900 },
      { od: 315, id: 271, joint: 'drain', jointLabel: 'Перфорация • L–6 м', priceM: 7200 },
      { od: 400, id: 343, joint: 'drain', jointLabel: 'Перфорация • L–6 м', priceM: 11200 },
      { od: 500, id: 431, joint: 'drain', jointLabel: 'Перфорация • L–6 м', priceM: 19200 },
      { od: 630, id: 541, joint: 'drain', jointLabel: 'Перфорация • L–6 м', priceM: 39600 }
    ]
  }
};

function fmtKZT(n) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸';
}
function fmtNum(n) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const state = {
  activeTab: 'sn8',
  selectedSeries: 'sn8',
  selectedOd: 315,
  heroMode: 'flow', // 'flow' | 'coupling' | 'drainage'
  engMode: 'wall',
  bom: [
    { uid: 'sn8-315', series: 'sn8', od: 315, metersRequested: 60 },
    { uid: 'drainage-160', series: 'drainage', od: 160, metersRequested: 36 }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  initHeaderAndNavigation();
  initScrollReveal();
  initSpotlightCards();
  initKineticHeroCanvas();
  initCatalog();
  initEngineeringSimulator();
  initCalculator();
  initForms();
});

/* ==========================================================================
   1. Minimalist Sticky Header & Scroll Active Links
   ========================================================================== */
function initHeaderAndNavigation() {
  const header = document.getElementById('siteHeader');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 16);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', () => {
      const open = mainNav.classList.toggle('is-open');
      mobileBtn.setAttribute('aria-expanded', String(open));
    });
    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mainNav.classList.remove('is-open'));
    });
  }

  document.querySelectorAll('[data-open-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      setCatalogTab(btn.getAttribute('data-open-tab'));
    });
  });

  // Track active section in minimal header
  const navLinks = Array.from(document.querySelectorAll('.main-nav .nav-link'));
  const sections = navLinks.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          navLinks.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === id));
        }
      });
    }, { rootMargin: '-30% 0px -55% 0px' });
    sections.forEach(s => obs.observe(s));
  }
}

/* ==========================================================================
   2. Reveal Choreography & Interactive Mouse Spotlight Cards
   ========================================================================== */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-inview'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-inview');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  els.forEach(el => obs.observe(el));
}

function initSpotlightCards() {
  document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });
}

/* ==========================================================================
   3. KINETIC 3D CORRUGATED PIPES HERO ENGINE (60fps Procedural 2.5D/3D)
   ========================================================================== */
function initKineticHeroCanvas() {
  const canvas = document.getElementById('heroPipeCanvas');
  const stage = document.getElementById('kineticStage');
  if (!canvas || !stage) return;

  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, dpr = 1;

  // Interactive camera & impulse state
  let targetMouseX = 0, targetMouseY = 0;
  let smoothMouseX = 0, smoothMouseY = 0;
  let pulseWave = 0;
  let time = 0;

  // Mode buttons ('flow' | 'coupling' | 'drainage')
  const hudLabel = document.getElementById('stageHudMode');
  document.querySelectorAll('[data-hero-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-hero-mode');
      state.heroMode = mode;
      pulseWave = 1.0;
      document.querySelectorAll('[data-hero-mode]').forEach(b => {
        b.classList.toggle('is-active', b === btn);
      });
      if (hudLabel) {
        hudLabel.textContent =
          mode === 'flow' ? 'РЕЖИМ: ПОТОК SN8 • Ø110–630'
          : mode === 'coupling' ? 'РЕЖИМ: СТЫКОВКА МУФТЫ И EPDM'
          : 'РЕЖИМ: ПЕРФОРАЦИЯ • ДРЕНАЖ 360°';
      }
    });
  });

  function resize() {
    const rect = stage.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    targetMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });
  stage.addEventListener('mouseleave', () => {
    targetMouseX = 0;
    targetMouseY = 0;
  });
  stage.addEventListener('click', () => {
    pulseWave = 1.0;
  });

  // Flowing hydro-light particles
  const particles = Array.from({ length: 34 }, () => ({
    progress: Math.random(),
    speed: 0.004 + Math.random() * 0.007,
    lane: (Math.random() - 0.5) * 1.4,
    size: 1.5 + Math.random() * 2.5,
    pipeIdx: Math.floor(Math.random() * 3)
  }));

  /**
   * Draws a single 3D-shaded corrugated double-wall HDPE pipe from back to front!
   */
  function drawCorrugatedPipe(cfg) {
    const {
      x0, y0,            // Front mouth center
      angle,             // Axis angle pointing backward into space (radians)
      length,            // Pipe visual length
      outerR,            // Outer corrugated crest radius
      ribDepth,          // Depth of corrugation valley
      ribPitch,          // Spacing between ribs
      rollSpeed,         // Continuous rib motion speed
      label,             // e.g. 'Ø 630/541'
      opacity = 1,
      showBell = false,
      isDrainage = false
    } = cfg;

    ctx.save();
    ctx.globalAlpha = opacity;

    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    // Perpendicular normal (top/bottom of cylinder)
    const nx = -dy;
    const ny = dx;

    // Ellipse foreshortening based on mouse yaw + base perspective
    const ellipseRatio = Math.max(0.34, Math.min(0.66, 0.48 + smoothMouseX * 0.09));
    const count = Math.floor(length / ribPitch);
    const offset = ((time * rollSpeed) % ribPitch + ribPitch) % ribPitch;

    // Draw ribs from back (s = length) to front (s = 0) — exact painter's order!
    for (let i = count; i >= 0; i--) {
      const s = i * ribPitch - offset;
      if (s < 0 || s > length) continue;

      // Subtle perspective taper toward back
      const depthScale = 1 - (s / (length * 2.7));
      const cx = x0 + dx * s;
      const cy = y0 + dy * s;

      // Kinetic wave boost when user clicks or hovers
      const wave = pulseWave * Math.sin((s / length) * Math.PI * 4 - time * 8) * 3.5;
      const rCrest = (outerR + wave * 0.35) * depthScale;
      const rValley = (outerR - ribDepth) * depthScale;

      // 1. Valley dark cylinder slice
      ctx.beginPath();
      ctx.ellipse(cx + dx * (ribPitch * 0.42), cy + dy * (ribPitch * 0.42), rValley * ellipseRatio, rValley, angle, 0, Math.PI * 2);
      ctx.fillStyle = '#070A10';
      ctx.fill();

      // 2. Raised Corrugated Carbon Rib Torus-Slice
      const grad = ctx.createLinearGradient(
        cx - nx * rCrest, cy - ny * rCrest,
        cx + nx * rCrest, cy + ny * rCrest
      );
      grad.addColorStop(0.0, '#4E5E78');   // Top specular titanium-polymer rim
      grad.addColorStop(0.18, '#283344');  // Upper carbon shoulder
      grad.addColorStop(0.52, '#111722');  // Matte HDPE core
      grad.addColorStop(0.84, '#090D14');  // Deep shadow underside
      grad.addColorStop(1.0, '#1B3A5C');   // Subtle electric-blue floor bounce light

      ctx.beginPath();
      ctx.ellipse(cx, cy, rCrest * ellipseRatio, rCrest, angle, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Crisp specular highlight arc on the rib crest
      ctx.beginPath();
      ctx.ellipse(cx, cy, rCrest * ellipseRatio, rCrest, angle, -Math.PI * 0.85, -Math.PI * 0.15);
      ctx.strokeStyle = 'rgba(165, 198, 238, 0.32)';
      ctx.lineWidth = 1.3 * depthScale;
      ctx.stroke();

      // Drainage mode: glowing cyan perforation slots inside valleys + blue top stripe!
      if (isDrainage && i % 2 === 0 && s > ribPitch) {
        const slotX = cx + dx * (ribPitch * 0.45) - nx * (rValley * 0.35);
        const slotY = cy + dy * (ribPitch * 0.45) - ny * (rValley * 0.35);
        ctx.beginPath();
        ctx.arc(slotX, slotY, 2.1 * depthScale, 0, Math.PI * 2);
        ctx.fillStyle = '#38B6FF';
        ctx.fill();
      }
      if (isDrainage) {
        const stripeX = cx - nx * (rCrest * 0.94);
        const stripeY = cy - ny * (rCrest * 0.94);
        ctx.beginPath();
        ctx.arc(stripeX, stripeY, 2.0 * depthScale, 0, Math.PI * 2);
        ctx.fillStyle = '#29A8FF';
        ctx.fill();
      }
    }

    // Optional flared bell socket rim at front
    const mouthR = showBell ? outerR * 1.07 : outerR;
    const innerR = outerR * 0.82;

    // 3. Front Cross-Section Cut Face (Carbon Outer Ring)
    ctx.beginPath();
    ctx.ellipse(x0, y0, mouthR * ellipseRatio, mouthR, angle, 0, Math.PI * 2);
    ctx.fillStyle = '#18202C';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#586B86';
    ctx.stroke();

    // Hollow trapezoidal chambers around cut face
    const chambers = 18;
    for (let c = 0; c < chambers; c++) {
      const a = (c / chambers) * Math.PI * 2 + time * 0.35;
      const midR = (mouthR + innerR) * 0.51;
      const lx = Math.cos(a) * midR * ellipseRatio;
      const ly = Math.sin(a) * midR;
      const rx = x0 + lx * Math.cos(angle) - ly * Math.sin(angle);
      const ry = y0 + lx * Math.sin(angle) + ly * Math.cos(angle);
      ctx.beginPath();
      ctx.arc(rx, ry, Math.max(1.8, (mouthR - innerR) * 0.22), 0, Math.PI * 2);
      ctx.fillStyle = '#070A10';
      ctx.fill();
    }

    // 4. Smooth Electric Sky-Blue Inner Polyethylene Bore (Deep 3D Tunnel!)
    const boreGrad = ctx.createRadialGradient(
      x0 + dx * (innerR * 0.35), y0 + dy * (innerR * 0.35), innerR * 0.1,
      x0, y0, innerR
    );
    boreGrad.addColorStop(0.0, '#041428');
    boreGrad.addColorStop(0.55, '#0F5699');
    boreGrad.addColorStop(0.88, '#2695EB');
    boreGrad.addColorStop(1.0, '#6BC8FF');

    ctx.beginPath();
    ctx.ellipse(x0, y0, innerR * ellipseRatio, innerR, angle, 0, Math.PI * 2);
    ctx.fillStyle = boreGrad;
    ctx.fill();

    // Bright smooth sky-blue inner liner lip
    ctx.lineWidth = Math.max(3, outerR * 0.065);
    ctx.strokeStyle = '#47B4FF';
    ctx.stroke();

    // Inner depth rings inside the blue bore
    for (let d = 1; d <= 3; d++) {
      const ds = d * 14;
      const dr = innerR * (1 - d * 0.12);
      ctx.beginPath();
      ctx.ellipse(x0 + dx * ds, y0 + dy * ds, dr * ellipseRatio, dr, angle, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(115, 208, 255, ${0.22 - d * 0.05})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Technical CAD floating tag on foreground pipe
    if (label) {
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(215, 236, 255, 0.88)';
      ctx.fillText(label, x0 - mouthR * ellipseRatio - 8, y0 - mouthR - 12);
    }

    ctx.restore();
  }

  /**
   * Coupling Mode Special Scene: Animated Telescopic Pipe Joint Assembly!
   */
  function drawCouplingAssemblyScene() {
    const cy = height * 0.52 + smoothMouseY * 14;
    const cx = width * 0.50 + smoothMouseX * 16;
    const cycle = (Math.sin(time * 1.55) + 1) * 0.5; // 0 (separated) -> 1 (coupled watertight!)
    const gap = 8 + (1 - cycle) * 62;

    // Right pipe (sliding into coupling)
    drawCorrugatedPipe({
      x0: cx + gap,
      y0: cy - gap * 0.18,
      angle: -0.24,
      length: 230,
      outerR: 68,
      ribDepth: 9,
      ribPitch: 15,
      rollSpeed: 0,
      label: 'ТРУБА Ø315/271',
      isDrainage: false
    });

    // Two glowing EPDM rubber sealing O-rings seated on valleys!
    const epdmPositions = [cx + gap + 18, cx - gap - 18];
    epdmPositions.forEach(ex => {
      const ey = cy + (cx - ex) * 0.22;
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(ex, ey, 72 * 0.46, 72, -0.24, 0, Math.PI * 2);
      ctx.strokeStyle = '#00E0FF';
      ctx.lineWidth = 6.5;
      ctx.shadowColor = '#00E0FF';
      ctx.shadowBlur = 16;
      ctx.stroke();
      ctx.restore();
    });

    // Translucent X-Ray Coupling Sleeve (Муфта) locking over the joint!
    const sleeveX = cx;
    const sleeveY = cy;
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(sleeveX, sleeveY, 80 * 0.46, 80, -0.24, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(37, 147, 232, ${0.10 + cycle * 0.14})`;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = cycle > 0.82 ? '#10B981' : '#58B8FF';
    ctx.stroke();

    ctx.font = '700 11.5px "JetBrains Mono", monospace';
    ctx.fillStyle = cycle > 0.82 ? '#6EE7B7' : '#8FD4FF';
    ctx.textAlign = 'center';
    ctx.fillText(
      cycle > 0.82 ? '✓ ГЕРМЕТИЧНОСТЬ УЗЛА 0.5 БАР (EPDM СЖАТ)' : 'СВЕДЕНИЕ ТРУБ В СОЕДИНИТЕЛЬНУЮ МУФТУ...',
      cx,
      cy - 102
    );
    ctx.restore();

    // Left foreground pipe segment
    drawCorrugatedPipe({
      x0: cx - gap - 135,
      y0: cy + (gap + 135) * 0.24,
      angle: -0.24,
      length: 135,
      outerR: 68,
      ribDepth: 9,
      ribPitch: 15,
      rollSpeed: 0,
      label: 'МУФТА + 2 КОЛЬЦА EPDM'
    });
  }

  function renderFrame() {
    time += 0.016;
    pulseWave *= 0.94;
    smoothMouseX += (targetMouseX - smoothMouseX) * 0.07;
    smoothMouseY += (targetMouseY - smoothMouseY) * 0.07;

    ctx.clearRect(0, 0, width, height);

    // Subtle animated blueprint coordinate grid on canvas
    ctx.save();
    ctx.strokeStyle = 'rgba(71, 178, 255, 0.05)';
    ctx.lineWidth = 1;
    const gridStep = 48;
    const gxOff = (smoothMouseX * -12) % gridStep;
    const gyOff = (smoothMouseY * -12) % gridStep;
    for (let x = gxOff; x < width; x += gridStep) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = gyOff; y < height; y += gridStep) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }
    ctx.restore();

    if (state.heroMode === 'coupling') {
      drawCouplingAssemblyScene();
    } else {
      const isDrain = state.heroMode === 'drainage';
      const float1 = Math.sin(time * 1.3) * 8;
      const float2 = Math.cos(time * 1.1) * 10;
      const float3 = Math.sin(time * 1.6 + 1.4) * 7;

      // Background Pipe 1: Ø200 (Top Left-Back)
      drawCorrugatedPipe({
        x0: width * 0.24 + smoothMouseX * -14,
        y0: height * 0.27 + float3 + smoothMouseY * -10,
        angle: -0.28 + smoothMouseY * 0.04,
        length: Math.min(340, width * 0.56),
        outerR: Math.min(42, width * 0.075),
        ribDepth: 6,
        ribPitch: 12,
        rollSpeed: 28,
        opacity: 0.78,
        label: 'Ø 200/176',
        isDrainage: isDrain
      });

      // Midground Pipe 2: Ø400 (Upper Center-Right)
      drawCorrugatedPipe({
        x0: width * 0.42 + smoothMouseX * 10,
        y0: height * 0.42 + float2 + smoothMouseY * 8,
        angle: -0.25 + smoothMouseY * 0.05,
        length: Math.min(380, width * 0.62),
        outerR: Math.min(60, width * 0.105),
        ribDepth: 8,
        ribPitch: 14,
        rollSpeed: 34,
        opacity: 0.92,
        label: 'Ø 400/343',
        isDrainage: isDrain
      });

      // Foreground Flagship Pipe 3: Ø630 Bell Socket (Lower Front!)
      const mainX = width * 0.30 + smoothMouseX * 22;
      const mainY = height * 0.70 + float1 + smoothMouseY * 16;
      const mainAngle = -0.24 + smoothMouseY * 0.06;
      const mainR = Math.min(82, width * 0.145);

      drawCorrugatedPipe({
        x0: mainX,
        y0: mainY,
        angle: mainAngle,
        length: Math.min(430, width * 0.70),
        outerR: mainR,
        ribDepth: 10.5,
        ribPitch: 16,
        rollSpeed: 42,
        showBell: !isDrain,
        label: isDrain ? 'ДРЕНАЖ Ø 630 L–6М' : 'SN8 Ø 630/541 РАСТРУБ',
        isDrainage: isDrain
      });

      // Laminar glowing hydro-streams emerging cleanly from the smooth blue inner bores!
      ctx.save();
      particles.forEach(p => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const px = mainX - Math.cos(mainAngle) * (p.progress * 150) + Math.sin(mainAngle) * (p.lane * mainR * 0.35);
        const py = mainY - Math.sin(mainAngle) * (p.progress * 150) - Math.cos(mainAngle) * (p.lane * mainR * 0.35);
        const alpha = Math.sin(p.progress * Math.PI) * 0.75;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(85, 208, 255, ${alpha.toFixed(2)})`;
        ctx.fill();
      });
      ctx.restore();
    }

    requestAnimationFrame(renderFrame);
  }

  requestAnimationFrame(renderFrame);
}

/* ==========================================================================
   4. Interactive Price Matrix & Live Neon-CAD Cross-Section Scanner
   ========================================================================== */
function initCatalog() {
  document.querySelectorAll('[data-catalog-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      setCatalogTab(btn.getAttribute('data-catalog-tab'));
    });
  });

  const cadAddBtn = document.getElementById('cadAddSpecBtn');
  if (cadAddBtn) {
    cadAddBtn.addEventListener('click', () => {
      addItemToBom(state.selectedSeries, state.selectedOd, 30);
      showToast(`Добавлено: ${PIPE_CATALOG[state.selectedSeries].shortName} Ø${state.selectedOd} мм (30 п/м)`);
    });
  }

  renderCatalogTable();
  updateCadScanner();
}

function setCatalogTab(tab) {
  state.activeTab = tab;
  if (tab === 'sn8' || tab === 'drainage') {
    state.selectedSeries = tab;
  }
  document.querySelectorAll('[data-catalog-tab]').forEach(btn => {
    btn.classList.toggle('is-active', btn.getAttribute('data-catalog-tab') === tab);
  });
  renderCatalogTable();
  updateCadScanner();
}

function renderCatalogTable() {
  const thead = document.getElementById('catalogThead');
  const tbody = document.getElementById('catalogTbody');
  const bannerTitle = document.getElementById('tableBannerTitle');
  const bannerKit = document.getElementById('tableBannerKit');
  if (!thead || !tbody) return;

  if (state.activeTab === 'compare') {
    bannerTitle.textContent = 'Сводный прайс-лист: SN 8 и Дренажные трубы';
    bannerKit.textContent = 'Цены с НДС 16% • Отрезки по 6 м';

    thead.innerHTML = `
      <tr>
        <th>Диаметр OD / ID, мм</th>
        <th>Длина</th>
        <th>SN 8 Канализационная</th>
        <th>Дренажная (перф.)</th>
        <th>В расчет</th>
      </tr>
    `;

    tbody.innerHTML = PIPE_CATALOG.sn8.items.map((sn, i) => {
      const dr = PIPE_CATALOG.drainage.items[i];
      const sel = state.selectedOd === sn.od;
      const odTitle = sn.joint === 'bell' ? `${sn.od}/${sn.id} раструб` : `${sn.od}/${sn.id}`;
      return `
        <tr class="${sel ? 'is-selected' : ''}" data-row-series="sn8" data-row-od="${sn.od}">
          <td><span class="diam-cell"><span class="pipe-mini-ring"></span>${odTitle}</span></td>
          <td class="mono" style="color:var(--text-secondary)">L = 6 м</td>
          <td>
            <div class="val-price">${fmtKZT(sn.priceM)} <span style="font-size:12px;color:var(--text-muted)">/ м</span></div>
            <div class="val-subprice">${fmtKZT(sn.priceM * 6)} за 6 м</div>
          </td>
          <td>
            <div class="val-price">${fmtKZT(dr.priceM)} <span style="font-size:12px;color:var(--text-muted)">/ м</span></div>
            <div class="val-subprice">${fmtKZT(dr.priceM * 6)} за 6 м</div>
          </td>
          <td>
            <button type="button" class="row-add-btn" data-quick-add="sn8:${sn.od}">+ SN8</button>
            <button type="button" class="row-add-btn" data-quick-add="drainage:${dr.od}" style="margin-left:5px">+ Дренаж</button>
          </td>
        </tr>
      `;
    }).join('');
  } else {
    const ser = PIPE_CATALOG[state.activeTab];
    bannerTitle.textContent = ser.name;
    bannerKit.textContent = ser.bannerNote;

    if (state.activeTab === 'sn8') {
      thead.innerHTML = `
        <tr>
          <th>Наружный / Внутр. Ø, мм</th>
          <th>Соединение и ЗИП</th>
          <th>Отрезок</th>
          <th>Цена с НДС 16% (1 п/м)</th>
          <th>За хлыст (6 м)</th>
          <th>Заказ</th>
        </tr>
      `;
      tbody.innerHTML = ser.items.map(it => {
        const sel = state.selectedOd === it.od;
        return `
          <tr class="${sel ? 'is-selected' : ''}" data-row-series="sn8" data-row-od="${it.od}">
            <td><span class="diam-cell"><span class="pipe-mini-ring"></span>${it.od} / ${it.id}</span></td>
            <td><span class="conn-badge ${it.joint === 'bell' ? 'is-bell' : ''}">${it.jointLabel}</span></td>
            <td class="mono" style="color:var(--text-secondary)">п/м • 6 м</td>
            <td><span class="val-price">${fmtKZT(it.priceM)}</span></td>
            <td><span class="val-subprice">${fmtKZT(it.priceM * 6)}</span></td>
            <td><button type="button" class="row-add-btn" data-quick-add="sn8:${it.od}">+ В КП</button></td>
          </tr>
        `;
      }).join('');
    } else {
      thead.innerHTML = `
        <tr>
          <th>Диаметр наружный, мм</th>
          <th>Исполнение</th>
          <th>Отрезок</th>
          <th>Цена с НДС 16% (1 п/м)</th>
          <th>За хлыст (6 м)</th>
          <th>Заказ</th>
        </tr>
      `;
      tbody.innerHTML = ser.items.map(it => {
        const sel = state.selectedOd === it.od;
        return `
          <tr class="${sel ? 'is-selected' : ''}" data-row-series="drainage" data-row-od="${it.od}">
            <td><span class="diam-cell"><span class="pipe-mini-ring"></span>Ø ${it.od} мм</span></td>
            <td><span class="conn-badge">${it.jointLabel}</span></td>
            <td class="mono" style="color:var(--text-secondary)">п/м • L–6 м</td>
            <td><span class="val-price">${fmtKZT(it.priceM)}</span></td>
            <td><span class="val-subprice">${fmtKZT(it.priceM * 6)}</span></td>
            <td><button type="button" class="row-add-btn" data-quick-add="drainage:${it.od}">+ В КП</button></td>
          </tr>
        `;
      }).join('');
    }
  }

  tbody.querySelectorAll('tr[data-row-od]').forEach(row => {
    const activate = () => {
      state.selectedOd = Number(row.getAttribute('data-row-od'));
      const rs = row.getAttribute('data-row-series');
      if (state.activeTab !== 'compare' && rs) state.selectedSeries = rs;
      tbody.querySelectorAll('tr').forEach(r => r.classList.remove('is-selected'));
      row.classList.add('is-selected');
      updateCadScanner();
    };
    row.addEventListener('mouseenter', activate);
    row.addEventListener('click', (e) => {
      if (!e.target.closest('[data-quick-add]')) activate();
    });
  });

  tbody.querySelectorAll('[data-quick-add]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const [ser, odStr] = btn.getAttribute('data-quick-add').split(':');
      const od = Number(odStr);
      addItemToBom(ser, od, 30);
      const old = btn.textContent;
      btn.classList.add('is-added');
      btn.textContent = '✓ В списке';
      showToast(`${PIPE_CATALOG[ser].shortName} Ø${od} мм добавлена в расчет`);
      setTimeout(() => {
        btn.classList.remove('is-added');
        btn.textContent = old;
      }, 1200);
    });
  });
}

function updateCadScanner() {
  const serKey = state.activeTab === 'drainage' ? 'drainage' : 'sn8';
  state.selectedSeries = serKey;
  const ser = PIPE_CATALOG[serKey];
  const item = ser.items.find(i => i.od === state.selectedOd) || ser.items[4];

  const minR = 32, maxR = 85;
  const norm = (item.od - 110) / (630 - 110);
  const outerR = minR + norm * (maxR - minR);
  const innerR = outerR * (item.id / item.od);

  const svg = document.getElementById('cadCrossSvg');
  if (svg) {
    const ribs = 28, cx = 100, cy = 100;
    let dPath = '';
    for (let i = 0; i < ribs * 2; i++) {
      const a = (i * Math.PI) / ribs;
      const r = i % 2 === 0 ? outerR : outerR - Math.max(2.6, (outerR - innerR) * 0.36);
      dPath += (i === 0 ? 'M ' : ' L ') + `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
    }
    dPath += ' Z';

    let slots = '';
    if (serKey === 'drainage') {
      [-60, -25, 25, 60, 120, 155, -155, -120].forEach(deg => {
        const rad = (deg * Math.PI) / 180;
        slots += `<line x1="${(cx + (innerR - 1) * Math.cos(rad)).toFixed(1)}" y1="${(cy + (innerR - 1) * Math.sin(rad)).toFixed(1)}" x2="${(cx + (outerR + 2) * Math.cos(rad)).toFixed(1)}" y2="${(cy + (outerR + 2) * Math.sin(rad)).toFixed(1)}" stroke="#00E0FF" stroke-width="2.2" stroke-linecap="round"/>`;
      });
    }

    svg.innerHTML = `
      <line x1="12" y1="100" x2="188" y2="100" stroke="rgba(255,255,255,0.09)" stroke-dasharray="3 3"/>
      <line x1="100" y1="12" x2="100" y2="188" stroke="rgba(255,255,255,0.09)" stroke-dasharray="3 3"/>
      <path d="${dPath}" fill="#222C3B" stroke="#586B86" stroke-width="1.3"/>
      <circle cx="100" cy="100" r="${((outerR + innerR) / 2).toFixed(1)}" fill="none" stroke="#080C12" stroke-width="${Math.max(2, (outerR - innerR) * 0.45).toFixed(1)}" stroke-dasharray="4 3"/>
      <circle cx="100" cy="100" r="${(innerR + 2).toFixed(1)}" fill="#070B12" stroke="#2D9CDB" stroke-width="4.2"/>
      <circle cx="100" cy="100" r="${(innerR - 0.5).toFixed(1)}" fill="rgba(0, 210, 255, 0.08)" stroke="#6EC8FF" stroke-width="1"/>
      ${slots}
      <text x="100" y="97" text-anchor="middle" fill="#FFFFFF" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700">Ø${item.od}</text>
      <text x="100" y="111" text-anchor="middle" fill="#5AC2FF" font-family="JetBrains Mono, monospace" font-size="10">ID ${item.id}</text>
    `;
  }

  const wallMm = ((item.od - item.id) / 2).toFixed(1);
  document.getElementById('cadTitle').textContent =
    serKey === 'sn8' ? `SUMMUS SN 8 — Ø ${item.od}/${item.id}` : `SUMMUS Дренаж — Ø ${item.od} мм`;
  document.getElementById('cadSub').textContent =
    serKey === 'sn8' ? `Двухслойная труба ПНД • ${item.jointLabel}` : `Перфорированная серия • Штанга L = 6 м`;
  document.getElementById('cadStatOd').textContent = `${item.od} мм`;
  document.getElementById('cadStatId').textContent = `${item.id} мм`;
  document.getElementById('cadStatWall').textContent = `${wallMm} мм`;
  document.getElementById('cadStatPriceM').textContent = fmtKZT(item.priceM);
  document.getElementById('cadKitNote').innerHTML =
    serKey === 'sn8'
      ? `Отрезок 6 м = <strong>${fmtKZT(item.priceM * 6)}</strong> с НДС 16%. В цену уже включены: <strong>${item.joint === 'bell' ? 'интегрированный раструб + 2 кольца EPDM' : '1 соединительная муфта + 2 кольца EPDM'}</strong>.`
      : `Отрезок 6 м = <strong>${fmtKZT(item.priceM * 6)}</strong> с НДС 16%. Перфорация в пазах гофры защищена от заиливания и давления грунта.`;
}

/* ==========================================================================
   5. 3-Mode Cutaway Engineering Simulator
   ========================================================================== */
function initEngineeringSimulator() {
  const tabs = document.querySelectorAll('[data-eng-tab]');
  const points = document.querySelectorAll('[data-eng-card]');

  const setMode = (mode) => {
    state.engMode = mode;
    tabs.forEach(t => t.classList.toggle('is-active', t.getAttribute('data-eng-tab') === mode));
    points.forEach(p => p.classList.toggle('is-active', p.getAttribute('data-eng-card') === mode));
    renderEngSvg(mode);
  };

  tabs.forEach(t => t.addEventListener('click', () => setMode(t.getAttribute('data-eng-tab'))));
  points.forEach(p => p.addEventListener('click', () => setMode(p.getAttribute('data-eng-card'))));
  renderEngSvg('wall');
}

function renderEngSvg(mode) {
  const stage = document.getElementById('engSvgViewport');
  if (!stage) return;

  if (mode === 'wall') {
    stage.innerHTML = `
      <svg viewBox="0 0 600 290" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g class="load-arrows" stroke="#47B2FF" stroke-width="1.8">
          <line x1="130" y1="16" x2="130" y2="48"/><polyline points="124,42 130,50 136,42"/>
          <line x1="240" y1="16" x2="240" y2="48"/><polyline points="234,42 240,50 246,42"/>
          <line x1="350" y1="16" x2="350" y2="48"/><polyline points="344,42 350,50 356,42"/>
          <line x1="460" y1="16" x2="460" y2="48"/><polyline points="454,42 460,50 466,42"/>
        </g>
        <text x="300" y="12" text-anchor="middle" fill="#9BA8BC" font-family="JetBrains Mono, monospace" font-size="10">НАГРУЗКА ГРУНТА И АВТОДОРОГ ДО 8 М • КОЛЬЦЕВАЯ ЖЕСТКОСТЬ SN 8</text>
        <path d="M 55 98 L 68 62 L 102 62 L 114 98 L 134 98 L 146 62 L 180 62 L 192 98 L 212 98 L 224 62 L 258 62 L 270 98 L 290 98 L 302 62 L 336 62 L 348 98 L 368 98 L 380 62 L 414 62 L 426 98 L 446 98 L 458 62 L 492 62 L 504 98 L 545 98" fill="#232D3D" stroke="#5E728F" stroke-width="2"/>
        <rect x="50" y="98" width="500" height="11" rx="2" fill="#2593E8"/>
        <rect x="50" y="196" width="500" height="11" rx="2" fill="#2593E8"/>
        <rect x="50" y="109" width="500" height="87" fill="rgba(37, 147, 232, 0.08)"/>
        <line x1="65" y1="138" x2="535" y2="138" stroke="#47B2FF" stroke-width="2" class="flow-stream"/>
        <line x1="65" y1="166" x2="535" y2="166" stroke="#00E0FF" stroke-width="2.4" class="flow-stream"/>
        <text x="300" y="156" text-anchor="middle" fill="#FFFFFF" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700">ГЛАДКИЙ ГОЛУБОЙ PE-HD СЛОЙ • ЛЕГКИЙ КОНТРОЛЬ ТЕЛЕИНСПЕКЦИЕЙ</text>
        <path d="M 55 207 L 68 243 L 102 243 L 114 207 L 134 207 L 146 243 L 180 243 L 192 207 L 212 207 L 224 243 L 258 243 L 270 207 L 290 207 L 302 243 L 336 243 L 348 207 L 368 207 L 380 243 L 414 243 L 426 207 L 446 207 L 458 243 L 492 243 L 504 207 L 545 207" fill="#232D3D" stroke="#5E728F" stroke-width="2"/>
        <text x="300" y="274" text-anchor="middle" fill="#6EE7B7" font-family="JetBrains Mono, monospace" font-size="10.5">100% ПЕРВИЧНОЕ СЫРЬЕ БЕЗ ПУЗЫРЕЙ И РАССЛОЕНИЙ</text>
      </svg>
    `;
  } else if (mode === 'coupling') {
    stage.innerHTML = `
      <svg viewBox="0 0 600 290" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="188" y="38" width="224" height="20" rx="4" fill="#2C394E" stroke="#6E86A6" stroke-width="2"/>
        <rect x="188" y="232" width="224" height="20" rx="4" fill="#2C394E" stroke="#6E86A6" stroke-width="2"/>
        <text x="300" y="27" text-anchor="middle" fill="#FFFFFF" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700">МУФТА В КОМПЛЕКТЕ К КАЖДОЙ ТРУБЕ Ø110–400 ММ</text>
        <path d="M 45 100 L 65 64 L 98 64 L 112 100 L 140 100 L 156 64 L 188 64 L 202 100 L 220 100 L 234 64 L 254 64 L 266 100 L 296 100" fill="#1E2735" stroke="#556882" stroke-width="1.8"/>
        <path d="M 304 100 L 334 100 L 346 64 L 366 64 L 380 100 L 398 100 L 412 64 L 444 64 L 460 100 L 488 100 L 502 64 L 535 64 L 555 100" fill="#1E2735" stroke="#556882" stroke-width="1.8"/>
        <rect x="268" y="60" width="18" height="38" rx="6" fill="#00D2FF" stroke="#FFFFFF" stroke-width="1.5"/>
        <rect x="314" y="60" width="18" height="38" rx="6" fill="#00D2FF" stroke="#FFFFFF" stroke-width="1.5"/>
        <rect x="268" y="192" width="18" height="38" rx="6" fill="#00D2FF" stroke="#FFFFFF" stroke-width="1.5"/>
        <rect x="314" y="192" width="18" height="38" rx="6" fill="#00D2FF" stroke="#FFFFFF" stroke-width="1.5"/>
        <rect x="45" y="100" width="251" height="10" fill="#2593E8"/>
        <rect x="304" y="100" width="251" height="10" fill="#2593E8"/>
        <rect x="45" y="180" width="251" height="10" fill="#2593E8"/>
        <rect x="304" y="180" width="251" height="10" fill="#2593E8"/>
        <rect x="45" y="110" width="510" height="70" fill="rgba(37, 147, 232, 0.08)"/>
        <line x1="65" y1="145" x2="535" y2="145" stroke="#00E0FF" stroke-width="2.5" class="flow-stream"/>
        <path d="M 45 190 L 65 226 L 98 226 L 112 190 L 140 190 L 156 226 L 188 226 L 202 190 L 220 190 L 234 226 L 254 226 L 266 190 L 296 190" fill="#1E2735" stroke="#556882" stroke-width="1.8"/>
        <path d="M 304 190 L 334 190 L 346 226 L 366 226 L 380 190 L 398 190 L 412 226 L 444 226 L 460 190 L 488 190 L 502 226 L 535 226 L 555 190" fill="#1E2735" stroke="#556882" stroke-width="1.8"/>
        <text x="300" y="274" text-anchor="middle" fill="#5AC2FF" font-family="JetBrains Mono, monospace" font-size="10.5">2 УПЛОТНИТЕЛЬНЫХ КОЛЬЦА EPDM • 100% ГЕРМЕТИЧНОСТЬ НА ИНФИЛЬТРАЦИЮ</text>
      </svg>
    `;
  } else {
    stage.innerHTML = `
      <svg viewBox="0 0 600 290" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 45 98 L 65 64 L 100 64 L 116 98 L 146 98 L 164 64 L 198 64 L 214 98 L 238 44 L 415 44 L 415 62 L 252 62 L 232 98 Z" fill="#2A3649" stroke="#738BA8" stroke-width="2"/>
        <path d="M 255 98 L 270 64 L 302 64 L 316 98 L 342 98 L 356 64 L 390 64 L 404 98 L 430 98 L 446 64 L 482 64 L 498 98 L 550 98" fill="#1C2432" stroke="#556882" stroke-width="1.8"/>
        <rect x="316" y="60" width="22" height="38" rx="7" fill="#00D2FF" stroke="#FFFFFF" stroke-width="1.5"/>
        <rect x="316" y="192" width="22" height="38" rx="7" fill="#00D2FF" stroke="#FFFFFF" stroke-width="1.5"/>
        <rect x="45" y="98" width="205" height="12" fill="#2593E8"/>
        <rect x="255" y="98" width="295" height="12" fill="#2593E8"/>
        <rect x="45" y="180" width="205" height="12" fill="#2593E8"/>
        <rect x="255" y="180" width="295" height="12" fill="#2593E8"/>
        <rect x="45" y="110" width="505" height="70" fill="rgba(37, 147, 232, 0.08)"/>
        <line x1="65" y1="145" x2="535" y2="145" stroke="#00E0FF" stroke-width="2.5" class="flow-stream"/>
        <path d="M 45 192 L 65 226 L 100 226 L 116 192 L 146 192 L 164 226 L 198 226 L 214 192 L 238 246 L 415 246 L 415 228 L 252 228 L 232 192 Z" fill="#2A3649" stroke="#738BA8" stroke-width="2"/>
        <path d="M 255 192 L 270 226 L 302 226 L 316 192 L 342 192 L 356 226 L 390 226 L 404 192 L 430 192 L 446 226 L 482 226 L 498 192 L 550 192" fill="#1C2432" stroke="#556882" stroke-width="1.8"/>
        <text x="330" y="29" text-anchor="middle" fill="#FFFFFF" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700">МОНОЛИТНЫЙ РАСТРУБ ДЛЯ КОЛЛЕКТОРОВ Ø500 И Ø630 ММ</text>
        <text x="300" y="274" text-anchor="middle" fill="#9BA8BC" font-family="JetBrains Mono, monospace" font-size="10.5">БЫСТРЫЙ МОНТАЖ В ТРАНШЕЕ С ВЫСОКОЙ ОСЕВОЙ ЖЕСТКОСТЬЮ</text>
      </svg>
    `;
  }
}

/* ==========================================================================
   6. Batch Calculator & Specification Builder
   ========================================================================== */
function initCalculator() {
  const seriesSel = document.getElementById('calcSeries');
  const diamSel = document.getElementById('calcDiameter');
  const metersInput = document.getElementById('calcMeters');
  const addBtn = document.getElementById('calcAddBtn');
  const clearBtn = document.getElementById('bomClearBtn');
  const copyBtn = document.getElementById('bomCopyBtn');
  const toFormBtn = document.getElementById('bomToFormBtn');

  function populateDiameters() {
    const ser = PIPE_CATALOG[seriesSel.value];
    const currentOd = Number(diamSel.value) || 315;
    diamSel.innerHTML = ser.items.map(it => {
      const lbl = seriesSel.value === 'sn8'
        ? `Ø ${it.od}/${it.id} мм — ${fmtKZT(it.priceM)}/м (${it.joint === 'bell' ? 'раструб' : 'муфта + 2 кольца'})`
        : `Ø ${it.od} мм — ${fmtKZT(it.priceM)}/м (Дренажная L–6 м)`;
      return `<option value="${it.od}" ${it.od === currentOd ? 'selected' : ''}>${lbl}</option>`;
    }).join('');
    updatePreview();
  }

  function updatePreview() {
    const serKey = seriesSel.value;
    const od = Number(diamSel.value);
    const rawM = Math.max(6, Number(metersInput.value) || 6);
    const segs = Math.ceil(rawM / 6);
    const meters = segs * 6;
    const item = PIPE_CATALOG[serKey].items.find(i => i.od === od) || PIPE_CATALOG[serKey].items[0];
    const sum = meters * item.priceM;

    document.getElementById('previewSegments').textContent = `${segs} шт × 6 м (${meters} п/м)`;
    document.getElementById('previewKit').textContent =
      serKey === 'sn8'
        ? (item.joint === 'bell' ? `${segs} раструбов + ${segs * 2} колец EPDM` : `${segs} муфт + ${segs * 2} колец EPDM`)
        : `Перфорированные штанги (${segs} шт)`;
    document.getElementById('previewTotal').textContent = fmtKZT(sum);
  }

  seriesSel.addEventListener('change', populateDiameters);
  diamSel.addEventListener('change', updatePreview);
  metersInput.addEventListener('input', updatePreview);

  document.querySelectorAll('[data-preset-m]').forEach(chip => {
    chip.addEventListener('click', () => {
      metersInput.value = chip.getAttribute('data-preset-m');
      updatePreview();
    });
  });

  addBtn.addEventListener('click', () => {
    addItemToBom(seriesSel.value, Number(diamSel.value), Math.max(6, Number(metersInput.value) || 6));
    showToast('Позиция добавлена в спецификацию');
  });

  clearBtn.addEventListener('click', () => {
    state.bom = [];
    renderBom();
  });

  copyBtn.addEventListener('click', () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formatBomText()).then(() => {
        showToast('Спецификация скопирована');
      });
    }
  });

  toFormBtn.addEventListener('click', () => {
    const specBox = document.getElementById('inquirySpec');
    if (specBox) specBox.value = formatBomText();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    showToast('Спецификация перенесена в заявку на КП');
  });

  populateDiameters();
  renderBom();
}

function addItemToBom(series, od, metersReq) {
  const segs = Math.ceil(Math.max(6, metersReq) / 6);
  const meters = segs * 6;
  const uid = `${series}-${od}`;
  const found = state.bom.find(x => x.uid === uid);
  if (found) found.metersRequested += meters;
  else state.bom.push({ uid, series, od, metersRequested: meters });
  renderBom();
}

function renderBom() {
  const listEl = document.getElementById('bomList');
  const emptyEl = document.getElementById('bomEmpty');
  const summaryEl = document.getElementById('bomSummary');
  const countEl = document.getElementById('bomCountBadge');
  const teleTip = document.getElementById('telescopicText');
  if (!listEl) return;

  countEl.textContent = `${state.bom.length} поз.`;

  if (state.bom.length === 0) {
    emptyEl.style.display = 'block';
    listEl.style.display = 'none';
    summaryEl.style.display = 'none';
    return;
  }

  emptyEl.style.display = 'none';
  listEl.style.display = 'flex';
  summaryEl.style.display = 'block';

  let grandTotal = 0, totalMeters = 0, totalSegs = 0;
  const ods = [];

  listEl.innerHTML = state.bom.map(entry => {
    const item = PIPE_CATALOG[entry.series].items.find(i => i.od === entry.od);
    const segs = Math.ceil(entry.metersRequested / 6);
    const meters = segs * 6;
    const sum = meters * item.priceM;
    grandTotal += sum;
    totalMeters += meters;
    totalSegs += segs;
    ods.push(item.od);

    const name = entry.series === 'sn8'
      ? `Труба SN 8 Ø ${item.od}/${item.id} мм`
      : `Труба дренажная Ø ${item.od} мм`;

    return `
      <div class="bom-row">
        <div>
          <h5>${name}</h5>
          <p>${meters} п/м (${segs} отр. × 6 м) • ${item.jointLabel} • ${fmtKZT(item.priceM)}/м</p>
        </div>
        <div style="display:flex;align-items:center;gap:12px">
          <strong class="mono">${fmtKZT(sum)}</strong>
          <button type="button" class="bom-del" data-del-uid="${entry.uid}" aria-label="Удалить">✕</button>
        </div>
      </div>
    `;
  }).join('');

  listEl.querySelectorAll('[data-del-uid]').forEach(b => {
    b.addEventListener('click', () => {
      state.bom = state.bom.filter(x => x.uid !== b.getAttribute('data-del-uid'));
      renderBom();
    });
  });

  const vat = (grandTotal * 16) / 116;
  document.getElementById('bomTotalMeters').textContent = `${fmtNum(totalMeters)} п/м (${totalSegs} шт × 6 м)`;
  document.getElementById('bomVatIncluded').textContent = fmtKZT(vat);
  document.getElementById('bomGrandTotal').textContent = fmtKZT(grandTotal);

  ods.sort((a, b) => a - b);
  if (teleTip) {
    if (ods.length >= 2 && ods[ods.length - 1] / ods[0] >= 1.55) {
      teleTip.innerHTML = `<strong>Экономия на фурах до 45%:</strong> на складе SUMMUS уложим трубы Ø${ods[0]} мм внутрь Ø${ods[ods.length - 1]} мм («труба в трубу»).`;
    } else {
      teleTip.innerHTML = `<strong>Телескопическая погрузка:</strong> комбинируйте разные диаметры в одной фуре («труба в трубу») для снижения цены доставки по РК.`;
    }
  }
}

function formatBomText() {
  if (!state.bom.length) return 'Запрос прайс-листа и коммерческого предложения SUMMUS';
  let total = 0;
  const rows = state.bom.map((e, idx) => {
    const it = PIPE_CATALOG[e.series].items.find(i => i.od === e.od);
    const segs = Math.ceil(e.metersRequested / 6);
    const m = segs * 6;
    const s = m * it.priceM;
    total += s;
    const title = e.series === 'sn8' ? `SN8 Ø${it.od}/${it.id} (${it.jointLabel})` : `Дренаж Ø${it.od} (L-6м)`;
    return `${idx + 1}. ${title} — ${m} п/м (${segs} шт × 6м) = ${fmtKZT(s)}`;
  });
  return ['Спецификация SUMMUS:', ...rows, `Итого с НДС 16%: ${fmtKZT(total)}`].join('\n');
}

/* ==========================================================================
   7. Forms & Factory Excursion Trigger
   ========================================================================== */
function initForms() {
  const tourBtn = document.getElementById('bookTourBtn');
  if (tourBtn) {
    tourBtn.addEventListener('click', () => {
      const spec = document.getElementById('inquirySpec');
      if (spec && !spec.value.trim()) {
        spec.value = 'Хотим записаться на экскурсию на завод SUMMUS / посмотреть производство и лабораторию ОТК.';
      }
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      showToast('Заполните телефон для согласования визита в цех');
    });
  }

  const form = document.getElementById('inquiryForm');
  const okBox = document.getElementById('inquiryStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inquiryName').value.trim();
      const phone = document.getElementById('inquiryPhone').value.trim();
      if (!name || !phone) return;
      okBox.textContent = `Заявка принята, ${name}! Инженер отдела сбыта завода SUMMUS свяжется с вами по номеру ${phone} с готовым расчетом и документацией.`;
      okBox.classList.add('is-visible');
      showToast('Заявка отправлена в отдел сбыта SUMMUS');
    });
  }
}

let toastTimeout = null;
function showToast(text) {
  const el = document.getElementById('siteToast');
  const txt = document.getElementById('siteToastText');
  if (!el || !txt) return;
  txt.textContent = text;
  el.classList.add('is-shown');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => el.classList.remove('is-shown'), 3200);
}
