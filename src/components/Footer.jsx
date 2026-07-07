import React from 'react';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { RiArrowUpLine } from "react-icons/ri";
import { SOCIALS } from "../constants/index.js";
import { scrollToId } from "../utils/scrollToId.js";

const Footer = () => {
    return (
        <footer className="flex flex-col items-center justify-between gap-4 border-t border-line py-8 text-sm text-neutral-500 lg:flex-row">
            <p className="font-mono">© {new Date().getFullYear()} Žilvinas Akelis</p>
            <div className="flex items-center gap-5">
                <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="text-lg transition hover:text-accent">
                    <FaLinkedin />
                </a>
                <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="text-lg transition hover:text-accent">
                    <FaGithub />
                </a>
                <a href="#top" onClick={(event) => scrollToId(event, 'top')} className="flex items-center gap-1 transition hover:text-accent">
                    Back to top <RiArrowUpLine />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
