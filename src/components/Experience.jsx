import React from 'react';
import { EXPERIENCES } from "../constants/index.js";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading.jsx";

const Experience = () => {

    return (
        <div id="experience" className="scroll-mt-24 border-b border-line pb-24">
            <SectionHeading index="03" title="Experience" />
            <div className="mx-auto max-w-3xl">
                {EXPERIENCES.map((experience, index) => (
                    <div key={index} className="relative pl-10">
                        <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-accent bg-ink">
                            <span className="h-2 w-2 rounded-full bg-accent" />
                        </span>
                        {index < EXPERIENCES.length - 1 && (
                            <span className="absolute left-3 top-7 h-full w-px bg-line" />
                        )}

                        <motion.p
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -30 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-2 font-mono text-sm text-accent">
                            {experience.year}
                        </motion.p>
                        <motion.div
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 20 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mb-12 rounded-xl border border-line bg-surface/50 p-6">
                            <h6 className="mb-1 text-lg font-semibold text-neutral-100">
                                {experience.role}
                            </h6>
                            <p className="mb-3 text-sm text-accent">{experience.company}</p>
                            {experience.summary && (
                                <p className="mb-4 text-sm text-neutral-400">{experience.summary}</p>
                            )}
                            <ul className="mb-4 list-disc space-y-2 pl-5 marker:text-accent">
                                {experience.description.split('\n').map((desc, descIndex) => (
                                    <li key={descIndex} className="text-sm leading-relaxed text-neutral-400">
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-2">
                                {experience.technologies.map((tech, techIndex) => (
                                    <span key={techIndex} className="rounded border border-line bg-ink px-2 py-1 font-mono text-xs text-neutral-400">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;
