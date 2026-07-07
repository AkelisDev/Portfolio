import React from 'react';
import { Link } from 'react-router-dom';
import { RiArrowLeftLine } from 'react-icons/ri';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('Lab route crashed:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-8 text-center">
                    <p className="font-mono text-sm text-accent">Something broke</p>
                    <h1 className="mt-2 text-2xl font-semibold text-neutral-100">This demo hit an error</h1>
                    <p className="mt-3 max-w-md text-neutral-400">
                        The rest of the site is unaffected — this is isolated to this page.
                    </p>
                    <Link
                        to="/"
                        className="mt-6 flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm text-neutral-300 transition hover:border-accent hover:text-accent"
                    >
                        <RiArrowLeftLine />
                        Back to portfolio
                    </Link>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
