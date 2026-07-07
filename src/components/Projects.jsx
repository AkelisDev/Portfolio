import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from "../constants/index.js";
import { motion } from "framer-motion";
import { RiGithubFill, RiPlayCircleLine } from "react-icons/ri";
import SectionHeading from "./SectionHeading.jsx";

const Projects = () => {
    return (
        <div id="projects" className="scroll-mt-24 border-b border-line pb-24">
            <SectionHeading index="04" title="Projects" />
            <div className="grid gap-8 lg:grid-cols-2">
                {PROJECTS.map((project, index) => (
                    <motion.div
                        key={index}
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 30 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group overflow-hidden rounded-xl border border-line bg-surface/50 transition hover:border-accent/50">
                        <div className="relative overflow-hidden">
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
                            ) : (
                                <div className="flex h-56 w-full items-center justify-center bg-ink bg-blueprint bg-grid">
                                    <span className="font-mono text-sm uppercase tracking-widest text-accent">
                                        {project.title}
                                    </span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                        </div>
                        <div className="p-6">
                            <h6 className="mb-2 text-lg font-semibold text-neutral-100">{project.title}</h6>
                            <p className="mb-4 text-sm text-neutral-400">{project.description}</p>
                            <div className="mb-5 flex flex-wrap gap-2">
                                {project.technologies.map((tech, techIndex) => (
                                    <span key={techIndex} className="rounded border border-line bg-ink px-2 py-1 font-mono text-xs text-neutral-400">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-5">
                                {project.demoPath && (
                                    <Link
                                        to={project.demoPath}
                                        className="flex items-center gap-1 text-sm text-accent hover:underline">
                                        <RiPlayCircleLine /> Try it live
                                    </Link>
                                )}
                                <a
                                    href={project.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-sm text-neutral-400 hover:text-accent">
                                    <RiGithubFill /> Source
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
