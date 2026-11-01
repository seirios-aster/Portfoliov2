import { projects } from "../data";
import Reveal from "./Reveal";

const Projects = () => (
  <section id="projects" className="section bg-slate-50 dark:bg-ink-soft/40">
    <div className="container-page">
      <Reveal>
        <p className="eyebrow">Projects</p>
        <h2 className="heading">Things I've built</h2>
        <p className="mt-4 max-w-2xl">
          Personal and open-source work. Feel free to explore the code and share ideas for improvement.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <Reveal
            as="a"
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card group flex flex-col hover:-translate-y-1 hover:border-brand hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{p.name}</h3>
            <p className="mt-2 flex-1 leading-relaxed">{p.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <li key={t} className="chip">{t}</li>
              ))}
            </ul>
            <span className="mt-5 text-sm font-semibold text-brand group-hover:underline dark:text-brand-light">
              View on GitHub →
            </span>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
