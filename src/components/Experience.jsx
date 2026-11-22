import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { experiences } from "../constants";
import { Reveal, SectionHeading } from "./Reveal";

const Logo = ({ job }) => (
  <span className='grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/30'>
    {job.logo ? (
      <img src={job.logo} alt='' className='h-9 w-9 object-contain' loading='lazy' />
    ) : (
      <span className='font-display text-sm font-bold text-ink'>{job.initials}</span>
    )}
  </span>
);

const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const beam = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id='experience' className='section' aria-labelledby='experience-title'>
      <div className='container-page grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]'>
        <div className='lg:sticky lg:top-28 lg:self-start'>
          <SectionHeading index={2} eyebrow='Experience' title={<span id='experience-title'>Where I've</span>} accent='worked'>
            Four companies since 2022, from a Philippine startup to a US product team. Mostly .NET Core, Angular and SQL Server, owning features from the database to the UI.
          </SectionHeading>
        </div>

        <div ref={ref} className='relative pl-8 sm:pl-12'>
          <div className='absolute bottom-2 left-[11px] top-2 w-px bg-white/10 sm:left-[15px]' aria-hidden='true' />
          <motion.div
            style={{ scaleY: beam }}
            className='absolute bottom-2 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-cyan-300 via-violet-400 to-pink-400 shadow-[0_0_12px_rgba(167,139,250,0.8)] sm:left-[15px]'
            aria-hidden='true'
          />
          <ol className='space-y-8'>
            {experiences.map((job, i) => (
              <Reveal as='li' key={job.company + job.date} delay={i * 0.04} className='relative'>
                <span
                  aria-hidden='true'
                  className={`absolute -left-8 top-7 grid h-6 w-6 place-items-center rounded-full border sm:-left-12 sm:h-8 sm:w-8 ${
                    job.current ? "border-cyan-300/60 bg-cyan-300/15" : "border-white/20 bg-ink"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${job.current ? "bg-cyan-300 shadow-[0_0_10px_#67e8f9]" : "bg-white/50"}`} />
                </span>

                <article className='card group transition duration-500 hover:border-white/25 hover:bg-white/[0.07]'>
                  <div className='flex items-start gap-4'>
                    <Logo job={job} />
                    <div className='min-w-0 flex-1'>
                      <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                        <h3 className='font-display text-xl font-semibold text-white'>{job.title}</h3>
                        {job.current && <span className='rounded-full bg-cyan-300/15 px-2.5 py-0.5 text-xs font-semibold text-cyan-200'>Now</span>}
                      </div>
                      <p className='text-white/65'>
                        {job.company}
                        {job.note && <span className='text-white/40'> · {job.note}</span>}
                      </p>
                      <p className='mt-2 inline-block rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white/60 sm:hidden'>{job.date}</p>
                    </div>
                    <p className='hidden shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white/60 sm:block'>{job.date}</p>
                  </div>
                  <ul className='mt-5 space-y-2.5'>
                    {job.points.map((p) => (
                      <li key={p} className='flex gap-3 leading-relaxed text-white/65'>
                        <span className='mt-2.5 h-1 w-1 shrink-0 rounded-full bg-violet-300' aria-hidden='true' />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <ul className='mt-5 flex flex-wrap gap-2' aria-label='Technologies'>
                    {job.tags.map((t) => (
                      <li key={t} className='chip'>
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
