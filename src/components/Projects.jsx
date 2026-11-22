import { projects } from "../constants";
import { ArrowUpRight, GitHub } from "./Icons";
import { Reveal, SectionHeading } from "./Reveal";
import TiltCard from "./TiltCard";

const Links = ({ p }) => (
  <div className='mt-6 flex flex-wrap gap-3'>
    {p.live && (
      <a href={p.live} target='_blank' rel='noopener noreferrer' className='btn-primary !px-4 !py-2 text-sm'>
        Live demo <ArrowUpRight width={16} height={16} />
      </a>
    )}
    {p.link && (
      <a href={p.link} target='_blank' rel='noopener noreferrer' className='btn-ghost !px-4 !py-2 text-sm'>
        <GitHub width={16} height={16} /> Code
      </a>
    )}
  </div>
);

const Tags = ({ tags }) => (
  <ul className='mt-5 flex flex-wrap gap-2' aria-label='Built with'>
    {tags.map((t) => (
      <li key={t} className='chip'>
        {t}
      </li>
    ))}
  </ul>
);

const GeneratedCover = ({ p }) => (
  <div className='relative h-full w-full overflow-hidden' style={{ background: `linear-gradient(135deg, ${p.accent[0]}, ${p.accent[1]})` }}>
    <div className='cover-grid absolute inset-0 opacity-30' />
    <div className='absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/25 blur-2xl' />
    <span className='absolute bottom-4 left-5 font-display text-6xl font-bold tracking-tight text-white/90 drop-shadow-lg'>{p.monogram}</span>
  </div>
);

const Featured = ({ p, i }) => (
  <Reveal delay={i * 0.1}>
    <TiltCard className='card group h-full !p-0'>
      <div className='relative aspect-[2/1] overflow-hidden rounded-t-[1.4rem] bg-ink-soft'>
        <img src={p.cover} alt={`Screenshot of ${p.name}`} className='h-full w-full object-cover transition duration-700 group-hover:scale-105' loading='lazy' />
        <div className='absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent' />
        <span className='glass absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white'>{p.kicker}</span>
      </div>
      <div className='p-6 sm:p-8'>
        <h3 className='font-display text-2xl font-semibold text-white sm:text-3xl'>{p.name}</h3>
        <p className='mt-3 leading-relaxed text-white/65'>{p.description}</p>
        <Tags tags={p.tags} />
        <Links p={p} />
      </div>
    </TiltCard>
  </Reveal>
);

const Small = ({ p, i }) => (
  <Reveal delay={i * 0.08}>
    <TiltCard className='card group flex h-full flex-col !p-0'>
      <div className='aspect-[16/8] overflow-hidden rounded-t-[1.4rem]'>
        <GeneratedCover p={p} />
      </div>
      <div className='flex flex-1 flex-col p-6'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-white/45'>{p.kicker}</p>
        <h3 className='mt-2 font-display text-xl font-semibold text-white'>{p.name}</h3>
        <p className='mt-2 flex-1 text-sm leading-relaxed text-white/60'>{p.description}</p>
        <Tags tags={p.tags} />
        <Links p={p} />
      </div>
    </TiltCard>
  </Reveal>
);

const Projects = () => {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <section id='projects' className='section' aria-labelledby='projects-title'>
      <div className='container-page'>
        <SectionHeading index={4} eyebrow='Projects' title={<span id='projects-title'>Selected</span>} accent='work'>
          Things I've built outside work: a 3D multiplayer world, a mobile app and a few open-source references.
        </SectionHeading>
        <div className='grid gap-6 lg:grid-cols-2'>
          {featured.map((p, i) => (
            <Featured key={p.name} p={p} i={i} />
          ))}
        </div>
        <div className='mt-6 grid gap-6 md:grid-cols-3'>
          {rest.map((p, i) => (
            <Small key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
