import { CTA } from "../components";
import { projects } from "../constants";
import { arrow } from "../assets/icons";

const Projects = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>
        My{" "}
        <span className='blue-gradient_text drop-shadow font-semibold'>
          Projects
        </span>
      </h1>

      <p className='text-slate-500 mt-2 leading-relaxed'>
        Personal and open-source work. If something piques your interest, feel
        free to explore the code and share ideas for improvement.
      </p>

      <div className='flex flex-wrap my-20 gap-16'>
        {projects.map((project) => (
          <div className='lg:w-[400px] w-full' key={project.name}>
            <div className='block-container w-12 h-12'>
              <div className={`btn-back rounded-xl ${project.theme}`} />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                  src={project.iconUrl}
                  alt=''
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>

            <div className='mt-5 flex flex-col'>
              <h4 className='text-2xl font-poppins font-semibold'>
                {project.name}
              </h4>
              <p className='mt-2 text-slate-500'>{project.description}</p>
              <ul className='mt-3 flex flex-wrap gap-2'>
                {project.tags.map((tag) => (
                  <li key={tag} className='rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-600'>
                    {tag}
                  </li>
                ))}
              </ul>
              {(project.live || project.link) && (
                <div className='mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-poppins'>
                  {project.live && (
                    <a
                      href={project.live}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 font-semibold text-blue-600'
                    >
                      Live demo
                      <img src={arrow} alt='' className='w-4 h-4 object-contain' />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 font-semibold text-blue-600'
                    >
                      View on GitHub
                      <img src={arrow} alt='' className='w-4 h-4 object-contain' />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <hr className='border-slate-200' />

      <CTA />
    </section>
  );
};

export default Projects;
