import { ducen, vpi, flatplanet } from "../assets/images";
import {
  angular,
  arrow,
  azure,
  azuredevops,
  blazor,
  car,
  contact,
  css,
  csharp,
  dotnetcore,
  estate,
  express,
  github,
  html,
  javascript,
  linkedin,
  mongodb,
  mssql,
  pricewise,
  react,
  snapgram,
  threads,
  typescript,
} from "../assets/icons";

export const name = {
  first: "Richard",
  last: "Puig",
};

export const profile = {
  role: "Full-Stack Software Engineer",
  email: "puigrichardxx@gmail.com",
  cv: "/Richard-Puig-CV.pdf",
  summary:
    "Full-stack software engineer with 4+ years of experience building web applications and APIs on .NET Core, Angular and SQL Server. Comfortable owning features end to end, from database and API to UI. Strong in Clean Architecture, CQRS, microservices and CI/CD. Uses AI tools in everyday development to speed up coding, debugging and testing, while keeping design decisions and quality checks in human hands.",
};

export const education = {
  degree: "BS Information Technology",
  school: "Don Honorio Ventura State University",
  date: "2018 – 2022",
};

// `tiles` have an icon, `chips` are text only.
export const skillGroups = [
  {
    label: "Back end",
    tiles: [
      { name: "C#", icon: csharp },
      { name: ".NET Core", icon: dotnetcore },
      { name: "ExpressJS", icon: express },
    ],
    chips: ["Web API", "Entity Framework Core"],
  },
  {
    label: "Architecture & Patterns",
    chips: ["Clean Architecture", "Microservices", "CQRS", "MediatR", "Object-Oriented Design", "Design Patterns"],
  },
  {
    label: "Messaging & Integration",
    chips: ["Message Queues", "Service Bus", "Event-Driven Architecture"],
  },
  {
    label: "Front end",
    tiles: [
      { name: "Angular", icon: angular },
      { name: "TypeScript", icon: typescript },
      { name: "JavaScript", icon: javascript },
      { name: "HTML", icon: html },
      { name: "CSS", icon: css },
      { name: "Blazor", icon: blazor },
      { name: "React", icon: react },
    ],
    chips: ["Power Apps"],
  },
  {
    label: "Databases",
    tiles: [
      { name: "SQL Server", icon: mssql },
      { name: "MongoDB", icon: mongodb },
    ],
  },
  {
    label: "Cloud & DevOps",
    tiles: [
      { name: "Azure Functions", icon: azure },
      { name: "Azure DevOps", icon: azuredevops },
      { name: "GitHub Actions", icon: github },
    ],
    chips: ["Jenkins"],
  },
];

// Newest first.
export const experiences = [
  {
    title: "Software Developer",
    company_name: "UnifiedAR",
    note: "US company",
    initials: "UA",
    iconBg: "#7fd3e6",
    date: "Oct 2024 – Present",
    points: [
      "Deliver full-stack features across .NET Core APIs, SQL Server and Angular for a customer-facing web platform, working directly with US stakeholders in an Agile team.",
      "Extend background jobs and customer notification workflows, using feature flags to roll out changes safely without affecting existing customers.",
      "Diagnose and fix production defects across the Angular front end, API and database layers, tracing each issue to its root cause.",
      "Improve data consistency and reliability of existing features by fixing logic gaps between the UI, API and stored data.",
    ],
  },
  {
    title: "Software Developer",
    company_name: "Flat Planet Philippines Inc.",
    icon: flatplanet,
    iconBg: "#accbe1",
    date: "May 2024 – Oct 2024",
    points: [
      "Developed .NET Core microservices and deployed them through Azure DevOps CI/CD.",
      "Built solutions with Microsoft Power Apps.",
    ],
  },
  {
    title: "Junior Software Developer",
    company_name: "VeritasPay Philippines Inc.",
    icon: vpi,
    iconBg: "#fbc3bc",
    date: "Sep 2023 – May 2024",
    points: [
      "Took the initiative to design the structure and architecture of a new Web API project using Clean Architecture and CQRS.",
      "Set up MediatR, the EF Core DbContext and database migrations.",
      "Built an HMAC-based authentication filter to secure API requests.",
    ],
  },
  {
    title: "Associate Software Engineer",
    company_name: "Ducen Infotek Inc.",
    icon: ducen,
    iconBg: "#accbe1",
    date: "Aug 2022 – Sep 2023",
    points: [
      "Built reusable, scalable features in Angular and .NET Core within an Agile team.",
      "Diagnosed and fixed bugs reported from production.",
      "Shipped features and fixes through Jenkins CI/CD pipelines.",
    ],
  },
];

export const socialLinks = [
  { name: "Contact", iconUrl: contact, link: "/contact" },
  { name: "GitHub", iconUrl: github, link: "https://github.com/cutiegianina" },
  { name: "LinkedIn", iconUrl: linkedin, link: "https://www.linkedin.com/in/richard-puig-732601227" },
];

export const projects = [
  {
    iconUrl: car,
    theme: "btn-back-blue",
    name: "MyWorld",
    description: "A 3D multiplayer interactive world. It plays like a game: explore it together with other people in real time.",
    tags: ["3D", "Multiplayer", "Interactive"],
    link: "https://github.com/seirios-aster/My-World",
    live: "", // add the live page URL
  },
  {
    iconUrl: estate,
    theme: "btn-back-green",
    name: "Gastos",
    description: "An expense and loans tracker to keep tabs on where your money goes and who owes what.",
    tags: ["Expenses", "Loans", "Tracker"],
    link: "https://github.com/seirios-aster/gastos",
  },
  {
    iconUrl: threads,
    theme: "btn-back-green",
    name: "Clean Architecture in .NET Core and Angular",
    description:
      "A reference implementation of Clean Architecture with a .NET Core API and an Angular client, secured with JWT authentication.",
    tags: [".NET Core", "Angular", "JWT"],
    link: "https://github.com/cutiegianina/Clean-Architecture-in-.Net-Core",
  },
  {
    iconUrl: pricewise,
    theme: "btn-back-red",
    name: "API provider with ExpressJS & MongoDB",
    description: "A lightweight REST API server built with ExpressJS and MongoDB to explore the Node ecosystem.",
    tags: ["ExpressJS", "MongoDB"],
    link: "https://github.com/cutiegianina/pirates",
  },
  {
    iconUrl: snapgram,
    theme: "btn-back-pink",
    name: "3D Portfolio",
    description: "This site: an explorable 3D island built with React, Three.js and Tailwind CSS.",
    tags: ["React", "Three.js", "Tailwind"],
    link: "https://github.com/cutiegianina/Portfoliov2",
  },
];

export { arrow };
