import { Link } from "react-router-dom";
import { arrow, name, profile } from "../constants";

const stages = [
  {
    index: 2,
    description: (
      <>
        4+ years shipping .NET Core, Angular
        <br />
        and SQL Server to production
      </>
    ),
    route: "/about",
    routeLabel: "My experience",
  },
  {
    index: 3,
    description: (
      <>
        Clean Architecture, CQRS, microservices.
        <br />
        Curious what I've built?
      </>
    ),
    route: "/projects",
    routeLabel: "See my projects",
  },
  {
    index: 4,
    description: (
      <>
        Need a project done or looking for a dev?
        <br />
        I'm just a few keystrokes away
      </>
    ),
    route: "/contact",
    routeLabel: "Let's talk",
  },
];

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1) {
    return (
      <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        Hi, I'm
        <span className='font-semibold mx-2 text-white'>{name.first}</span>
        👋
        <br />
        {profile.role}
      </h1>
    );
  }

  const stage = stages.find((s) => s.index === currentStage);
  if (!stage) return null;

  return (
    <div className='info-box'>
      <p className='font-medium sm:text-xl text-center'>{stage.description}</p>
      <Link to={stage.route} className='neo-brutalism-white neo-btn'>
        {stage.routeLabel}
        <img src={arrow} alt='' className='w-4 h-4 object-contain' />
      </Link>
    </div>
  );
};

export default HomeInfo;
