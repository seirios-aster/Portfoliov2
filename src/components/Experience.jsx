import { experiences } from "../data";
import Reveal from "./Reveal";

const Experience = () => (
  <section id="experience" className="section bg-slate-50 dark:bg-ink-soft/40">
    <div className="container-page">
      <Reveal>
        <p className="eyebrow">Experience</p>
        <h2 className="heading">Where I've worked</h2>
      </Reveal>

      <ol className="relative mt-12 space-y-10 border-l border-slate-300 pl-6 dark:border-slate-600 sm:pl-8">
        {experiences.map((job, i) => (
          <Reveal as="li" key={job.company + job.date} className="relative">
            <span
              aria-hidden="true"
              className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-white sm:-left-[39px] dark:border-ink ${
                i === 0 ? "bg-brand ring-4 ring-brand/25" : "bg-slate-400 dark:bg-slate-500"
              }`}
            />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {job.title} <span className="text-brand dark:text-brand-light">· {job.company}</span>
                {job.note && <span className="ml-2 text-sm font-normal text-slate-500">({job.note})</span>}
              </h3>
              <p className="shrink-0 text-sm text-slate-500">{job.date}</p>
            </div>
            <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-brand">
              {job.points.map((p) => (
                <li key={p} className="leading-relaxed">{p}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export default Experience;
