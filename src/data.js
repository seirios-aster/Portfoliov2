export const profile = {
  name: "Richard Puig",
  role: "Full-Stack Software Engineer",
  stack: [".NET Core", "Angular", "SQL Server"],
  email: "puigrichardxx@gmail.com",
  github: "https://github.com/cutiegianina",
  linkedin: "https://www.linkedin.com/in/richard-puig-732601227",
  cv: "/Richard-Puig-CV.pdf",
  summary:
    "Full-stack software engineer with 4+ years of experience building web applications and APIs on .NET Core, Angular and SQL Server. Comfortable owning features end to end, from database and API to UI. Strong in Clean Architecture, CQRS, microservices and CI/CD. Uses AI tools in everyday development to speed up coding, debugging and testing, while keeping design decisions and quality checks in human hands.",
  location: "Philippines",
};

export const experiences = [
  {
    title: "Software Developer",
    company: "UnifiedAR",
    note: "US company",
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
    company: "Flat Planet Philippines Inc.",
    date: "May 2024 – Oct 2024",
    points: [
      "Developed .NET Core microservices and deployed them through Azure DevOps CI/CD.",
      "Built solutions with Microsoft Power Apps.",
    ],
  },
  {
    title: "Junior Software Developer",
    company: "VeritasPay Philippines Inc.",
    date: "Sep 2023 – May 2024",
    points: [
      "Took the initiative to design the structure and architecture of a new Web API project using Clean Architecture and CQRS.",
      "Set up MediatR, the EF Core DbContext and database migrations.",
      "Built an HMAC-based authentication filter to secure API requests.",
    ],
  },
  {
    title: "Associate Software Engineer",
    company: "Ducen Infotek Inc.",
    date: "Aug 2022 – Sep 2023",
    points: [
      "Built reusable, scalable features in Angular and .NET Core within an Agile team.",
      "Diagnosed and fixed bugs reported from production.",
      "Shipped features and fixes through Jenkins CI/CD pipelines.",
    ],
  },
];

export const skills = [
  { group: "Back end", items: ["C#", ".NET Core", "Web API", "Entity Framework Core", "ExpressJS"] },
  {
    group: "Architecture & Patterns",
    items: ["Clean Architecture", "Microservices", "CQRS", "MediatR", "Object-Oriented Design", "Design Patterns"],
  },
  { group: "Messaging & Integration", items: ["Message Queues", "Service Bus", "Event-Driven Architecture"] },
  { group: "Front end", items: ["Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Blazor", "React", "Power Apps"] },
  { group: "Databases", items: ["SQL Server", "MongoDB"] },
  { group: "Cloud & DevOps", items: ["Azure Functions", "Azure DevOps", "GitHub Actions", "Jenkins"] },
];

export const education = {
  degree: "BS Information Technology",
  school: "Don Honorio Ventura State University",
  date: "2018 – 2022",
};

export const projects = [
  {
    name: "Clean Architecture in .NET Core and Angular",
    description:
      "A reference implementation of Clean Architecture with a .NET Core API and an Angular client, secured with JWT authentication.",
    tags: [".NET Core", "Angular", "Clean Architecture", "JWT"],
    link: "https://github.com/cutiegianina/Clean-Architecture-in-.Net-Core",
  },
  {
    name: "API provider with ExpressJS & MongoDB",
    description:
      "A lightweight REST API server built with ExpressJS and MongoDB, created to explore the Node ecosystem.",
    tags: ["ExpressJS", "MongoDB", "Node.js"],
    link: "https://github.com/cutiegianina/pirates",
  },
  {
    name: "Portfolio website",
    description: "This site: a fast, accessible React and Tailwind portfolio with light and dark themes.",
    tags: ["React", "Vite", "Tailwind CSS"],
    link: "https://github.com/cutiegianina/Portfoliov2",
  },
  {
    name: "Beach-front properties for sale",
    description: "A property listing website I built as a student.",
    tags: ["Web"],
    link: "https://github.com/cutiegianina/samalbeachline",
  },
];
