import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const ConfiguratorKitPage = lazy(() => import("./pages/ConfiguratorKitPage.tsx"));
const UiKitPage = lazy(() => import("./pages/UiKitPage.tsx"));

const LabPageFallback = () => (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-8">
        <p className="font-mono text-sm text-neutral-500">Loading…</p>
    </div>
);

const LazyLabRoute = ({ children }) => (
    <ErrorBoundary>
        <Suspense fallback={<LabPageFallback />}>{children}</Suspense>
    </ErrorBoundary>
);

const App = () => {
    return (
        <MotionConfig reducedMotion="user">
            <HashRouter>
                <div className="overflow-x-hidden bg-ink text-neutral-300 antialiased selection:bg-accent/30 selection:text-cyan-100">
                    <div className="fixed inset-0 -z-10 h-full w-full bg-ink bg-blueprint bg-grid">
                        <div className="absolute inset-0 [background:radial-gradient(120%_120%_at_50%_0%,transparent_35%,#050506_100%)]" />
                    </div>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/lab/configurator-kit"
                            element={
                                <LazyLabRoute>
                                    <ConfiguratorKitPage />
                                </LazyLabRoute>
                            }
                        />
                        <Route
                            path="/lab/ui-kit"
                            element={
                                <LazyLabRoute>
                                    <UiKitPage />
                                </LazyLabRoute>
                            }
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </HashRouter>
        </MotionConfig>
    );
};

export default App;
