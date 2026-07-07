import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import project4 from "../assets/projects/project-4.jpg";

export const HERO_CONTENT = `I am a passionate front-end developer with a knack for crafting robust and scalable web applications. With 3 years of hands-on experience, I have honed my skills in front-end technologies like Vue.js and React.js, as well as back-end using Node.js. Recently, I have also been focusing on learning the Laravel framework for back-end and Next.js for extending React capabilities. My goal is to leverage my expertise to create innovative solutions that drive business growth and deliver exceptional user experiences.`;

export const ABOUT_TEXT = `My journey into web development began with a fascination for understanding the inner workings of technology, evolving into a career where I thrive on continuous learning and adapting to new challenges. I excel in collaborative environments, where I leverage my problem-solving skills to deliver high-quality solutions. My goal is to apply my expertise to innovate and drive business growth through cutting-edge web solutions.

Beyond coding, I maintain an active lifestyle and enjoy exploring emerging technologies and contributing to open-source projects, fostering a well-rounded approach to my professional and personal growth.

`;

export const EXPERIENCES = [
  {
    year: "2022 - Present",
    role: "Front-end software Developer",
    company: "Ryterna Group",
    description: `Developed Manufacturing Software: Collaborated with a team to create an integrated software solution for a company group, encompassing various business processes such as manufacturing, storage, finance, and marketing.
    Configurator Development: Developed a sophisticated configurator tool that generates dynamic drawings based on user-defined parameters and additional options, enhancing the customization and efficiency of the manufacturing process.
    Web Application Development and Maintenance: Responsible for developing and maintaining robust web applications using JavaScript, Vue.js, and Node.js, ensuring seamless user experiences and optimal performance.
    Implemented REST APIs: Designed and implemented REST APIs to facilitate communication between the front-end and back-end systems, ensuring data integrity and efficient processing.
    Collaboration and Communication: Worked closely with technicians and administration to gather requirements, provide technical insights, and ensure the developed solutions met business needs and technical specifications.
    Continuous Improvement: Actively participated in code reviews, pair programming sessions, and technical discussions to continuously improve code quality and team productivity.
    Testing and Debugging: Conducted thorough testing and debugging of web applications to identify and fix issues, ensuring reliability and performance.`,
    technologies: ["HTML", "CSS", "Javascript", "Bootstrap", "Vue.js", "Node.js"],
  },
];

export const PROJECTS = [
  {
    title: "E-Commerce Website",
    image: project1,
    description:
      "A fully functional e-commerce website with features like product listing, shopping cart.",
    technologies: ["HTML", "CSS", "React"],
      sourceUrl: "https://github.com/MethGuys/E-Commerce.git",
      liveUrl: "https://hnrcyg-3000.csb.app/"
  },
  {
    title: "Portfolio Website",
    image: project3,
    description:
      "A personal portfolio website showcasing projects, skills, and contact information.",
    technologies: ["HTML", "CSS", "React", "Bootstrap", "Tailwind"],
      sourceUrl: "https://github.com/MethGuys/Portfolio.git",
      liveUrl: ""
  },
];

export const CONTACT = {
  address: "Pašilės g. 118, Kaunas, Lithuania",
  phoneNo: "+370 633 84741",
  email: "zilvinasakelis@yahoo.com",
};
