import flatplanet from "../assets/logos/flatplanet.png";
import ducen from "../assets/logos/ducen.jpg";
import vpi from "../assets/logos/vpi.webp";
import gastosCover from "../assets/projects/gastos.webp";
import myworldCover from "../assets/projects/myworld.webp";
import {
  angular,
  azure,
  azuredevops,
  blazor,
  css,
  csharp,
  dotnetcore,
  express,
  githubactions,
  html,
  javascript,
  jenkins,
  mongodb,
  mssql,
  react,
  typescript,
} from "../assets/icons";
import { placeholderIcon } from "./placeholderIcon";

export const profile = {
  firstName: "Richard",
  lastName: "Puig",
  role: "Full-Stack Software Engineer",
  stack: [".NET Core", "Angular", "SQL Server"],
  location: "Philippines",
  email: "puigrichardxx@gmail.com",
  cv: "/Richard-Puig-CV.pdf",
  github: "https://github.com/seirios-aster",
  linkedin: "https://www.linkedin.com/in/richard-puig-732601227",
  summary:
    "Full-stack software engineer with 4+ years of experience building web applications and APIs on .NET Core, Angular and SQL Server. Comfortable owning features end to end, from database and API to UI. Strong in Clean Architecture, CQRS, microservices and CI/CD. Uses AI tools in everyday development to speed up coding, debugging and testing, while keeping design decisions and quality checks in human hands.",
};


export const education = {
  degree: "BS Information Technology",
  school: "Don Honorio Ventura State University",
  date: "2018 – 2022",
};

// Newest first.
export const experiences = [
  {
    title: "Software Developer",
    company: "UnifiedAR",
    note: "US company",
    initials: "UA",
    date: "Oct 2024 – Present",
    current: true,
    points: [
      "Deliver full-stack features across .NET Core APIs, SQL Server and Angular for a customer-facing web platform, working directly with US stakeholders in an Agile team.",
      "Extend background jobs and customer notification workflows, using feature flags to roll out changes safely without affecting existing customers.",
      "Diagnose and fix production defects across the Angular front end, API and database layers, tracing each issue to its root cause.",
      "Improve data consistency and reliability of existing features by fixing logic gaps between the UI, API and stored data.",
    ],
    tags: [".NET Core", "Angular", "SQL Server", "Feature flags"],
  },
  {
    title: "Software Developer",
    company: "Flat Planet Philippines Inc.",
    logo: flatplanet,
    date: "May 2024 – Oct 2024",
    points: [
      "Developed .NET Core microservices and deployed them through Azure DevOps CI/CD.",
      "Built solutions with Microsoft Power Apps.",
    ],
    tags: ["Microservices", "Azure DevOps", "Power Apps"],
  },
  {
    title: "Junior Software Developer",
    company: "VeritasPay Philippines Inc.",
    logo: vpi,
    date: "Sep 2023 – May 2024",
    points: [
      "Took the initiative to design the structure and architecture of a new Web API project using Clean Architecture and CQRS.",
      "Set up MediatR, the EF Core DbContext and database migrations.",
      "Built an HMAC-based authentication filter to secure API requests.",
    ],
    tags: ["Clean Architecture", "CQRS", "EF Core"],
  },
  {
    title: "Associate Software Engineer",
    company: "Ducen Infotek Inc.",
    logo: ducen,
    date: "Aug 2022 – Sep 2023",
    points: [
      "Built reusable, scalable features in Angular and .NET Core within an Agile team.",
      "Diagnosed and fixed bugs reported from production.",
      "Shipped features and fixes through Jenkins CI/CD pipelines.",
    ],
    tags: ["Angular", ".NET Core", "Jenkins"],
  },
];

// Brand logos where we have one, otherwise a monogram placeholder.
const ph = placeholderIcon;

export const skillGroups = [
  {
    label: "Back end",
    items: [
      { name: "C#", icon: csharp },
      { name: ".NET Core", icon: dotnetcore },
      { name: "Web API", icon: ph("API", "#512bd4") },
      { name: "Entity Framework Core", icon: ph("EF", "#6d4fd6") },
      { name: "ExpressJS", icon: express },
    ],
  },
  {
    label: "Architecture & Patterns",
    items: [
      { name: "Clean Architecture", icon: ph("CA", "#0f766e") },
      { name: "Microservices", icon: ph("MS", "#0e7490") },
      { name: "CQRS", icon: ph("CQ", "#1d4ed8") },
      { name: "MediatR", icon: ph("MR", "#7c3aed") },
      { name: "Object-Oriented Design", icon: ph("OOD", "#be185d") },
      { name: "Design Patterns", icon: ph("DP", "#c2410c") },
    ],
  },
  {
    label: "Messaging & Integration",
    items: [
      { name: "Message Queues", icon: ph("MQ", "#b45309") },
      { name: "Service Bus", icon: ph("SB", "#0369a1") },
      { name: "Event-Driven Architecture", icon: ph("ED", "#4d7c0f") },
    ],
  },
  {
    label: "Front end",
    items: [
      { name: "Angular", icon: angular },
      { name: "TypeScript", icon: typescript },
      { name: "JavaScript", icon: javascript },
      { name: "HTML", icon: html },
      { name: "CSS", icon: css },
      { name: "Blazor", icon: blazor },
      { name: "React", icon: react },
      { name: "Power Apps", icon: ph("PA", "#742774") },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "SQL Server", icon: mssql },
      { name: "MongoDB", icon: mongodb },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "Azure Functions", icon: azure },
      { name: "Azure DevOps", icon: azuredevops },
      { name: "GitHub Actions", icon: githubactions },
      { name: "Jenkins", icon: jenkins },
    ],
  },
];

export const allSkills = skillGroups.flatMap((g) => g.items);

export const stats = [
  { value: 4, suffix: "+", label: "Years shipping to production" },
  { value: 4, suffix: "", label: "Companies, in the US and the Philippines" },
  { value: allSkills.length, suffix: "", label: "Languages, frameworks and tools" },
];

export const projects = [
  {
    name: "Tambayan (MyWorld)",
    kicker: "3D multiplayer world",
    description:
      "A little 3D world to hang out in, right in the browser on a phone or PC. Day and night cycle, a real star sky with constellations, weather and seasonal looks, other players with chat and emoji, a character menu, and game-master tools for time, weather and music.",
    tags: ["three.js", "Supabase", "Multiplayer", "PWA"],
    cover: myworldCover,
    accent: ["#6d5efc", "#f472b6"],
    live: "https://seirios-aster.github.io/My-World/",
    link: "https://github.com/seirios-aster/My-World",
    featured: true,
  },
  {
    name: "Gastos",
    kicker: "Expense & loans tracker",
    description:
      "A private expense and loans tracker for your phone. Log an expense in seconds, track a monthly budget, recurring expenses and custom categories, see spending charts, and export to CSV. Everything stays on the device in SQLite.",
    tags: ["React Native", "Expo", "SQLite", "TypeScript"],
    cover: gastosCover,
    accent: ["#2f8cff", "#43d17a"],
    link: "https://github.com/seirios-aster/gastos",
    featured: true,
  },
  {
    name: "Clean Architecture in .NET Core and Angular",
    kicker: "Reference architecture",
    description:
      "A reference implementation of Clean Architecture with a .NET Core API and an Angular client, secured with JWT authentication.",
    tags: [".NET Core", "Angular", "JWT"],
    accent: ["#512bd4", "#dd0031"],
    monogram: "CA",
    link: "https://github.com/seirios-aster/Clean-Architecture-in-.Net-Core",
  },
  {
    name: "API provider with ExpressJS & MongoDB",
    kicker: "REST API",
    description: "A lightweight REST API server built with ExpressJS and MongoDB to explore the Node ecosystem.",
    tags: ["ExpressJS", "MongoDB", "Node.js"],
    accent: ["#13aa52", "#0ea5e9"],
    monogram: "API",
    link: "https://github.com/seirios-aster/pirates",
  },
  {
    name: "This portfolio",
    kicker: "Scroll-driven 3D site",
    description:
      "A React site with a persistent three.js scene that reacts to scrolling and the mouse, smooth scrolling and motion-driven sections.",
    tags: ["React", "three.js", "Framer Motion"],
    accent: ["#22d3ee", "#a78bfa"],
    monogram: "RP",
    link: "https://github.com/seirios-aster/Portfoliov2",
  },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
