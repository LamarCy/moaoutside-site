/* MOA site scripts: grass background, nav toggle, YouTube embed. */
(function () {
  // ---------- Site config (edit these) ----------
  const CONFIG = {
    // YouTube channel ID starts with "UC…". Find it at youtube.com → your channel → Settings → Advanced.
    youtubeChannelId: 'UCdOdvRQhgNv8f_I1PDOaKHw',
    youtubeChannelUrl: 'https://www.youtube.com/@moa.outside',
    // Stripe Payment Links (Stripe Dashboard → Payment Links → + New). Paste the full
    // https://donate.stripe.com/… or https://buy.stripe.com/… URL. Leave '' to hide a button.
    donate: {
      oneTime: 'https://buy.stripe.com/8x2aEXcDWd3o3A10yc0Ba00',   // "Customers choose what to pay" link for one-time gifts
      monthly: ''    // optional recurring (monthly) link
    },
    social: {
      instagram: 'https://www.instagram.com/',
      facebook: 'https://www.facebook.com/',
      youtube: 'https://www.youtube.com/@moa.outside',
      tiktok: 'https://www.tiktok.com/',
      linkedin: 'https://www.linkedin.com/',
      x: 'https://x.com/'
    }
  };
  window.MOA_CONFIG = CONFIG;

  // ---------- Grass: a meadow that sways in a light breeze ----------
  function seeded(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
  function drawGrass() {
    const host = document.getElementById('grass');
    if (!host) return;
    const rnd = seeded(20200701);
    const W = 1600, H = 340;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const count = window.innerWidth < 700 ? 180 : 360;
    let blades = '';
    for (let i = 0; i < count; i++) {
      const x = rnd() * (W + 40) - 20;
      const wave = 0.6 + 0.8 * Math.abs(Math.sin(x / 140));
      const h = (40 + rnd() * 150) * wave;
      const sweep = 14 + rnd() * 46 + 18 * Math.sin(x / 90);
      const w = (0.7 + rnd() * 0.9).toFixed(2);
      const op = (0.10 + rnd() * 0.18).toFixed(2);
      const d = (6 + rnd() * 6).toFixed(1);          // duration 6–12s
      const o = (-rnd() * 12).toFixed(1);            // random phase
      const a = (1.5 + rnd() * 2.5).toFixed(1);      // ±1.5–4°
      const cx = x + sweep * 0.35, cy = H - h * 0.55, ex = x + sweep, ey = H - h;
      blades += `<path class="blade" style="--d:${d}s;--o:${o}s;--a:${a}deg" d="M${x.toFixed(1)},${H + 6} Q${cx.toFixed(1)},${cy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}" stroke="#7b9a6a" stroke-width="${w}" opacity="${op}" fill="none" stroke-linecap="round"/>`;
    }
    // faint finger-trail arcs where a hand brushed through
    let trails = '';
    for (let k = 0; k < 3; k++) {
      const y0 = H - 60 - rnd() * 140, amp = 8 + rnd() * 12;
      let d = `M-10,${y0.toFixed(0)}`;
      for (let x = 60; x < W + 80; x += 60) d += ` T${x},${(y0 + amp * Math.sin(x / 110 + k)).toFixed(1)}`;
      trails += `<path d="${d}" stroke="#a3bc88" stroke-width="3" opacity="0.07" fill="none" stroke-linecap="round"/>`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice">${trails}${blades}</svg>`;
    host.innerHTML = svg;
    if (reduce) host.querySelectorAll('.blade').forEach(b => b.style.animation = 'none');
  }
  drawGrass();
  let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(drawGrass, 250); });

  // ---------- Mobile nav ----------
  const btn = document.querySelector('.menu-btn'), nav = document.querySelector('.nav');
  if (btn && nav) {
    btn.addEventListener('click', () => { nav.classList.toggle('open'); btn.setAttribute('aria-expanded', nav.classList.contains('open')); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); } });
  }

  // ---------- YouTube ----------
  const vid = document.getElementById('yt-embed');
  if (vid) {
    const id = CONFIG.youtubeChannelId;
    if (id && id.startsWith('UC')) {
      const uploads = 'UU' + id.slice(2); // a channel's uploads playlist
      vid.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/videoseries?list=${uploads}" title="MOA on YouTube" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
    } else {
      vid.innerHTML = `<div class="video-placeholder"><strong style="font-family:var(--font-head);font-size:1.3rem">MOA on YouTube</strong><p style="color:#dbe6d3;margin:8px 0 16px">Add the channel ID in assets/site.js to show the latest videos here.</p><a class="btn sun" href="${CONFIG.youtubeChannelUrl}" target="_blank" rel="noopener">Visit the channel</a></div>`;
    }
    document.querySelectorAll('[data-yt-link]').forEach(a => a.href = CONFIG.youtubeChannelUrl);
  }
  document.querySelectorAll('[data-social]').forEach(a => { const k = a.dataset.social; if (CONFIG.social[k]) a.href = CONFIG.social[k]; });

  // ---------- Donate (Stripe Payment Links) ----------
  const isStripe = u => /^https:\/\/(donate|buy)\.stripe\.com\//.test(u || '');
  const donate = CONFIG.donate || {};
  let live = 0;
  document.querySelectorAll('[data-donate]').forEach(a => {
    const url = donate[a.dataset.donate];
    if (isStripe(url)) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; live++; }
    else a.hidden = true;
  });
  const pending = document.querySelector('[data-donate-pending]');
  if (pending) pending.hidden = live > 0;
  // Site-wide Donate buttons go to /donate; if only a one-time link exists and no /donate page is wanted, they still work.
})();
