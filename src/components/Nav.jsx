import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { navLinks, profile } from "../constants";
import { scrollToId } from "../lib/scroll";
import { Close, Download, Menu } from "./Icons";

const useActiveSection = () => {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const ids = ["top", ...navLinks.map((l) => l.id)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
};

const go = (e, id, after) => {
  e.preventDefault();
  scrollToId(id);
  history.replaceState(null, "", id === "top" ? "/" : `#${id}`);
  after?.();
};

const Nav = () => {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? "border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl" : ""}`}
      >
        <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 ${scrolled ? "py-3" : "py-5"}`}>
          <a href='/' onClick={(e) => go(e, "top")} className='group flex items-center gap-3' aria-label={`${profile.firstName} ${profile.lastName}, back to top`}>
            <span className='grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 font-display text-sm font-bold text-white backdrop-blur-md transition group-hover:border-white/40'>
              RP
            </span>
            <span className='hidden font-display text-sm font-semibold tracking-wide text-white/80 sm:block'>
              {profile.firstName} {profile.lastName}
            </span>
          </a>

          <nav aria-label='Primary' className='glass hidden items-center gap-1 rounded-full p-1.5 md:flex'>
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                aria-current={active === l.id ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${active === l.id ? "text-white" : "text-white/60 hover:text-white"}`}
              >
                {active === l.id && (
                  <motion.span layoutId='nav-pill' className='absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/15' transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className='relative'>{l.label}</span>
              </a>
            ))}
          </nav>

          <div className='flex items-center gap-2'>
            <a href={profile.cv} download className='btn-ghost hidden sm:inline-flex'>
              <Download width={16} height={16} /> CV
            </a>
            <button
              type='button'
              onClick={() => setOpen(true)}
              className='glass grid h-11 w-11 place-items-center rounded-full text-white md:hidden'
              aria-label='Open menu'
              aria-expanded={open}
              aria-controls='mobile-menu'
            >
              <Menu />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id='mobile-menu'
            role='dialog'
            aria-modal='true'
            aria-label='Menu'
            className='fixed inset-0 z-[60] flex flex-col bg-ink/90 px-6 pb-10 pt-5 backdrop-blur-2xl md:hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className='flex justify-end'>
              <button type='button' onClick={() => setOpen(false)} className='glass grid h-11 w-11 place-items-center rounded-full text-white' aria-label='Close menu' autoFocus>
                <Close />
              </button>
            </div>
            <nav aria-label='Mobile' className='mt-10 flex flex-1 flex-col gap-2'>
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={(e) => go(e, l.id, () => setOpen(false))}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className='flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-4xl font-semibold text-white'
                >
                  <span className='text-sm text-white/40'>0{i + 1}</span>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <a href={profile.cv} download className='btn-primary justify-center'>
              <Download width={18} height={18} /> Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
