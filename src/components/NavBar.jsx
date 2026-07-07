import React, { useState } from 'react';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { RiMenuLine, RiCloseLine, RiFileDownloadLine } from "react-icons/ri";
import { RESUME_URL, SOCIALS } from "../constants/index.js";
import { scrollToId } from "../utils/scrollToId.js";

const NAV_LINKS = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
];

const NavBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 -mx-8 mb-16 border-b border-line bg-ink/80 px-8 py-4 backdrop-blur">
            <div className="flex items-center justify-between">
                <a href="#top" onClick={(event) => scrollToId(event, 'top')} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md border border-accent/40 font-mono text-sm text-accent">
                        ŽA
                    </span>
                    <span className="hidden font-mono text-sm text-neutral-400 sm:inline">
                        akelisdev.com
                    </span>
                </a>

                <div className="hidden items-center gap-8 lg:flex">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(event) => scrollToId(event, link.id)}
                            className="text-sm text-neutral-400 transition hover:text-accent">
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="hidden items-center gap-5 lg:flex">
                    <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="text-xl text-neutral-400 transition hover:text-accent">
                        <FaLinkedin />
                    </a>
                    <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="text-xl text-neutral-400 transition hover:text-accent">
                        <FaGithub />
                    </a>
                    <a
                        href={RESUME_URL}
                        download="Zilvinas_Akelis_CV.pdf"
                        className="flex items-center gap-2 rounded-md border border-accent/40 px-4 py-2 text-sm text-accent transition hover:bg-accent/10">
                        <RiFileDownloadLine />
                        Resume
                    </a>
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                    className="text-2xl text-neutral-300 lg:hidden">
                    {open ? <RiCloseLine /> : <RiMenuLine />}
                </button>
            </div>

            {open && (
                <div className="mt-4 flex flex-col gap-4 border-t border-line pt-4 lg:hidden">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(event) => {
                                scrollToId(event, link.id);
                                setOpen(false);
                            }}
                            className="text-sm text-neutral-400 transition hover:text-accent">
                            {link.label}
                        </a>
                    ))}
                    <div className="flex items-center gap-5 pt-2">
                        <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="text-xl text-neutral-400 hover:text-accent">
                            <FaLinkedin />
                        </a>
                        <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="text-xl text-neutral-400 hover:text-accent">
                            <FaGithub />
                        </a>
                        <a
                            href={RESUME_URL}
                            download="Zilvinas_Akelis_CV.pdf"
                            className="flex items-center gap-2 rounded-md border border-accent/40 px-4 py-2 text-sm text-accent">
                            <RiFileDownloadLine />
                            Resume
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
