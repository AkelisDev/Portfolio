import React from 'react';
import aboutImg from '../assets/about.jpg'
import './About.css'
import { ABOUT_TEXT, STATS } from "../constants/index.js";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading.jsx";

const About = () => {
    return (
        <div id="about" className="scroll-mt-24 border-b border-line pb-24">
            <SectionHeading index="01" title="About" accent="me" />
            <div className="flex flex-wrap items-center">
                <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -60 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-full lg:w-2/5 lg:p-8">
                    <div className="flex items-center justify-center">
                        <div className="relative w-full max-w-[420px]">
                            <div className="absolute -inset-3 rounded-2xl border border-accent/30" />
                            <img className="image-size relative rounded-xl border border-line" src={aboutImg} alt="" />
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 60 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-full lg:w-3/5">
                    <div className="flex justify-center lg:justify-start">
                        <div className="max-w-xl">
                            {ABOUT_TEXT.split('\n\n').map((para, index) => (
                                <p key={index} className="my-4 text-neutral-400">
                                    {para}
                                </p>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
            <motion.div
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-12 grid grid-cols-2 gap-6 border border-line rounded-xl bg-surface/50 p-8 lg:grid-cols-3">
                {STATS.map((stat, index) => (
                    <div key={index} className="text-center">
                        <p className="font-mono text-3xl font-semibold text-accent lg:text-4xl">
                            {stat.value}
                        </p>
                        <p className="mt-2 text-sm text-neutral-500">{stat.label}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default About;
