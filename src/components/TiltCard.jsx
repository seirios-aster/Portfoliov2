import { useRef } from "react";

import { prefersReducedMotion } from "../lib/scroll";

// Perspective tilt + moving glare that follows the pointer (mouse/pen only).
const TiltCard = ({ children, className = "", max = 8 }) => {
  const ref = useRef(null);

  const onMove = (e) => {
    if (e.pointerType === "touch" || prefersReducedMotion()) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(1100px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateZ(0)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const reset = () => {
    const el = ref.current;
    el.style.transform = "";
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={`tilt ${className}`}>
      {children}
      <div className='tilt-glare' aria-hidden='true' />
    </div>
  );
};

export default TiltCard;
