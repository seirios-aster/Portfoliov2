import { motion, useScroll, useTransform } from "framer-motion";

import { experiences, profile } from "../constants";
import { scrollToId } from "../lib/scroll";
import { ArrowUpRight, Download, GitHub, LinkedIn } from "./Icons";

const ease = [0.22, 1, 0.36, 1];

const Line = ({ children, delay }) => (
  <span className='block overflow-hidden pb-[0.08em]'>
    <motion.span className='block' initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease, delay }}>
      {children}
    </motion.span>
  </span>
);

const fade = (delay) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease, delay } });

const Hero = () => {
  const current = experiences.find((e) => e.current);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -140]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section id='top' className='relative flex min-h-[100svh] items-center' aria-label='Introduction'>
      <motion.div style={{ y, opacity }} className='container-page relative z-10 pb-24 pt-32'>
        <motion.p {...fade(0.3)} className='glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium tracking-wide text-white/80 sm:text-sm'>
          <span className='relative flex h-2 w-2'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60' />
            <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-400' />
          </span>
          {profile.firstName} {profile.lastName} · {profile.role}
        </motion.p>

        <h1 className='mt-8 font-display text-[clamp(2.75rem,8.5vw,7.25rem)] font-bold leading-[0.95] tracking-tight text-white'>
          <Line delay={0.45}>Building web apps</Line>
          <Line delay={0.58}>
            <span className='text-gradient'>end to end,</span>
          </Line>
          <Line delay={0.71}>
            <span className='text-white/45'>database to UI.</span>
          </Line>
        </h1>

        <motion.p {...fade(1.0)} className='mt-8 max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl'>
          4+ years shipping {profile.stack.join(", ").replace(/, ([^,]*)$/, " and $1")} to production.
          {current && (
            <>
              {" "}Currently a {current.title.toLowerCase()} at <span className='text-white'>{current.company}</span>.
            </>
          )}
        </motion.p>

        <motion.div {...fade(1.15)} className='mt-10 flex flex-wrap items-center gap-3'>
          <a
            href='#projects'
            onClick={(e) => {
              e.preventDefault();
              scrollToId("projects");
            }}
            className='btn-primary'
          >
            View my work <ArrowUpRight width={18} height={18} />
          </a>
          <a href={profile.cv} download className='btn-ghost'>
            <Download width={18} height={18} /> Download CV
          </a>
          <span className='mx-1 hidden h-6 w-px bg-white/15 sm:block' />
          <a href={profile.github} target='_blank' rel='noopener noreferrer' className='icon-btn' aria-label='GitHub'>
            <GitHub />
          </a>
          <a href={profile.linkedin} target='_blank' rel='noopener noreferrer' className='icon-btn' aria-label='LinkedIn'>
            <LinkedIn />
          </a>
        </motion.div>
      </motion.div>

      <motion.button
        type='button'
        onClick={() => scrollToId("about")}
        {...fade(1.5)}
        className='absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50 hover:text-white'
        aria-label='Scroll to About'
      >
        Scroll
        <span className='grid h-10 w-6 justify-center rounded-full border border-white/25 pt-2'>
          <span className='scroll-dot h-2 w-1 rounded-full bg-white/70' />
        </span>
      </motion.button>
    </section>
  );
};

export default Hero;
