import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { education, profile, stats } from "../constants";
import { Download } from "./Icons";
import { Reveal, SectionHeading } from "./Reveal";

// Each word brightens as the paragraph scrolls through the viewport.
const Word = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className='relative mr-[0.25em] inline-block'>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

const ScrollWords = ({ text }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className='font-display text-[clamp(1.5rem,3.2vw,2.75rem)] font-medium leading-[1.25] text-white'>
      <span className='sr-only'>{text}</span>
      <span aria-hidden='true'>
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </span>
    </p>
  );
};

const Counter = ({ value, suffix }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
};

const About = () => (
  <section id='about' className='section' aria-labelledby='about-title'>
    <div className='container-page'>
      <SectionHeading index={1} eyebrow='About' title={<span id='about-title'>A bit</span>} accent='about me' />
      <div className='max-w-4xl'>
        <ScrollWords text={profile.summary} />
      </div>

      <div className='mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className='card'>
            <p className='font-display text-5xl font-bold text-white sm:text-6xl'>
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className='mt-3 text-sm text-white/55'>{s.label}</p>
          </Reveal>
        ))}
        <Reveal delay={0.24} className='card flex flex-col justify-between'>
          <div>
            <p className='text-xs uppercase tracking-[0.2em] text-white/40'>Education</p>
            <p className='mt-3 font-display text-lg font-semibold text-white'>{education.degree}</p>
            <p className='text-sm text-white/55'>{education.school}</p>
            <p className='mt-1 text-sm text-white/40'>{education.date}</p>
          </div>
          <a href={profile.cv} download className='mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-white'>
            <Download width={16} height={16} /> Full CV (PDF)
          </a>
        </Reveal>
      </div>
    </div>
  </section>
);

export default About;
