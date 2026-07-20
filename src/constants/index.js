import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import project4 from "../assets/projects/project-4.jpg";

export const RESUME_URL = "/resume.pdf";

export const HERO_ROLE = "Frontend Software Developer — ERP & Product Configuration Systems";

export const HERO_CONTENT = `Frontend-leaning software developer with 4.5+ years building a production, multi-module SaaS-style ERP platform for a manufacturing company, as the lead contributor on a 7-person engineering team. I specialize in complex, stateful UIs — rule-driven configurator systems, real-time SVG technical drawings, and document generation pipelines. Currently expanding into React and TypeScript.`;

export const ABOUT_TEXT = `I've spent the last four and a half years as a lead contributor on Ryterna's ERP and product configurator platform — a Vue.js system, built with a 7-person engineering team, that lets customers design windows, doors, and gates down to the hardware and turns that configuration into a priced, production-ready order with a live SVG technical drawing.

Most of that time has gone into problems without a textbook answer: designing a plugin-style controller architecture flexible enough for 25+ input types, keeping a ~180K-line, 440+ component application from collapsing into spaghetti, and making sure a generated PDF quote matches the on-screen order to the pixel. The platform spans three product domains — admin/configuration (a formula and scripting engine, pricelists, permissions, translations), sales and order management, and production/shop-floor tooling (task tracking, barcode scanning) — and I've worked across all three within the team's shared architecture, code review, and Jira-based planning process.

I like work where the constraints are real: manufacturing tolerances, pricing rules, production-floor communication. It's less forgiving than a typical CRUD app — and that's exactly why I've stayed. Lately I've been extending that foundation into React and TypeScript, picking up Playwright/Cypress E2E testing and Storybook-driven component work along the way.`;

export const ADAPTABILITY_NOTE = "Deep Vue.js background with directly transferable fundamentals — component architecture, state management, form systems — currently applying those to React and TypeScript.";

export const STATS = [
  { value: "4.5+", label: "Years on one platform" },
  { value: "7", label: "Person team, as lead contributor" },
  { value: "180K+", label: "Lines of front-end code" },
  { value: "440+", label: "Components in production" },
  { value: "25+", label: "Configurator controller types" },
  { value: "89", label: "Vuex store modules" },
];

export const SKILLS = [
  {
    category: "Frontend & UI",
    items: [
      { name: "Vue.js", note: "Core stack — 4.5+ years" },
      { name: "JavaScript (ES6+)", note: "Daily driver" },
      { name: "React", note: "Currently expanding into — this site" },
      { name: "TypeScript", note: "Currently expanding into" },
      { name: "HTML5", note: "Semantic, accessible markup" },
      { name: "CSS3", note: "Layout, animation" },
      { name: "Tailwind CSS", note: "Utility-first styling" },
      { name: "Bootstrap", note: "Rapid internal tooling" },
    ],
  },
  {
    category: "Architecture & State",
    items: [
      { name: "Vuex at scale", note: "89-module store design" },
      { name: "Component architecture", note: "440+ components, no spaghetti" },
      { name: "Plugin-style systems", note: "25+ controller-type engine" },
      { name: "i18n / multi-locale", note: "Production content in several languages" },
    ],
  },
  {
    category: "Integration & Tooling",
    items: [
      { name: "Node.js", note: "Service layer, build/serve tooling" },
      { name: "REST APIs", note: "Design & integration" },
      { name: "WebSocket / SSE / Telnet", note: "Production-floor integration" },
      { name: "SVG drawing & PDF pipelines", note: "Live technical drawings, pixel-parity quotes" },
      { name: "Barcode scanning", note: "QuaggaJS, shop-floor task tracking" },
      { name: "MySQL / MariaDB", note: "Schema navigation, queries via phpMyAdmin" },
    ],
  },
  {
    category: "Testing & Process",
    items: [
      { name: "Jest", note: "Unit tests" },
      { name: "Playwright & Cypress", note: "End-to-end testing" },
      { name: "Storybook", note: "Component workshop" },
      { name: "Git & Jira", note: "Branching, review, agile planning" },
    ],
  },
];

export const EXPERIENCES = [
  {
    year: "2022 - Present",
    role: "Frontend Software Developer",
    company: "Ryterna Group — ERP Platform",
    summary: "Vue.js ERP for a windows/doors/gates manufacturer — ~180K-LOC front end, 440+ components, built with a 7-person team.",
    description: `Architected a rule-driven product configurator engine spanning 25+ pluggable controller types (sliders, colour/thumbnail pickers, dependency logic, add-on modules), powering real-time pricing and live SVG technical drawings of configured products.
Engineered an automated PDF quote/confirmation pipeline that mirrors the live order UI exactly in both pricing logic and visual output.
Owned an 89-module Vuex state architecture and the validation framework behind a multi-step order flow, including multi-file upload handling.
Delivered across three product domains — admin/configuration (formula & scripting engine, pricelists, permissions/roles, translations), sales & order management, and production/shop-floor (task tracking, barcode scanning).
Bridged frontend and shop-floor systems — integrated WebSocket/SSE/Telnet equipment communication alongside backend and production engineers.
Worked within a shared architecture and code-review workflow across a 7-person team, with Jira-based agile planning and daily Git branching.
Testing & tooling: Jest unit tests, Playwright and Cypress E2E, Storybook component workshop.`,
    technologies: ["Vue.js", "Vuex", "JavaScript", "Node.js", "REST APIs", "WebSocket/SSE", "Jest", "Playwright", "Cypress", "Storybook", "MySQL/MariaDB"],
    liveUrl: "https://configurator.ryternaentry.com/",
    liveNote: "Public customer-facing configurator — admin, manager, and manufacturing tooling not shown",
  },
];

export const PROJECTS = [
  {
    title: "UI Kit",
    description:
      "An accessible component library — Button, Checkbox, TextField, Select, Dialog — each keyboard-operable and verified with jest-axe in every test file. The Select is a from-scratch ARIA combobox instead of a wrapped native element; the Dialog implements a real focus trap with restoration. 32 tests passing.",
    technologies: ["React", "TypeScript", "Vitest", "jest-axe", "Tailwind CSS"],
    sourceUrl: "https://github.com/AkelisDev/ui-kit",
    demoPath: "/lab/ui-kit",
  },
  {
    title: "Configurator Kit",
    description:
      "A schema-driven product configurator engine — dependency rules, live pricing, and validation — driving three unrelated demo products (bike builder, PC build, hoodie customizer) from plain schema data. Each instance is Context-scoped rather than a global singleton, so two configurators can run independently on the same page — verified with a dedicated isolation test. 32 tests passing. The public, non-proprietary version of the problem I solve daily on Ryterna's configurator platform.",
    technologies: ["React", "TypeScript", "Zustand", "Vitest", "Tailwind CSS"],
    sourceUrl: "https://github.com/AkelisDev/configurator-kit",
    demoPath: "/lab/configurator-kit",
  },
  {
    title: "E-Commerce Website",
    image: project1,
    description:
      "A fully functional e-commerce website with features like product listing, shopping cart.",
    technologies: ["HTML", "CSS", "React"],
      sourceUrl: "https://github.com/AkelisDev/E-Commerce.git"
  },
  {
    title: "Portfolio Website",
    image: project3,
    description:
      "A personal portfolio website showcasing projects, skills, and contact information.",
    technologies: ["HTML", "CSS", "React", "Bootstrap", "Tailwind"],
      sourceUrl: "https://github.com/AkelisDev/Portfolio.git"
  },
];

export const CONTACT = {
  address: "Pašilės g. 118, Kaunas, Lithuania",
  email: "akeliszilvinas@gmail.com",
};

export const SOCIALS = {
  linkedin: "https://www.linkedin.com/in/akelis-zilvinas/",
  github: "https://github.com/AkelisDev",
};
