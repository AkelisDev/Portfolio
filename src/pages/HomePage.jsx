import React from 'react';
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import NavBar from "../components/NavBar.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Skills from "../components/Skills.jsx";
import Experience from "../components/Experience.jsx";
import Projects from "../components/Projects.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

const HomePage = () => {
    useDocumentTitle('Žilvinas Akelis — Software Engineer');

    return (
        <div id="top" className="container mx-auto px-8">
            <NavBar />
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
            <Footer />
        </div>
    );
};

export default HomePage;
