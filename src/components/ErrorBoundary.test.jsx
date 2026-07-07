import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

function Bomb() {
    throw new Error('boom');
}

describe('ErrorBoundary', () => {
    it('renders children when there is no error', () => {
        render(
            <MemoryRouter>
                <ErrorBoundary>
                    <p>All good</p>
                </ErrorBoundary>
            </MemoryRouter>,
        );
        expect(screen.getByText('All good')).toBeInTheDocument();
    });

    it('renders a fallback instead of crashing the app when a child throws', () => {
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <MemoryRouter>
                <ErrorBoundary>
                    <Bomb />
                </ErrorBoundary>
            </MemoryRouter>,
        );

        expect(screen.getByText('This demo hit an error')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /back to portfolio/i })).toBeInTheDocument();

        consoleError.mockRestore();
    });
});
