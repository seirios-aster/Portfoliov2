import { skills } from "../data";
import Reveal from "./Reveal";

const Skills = () => (
  <section id="skills" className="section">
    <div className="container-page">
      <Reveal>
        <p className="eyebrow">Technical skills</p>
        <h2 className="heading">What I work with</h2>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {skills.map((s) => (
          <Reveal key={s.group} className="card">
            <h3 className="font-semibold text-slate-900 dark:text-white">{s.group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.items.map((item) => (
                <li key={item} className="chip">{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
