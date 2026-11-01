import { useState } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { CTA } from "../components";
import { education, experiences, name, profile, skillGroups } from "../constants";

const tabs = [
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Tech Stack" },
];

const Skills = () => (
  <div className='py-4'>
    {skillGroups.map((group) => (
      <div className='py-4 bg-gray-100 rounded-xl shadow-xl mb-4' key={group.label}>
        <h2 className='px-4 text-2xl'>{group.label}</h2>
        {group.tiles && (
          <ul className='mt-4 px-4 pb-12 flex flex-wrap gap-x-8 gap-y-14 md:gap-x-10 justify-center md:justify-start'>
            {group.tiles.map((skill) => (
              <li className='block-container w-20 h-20 flex justify-center' key={skill.name}>
                <span className='absolute left-1/2 top-[calc(100%+6px)] z-10 w-28 -translate-x-1/2 text-center text-xs leading-tight'>{skill.name}</span>
                <div className='btn-back rounded-xl' />
                <div className='btn-front rounded-xl flex justify-center items-center'>
                  <img src={skill.icon} alt={skill.name} className='w-1/2 h-1/2 object-contain' title={skill.name} />
                </div>
              </li>
            ))}
          </ul>
        )}
        {group.chips && (
          <ul className={`px-4 flex flex-wrap gap-2 ${group.tiles ? "mt-10" : "mt-4"}`}>
            {group.chips.map((chip) => (
              <li key={chip} className='rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-600'>
                {chip}
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);

const Experience = () => (
  <div className='py-6'>
    <div className='mt-12 flex'>
      <VerticalTimeline>
        {experiences.map((experience) => (
          <VerticalTimelineElement
            key={experience.company_name + experience.date}
            date={experience.date}
            iconStyle={{ background: experience.iconBg }}
            icon={
              <div className='flex justify-center items-center w-full h-full'>
                {experience.icon ? (
                  <img src={experience.icon} alt={experience.company_name} className='w-[60%] h-[60%] object-contain' />
                ) : (
                  <span className='font-bold text-black-500 text-sm'>{experience.initials}</span>
                )}
              </div>
            }
            contentStyle={{
              borderBottom: "8px",
              borderStyle: "solid",
              borderBottomColor: experience.iconBg,
              boxShadow: "none",
            }}
          >
            <h3 className='text-black text-xl font-poppins font-semibold'>{experience.title}</h3>
            <p className='text-black-500 font-medium text-base' style={{ margin: 0 }}>
              {experience.company_name}
              {experience.note && <span className='font-normal text-slate-500'> ({experience.note})</span>}
            </p>
            <ul className='my-5 list-disc ml-5 space-y-2'>
              {experience.points.map((point) => (
                <li key={point} className='text-black-500/70 font-normal pl-1 text-sm'>
                  {point}
                </li>
              ))}
            </ul>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>

    <div className='mt-12 text-center'>
      <h3 className='font-poppins font-semibold text-xl'>Education</h3>
      <p className='mt-2'>
        {education.degree} · <span className='text-slate-500'>{education.school}</span>
      </p>
      <p className='text-sm text-slate-500'>{education.date}</p>
    </div>
  </div>
);

const About = () => {
  const [tab, setTab] = useState("experience");

  return (
    <section className='max-container'>
      <h1 className='head-text'>
        Hello, I'm <span className='blue-gradient_text font-semibold drop-shadow'>{name.first}</span> 👋
      </h1>

      <div className='mt-5 flex flex-col gap-4 text-slate-500'>
        <p>{profile.summary}</p>
        <div>
          <a href={profile.cv} download className='btn'>
            Download CV
          </a>
        </div>
      </div>

      <div className='py-10 flex flex-col'>
        <div className='flex flex-row justify-evenly items-baseline' role='tablist' aria-label='About sections'>
          {tabs.map((t, index) => (
            <div key={t.id} className='contents'>
              <button
                type='button'
                role='tab'
                aria-selected={tab === t.id}
                className={`${tab === t.id ? "text-red-400" : "hover:text-red-400"} subhead-text`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
              {index === 0 && (
                <span className='text-gray-500 text-lg' aria-hidden='true'>
                  |
                </span>
              )}
            </div>
          ))}
        </div>

        <div role='tabpanel'>{tab === "experience" ? <Experience /> : <Skills />}</div>
      </div>

      <hr className='border-slate-200' />
      <CTA />
    </section>
  );
};

export default About;
