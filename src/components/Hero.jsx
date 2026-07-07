import React from 'react';
import { HERO_CONTENT, HERO_ROLE, RESUME_URL } from "../constants/index.js";
import profilePic from "../assets/zaprofile.png"
import './About.css'
import { motion } from "framer-motion";
import { RiFileDownloadLine, RiArrowRightUpLine } from "react-icons/ri";
import { scrollToId } from "../utils/scrollToId.js";

const container = (delay) => ({
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: delay }
    }
})

const Hero = () => {
    return (
        <div className="border-b border-line pb-24 pt-8 lg:pt-16">
            <div className="flex flex-wrap items-center">
                <div className="w-full lg:w-3/5">
                    <div className="flex flex-col items-center lg:items-start">
                        <motion.span
                            variants={container(0)}
                            initial="hidden"
                            animate="visible"
                            className="mb-4 font-mono text-sm text-accent">
                            // hello, I'm
                        </motion.span>
                        <motion.h1
                            variants={container(0.15)}
                            initial="hidden"
                            animate="visible"
                            className="pb-6 text-center text-5xl font-semibold tracking-tight text-neutral-100 lg:text-left lg:text-7xl">
                            Žilvinas Akelis
                        </motion.h1>
                        <motion.span
                            variants={container(0.35)}
                            initial="hidden"
                            animate="visible"
                            className="mb-6 text-center text-xl text-accent lg:text-left lg:text-2xl">
                            {HERO_ROLE}
                        </motion.span>
                        <motion.p
                            variants={container(0.55)}
                            initial="hidden"
                            animate="visible"
                            className="my-2 max-w-2xl py-2 text-left font-light text-neutral-400">
                            {HERO_CONTENT}
                        </motion.p>
                        <motion.div
                            variants={container(0.8)}
                            initial="hidden"
                            animate="visible"
                            className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                            <a
                                href="#projects"
                                onClick={(event) => scrollToId(event, 'projects')}
                                className="flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-ink transition hover:bg-accent/90">
                                View my work
                                <RiArrowRightUpLine />
                            </a>
                            <a
                                href={RESUME_URL}
                                download="Zilvinas_Akelis_CV.pdf"
                                className="flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm text-neutral-300 transition hover:border-accent hover:text-accent">
                                <RiFileDownloadLine />
                                Download resume
                            </a>
                        </motion.div>
                    </div>
                </div>
                <div className="mt-12 w-full lg:mt-0 lg:w-2/5 lg:p-8">
                    <div className="flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative w-full max-w-[420px]">
                            <div className="absolute -inset-3 rounded-2xl border border-accent/30" />
                            <img
                                className="image-size relative rounded-xl border border-line"
                                src={profilePic}
                                alt="Žilvinas Akelis" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
