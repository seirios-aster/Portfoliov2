// Shared, non-React state read by the 3D scene every frame (no re-renders).
export const SECTION_IDS = ["top", "about", "experience", "skills", "projects", "contact"];

export const scrollState = {
  section: 0, // float: 2.5 = halfway through the 3rd section
  progress: 0, // 0..1 over the whole page
};

export const pointer = { x: 0, y: 0 }; // -1..1, from the window (canvas ignores pointer events)

let lenis = null;
export const setLenis = (instance) => {
  lenis = instance;
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const scrollToId = (id) => {
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(id === "top" ? 0 : el, { offset: 0, duration: 1.4 });
  else window.scrollTo({ top: id === "top" ? 0 : el.getBoundingClientRect().top + window.scrollY, behavior: prefersReducedMotion() ? "auto" : "smooth" });
};

// Which section is under the middle of the viewport, as a float.
export const updateScrollState = () => {
  const mid = window.innerHeight * 0.5;
  let section = 0;
  for (let i = 0; i < SECTION_IDS.length; i++) {
    const el = document.getElementById(SECTION_IDS[i]);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.top <= mid) {
      section = i + Math.min(1, Math.max(0, (mid - r.top) / Math.max(1, r.height)));
    }
  }
  scrollState.section = Math.min(SECTION_IDS.length - 1, section);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollState.progress = max > 0 ? window.scrollY / max : 0;
};
