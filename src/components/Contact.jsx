import React from 'react';
import { CONTACT, RESUME_URL } from "../constants/index.js";
import { motion } from "framer-motion";
import { RiMailLine, RiPhoneLine, RiMapPinLine, RiFileDownloadLine } from "react-icons/ri";
import SectionHeading from "./SectionHeading.jsx";

const Contact = () => {
    return (
        <div id="contact" className="scroll-mt-24 pb-24">
            <SectionHeading index="05" title="Get in touch" />
            <motion.div
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-2xl rounded-xl border border-line bg-surface/50 p-8 text-center lg:p-12">
                <p className="mb-8 text-neutral-400">
                    Open to new opportunities and interesting engineering problems.
                    The fastest way to reach me is email.
                </p>
                <div className="mb-8 flex flex-col items-center gap-4">
                    <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-lg text-neutral-200 transition hover:text-accent">
                        <RiMailLine className="text-accent" /> {CONTACT.email}
                    </a>
                    <p className="flex items-center gap-3 text-neutral-400">
                        <RiPhoneLine className="text-accent" /> {CONTACT.phoneNo}
                    </p>
                    <p className="flex items-center gap-3 text-neutral-400">
                        <RiMapPinLine className="text-accent" /> {CONTACT.address}
                    </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <a
                        href={`mailto:${CONTACT.email}`}
                        className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-ink transition hover:bg-accent/90">
                        Say hello
                    </a>
                    <a
                        href={RESUME_URL}
                        download="Zilvinas_Akelis_CV.pdf"
                        className="flex items-center gap-2 rounded-md border border-line px-6 py-3 text-sm text-neutral-300 transition hover:border-accent hover:text-accent">
                        <RiFileDownloadLine />
                        Download resume
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
