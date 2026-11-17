/* ==========================================================================
   SUMMUS — Unified Card Catalog with Photorealistic Studio Renders,
   Interactive Popup Modals & Batch Calculator
   ========================================================================== */

const PIPE_CATALOG = {
  sn8: {
    id: 'sn8',
    seriesTag: 'SN 8 • КАНАЛИЗАЦИЯ',
    badgeClass: 'series-sn8',
    name: 'Двухслойные гофрированные трубы SN 8',
    shortName: 'Труба двухслойная SN 8',
    description: 'Двухслойная гофрированная труба из полиэтилена высокой плотности (PE-HD) с черным наружным профилированным слоем и гладким голубым внутренним слоем. Поставляется в отрезках по 6 метров в комплекте с 1 муфтой и 2 уплотнительными кольцами.',
    items: [
      { key: 'sn8-110', series: 'sn8', od: 110, id: 91,  joint: 'coupling', jointLabel: 'Муфта + 2 кольца', priceM: 1050, depth: 'до 8 м', photo: './assets/card-sn8-coupling.jpg' },
      { key: 'sn8-160', series: 'sn8', od: 160, id: 139, joint: 'coupling', jointLabel: 'Муфта + 2 кольца', priceM: 1955, depth: 'до 8 м', photo: './assets/pipe-sn8.jpg' },
      { key: 'sn8-200', series: 'sn8', od: 200, id: 176, joint: 'coupling', jointLabel: 'Муфта + 2 кольца', priceM: 2935, depth: 'до 8 м', photo: './assets/card-sn8-coupling.jpg' },
      { key: 'sn8-250', series: 'sn8', od: 250, id: 216, joint: 'coupling', jointLabel: 'Муфта + 2 кольца', priceM: 4200, depth: 'до 8 м', photo: './assets/pipe-sn8.jpg' },
      { key: 'sn8-315', series: 'sn8', od: 315, id: 271, joint: 'coupling', jointLabel: 'Муфта + 2 кольца', priceM: 6600, depth: 'до 8 м', photo: './assets/card-sn8-coupling.jpg' },
      { key: 'sn8-400', series: 'sn8', od: 400, id: 343, joint: 'coupling', jointLabel: 'Муфта + 2 кольца', priceM: 9900, depth: 'до 8 м', photo: './assets/hero-pipes.jpg' },
      { key: 'sn8-500', series: 'sn8', od: 500, id: 431, joint: 'bell',     jointLabel: 'Раструб + 2 кольца', priceM: 13780, depth: 'до 8 м', photo: './assets/card-sn8-bell.jpg' },
      { key: 'sn8-630', series: 'sn8', od: 630, id: 541, joint: 'bell',     jointLabel: 'Раструб + 2 кольца', priceM: 26380, depth: 'до 8 м', photo: './assets/card-sn8-bell.jpg' }
    ]
  },
  drainage: {
    id: 'drainage',
    seriesTag: 'ДРЕНАЖ • L–6 М',
    badgeClass: 'series-drain',
    name: 'Гофрированные дренажные трубы (перфорированные)',
    shortName: 'Труба дренажная L–6 м',
    description: 'Перфорированная двухслойная дренажная труба с заводскими водоприемными прорезями в пазах гофры и синей продольной полосой. Предназначена для глубинного водоотведения и понижения уровня грунтовых вод.',
    items: [
      { key: 'drain-110', series: 'drainage', od: 110, id: 91,  joint: 'drain', jointLabel: 'Перфорация • L–6 м', priceM: 1500, depth: 'до 6 м', photo: './assets/card-drain-single.jpg' },
      { key: 'drain-160', series: 'drainage', od: 160, id: 139, joint: 'drain', jointLabel: 'Перфорация • L–6 м', priceM: 2600, depth: 'до 6 м', photo: './assets/card-drain-stack.jpg' },
      { key: 'drain-200', series: 'drainage', od: 200, id: 176, joint: 'drain', jointLabel: 'Перфорация • L–6 м', priceM: 3800, depth: 'до 6 м', photo: './assets/card-drain-single.jpg' },
      { key: 'drain-250', series: 'drainage', od: 250, id: 216, joint: 'drain', jointLabel: 'Перфорация • L–6 м', priceM: 4900, depth: 'до 6 м', photo: './assets/pipe-drainage.jpg' },
      { key: 'drain-315', series: 'drainage', od: 315, id: 271, joint: 'drain', jointLabel: 'Перфорация • L–6 м', priceM: 7200, depth: 'до 6 м', photo: './assets/card-drain-single.jpg' },
      { key: 'drain-400', series: 'drainage', od: 400, id: 343, joint: 'drain', jointLabel: 'Перфорация • L–6 м', priceM: 11200, depth: 'до 6 м', photo: './assets/card-drain-stack.jpg' },
      { key: 'drain-500', series: 'drainage', od: 500, id: 431, joint: 'drain', jointLabel: 'Перфорация • L–6 м', priceM: 19200, depth: 'до 6 м', photo: './assets/card-drain-single.jpg' },
      { key: 'drain-630', series: 'drainage', od: 630, id: 541, joint: 'drain', jointLabel: 'Перфорация • L–6 м', priceM: 39600, depth: 'до 6 м', photo: './assets/card-drain-stack.jpg' }
    ]
  },
  fittings: {
    id: 'fittings',
    seriesTag: 'ФИТИНГ • PE-HD',
    badgeClass: 'series-fit',
    name: 'Фитинги и комплектующие к гофрированным трубам',
    shortName: 'Фитинги SUMMUS',
    description: 'Заводские соединительные элементы для герметичного монтажа гофрированных и дренажных трубопроводов диаметром Ø 110–630 мм.',
    items: [
      {
        key: 'fit-coupling',
        series: 'fittings',
        code: 'FIT-CPL',
        name: 'Муфта соединительная гофрированная',
        shortTitle: 'Муфта соединительная',
        diams: 'Ø 110 – 630 мм',
        jointLabel: 'В комплекте к SN 8 / Доп. ЗИП',
        spec: 'Обеспечивает 100% герметичность стыка двух отрезков трубы совместно с кольцами EPDM.',
        status: 'В наличии на складе',
        refOd: 200,
        refId: 176,
        fitType: 'coupling',
        photo: './assets/card-fit-coupling.jpg'
      },
      {
        key: 'fit-ring',
        series: 'fittings',
        code: 'FIT-RNG',
        name: 'Кольцо уплотнительное профильное EPDM',
        shortTitle: 'Кольцо уплотнительное EPDM',
        diams: 'Ø 110 – 630 мм',
        jointLabel: '2 шт в комплекте к SN 8',
        spec: 'Маслобензостойкая профильная резина EPDM, устанавливается в паз гофры перед монтажом муфты.',
        status: 'В наличии на складе',
        refOd: 160,
        refId: 139,
        fitType: 'ring',
        photo: './assets/card-fit-ring.jpg'
      },
      {
        key: 'fit-elbow',
        series: 'fittings',
        code: 'FIT-ELB',
        name: 'Отвод гофрированный 45° / 90°',
        shortTitle: 'Отвод 45° / 90°',
        diams: 'Ø 110 – 630 мм',
        jointLabel: 'Угол поворота 45° или 90°',
        spec: 'Двухслойный фасонный элемент с голубым внутренним слоем для изменения направления трассы.',
        status: 'Склад / Производство',
        refOd: 250,
        refId: 216,
        fitType: 'elbow',
        photo: './assets/card-fit-elbow.jpg'
      },
      {
        key: 'fit-tee',
        series: 'fittings',
        code: 'FIT-TEE',
        name: 'Тройник равнопроходной и переходной 90°',
        shortTitle: 'Тройник 90°',
        diams: 'Ø 110 – 630 мм',
        jointLabel: 'Ответвление под 90°',
        spec: 'Предназначен для подключения боковых веток к магистральному коллектору SN 8 или дренажу.',
        status: 'Склад / Производство',
        refOd: 315,
        refId: 271,
        fitType: 'tee',
        photo: './assets/card-fit-tee.jpg'
      },
      {
        key: 'fit-cross',
        series: 'fittings',
        code: 'FIT-CRS',
        name: 'Крестовина гофрированная двухплоскостная',
        shortTitle: 'Крестовина 90°',
        diams: 'Ø 110 – 500 мм',
        jointLabel: '4-стороннее соединение',
        spec: 'Монолитная сварная конструкция из двухслойной трубы PE-HD с раструбными окончаниями.',
        status: 'Склад / Производство',
        refOd: 400,
        refId: 343,
        fitType: 'cross',
        photo: './assets/card-fit-cross.jpg'
      },
      {
        key: 'fit-reducer',
        series: 'fittings',
        code: 'FIT-RED',
        name: 'Переход эксцентрический между диаметрами',
        shortTitle: 'Переход редукционный',
        diams: 'Ø 160/110 – 630/500 мм',
        jointLabel: 'Переход с Ø на Ø',
        spec: 'Плавный переход между различными диаметрами трубопровода без потери гидравлического сечения.',
        status: 'Склад / Производство',
        refOd: 500,
        refId: 431,
        fitType: 'reducer',
        photo: './assets/card-fit-reducer.jpg'
      }
    ]
  }
};

function fmtKZT(n) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸';
}

const state = {
  activeFilter: 'all', // 'all' | 'sn8' | 'drainage' | 'fittings'
  modalItemKey: 'sn8-315'
};

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initScrollPipeDividers();
  initMobileDrawer();
  initCatalogCards();
  initModals();
});

function initMobileDrawer() {
  const openBtn = document.getElementById('burgerOpenBtn');
  const closeBtn = document.getElementById('burgerCloseBtn');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  if (!openBtn || !backdrop) return;

  function openDrawer() {
    backdrop.hidden = false;
    openBtn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => {
      backdrop.classList.add('is-open');
      document.body.classList.add('modal-open');
    });
  }

  function closeDrawer() {
    backdrop.classList.remove('is-open');
    openBtn.setAttribute('aria-expanded', 'false');
    setTimeout(() => {
      if (!backdrop.classList.contains('is-open')) backdrop.hidden = true;
    }, 250);
    if (!document.querySelector('.modal-backdrop.is-open')) {
      document.body.classList.remove('modal-open');
    }
  }

  openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeDrawer();
  });
  backdrop.querySelectorAll('[data-drawer-link]').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

function initScrollPipeDividers() {
  const fullDividers = document.querySelectorAll('.pipe-divider-full');
  const navLinks = Array.from(document.querySelectorAll('.top-nav-pill .pill-link'));
  const tracked = navLinks.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

  window.addEventListener('scroll', () => {
    const shift = (window.scrollY * 0.18).toFixed(1);
    fullDividers.forEach((el, idx) => {
      const dir = idx % 2 === 0 ? 1 : -1;
      el.style.backgroundPosition = `${shift * dir}px center`;
    });
  }, { passive: true });

  if ('IntersectionObserver' in window && tracked.length) {
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          navLinks.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === id));
        }
      });
    }, { rootMargin: '-28% 0px -58% 0px' });
    tracked.forEach(sec => navObs.observe(sec));
  }
}

/* ==========================================================================
   1. Reveal Choreography
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
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ==========================================================================
   2. SVG Generator for Scaled CAD Cross-Section Badge inside Modal
   ========================================================================== */
function buildPipeCrossSectionSvg(item, size = 100) {
  const cx = size / 2;
  const cy = size / 2;

  const od = item.series === 'fittings' ? (item.refOd || 250) : item.od;
  const id = item.series === 'fittings' ? (item.refId || 216) : item.id;
  const minR = size * 0.24;
  const maxR = size * 0.44;
  const norm = (od - 110) / (630 - 110);
  const outerR = minR + norm * (maxR - minR);
  const innerR = outerR * (id / od);
  const ribs = 22;

  let dPath = '';
  for (let i = 0; i < ribs * 2; i++) {
    const a = (i * Math.PI) / ribs;
    const r = i % 2 === 0 ? outerR : outerR - Math.max(2.2, (outerR - innerR) * 0.36);
    dPath += (i === 0 ? 'M ' : ' L ') + `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  }
  dPath += ' Z';

  return `
    <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="${dPath}" fill="#141820"/>
      <circle cx="${cx}" cy="${cy}" r="${(innerR + 1.8).toFixed(1)}" fill="#F8FAFC" stroke="#2B95EA" stroke-width="${Math.max(3.5, size * 0.04).toFixed(1)}"/>
      <text x="${cx}" y="${cy + 3.5}" text-anchor="middle" fill="#11151C" font-family="Manrope, sans-serif" font-size="${Math.round(size * 0.12)}" font-weight="700">${item.series === 'fittings' ? 'SN8' : 'Ø' + od}</text>
    </svg>
  `;
}

/* ==========================================================================
   3. Unified Card Catalog Rendering & Filtering
   ========================================================================== */
function getAllCatalogItems() {
  return [
    ...PIPE_CATALOG.sn8.items,
    ...PIPE_CATALOG.drainage.items,
    ...PIPE_CATALOG.fittings.items
  ];
}

function findCatalogItemByKey(key) {
  return getAllCatalogItems().find(it => it.key === key) || PIPE_CATALOG.sn8.items[4];
}

function initCatalogCards() {
  document.querySelectorAll('[data-cat-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      setCatalogFilter(btn.getAttribute('data-cat-filter'));
    });
  });

  document.querySelectorAll('[data-open-series-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const serKey = btn.getAttribute('data-open-series-modal');
      setCatalogFilter(serKey);
      const firstItem = PIPE_CATALOG[serKey].items[0];
      openProductModal(firstItem.key);
    });
  });

  renderProductCardsGrid();
}

function setCatalogFilter(filterKey) {
  state.activeFilter = filterKey;
  document.querySelectorAll('[data-cat-filter]').forEach(btn => {
    btn.classList.toggle('is-active', btn.getAttribute('data-cat-filter') === filterKey);
  });
  renderProductCardsGrid();
}

function renderProductCardsGrid() {
  const grid = document.getElementById('productCardsGrid');
  if (!grid) return;

  const items = state.activeFilter === 'all'
    ? getAllCatalogItems()
    : (PIPE_CATALOG[state.activeFilter]?.items || []);

  grid.innerHTML = items.map(item => {
    if (item.series === 'fittings') {
      return `
        <article class="prod-card" data-open-modal="${item.key}">
          <div>
            <div class="prod-visual-stage">
              <img src="${item.photo}" alt="${item.name}" class="prod-card-photo" loading="lazy" />
            </div>
            <h3 class="prod-title">${item.name}</h3>
            <p class="prod-size-line">${item.diams}</p>
          </div>
          <button type="button" class="btn-card-more" data-open-modal="${item.key}">
            Подробнее
          </button>
        </article>
      `;
    }

    const isSn8 = item.series === 'sn8';
    const title = isSn8
      ? 'Гофрированная труба SN 8'
      : 'Дренажная труба (L–6 м)';
    const sizeText = isSn8
      ? (item.joint === 'bell' ? `Ø ${item.od} / ${item.id} мм (раструб)` : `Ø ${item.od} / ${item.id} мм`)
      : `Ø ${item.od} мм`;

    return `
      <article class="prod-card" data-open-modal="${item.key}">
        <div>
          <div class="prod-visual-stage">
            <img src="${item.photo}" alt="${title} ${sizeText}" class="prod-card-photo" loading="lazy" />
          </div>
          <h3 class="prod-title">${title}</h3>
          <p class="prod-size-line">${sizeText}</p>
        </div>
        <button type="button" class="btn-card-more" data-open-modal="${item.key}">
          Подробнее
        </button>
      </article>
    `;
  }).join('');

  grid.querySelectorAll('.prod-card[data-open-modal]').forEach(card => {
    card.addEventListener('click', () => {
      openProductModal(card.getAttribute('data-open-modal'));
    });
  });
}

/* ==========================================================================
   4. Popup Modals («Подробнее» Product Modal & «Заказать КП» Modal)
   ========================================================================== */
function initModals() {
  const prodModal = document.getElementById('productDetailModal');
  const kpModal = document.getElementById('kpOrderModal');

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  [prodModal, kpModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAllModals();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
      const drawerBackdrop = document.getElementById('mobileDrawerBackdrop');
      if (drawerBackdrop && drawerBackdrop.classList.contains('is-open')) {
        drawerBackdrop.classList.remove('is-open');
        setTimeout(() => { drawerBackdrop.hidden = true; }, 250);
      }
    }
  });

  document.querySelectorAll('[data-open-kp-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const drawerBackdrop = document.getElementById('mobileDrawerBackdrop');
      if (drawerBackdrop && drawerBackdrop.classList.contains('is-open')) {
        drawerBackdrop.classList.remove('is-open');
        setTimeout(() => { drawerBackdrop.hidden = true; }, 250);
      }
      openKpOrderModal('');
    });
  });

  const modalOpenKpBtn = document.getElementById('modalOpenKpBtn');
  if (modalOpenKpBtn) {
    modalOpenKpBtn.addEventListener('click', () => {
      const item = findCatalogItemByKey(state.modalItemKey);
      const label = item.series === 'fittings'
        ? `${item.name} (${item.diams})`
        : (item.series === 'sn8' ? `Гофрированная труба SN 8 Ø ${item.od}/${item.id} мм` : `Дренажная труба Ø ${item.od} мм (L–6 м)`);
      openKpOrderModal(`Интересует: ${label}`);
    });
  }

  const kpForm = document.getElementById('kpOrderForm');
  if (kpForm) {
    kpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('kpName').value.trim();
      const phone = document.getElementById('kpPhone').value.trim();
      if (!name || !phone) return;
      const status = document.getElementById('kpOrderStatus');
      if (status) {
        status.textContent = `Спасибо, ${name}! Заявка принята, свяжемся с вами по номеру ${phone}.`;
        status.classList.add('is-visible');
      }
      showToast('Заявка успешно отправлена');
    });
  }
}

function openProductModal(itemKey) {
  state.modalItemKey = itemKey;
  const modal = document.getElementById('productDetailModal');
  if (!modal) return;

  populateProductModal();
  modal.hidden = false;
  requestAnimationFrame(() => {
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
  });
}

function openKpOrderModal(prefillText = '') {
  closeAllModals();
  const modal = document.getElementById('kpOrderModal');
  if (!modal) return;

  const commentEl = document.getElementById('kpComment');
  const statusEl = document.getElementById('kpOrderStatus');
  if (statusEl) statusEl.classList.remove('is-visible');
  if (commentEl && prefillText) {
    commentEl.value = prefillText;
  }

  setTimeout(() => {
    modal.hidden = false;
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
      document.body.classList.add('modal-open');
    });
  }, 60);
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.classList.remove('is-open');
    setTimeout(() => {
      if (!modal.classList.contains('is-open')) modal.hidden = true;
    }, 220);
  });
  document.body.classList.remove('modal-open');
}

function populateProductModal() {
  const item = findCatalogItemByKey(state.modalItemKey);
  const serMeta = PIPE_CATALOG[item.series];

  const badgesEl = document.getElementById('modalHeaderBadges');
  badgesEl.innerHTML = `
    <span class="series-pill ${serMeta.badgeClass}">${serMeta.seriesTag}</span>
    <span class="vat-pill">Цена с НДС 16% • Завод SUMMUS</span>
  `;

  const cadStage = document.querySelector('.modal-cad-stage');
  if (cadStage) {
    cadStage.innerHTML = `
      <img src="${item.photo}" alt="${item.name || ('Труба Ø' + item.od)}" class="modal-real-photo" />
      <div class="modal-cad-corner-badge" title="Профиль сечения OD/ID">
        ${buildPipeCrossSectionSvg(item, 90)}
      </div>
    `;
  }

  const pillsWrap = document.getElementById('modalSizePills');
  if (pillsWrap) {
    pillsWrap.innerHTML = serMeta.items.map(sib => {
      const active = sib.key === item.key ? 'is-active' : '';
      const label = sib.series === 'fittings'
        ? sib.shortTitle
        : (sib.series === 'sn8' ? `Ø ${sib.od}/${sib.id}` : `Ø ${sib.od}`);
      return `<button type="button" class="size-pill-btn ${active}" data-switch-modal-key="${sib.key}">${label}</button>`;
    }).join('');

    pillsWrap.querySelectorAll('[data-switch-modal-key]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.modalItemKey = btn.getAttribute('data-switch-modal-key');
        populateProductModal();
      });
    });
  }

  const titleEl = document.getElementById('modalProductTitle');
  const subEl = document.getElementById('modalProductSubtitle');
  const priceBox = document.getElementById('modalPriceHighlight');
  const specsList = document.getElementById('modalSpecsList');

  if (item.series === 'fittings') {
    titleEl.textContent = item.name;
    subEl.textContent = item.spec;
    priceBox.style.display = 'none';

    specsList.innerHTML = `
      <div class="spec-row"><span>Артикул серии</span><strong>${item.code}</strong></div>
      <div class="spec-row"><span>Совместимые диаметры труб</span><strong>${item.diams}</strong></div>
      <div class="spec-row"><span>Материал корпуса</span><strong>Полиэтилен высокой плотности (PE-HD)</strong></div>
      <div class="spec-row"><span>Класс кольцевой жесткости</span><strong>SN 8 (≥ 8 кН/м²)</strong></div>
      <div class="spec-row"><span>Комплектация к трубам SN 8</span><strong>${item.jointLabel}</strong></div>
      <div class="spec-row"><span>Статус наличия</span><strong>${item.status}</strong></div>
    `;
    return;
  }

  priceBox.style.display = 'flex';

  const isSn8 = item.series === 'sn8';
  const wallHeight = ((item.od - item.id) / 2).toFixed(1);

  titleEl.textContent = isSn8
    ? `Гофрированная двухслойная труба SN 8 — Ø ${item.od}/${item.id} мм`
    : `Гофрированная дренажная труба — Ø ${item.od} мм (L–6 м)`;
  subEl.textContent = serMeta.description;

  document.getElementById('modalPricePerM').textContent = fmtKZT(item.priceM);
  document.getElementById('modalPricePerSeg').textContent = fmtKZT(item.priceM * 6);

  specsList.innerHTML = `
    <div class="spec-row"><span>Наружный диаметр (OD)</span><strong>${item.od} мм</strong></div>
    <div class="spec-row"><span>Внутренний диаметр (ID)</span><strong>${item.id} мм</strong></div>
    <div class="spec-row"><span>Высота профиля волны</span><strong>${wallHeight} мм</strong></div>
    <div class="spec-row"><span>Класс кольцевой жесткости</span><strong>SN 8 (≥ 8 кН/м²)</strong></div>
    <div class="spec-row"><span>Длина одного отрезка</span><strong>L = 6 000 мм (6 м)</strong></div>
    <div class="spec-row"><span>Тип соединения и комплектация</span><strong>${isSn8 ? 'В комплекте 1 муфта и 2 уплотнительных кольца' : 'Перфорированная с синей полосой (L–6 м)'}</strong></div>
    <div class="spec-row"><span>Материал</span><strong>Первичный полиэтилен PE-HD (ПНД)</strong></div>
    <div class="spec-row"><span>Рекомендуемая глубина заложения</span><strong>${item.depth}</strong></div>
    <div class="spec-row"><span>Срок эксплуатации</span><strong>Не менее 50 лет</strong></div>
  `;
}

let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('siteToast');
  const txt = document.getElementById('siteToastText');
  if (!el || !txt) return;
  txt.textContent = msg;
  el.classList.add('is-shown');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-shown'), 3000);
}
