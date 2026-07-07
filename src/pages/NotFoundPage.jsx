import React from 'react';
import { Link } from 'react-router-dom';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";

const NotFoundPage = () => {
    useDocumentTitle('Page not found — Žilvinas Akelis');

    return (
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-8 text-center">
            <p className="font-mono text-sm text-accent">404</p>
            <h1 className="mt-2 text-3xl font-semibold text-neutral-100">Page not found</h1>
            <p className="mt-3 max-w-md text-neutral-400">
                There's nothing here. The page may have moved, or the link was mistyped.
            </p>
            <Link
                to="/"
                className="mt-6 flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm text-neutral-300 transition hover:border-accent hover:text-accent">
                <RiArrowLeftLine />
                Back to portfolio
            </Link>
        </div>
    );
};

export default NotFoundPage;
