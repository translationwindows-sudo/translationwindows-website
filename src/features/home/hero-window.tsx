"use client";

import { useEffect, useRef } from "react";

import { Reveal } from "./reveal";

const PAIRS: [string, string][] = [
  ["こんにちは", "Hello"],
  ["مرحبا", "Welcome"],
  ["你好", "Welcome"],
  ["Здравствуйте", "Hello"],
  ["Gracias", "Thank you"],
  ["愛", "Love"],
  ["Bonjour", "Hello"],
  ["감사합니다", "Thank you"],
];
const GLYPHS = "你好مرحباनमस्तेこんにちは한국어ПриветOláÑéàüßΩשלוםไทย中文".split("");
const LATIN = "ABCDEFGHKLMNOPRSTW";

type Particle = {
  x: number; y: number; vx: number; vy: number;
  g: string; s: number; a: number; hot: number; seek: number;
};

/** The Language Window hero: living portal + glyph field + parallax. */
export function HeroWindow() {
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const inRef = useRef<HTMLSpanElement | null>(null);
  const outRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = heroRef.current, cv = canvasRef.current, frame = frameRef.current;
    const pin = inRef.current, pout = outRef.current, portal = portalRef.current;
    if (!hero || !cv || !frame || !pin || !pout || !portal) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    /* ── portal cycle ── */
    let pi = 0;
    const cycle = () => {
      const p = PAIRS[pi % PAIRS.length];
      pi += 1;
      pin.textContent = p[0];
      pout.textContent = p[1];
      pin.classList.remove("run");
      pout.classList.remove("run");
      void pin.offsetWidth;
      pin.classList.add("run");
      pout.classList.add("run");
      window.setTimeout(() => frame.classList.add("hot"), 1400);
      window.setTimeout(() => frame.classList.remove("hot"), 2800);
    };
    let interval: number | undefined;
    if (!reduced) {
      cycle();
      interval = window.setInterval(cycle, 4200);
    } else {
      pin.style.opacity = "1";
      pout.style.opacity = "1";
    }

    /* ── parallax ── */
    const onMove = (e: MouseEvent) => {
      if (reduced) return;
      const px = e.clientX / window.innerWidth - 0.5;
      const py = e.clientY / window.innerHeight - 0.5;
      portal.style.transform = `translate(${px * 10}px,${py * 7}px)`;
    };
    const onLeave = () => { portal.style.transform = ""; };
    hero.addEventListener("mousemove", onMove, { passive: true });
    hero.addEventListener("mouseleave", onLeave);

    /* ── glyph field ── */
    let W = 0, H = 0;
    let target = { x: 0, y: 0, r: 0 };
    let mx = -1e4, my = -1e4, scrollPull = 0, running = true, raf = 0;
    const d = () => window.devicePixelRatio || 1;

    const size = () => {
      W = cv.width = cv.offsetWidth * d();
      H = cv.height = cv.offsetHeight * d();
      const f = frame.getBoundingClientRect();
      const h = hero.getBoundingClientRect();
      target = {
        x: (f.left - h.left + f.width / 2) * d(),
        y: (f.top - h.top + f.height / 2) * d(),
        r: Math.max(f.width, f.height) * d() * 0.55,
      };
    };
    const spawn = (edge: boolean): Particle => ({
      x: edge ? (Math.random() < 0.5 ? -30 : W + 30) : Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4 * d(),
      vy: (Math.random() - 0.5) * 0.22 * d(),
      g: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      s: (13 + Math.random() * 12) * d(),
      a: 0.09 + Math.random() * 0.15,
      hot: 0,
      seek: Math.random() < 0.16 ? 1 : 0,
    });
    size();
    const parts: Particle[] = [];
    for (let i = 0; i < 46; i += 1) parts.push(spawn(false));

    const onHeroMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) * d();
      my = (e.clientY - r.top) * d();
    };
    const onHeroLeave = () => { mx = -1e4; my = -1e4; };
    const onScroll = () => {
      scrollPull = Math.min(window.scrollY / (window.innerHeight * 0.9), 1);
    };
    hero.addEventListener("mousemove", onHeroMove, { passive: true });
    hero.addEventListener("mouseleave", onHeroLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", size);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const dd = d();
      parts.forEach((p) => {
        const dxm = p.x - mx, dym = p.y - my;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        if (dm < 240 * dd) {
          const dx = target.x - p.x, dy = target.y - p.y;
          const dt = Math.sqrt(dx * dx + dy * dy) || 1;
          const pull = (1 - dm / (240 * dd)) * 0.045 * dd;
          p.vx += (dx / dt) * pull;
          p.vy += (dy / dt) * pull;
        }
        if (p.seek && !p.hot) {
          const sx = target.x - p.x, sy = target.y - p.y;
          const st = Math.sqrt(sx * sx + sy * sy) || 1;
          p.vx += (sx / st) * 0.014 * dd;
          p.vy += (sy / st) * 0.014 * dd;
        }
        if (scrollPull > 0) {
          const fx = W / 2 - p.x, fy = H + 120 * dd - p.y;
          const ft = Math.sqrt(fx * fx + fy * fy) || 1;
          p.vx += (fx / ft) * scrollPull * 0.09 * dd;
          p.vy += (fy / ft) * scrollPull * 0.16 * dd;
        }
        p.vx *= 0.982;
        p.vy *= 0.982;
        const sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const cap = 1.4 * dd;
        if (sp > cap) { p.vx = (p.vx / sp) * cap; p.vy = (p.vy / sp) * cap; }
        p.x += p.vx;
        p.y += p.vy + Math.sin(p.x * 0.002 + p.s) * 0.12;
        const din = Math.hypot(p.x - target.x, p.y - target.y);
        if (din < target.r && !p.hot) {
          p.hot = 1; p.seek = 0;
          p.g = LATIN[Math.floor(Math.random() * LATIN.length)];
          p.vx = Math.abs(p.vx) + 0.35 * dd;
          p.vy *= 0.4;
        }
        if (din > target.r * 2.6) p.hot = 0;
        ctx.font = `${p.hot ? "600 " : "400 "}${p.s}px var(--font-display), sans-serif`;
        ctx.fillStyle = p.hot ? "#E8492A" : "#141419";
        ctx.globalAlpha = (p.hot ? Math.min(p.a * 2.6, 0.62) : p.a) * (1 - scrollPull * 0.35);
        ctx.fillText(p.g, p.x, p.y);
        if (p.x < -60 || p.x > W + 60 || p.y > H + 60 || p.y < -60) {
          Object.assign(p, spawn(true), { y: Math.random() * H * 0.5 });
        }
      });
      ctx.globalAlpha = 1;
      if (running && !reduced) raf = requestAnimationFrame(draw);
    };
    const vio = new IntersectionObserver((es) => {
      running = es[0].isIntersecting;
      if (running && !reduced) raf = requestAnimationFrame(draw);
    });
    vio.observe(hero);
    if (!reduced) raf = requestAnimationFrame(draw);
    else draw();

    return () => {
      if (interval) window.clearInterval(interval);
      cancelAnimationFrame(raf);
      vio.disconnect();
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      hero.removeEventListener("mousemove", onHeroMove);
      hero.removeEventListener("mouseleave", onHeroLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", size);
    };
  }, []);

  return (
    <header className="hero" ref={heroRef}>
      <canvas className="lang-canvas" ref={canvasRef} aria-hidden />
      <div className="hero-inner">
        <Reveal as="span" className="hero-eyebrow">
          <span className="dot" /> Global language solutions &middot; EST. 2017
        </Reveal>
        <Reveal delay={1}>
          <h1>
            Every language passes
            <br />
            through <span className="winword">one window</span>.
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <div className="portal" ref={portalRef} aria-hidden>
            <div className="p-in"><span ref={inRef}>こんにちは</span></div>
            <div className="p-frame" ref={frameRef}>
              <div className="sheen" />
              <div className="psill" />
            </div>
            <div className="p-out"><span ref={outRef}>Hello</span></div>
          </div>
        </Reveal>
        <Reveal delay={3}>
          <p className="hero-sub">Certified by native experts. Accepted worldwide.</p>
        </Reveal>
        <Reveal delay={4}>
          <div className="hero-ctas">
            <a className="btn-a" href="#start">
              Get your quote in under 60 seconds <span className="arr">→</span>
            </a>
            <a className="btn-b" href="#journey">Watch how it works</a>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
