import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 32, className = "", as = "div", ...rest }) => {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </M>
  );
};

export const SectionHeading = ({ index, eyebrow, title, accent, children }) => (
  <div className='mb-14 sm:mb-20'>
    <Reveal>
      <p className='eyebrow'>
        <span className='text-white/40'>{String(index).padStart(2, "0")}</span>
        <span className='mx-3 inline-block h-px w-10 bg-white/25 align-middle' />
        {eyebrow}
      </p>
    </Reveal>
    <Reveal delay={0.08}>
      <h2 className='section-title'>
        {title} {accent && <span className='text-gradient'>{accent}</span>}
      </h2>
    </Reveal>
    {children && (
      <Reveal delay={0.16}>
        <p className='mt-6 max-w-2xl text-lg leading-relaxed text-white/60'>{children}</p>
      </Reveal>
    )}
  </div>
);
