(function () {
  'use strict';
  if (window.__booyahBurst) return;

  const CONFIG = {
    BASE: 'https://raw.githubusercontent.com/DoodleBun/wafrcardbooyahtcgpreview/main/',
    BACK: 'https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/BACK.jpg',

    CARD_COUNT: 8,
    CARD_COUNT_MOBILE: 6,
    MOBILE_WIDTH: 700,
    CARD_H: 0.27,
    CARD_GAP: 12,
    TILT: 32,
    WOBBLE: 1,
    SPIN: 1,
    BACK_CHANCE: 0,

    DELAY: 0.8,
    SPEED: 1,

    STAR_STYLE: 'sunburst',
    STAR_OPACITY: 0.08,
    STAR_RAYS: 24,
    STAR_SPIN: 6,
    STAR_COLOR: '#ffffff',

    PARTICLES: 60,
    PARTICLE_SPEED: 1,

    Z_INDEX: 0
  };
  Object.assign(CONFIG, window.BOOYAH_BURST_CONFIG || {});

  const PACKS = {
    ap: 18, ba: 10, be: 10, co: 10, de: 10,
    do: 18, do2: 18, fe: 10, fe2: 10, fe3: 10,
    ka: 10, ki: 10, mm: 10, va: 18, ze: 10
  };

  const rand  = (a, b) => a + Math.random() * (b - a);
  const sign  = () => (Math.random() < 0.5 ? -1 : 1);
  const pad2  = n => String(n).padStart(2, '0');
  const shuffle = arr => { for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; };

  const REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FLASH_PEAK = REDUCED ? 0.35 : 1;
  const WOBBLE = CONFIG.WOBBLE * (REDUCED ? 0.3 : 1);
  const CALM = REDUCED ? 0.4 : 1;

  const allFiles = Object.entries(PACKS).flatMap(([p, n]) =>
    Array.from({ length: n }, (_, i) => `${p}_${pad2(i + 1)}.png`));

  const P = 1000;

  let root, bg, flash, starEl, canvas, ctx, world;
  let raf = 0;
  let cards = [];
  let parts = [];
  let cw = 0, chh = 0, dpr = 1;

  function injectCSS() {
    const st = document.createElement('style');
    st.id = 'bb-style';
    st.textContent = `
      #bb-root { position: fixed; left: 0; top: 0; width: 100%; height: 100%; margin: 0; padding: 0;
                 z-index: ${CONFIG.Z_INDEX}; pointer-events: none; overflow: hidden; background: #000; }
      #bb-root, #bb-root * { box-sizing: border-box; }

      #bb-root .bb-bg { position: absolute; left: 0; top: 0; width: 100%; height: 100%; opacity: 0;
        background: radial-gradient(ellipse at 50% 50%,
          #14409a 0%,
          #0b2460 30%,
          #040d2c 65%,
          #010512 100%);
      }

      #bb-root .bb-star { position: absolute; left: 50%; top: 50%; opacity: 0; will-change: transform, opacity; }

      #bb-root .bb-particles { position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: block; }

      #bb-root .bb-scene { position: absolute; left: 0; top: 0; width: 100%; height: 100%;
                           perspective: ${P}px; perspective-origin: 50% 50%; }
      #bb-root .bb-world { position: absolute; left: 0; top: 0; width: 100%; height: 100%; transform-style: preserve-3d; }

      #bb-root .bb-card { position: absolute; transform-style: preserve-3d; will-change: transform; visibility: hidden; }
      #bb-root .bb-face { position: absolute; left: 0; top: 0; width: 100%; height: 100%; border-radius: 4.5%;
                          overflow: hidden; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      #bb-root .bb-face img { display: block !important; width: 100% !important; height: 100% !important;
                              max-width: none !important; margin: 0 !important; padding: 0 !important;
                              border: 0 !important; border-radius: 0 !important; box-shadow: none !important;
                              -webkit-user-drag: none; user-select: none; }
      #bb-root .bb-back { transform: rotateY(180deg); }

      #bb-root .bb-flash { position: absolute; left: 0; top: 0; width: 100%; height: 100%; opacity: 0;
        background: radial-gradient(circle at 50% 50%,
          #fff 0%, #fff 12%, #cfe3ff 30%, rgba(110,165,255,.55) 55%, rgba(0,0,0,0) 78%);
      }
    `;
    document.head.appendChild(st);
  }

  function obbPush(a, b, gap) {
    const axes = [[Math.cos(a.rot), Math.sin(a.rot)], [-Math.sin(a.rot), Math.cos(a.rot)],
                  [Math.cos(b.rot), Math.sin(b.rot)], [-Math.sin(b.rot), Math.cos(b.rot)]];
    const radius = (o, n) => o.hw * Math.abs(n[0] * Math.cos(o.rot) + n[1] * Math.sin(o.rot)) +
                             o.hh * Math.abs(-n[0] * Math.sin(o.rot) + n[1] * Math.cos(o.rot));
    const dx = b.x - a.x, dy = b.y - a.y;
    let best = Infinity, push = null;
    for (const n of axes) {
      const d = dx * n[0] + dy * n[1];
      const overlap = radius(a, n) + radius(b, n) + gap - Math.abs(d);
      if (overlap <= 0) return null;
      if (overlap < best) { best = overlap; const s = d >= 0 ? 1 : -1; push = [n[0] * s * overlap, n[1] * s * overlap]; }
    }
    return push;
  }

  function layoutCards(N, W, H, cw0, ch0) {
    const base = [];
    for (let i = 0; i < N; i++) {
      const ang = (i / N) * Math.PI * 2 + Math.PI / 4 + rand(-0.3, 0.3) * (Math.PI * 2 / N);
      const ring = rand(0.72, 1.0);
      base.push({
        sx: Math.cos(ang) * (W / 2) * 0.62 * ring,
        sy: Math.sin(ang) * (H / 2) * 0.60 * ring,
        tz: rand(0, 160),
        rz: sign() * rand(8, 26)
      });
    }

    const SAFE = 1.10;
    let scale = 1, items = [], ok = false;
    for (let attempt = 0; attempt < 14 && !ok; attempt++) {
      const cwid = cw0 * scale, chei = ch0 * scale;
      items = base.map(b => {
        const persp = P / (P - b.tz);
        return { x: b.sx + rand(-4, 4), y: b.sy + rand(-4, 4), tz: b.tz, persp, rz: b.rz,
                 rot: b.rz * Math.PI / 180, hw: cwid / 2 * persp * SAFE, hh: chei / 2 * persp * SAFE };
      });

      for (let iter = 0; iter < 500; iter++) {
        let moved = false;
        for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
          const push = obbPush(items[i], items[j], CONFIG.CARD_GAP);
          if (!push) continue;
          moved = true;
          items[i].x -= push[0] * 0.55; items[i].y -= push[1] * 0.55;
          items[j].x += push[0] * 0.55; items[j].y += push[1] * 0.55;
        }

        for (const it of items) {
          const c = Math.abs(Math.cos(it.rot)), s = Math.abs(Math.sin(it.rot));
          const mx = Math.max(W / 2 - (it.hw * c + it.hh * s) - 6, 0);
          const my = Math.max(H / 2 - (it.hw * s + it.hh * c) - 6, 0);
          it.x = Math.max(-mx, Math.min(mx, it.x));
          it.y = Math.max(-my, Math.min(my, it.y));
        }
        if (!moved) { ok = true; break; }
      }
      if (!ok) scale *= 0.93;
    }
    return { items, cw: cw0 * scale, ch: ch0 * scale, ok };
  }

  function applyLayout() {
    const W = innerWidth, H = innerHeight;

    let ch0 = H * CONFIG.CARD_H;
    let cw0 = ch0 * (816 / 1111);
    if (cw0 > W * 0.30) { cw0 = W * 0.30; ch0 = cw0 * (1111 / 816); }

    const lay = layoutCards(cards.length, W, H, cw0, ch0);
    cards.forEach((c, i) => {
      const it = lay.items[i];
      c.el.style.width = lay.cw + 'px';
      c.el.style.height = lay.ch + 'px';
      c.el.style.left = (W / 2 - lay.cw / 2) + 'px';
      c.el.style.top  = (H / 2 - lay.ch / 2) + 'px';
      c.tx = it.x / it.persp;
      c.ty = it.y / it.persp;
      c.tz = it.tz;

      c.rxT = CONFIG.TILT * (it.y / (H / 2));
      c.ryT = -CONFIG.TILT * (it.x / (W / 2)) + c.flip;
      c.rzT = it.rz;
    });
  }

  async function buildCards() {
    world.innerHTML = '';
    const mobile = innerWidth < CONFIG.MOBILE_WIDTH;
    const N = mobile ? CONFIG.CARD_COUNT_MOBILE : CONFIG.CARD_COUNT;
    const files = shuffle(allFiles.slice()).slice(0, N);
    const list = [];
    const loads = [];

    files.forEach(file => {
      const el = document.createElement('div');
      el.className = 'bb-card';

      const front = new Image(); front.decoding = 'async'; front.alt = ''; front.src = CONFIG.BASE + file;
      const back  = new Image(); back.decoding = 'async';  back.alt = '';  back.src  = CONFIG.BACK;
      el.innerHTML = '<div class="bb-face bb-front"></div><div class="bb-face bb-back"></div>';
      el.children[0].appendChild(front);
      el.children[1].appendChild(back);
      world.appendChild(el);

      loads.push(front.decode().then(() => true, () => false));

      list.push({
        el, shown: false,
        flip: Math.random() < CONFIG.BACK_CHANCE ? 180 : 0,
        dur: rand(2.8, 3.8),

        ox: sign() * rand(40, 120) * CONFIG.SPIN,
        oy: sign() * rand(180, 360) * CONFIG.SPIN,
        oz: sign() * rand(40, 120) * CONFIG.SPIN,

        wf: [rand(.8, 1.5), rand(.8, 1.5), rand(.6, 1.2), rand(.5, 1.0), rand(.5, 1.0)],
        wp: [rand(0, 6.28), rand(0, 6.28), rand(0, 6.28), rand(0, 6.28), rand(0, 6.28)]
      });
    });

    const results = await Promise.race([
      Promise.all(loads),
      new Promise(r => setTimeout(() => r(null), 15000))
    ]);
    cards = list.filter((c, i) => {
      const ok = !results || results[i];
      if (!ok) c.el.remove();
      return ok;
    });
    applyLayout();
  }

  function setupStar() {
    starEl.style.background = 'none';
    if (CONFIG.STAR_STYLE === 'sunburst') {
      const half = 180 / CONFIG.STAR_RAYS;
      starEl.style.background =
        `repeating-conic-gradient(${CONFIG.STAR_COLOR} 0deg ${half}deg, transparent ${half}deg ${half * 2}deg)`;
    }

    const s = Math.hypot(innerWidth, innerHeight) * 1.25;
    starEl.style.width = s + 'px';
    starEl.style.height = s + 'px';
    starEl.style.marginLeft = starEl.style.marginTop = (-s / 2) + 'px';
  }

  const glow = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'), grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.25, 'rgba(190,220,255,.55)');
    grad.addColorStop(1, 'rgba(120,170,255,0)');
    g.fillStyle = grad; g.fillRect(0, 0, 64, 64);
    return c;
  })();

  function sizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cw = innerWidth; chh = innerHeight;
    canvas.width = cw * dpr; canvas.height = chh * dpr;
  }
  function newParticle(anywhere) {
    return {
      x: rand(-1, 1), y: rand(-1, 1),
      z: anywhere ? rand(0.12, 1) : rand(0.85, 1),
      vz: rand(0.04, 0.10),
      size: rand(5, 16),
      a: rand(0.35, 0.9)
    };
  }
  function setupParticles() {
    sizeCanvas();
    const count = Math.round(CONFIG.PARTICLES * (innerWidth < CONFIG.MOBILE_WIDTH ? 0.6 : 1));
    parts = Array.from({ length: count }, () => newParticle(true));
  }
  function drawParticles(dt, k) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, chh);
    if (k <= 0) return;
    const hx = cw / 2, hy = chh / 2;
    for (const p of parts) {
      p.z -= p.vz * dt * CONFIG.PARTICLE_SPEED * CALM;
      const sx = hx + (p.x / p.z) * hx, sy = hy + (p.y / p.z) * hy;
      const sz = p.size / p.z;

      if (p.z < 0.12 || sx < -sz || sx > cw + sz || sy < -sz || sy > chh + sz) {
        Object.assign(p, newParticle(false)); continue;
      }

      const fade = Math.min((1 - p.z) / 0.12, 1) * Math.min((p.z - 0.12) / 0.25, 1);
      ctx.globalAlpha = Math.max(fade, 0) * p.a * k * 0.8;
      ctx.drawImage(glow, sx - sz / 2, sy - sz / 2, sz, sz);
    }
    ctx.globalAlpha = 1;
  }

  async function play() {
    setupStar();
    setupParticles();
    await buildCards();
    if (!root.isConnected) return;
    const start = performance.now();
    let last = start;

    function tick(now) {
      const t  = (now - start) / 1000;
      const tf = t - CONFIG.DELAY;
      const dt = Math.min((now - last) / 1000, 0.05); last = now;

      if (tf >= 0) {
        const fl = tf < 0.07 ? 1 : Math.exp(-(tf - 0.07) * 3.2);
        flash.style.opacity = fl * FLASH_PEAK;
        flash.style.transform = `scale(${0.3 + 2.2 * (1 - Math.exp(-tf * 4))})`;
      }

      let k = 0;
      if (tf >= 0.1) {
        const q = Math.min((tf - 0.1) / 3.5, 1);
        k = q * q * (3 - 2 * q);
        bg.style.opacity = k;
      }

      if (tf >= 0 && CONFIG.STAR_STYLE !== 'none') {
        const rot = CONFIG.STAR_SPIN * CALM * tf + 60 * (1 - Math.exp(-tf * 1.2));
        const sc = 0.85 + 0.15 * (1 - Math.exp(-tf * 1.5));
        starEl.style.opacity = CONFIG.STAR_OPACITY * k;
        starEl.style.transform = `rotate(${rot}deg) scale(${sc})`;
      }

      drawParticles(dt, k);

      const ct = (tf - 0.04) * CONFIG.SPEED;
      if (ct >= 0) for (const c of cards) {
        if (!c.shown) { c.el.style.visibility = 'visible'; c.shown = true; }

        const p = Math.min(ct / 1.3, 1);
        const f = 1 + 2.0 * Math.pow(p - 1, 3) + 1.0 * Math.pow(p - 1, 2);

        const u = Math.min(ct / c.dur, 1);
        const left = (1 - u) * (1 - u);

        const sc = 0.15 + 0.85 * (1 - Math.exp(-6 * ct));

        const wk = WOBBLE * Math.min(ct / 2.5, 1);
        const w = (n, amp) => Math.sin(ct * c.wf[n] + c.wp[n]) * amp * wk;

        const x = c.tx * f + w(3, 6);
        const y = c.ty * f + w(4, 6);
        const z = c.tz * f + w(2, 25);

        c.el.style.transform =
          `translate3d(${x}px, ${y}px, ${z}px) ` +
          `rotateX(${c.rxT * f + c.ox * left + w(0, 4)}deg) ` +
          `rotateY(${c.ryT * f + c.oy * left + w(1, 4)}deg) ` +
          `rotateZ(${c.rzT * f + c.oz * left + w(2, 2.5)}deg) ` +
          `scale(${sc})`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
  }

  let lastW = innerWidth, lastH = innerHeight, resizeTimer = 0;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const dw = Math.abs(innerWidth - lastW), dh = Math.abs(innerHeight - lastH);
      if (dw < 2 && dh < lastH * 0.2) return;
      lastW = innerWidth; lastH = innerHeight;
      sizeCanvas(); setupStar();
      if (cards.length) applyLayout();
    }, 250);
  }

  function destroy() {
    cancelAnimationFrame(raf);
    removeEventListener('resize', onResize);
    if (root) root.remove();
    const st = document.getElementById('bb-style'); if (st) st.remove();
    window.__booyahBurst = null;
  }

  function init() {
    try {
      injectCSS();
      root = document.createElement('div');
      root.id = 'bb-root';
      root.setAttribute('aria-hidden', 'true');
      root.innerHTML =
        '<div class="bb-bg"></div><div class="bb-star"></div><canvas class="bb-particles"></canvas>' +
        '<div class="bb-scene"><div class="bb-world"></div></div><div class="bb-flash"></div>';

      document.body.insertBefore(root, document.body.firstChild);

      bg = root.querySelector('.bb-bg');       flash = root.querySelector('.bb-flash');
      starEl = root.querySelector('.bb-star'); canvas = root.querySelector('.bb-particles');
      world = root.querySelector('.bb-world'); ctx = canvas.getContext('2d');

      addEventListener('resize', onResize);
      play().catch(err => { console.error('[booyah-burst]', err); destroy(); });
    } catch (err) {
      console.error('[booyah-burst]', err);
      destroy();
    }
  }

  window.__booyahBurst = { destroy: destroy };
  window.BooyahBurst = window.__booyahBurst;
  if (document.body) init();
  else document.addEventListener('DOMContentLoaded', init);
})();
