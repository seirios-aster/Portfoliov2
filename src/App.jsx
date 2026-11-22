import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { useEffect } from "react";

import About from "./components/About";
import Background from "./components/Background";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Nav from "./components/Nav";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { pointer, prefersReducedMotion, scrollToId, setLenis, updateScrollState } from "./lib/scroll";

// Old multi-page URLs (/about, /projects, /contact) now land on their section.
const LEGACY_ROUTES = { "/about": "about", "/projects": "projects", "/contact": "contact" };

const useSmoothScroll = () => {
  useEffect(() => {
    let lenis = null;
    let raf = 0;
    if (!prefersReducedMotion()) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      setLenis(lenis);
      lenis.on("scroll", updateScrollState);
      const loop = (t) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    updateScrollState();

    const onPointer = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const legacy = LEGACY_ROUTES[window.location.pathname.replace(/\/$/, "")];
    const target = legacy ?? window.location.hash.slice(1);
    if (legacy) history.replaceState(null, "", `/#${legacy}`);
    const t = target ? setTimeout(() => scrollToId(target), 350) : 0;

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      lenis?.destroy();
      setLenis(null);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);
};

const App = () => {
  useSmoothScroll();
  return (
    <MotionConfig reducedMotion='user'>
      <a href='#about' className='skip-link'>
        Skip to content
      </a>
      <Background />
      <Nav />
      <main className='relative z-10'>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
};

export default App;
