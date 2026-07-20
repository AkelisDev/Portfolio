import React from 'react';
import { motion } from "framer-motion";
import { SKILLS, ADAPTABILITY_NOTE } from "../constants/index.js";
import SectionHeading from "./SectionHeading.jsx";
import {
    RiVuejsLine,
    RiReactjsLine,
    RiBootstrapFill,
    RiTailwindCssFill,
    RiJavascriptFill,
    RiHtml5Fill,
    RiCss3Fill,
    RiStackLine,
    RiPuzzleFill,
    RiTranslate2,
    RiRouteLine,
    RiBarcodeLine,
} from "react-icons/ri";
import { TbComponents, TbApi, TbPlugConnected, TbFileTypePdf } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiMysql, SiJest, SiPlaywright, SiStorybook, SiGit } from "react-icons/si";

const ICONS = {
    "Vue.js": RiVuejsLine,
    "JavaScript (ES6+)": RiJavascriptFill,
    "React": RiReactjsLine,
    "TypeScript": SiTypescript,
    "HTML5": RiHtml5Fill,
    "CSS3": RiCss3Fill,
    "Tailwind CSS": RiTailwindCssFill,
    "Bootstrap": RiBootstrapFill,
    "Vuex at scale": RiStackLine,
    "Component architecture": TbComponents,
    "Plugin-style systems": RiPuzzleFill,
    "i18n / multi-locale": RiTranslate2,
    "Node.js": FaNodeJs,
    "REST APIs": TbApi,
    "WebSocket / SSE / Telnet": TbPlugConnected,
    "SVG drawing & PDF pipelines": TbFileTypePdf,
    "Barcode scanning": RiBarcodeLine,
    "MySQL / MariaDB": SiMysql,
    "Jest": SiJest,
    "Playwright & Cypress": SiPlaywright,
    "Storybook": SiStorybook,
    "Git & Jira": SiGit,
};

const Skills = () => {
    return (
        <div id="skills" className="scroll-mt-24 border-b border-line pb-24">
            <SectionHeading index="02" title="Skills" />
            <div className="grid gap-8 lg:grid-cols-2">
                {SKILLS.map((group, groupIndex) => (
                    <motion.div
                        key={group.category}
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 30 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                        className="rounded-xl border border-line bg-surface/50 p-6">
                        <h3 className="mb-5 font-mono text-sm uppercase tracking-wide text-accent">
                            {group.category}
                        </h3>
                        <div className="flex flex-col gap-4">
                            {group.items.map((item) => {
                                const Icon = ICONS[item.name];
                                return (
                                    <div key={item.name} className="flex items-start gap-3">
                                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-ink text-lg text-neutral-300">
                                            {Icon && <Icon />}
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium text-neutral-200">{item.name}</p>
                                            <p className="text-xs text-neutral-500">{item.note}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>
            <motion.div
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/5 p-6">
                <RiRouteLine className="mt-0.5 shrink-0 text-xl text-accent" />
                <p className="text-sm text-neutral-300">{ADAPTABILITY_NOTE}</p>
            </motion.div>
        </div>
    );
};

export default Skills;
