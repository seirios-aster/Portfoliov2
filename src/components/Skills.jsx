import { allSkills, skillGroups } from "../constants";
import IconSphere from "./IconSphere";
import { Reveal, SectionHeading } from "./Reveal";

const Skills = () => (
  <section id='skills' className='section' aria-labelledby='skills-title'>
    <div className='container-page'>
      <SectionHeading index={3} eyebrow='Skills' title={<span id='skills-title'>What I</span>} accent='work with'>
        The stack behind my day-to-day work, from APIs and architecture patterns to CI/CD.
      </SectionHeading>

      <div className='grid items-center gap-12 lg:grid-cols-2'>
        <Reveal>
          <IconSphere items={allSkills} />
        </Reveal>

        <div className='grid gap-4 sm:grid-cols-2'>
          {skillGroups.map((g, i) => (
            <Reveal key={g.label} delay={(i % 2) * 0.08} className='card'>
              <h3 className='text-xs font-semibold uppercase tracking-[0.2em] text-white/45'>{g.label}</h3>
              <ul className='mt-4 flex flex-wrap gap-2'>
                {g.items.map((s) => (
                  <li key={s.name} className='chip flex items-center gap-2'>
                    <img src={s.icon} alt='' className='h-4 w-4 rounded-sm bg-white object-contain' loading='lazy' />
                    {s.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Skills;
