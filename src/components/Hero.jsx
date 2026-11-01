import { profile } from "../data";

const Hero = () => (
  <section id="top" className="relative overflow-hidden bg-ink pt-32 pb-20 text-white sm:pt-40 sm:pb-28">
    <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand/30 blur-3xl" />
    <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-brand-light/10 blur-3xl" />

    <div className="container-page relative">
      <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-brand-light">
        <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
        Open to new opportunities
      </p>
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">{profile.name}</h1>
      <p className="mt-4 text-xl font-semibold text-brand-light sm:text-2xl">{profile.role}</p>
      <p className="mt-2 text-slate-300">{profile.stack.join(" · ")}</p>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
        I build web applications and APIs end to end, from the database and API to the UI, with 4+ years of experience shipping to production.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#contact" className="btn-primary">Get in touch</a>
        <a href={profile.cv} download className="btn border border-white/25 text-white hover:bg-white/10">
          Download CV
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn border border-white/25 text-white hover:bg-white/10">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn border border-white/25 text-white hover:bg-white/10">
          LinkedIn
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
