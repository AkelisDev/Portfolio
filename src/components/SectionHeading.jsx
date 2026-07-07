import React from 'react';
import { motion } from "framer-motion";

const SectionHeading = ({ index, title, accent }) => {
    return (
        <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -30 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14 flex items-center justify-center gap-4">
            <span className="font-mono text-sm text-accent">{index}</span>
            <span className="h-px w-10 bg-line" />
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">
                {title}
                {accent && <span className="text-neutral-500"> {accent}</span>}
            </h2>
            <span className="h-px w-10 bg-line" />
        </motion.div>
    );
};

export default SectionHeading;
