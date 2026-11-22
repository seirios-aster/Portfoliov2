import { allSkills } from "../constants";

const Row = ({ hidden }) => (
  <ul className='flex shrink-0 items-center gap-10 pr-10' aria-hidden={hidden || undefined}>
    {allSkills.map((s) => (
      <li key={s.name} className='flex items-center gap-3 whitespace-nowrap font-display text-xl font-medium text-white/55 sm:text-2xl'>
        <img src={s.icon} alt='' className='h-7 w-7 rounded-md bg-white/90 object-contain p-1' loading='lazy' />
        {s.name}
        <span className='ml-7 text-white/20'>✦</span>
      </li>
    ))}
  </ul>
);

const Marquee = () => (
  <div className='relative z-10 border-y border-white/10 bg-white/[0.02] py-6 backdrop-blur-sm' aria-label='Technologies I use'>
    <div className='marquee-mask flex overflow-hidden'>
      <div className='marquee-track flex'>
        <Row />
        <Row hidden />
      </div>
    </div>
  </div>
);

export default Marquee;
