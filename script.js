tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif']
      },
      colors: {
        paper: '#faf8f3',
        ink: '#26282b',
        forest: '#2f5d46'
      }
    }
  }
};

const SKELETON_DELAY = 700;

try {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;

  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
} catch (e) {
  // Theme preferences are optional; ignore browser storage failures.
}

const initializeApp = () => {
  const page = document.body.dataset.page;
  const $ = (s, r = document) => r.querySelector(s);

/* ---------- Shared: nav highlight, mobile menu, theme toggle ---------- */
document.querySelectorAll(`[data-nav="${page}"]`).forEach((a) => {
  a.classList.add('text-forest', 'dark:text-emerald-300');
  a.setAttribute('aria-current', 'page');
});

const menuBtn = $('#menuBtn');
const mobileNav = $('#mobileNav');

const setMobileNavOpen = (open) => {
  mobileNav.classList.toggle('hidden', !open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
};

menuBtn.addEventListener('click', () => {
  setMobileNavOpen(menuBtn.getAttribute('aria-expanded') !== 'true');
});

mobileNav.addEventListener('click', (e) => {
  if (e.target.closest('a')) setMobileNavOpen(false);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
    setMobileNavOpen(false);
    menuBtn.focus();
  }
});

$('#themeToggle').addEventListener('click', () => {
  const dark = document.documentElement.classList.toggle('dark');

  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  } catch (e) {
    // Ignore storage issues in restricted browser contexts.
  }
});

/* ---------- Shared: destination card ---------- */
const card = (d) => `
  <article data-id="${d.id}" tabindex="0" role="button" aria-label="View ${d.name}, ${d.province}" class="group min-w-0 cursor-pointer">
    <div class="aspect-[4/3] overflow-hidden rounded-lg bg-stone-200 dark:bg-stone-800">
      <img
        src="${d.image}"
        alt="${d.name}, ${d.province}"
        loading="lazy"
        onerror="this.style.display='none'"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      >
    </div>
    <p class="mt-3 text-xs uppercase tracking-wider text-forest dark:text-emerald-400 sm:mt-4">${d.type} · ${d.province}</p>
    <h3 class="mt-1 font-semibold font-serif text-xl">${d.name}</h3>
    <p class="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">${d.description}</p>
  </article>`;

const cardSkeleton = `
  <div aria-hidden="true" class="animate-pulse">
    <div class="aspect-[4/3] rounded-lg bg-stone-200 dark:bg-stone-800"></div>
    <div class="mt-4 h-3 w-1/3 rounded bg-stone-200 dark:bg-stone-800"></div>
    <div class="mt-3 h-6 w-2/3 rounded bg-stone-200 dark:bg-stone-800"></div>
    <div class="mt-3 h-3 w-full rounded bg-stone-200 dark:bg-stone-800"></div>
    <div class="mt-2 h-3 w-4/5 rounded bg-stone-200 dark:bg-stone-800"></div>
  </div>`;

const showIntroSkeleton = (container, content) => {
  const skeleton = document.createElement('div');
  skeleton.setAttribute('aria-hidden', 'true');
  skeleton.className = 'absolute inset-0 z-10 bg-paper dark:bg-[#161817]';
  skeleton.innerHTML = content;
  container.setAttribute('aria-busy', 'true');
  container.append(skeleton);
  setTimeout(() => {
    skeleton.remove();
    container.setAttribute('aria-busy', 'false');
  }, SKELETON_DELAY);
};

const setupDestinationDetails = (container) => {
  const modal = $('#modal');
  const closeButton = $('#mClose');
  let modalTrigger;

  const open = (id) => {
    const destination = DESTINATIONS.find((item) => String(item.id) === id);
    if (!destination) return;

    modalTrigger = document.activeElement;
    const image = $('#mImg');
    image.style.display = '';
    image.src = destination.image;
    image.alt = `${destination.name}, ${destination.province}`;
    $('#mMeta').textContent = destination.type;
    $('#mName').textContent = destination.name;
    $('#mProvince').textContent = destination.province;
    $('#mDesc').textContent = destination.description;
    $('#mElevation').textContent = destination.elevation;
    $('#mDifficulty').textContent = destination.difficulty;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    closeButton.focus();
  };

  const close = () => {
    if (modal.classList.contains('hidden')) return;

    modal.classList.add('hidden');
    modal.classList.remove('flex');
    if (modalTrigger instanceof HTMLElement && modalTrigger.isConnected) {
      modalTrigger.focus();
    } else {
      container.querySelector('[data-id]')?.focus();
    }
  };

  container.addEventListener('click', (e) => {
    const destination = e.target.closest('[data-id]');
    if (destination) open(destination.dataset.id);
  });

  container.addEventListener('keydown', (e) => {
    const destination = e.target.closest('[data-id]');
    if (destination && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      open(destination.dataset.id);
    }
  });

  closeButton.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      close();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      closeButton.focus();
    }
  });

  return open;
};

/* ---------- HOME: carousel, featured, provinces ---------- */
if (page === 'home') {
  const slides = [...document.querySelectorAll('[data-slide]')];
  const label = $('#slideLabel');
  let i = 0;
  let timer;

  const show = (n) => {
    i = (n + slides.length) % slides.length;

    slides.forEach((s, k) => {
      s.classList.toggle('opacity-100', k === i);
      s.classList.toggle('opacity-0', k !== i);
    });

    label.textContent = slides[i].alt;
  };

  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => show(i + 1), 5000);
  };

  $('#prev').addEventListener('click', () => {
    show(i - 1);
    restart();
  });

  $('#next').addEventListener('click', () => {
    show(i + 1);
    restart();
  });

  show(0);
  restart();

  const hero = document.querySelector('main > section');
  const heroSkeleton = document.createElement('div');
  hero.classList.add('relative');
  heroSkeleton.setAttribute('aria-hidden', 'true');
  heroSkeleton.className = 'absolute inset-0 z-10 grid items-center gap-8 bg-paper dark:bg-[#161817] sm:gap-12 lg:grid-cols-2';
  heroSkeleton.innerHTML = `
    <div class="animate-pulse space-y-5">
      <div class="h-12 w-4/5 max-w-lg rounded bg-stone-200 dark:bg-stone-800 sm:h-14"></div>
      <div class="h-4 w-full max-w-md rounded bg-stone-200 dark:bg-stone-800"></div>
      <div class="h-4 w-3/4 max-w-sm rounded bg-stone-200 dark:bg-stone-800"></div>
      <div class="h-11 w-40 rounded-full bg-stone-200 dark:bg-stone-800"></div>
    </div>
    <div class="aspect-[4/3] w-full animate-pulse rounded-lg bg-stone-200 dark:bg-stone-800 sm:aspect-[16/9] lg:aspect-[4/3]"></div>`;
  hero.append(heroSkeleton);
  setTimeout(() => heroSkeleton.remove(), SKELETON_DELAY);

  const featured = $('#featured');
  const provinceLinks = $('#provinceLinks');
  featured.setAttribute('aria-busy', 'true');
  featured.innerHTML = Array(3).fill(cardSkeleton).join('');
  provinceLinks.setAttribute('aria-busy', 'true');
  provinceLinks.innerHTML = PROVINCES.map(() => `
    <div aria-hidden="true" class="animate-pulse border-b border-stone-200 py-5 dark:border-stone-800">
      <div class="h-5 w-2/3 rounded bg-stone-200 dark:bg-stone-800"></div>
    </div>`).join('');

  const renderHomeContent = () => {
    featured.innerHTML = [1, 7, 6]
      .map((id) => DESTINATIONS.find((d) => d.id === id))
      .map(card)
      .join('');
    featured.setAttribute('aria-busy', 'false');

    provinceLinks.innerHTML = PROVINCES.map((p) =>
      `<a href="provinces.html#${slugify(p)}" class="block border-b border-stone-200 py-3.5 font-semibold font-serif text-lg transition hover:text-forest sm:py-4 dark:border-stone-800 dark:hover:text-emerald-400">${p} →</a>`
    ).join('');
    provinceLinks.setAttribute('aria-busy', 'false');
  };

  setTimeout(renderHomeContent, SKELETON_DELAY);

  const goToDestinations = (e) => {
    if (e.target.closest('[data-id]')) location.href = 'peaks.html';
  };

  featured.addEventListener('click', goToDestinations);
  featured.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const destination = e.target.closest('[data-id]');
      if (destination) {
        e.preventDefault();
        location.href = 'peaks.html';
      }
    }
  });

}

/* ---------- DESTINATIONS: skeleton, search, filters, modal ---------- */
if (page === 'destinations') {
  showIntroSkeleton($('#pageIntro'), `
    <div class="animate-pulse space-y-10">
      <div class="h-10 w-2/3 max-w-md rounded bg-stone-200 dark:bg-stone-800"></div>
      <div class="space-y-5">
        <div class="h-12 w-full max-w-md rounded-full bg-stone-200 dark:bg-stone-800"></div>
        <div class="flex gap-2">
          <div class="h-8 w-16 rounded-full bg-stone-200 dark:bg-stone-800"></div>
          <div class="h-8 w-24 rounded-full bg-stone-200 dark:bg-stone-800"></div>
          <div class="h-8 w-20 rounded-full bg-stone-200 dark:bg-stone-800"></div>
        </div>
      </div>
    </div>`);
  const grid = $('#grid');
  const search = $('#search');
  const filters = $('#filters');
  const empty = $('#empty');
  let category = 'All';

  const render = () => {
    const q = search.value.trim().toLowerCase();
    const list = DESTINATIONS.filter(
      (d) => (category === 'All' || d.type === category)
        && [d.name, d.province, d.type, d.description].join(' ').toLowerCase().includes(q)
    );

    grid.innerHTML = list.map(card).join('');
    empty.classList.toggle('hidden', list.length > 0);
    $('#loadingStatus').textContent = `Showing ${list.length} of ${DESTINATIONS.length} destinations.`;
    grid.setAttribute('aria-busy', 'false');
  };

  const cats = ['All', ...new Set(DESTINATIONS.map((d) => d.type))];

  const styleFilters = () => {
    filters.querySelectorAll('button').forEach((b) => {
      const on = b.dataset.cat === category;
      b.className = 'rounded-full border px-4 py-1.5 text-sm transition ' + (on
        ? 'border-forest bg-forest text-white'
        : 'border-stone-300 hover:border-forest dark:border-stone-700');
    });
  };

  filters.innerHTML = cats.map((c) => `<button data-cat="${c}">${c}</button>`).join('');
  filters.addEventListener('click', (e) => {
    if (!e.target.dataset.cat) return;
    category = e.target.dataset.cat;
    styleFilters();
    render();
  });

  styleFilters();
  search.addEventListener('input', render);

  grid.setAttribute('aria-busy', 'true');
  grid.innerHTML = Array(6).fill(cardSkeleton).join('');

  // Keep the delay so the skeleton state is visible with this locally loaded sample data.
  setTimeout(render, SKELETON_DELAY);

  setupDestinationDetails(grid);
}

/* ---------- PROVINCES ---------- */
if (page === 'provinces') {
  showIntroSkeleton($('#pageIntro'), `
    <div class="animate-pulse space-y-6">
      <div class="h-10 w-3/4 max-w-lg rounded bg-stone-200 dark:bg-stone-800"></div>
      <div class="h-4 w-2/3 max-w-md rounded bg-stone-200 dark:bg-stone-800"></div>
    </div>`);
  const provinceList = $('#provinceList');
  const loadingStatus = $('#provinceLoadingStatus');
  const skeletons = PROVINCES.map((p) => {
    const items = DESTINATIONS.filter((d) => d.regionCode === p);
    const cards = items.length ? items.length : 1;

    return `
      <section id="${slugify(p)}" class="scroll-mt-24 border-t border-stone-200 py-10 sm:py-12 dark:border-stone-800">
        <div aria-hidden="true" class="h-8 w-48 animate-pulse rounded bg-stone-200 dark:bg-stone-800"></div>
        <div class="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">${Array(cards).fill(cardSkeleton).join('')}</div>
      </section>`;
  }).join('');

  provinceList.setAttribute('aria-busy', 'true');
  provinceList.innerHTML = skeletons;

  const renderProvinces = () => {
    provinceList.innerHTML = PROVINCES.map((p) => {
      const items = DESTINATIONS.filter((d) => d.regionCode === p);

      return `
        <section id="${slugify(p)}" class="scroll-mt-24 border-t border-stone-200 py-10 sm:py-12 dark:border-stone-800">
          <h2 class="font-semibold font-serif text-2xl">${p}</h2>
          ${items.length
            ? `<div class="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">${items.map(card).join('')}</div>`
            : '<p class="mt-4 text-sm text-stone-500">No destinations listed yet.</p>'}
        </section>`;
    }).join('');
    provinceList.setAttribute('aria-busy', 'false');
    loadingStatus.textContent = `Loaded ${PROVINCES.length} regions and ${DESTINATIONS.length} destinations.`;
  };

  setTimeout(renderProvinces, SKELETON_DELAY);

  setupDestinationDetails(provinceList);
}

/* ---------- ABOUT: accordion and form validation ---------- */
if (page === 'about') {
  const main = $('main');
  const content = main.innerHTML;
  main.setAttribute('aria-busy', 'true');
  main.innerHTML = `
    <div aria-hidden="true" class="animate-pulse space-y-12">
      <section class="space-y-6">
        <div class="h-10 w-3/4 max-w-md rounded bg-stone-200 dark:bg-stone-800"></div>
        <div class="space-y-3">
          <div class="h-4 w-full rounded bg-stone-200 dark:bg-stone-800"></div>
          <div class="h-4 w-5/6 rounded bg-stone-200 dark:bg-stone-800"></div>
        </div>
      </section>
      <section class="space-y-6">
        <div class="h-8 w-64 rounded bg-stone-200 dark:bg-stone-800"></div>
        ${Array(4).fill('<div class="h-14 border-y border-stone-200 bg-stone-200 dark:border-stone-800 dark:bg-stone-800"></div>').join('')}
      </section>
      <section class="space-y-6">
        <div class="h-8 w-40 rounded bg-stone-200 dark:bg-stone-800"></div>
        ${Array(3).fill('<div class="h-16 rounded-md bg-stone-200 dark:bg-stone-800"></div>').join('')}
        <div class="h-12 w-36 rounded-full bg-stone-200 dark:bg-stone-800"></div>
      </section>
    </div>`;

  setTimeout(() => {
    main.innerHTML = content;
    main.setAttribute('aria-busy', 'false');

    document.querySelectorAll('[data-acc]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const panel = btn.nextElementSibling;
        const open = panel.classList.toggle('hidden') === false;
        btn.setAttribute('aria-expanded', open);
        btn.querySelector('span').textContent = open ? '−' : '+';
      });
    });

    const form = $('#contactForm');

    const setErr = (field, msg) => {
      $(`[data-err="${field}"]`).textContent = msg;
      return !msg;
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = form.elements;
      const results = [
        setErr('name', f.name.value.trim() ? '' : 'Please enter your name.'),
        setErr('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim()) ? '' : 'Please enter a valid email address.'),
        setErr('message', f.message.value.trim().length >= 10 ? '' : 'Message must be at least 10 characters.')
      ];
      const ok = results.every(Boolean);
      $('#formOk').classList.toggle('hidden', !ok);

      if (ok) {
        form.reset();
      }
    });
  }, SKELETON_DELAY);
}
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp, { once: true });
} else {
  initializeApp();
}