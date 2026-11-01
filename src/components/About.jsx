import { education, profile } from "../data";
import Reveal from "./Reveal";

const stats = [
  { value: "4+", label: "Years of experience" },
  { value: "4", label: "Companies" },
  { value: "E2E", label: "DB → API → UI" },
];

const About = () => (
  <section id="about" className="section">
    <div className="container-page">
      <Reveal>
        <p className="eyebrow">About</p>
        <h2 className="heading">Building things end to end</h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed">{profile.summary}</p>
      </Reveal>

      <Reveal className="mt-10 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="card text-center">
            <p className="text-3xl font-extrabold text-brand dark:text-brand-light">{s.value}</p>
            <p className="mt-1 text-sm">{s.label}</p>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-10">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Education</h3>
        <p className="mt-2 font-semibold text-slate-900 dark:text-white">
          {education.degree} <span className="font-normal text-slate-500">· {education.school}</span>
        </p>
        <p className="text-sm text-slate-500">{education.date}</p>
      </Reveal>
    </div>
  </section>
);

export default About;
