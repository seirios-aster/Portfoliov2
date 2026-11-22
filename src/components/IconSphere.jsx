import { useEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "../lib/scroll";

// A rotating sphere of icons rendered with plain DOM + CSS transforms (no WebGL),
// so it stays crisp and cheap. Hover/drag steers it; it pauses when off screen.
const IconSphere = ({ items }) => {
  const wrap = useRef(null);
  const nodes = useRef([]);
  const [label, setLabel] = useState(null);
  const [coarse] = useState(() => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches);

  useEffect(() => {
    const el = wrap.current;
    const n = items.length;
    // Even distribution on a sphere (Fibonacci lattice).
    const pts = items.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = Math.PI * (3 - Math.sqrt(5)) * i;
      return [Math.cos(th) * r, y, Math.sin(th) * r];
    });

    let radius = el.clientWidth * 0.38;
    const ro = new ResizeObserver(() => (radius = el.clientWidth * 0.38));
    ro.observe(el);

    const idle = { x: 0.12, y: 0.22 }; // rad/s
    const vel = { ...idle };
    const target = { ...idle };
    let running = false;
    let raf = 0;
    let last = 0;

    const draw = () => {
      for (let i = 0; i < n; i++) {
        const [x, y, z] = pts[i];
        const node = nodes.current[i];
        if (!node) continue;
        const depth = (z + 1) / 2; // 0 back .. 1 front
        node.style.transform = `translate3d(${x * radius}px, ${y * radius}px, 0) scale(${0.5 + depth * 0.55})`;
        node.style.opacity = String(0.25 + depth * 0.75);
        node.style.zIndex = String(Math.round(depth * 100));
        node.style.filter = depth < 0.35 ? `blur(${(0.35 - depth) * 4}px)` : "none";
      }
    };

    const rotate = (ax, ay) => {
      const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);
      for (const p of pts) {
        const [x, y, z] = p;
        const y1 = y * cx - z * sx;
        const z1 = y * sx + z * cx;
        p[0] = x * cy + z1 * sy;
        p[1] = y1;
        p[2] = -x * sy + z1 * cy;
      }
    };

    const tick = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016);
      last = t;
      vel.x += (target.x - vel.x) * Math.min(1, dt * 4);
      vel.y += (target.y - vel.y) * Math.min(1, dt * 4);
      rotate(vel.x * dt, vel.y * dt);
      draw();
      if (running) raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || prefersReducedMotion()) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width) * 2 - 1;
      const py = ((e.clientY - r.top) / r.height) * 2 - 1;
      target.y = px * 1.6;
      target.x = -py * 1.6;
    };
    const onLeave = () => Object.assign(target, idle);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(el);
    draw();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [items]);

  return (
    <div className='relative mx-auto w-full max-w-[540px]'>
      <div ref={wrap} className='relative aspect-square w-full select-none' style={{ touchAction: "pan-y" }} aria-hidden='true'>
        <div className='absolute inset-[18%] rounded-full bg-gradient-to-br from-violet-500/25 via-cyan-400/10 to-pink-500/20 blur-3xl' />
        <div className='absolute inset-[11%] rounded-full border border-white/[0.07]' />
        {items.map((it, i) => (
          <div
            key={it.name}
            ref={(n) => (nodes.current[i] = n)}
            className='absolute left-1/2 top-1/2 -ml-6 -mt-6 h-12 w-12 will-change-transform sm:-ml-7 sm:-mt-7 sm:h-14 sm:w-14'
            onPointerEnter={() => setLabel(it.name)}
            onPointerLeave={() => setLabel(null)}
          >
            <div className='h-full w-full rounded-2xl bg-white p-2 shadow-xl shadow-black/40 ring-1 ring-white/20 transition-transform duration-200 hover:scale-125 sm:p-2.5'>
              <img src={it.icon} alt='' className='h-full w-full object-contain' draggable={false} />
            </div>
          </div>
        ))}
      </div>
      <p className='mt-2 h-6 text-center text-sm font-medium text-white/60' aria-hidden='true'>
        {label ?? (coarse ? "Drag across the sphere to spin it" : "Move your cursor over the sphere")}
      </p>
    </div>
  );
};

export default IconSphere;
