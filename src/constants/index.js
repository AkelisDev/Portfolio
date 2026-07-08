import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import project4 from "../assets/projects/project-4.jpg";

export const RESUME_URL = "/resume.pdf";

export const HERO_ROLE = "Frontend Software Developer — ERP & Product Configuration Systems";

export const HERO_CONTENT = `Frontend-leaning software developer with ~4 years building a production ERP platform for a manufacturing company, as the lead contributor on a 7-person engineering team. I specialize in complex, stateful UIs — dynamic form/configurator systems, data visualization, and document generation pipelines. Currently expanding into React and TypeScript.`;

export const ABOUT_TEXT = `I've spent the last four years as the lead contributor on Ryterna's ERP and product configurator platform — a Vue.js system, built with a 7-person engineering team, that lets customers design windows, doors, and gates down to the hardware and turns that configuration into a priced, production-ready order.

Most of that time has gone into problems without a textbook answer: designing a plugin-style controller architecture flexible enough for 16+ input types, keeping a 400+ component application from collapsing into spaghetti, and making sure a generated PDF quote matches the on-screen order to the pixel. I've been the most active contributor on the codebase — 1,500+ of roughly 2,800 commits — while working within the team's shared architecture and review process, and coordinating with backend and production-systems engineers to get shop-floor equipment talking to the configurator.

I like work where the constraints are real: manufacturing tolerances, pricing rules, production-floor communication. It's less forgiving than a typical CRUD app — and that's exactly why I've stayed. Lately I've been extending that foundation into React and TypeScript.`;

export const ADAPTABILITY_NOTE = "Deep Vue.js background with directly transferable fundamentals — component architecture, state management, form systems — currently applying those to React and TypeScript.";

export const STATS = [
  { value: "4+", label: "Years on one platform" },
  { value: "7", label: "Person team, as lead contributor" },
  { value: "1,500+", label: "Of ~2,800 platform commits" },
  { value: "400+", label: "Components in production" },
  { value: "16+", label: "Configurator controller types" },
  { value: "86", label: "Vuex store modules" },
];

export const SKILLS = [
  {
    category: "Frontend & UI",
    items: [
      { name: "Vue.js", note: "Core stack — 4+ years" },
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
      { name: "Vuex at scale", note: "86-module store design" },
      { name: "Component architecture", note: "400+ components, no spaghetti" },
      { name: "Plugin-style systems", note: "16+ controller-type engine" },
      { name: "i18n / multi-locale", note: "Production content in several languages" },
    ],
  },
  {
    category: "Backend & Systems",
    items: [
      { name: "Node.js", note: "Service layer, tooling" },
      { name: "REST APIs", note: "Design & integration" },
      { name: "WebSocket / Telnet", note: "Production-floor integration" },
      { name: "PDF document pipelines", note: "Pixel-parity quote generation" },
      { name: "Git", note: "Branching, review, CI-friendly workflows" },
    ],
  },
];

export const EXPERIENCES = [
  {
    year: "2022 - Present",
    role: "Frontend Software Developer",
    company: "Ryterna Group — ERP Platform",
    summary: "Vue.js ERP system for a windows/doors/gates manufacturer, built with a 7-person engineering team.",
    description: `Designed and led development of a rule-driven product configurator engine — 16+ pluggable controller types (sliders, color pickers, dependency logic, add-on modules) driving real-time pricing and visual previews for configurable manufactured products.
Built the automated PDF quote/confirmation pipeline, keeping generated documents in exact visual and logical parity with the live order UI.
Owned the state management architecture (86 Vuex modules) and the validation framework across a multi-step order flow, including multi-file upload handling.
Coordinated with backend and production-systems engineers to integrate shop-floor equipment communication (WebSocket, Telnet) into the configurator.
Most active contributor on the codebase — 1,500+ of roughly 2,800 commits — while working across the team's shared architecture and review process.`,
    technologies: ["Vue.js", "Vuex", "JavaScript", "Node.js", "REST APIs", "WebSocket", "HTML", "CSS", "Bootstrap"],
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
