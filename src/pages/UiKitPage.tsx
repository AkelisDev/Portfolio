import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { RiArrowLeftLine, RiGithubFill } from 'react-icons/ri'
import { scrollToId } from '../utils/scrollToId.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { Button } from '../lab/ui-kit/components/Button/Button'
import { Checkbox } from '../lab/ui-kit/components/Checkbox/Checkbox'
import { TextField } from '../lab/ui-kit/components/TextField/TextField'
import { Select } from '../lab/ui-kit/components/Select/Select'
import { Dialog } from '../lab/ui-kit/components/Dialog/Dialog'

const SOURCE_URL = 'https://github.com/MethGuys/ui-kit'

const FRUIT_OPTIONS = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
]

const STATS = [
    { value: '5', label: 'Components' },
    { value: '32', label: 'Tests' },
    { value: '0', label: 'Axe violations' },
]

const SECTIONS = [
    { id: 'button', label: 'Button' },
    { id: 'checkbox', label: 'Checkbox' },
    { id: 'textfield', label: 'TextField' },
    { id: 'select', label: 'Select' },
    { id: 'dialog', label: 'Dialog' },
]

interface DemoCardProps {
    id: string
    title: string
    description: string
    checks: string[]
    code: string
    children: ReactNode
}

function DemoCard({ id, title, description, checks, code, children }: DemoCardProps) {
    return (
        <section id={id} className="scroll-mt-24 py-10">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-neutral-100">{title}</h2>
                    <p className="mt-1 max-w-xl text-sm text-neutral-500">{description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {checks.map((check) => (
                        <span
                            key={check}
                            className="whitespace-nowrap rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[11px] text-accent"
                        >
                            ✓ {check}
                        </span>
                    ))}
                </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-line">
                <div className="flex flex-wrap items-center gap-4 bg-ink bg-blueprint bg-grid p-8">{children}</div>
                <pre className="overflow-x-auto border-t border-line bg-surface px-5 py-4 font-mono text-xs leading-relaxed text-neutral-400">
                    <code>{code}</code>
                </pre>
            </div>
        </section>
    );
}

function Sidebar() {
    return (
        <div className="sticky top-12 flex flex-col gap-8">
            <Link to="/" className="flex items-center gap-2 text-sm text-neutral-400 transition hover:text-accent">
                <RiArrowLeftLine />
                Back to portfolio
            </Link>

            <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">ui-kit</p>
                <p className="mt-1.5 text-sm text-neutral-500">Accessible component library</p>
            </div>

            <nav aria-label="Component sections" className="flex flex-col gap-0.5">
                {SECTIONS.map((section) => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        onClick={(event) => scrollToId(event, section.id)}
                        className="rounded-md px-3 py-1.5 text-sm text-neutral-400 transition hover:bg-white/5 hover:text-neutral-100"
                    >
                        {section.label}
                    </a>
                ))}
            </nav>

            <div className="grid grid-cols-3 gap-3 border-t border-line pt-6">
                {STATS.map((stat) => (
                    <div key={stat.label}>
                        <p className="font-mono text-lg font-semibold text-accent">{stat.value}</p>
                        <p className="mt-0.5 text-[11px] leading-tight text-neutral-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            <a
                href={SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-t border-line pt-6 text-sm text-neutral-400 transition hover:text-accent"
            >
                <RiGithubFill />
                View source
            </a>
        </div>
    );
}

const UiKitPage = () => {
    useDocumentTitle('ui-kit — Žilvinas Akelis');

    const [email, setEmail] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [fruit, setFruit] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="container mx-auto px-8 py-12">
            <div className="flex gap-12">
                <aside className="hidden w-52 shrink-0 lg:block">
                    <Sidebar />
                </aside>

                <main className="min-w-0 flex-1">
                    <header className="mb-8 border-b border-line pb-8 lg:hidden">
                        <Link to="/" className="flex items-center gap-2 text-sm text-neutral-400 transition hover:text-accent">
                            <RiArrowLeftLine />
                            Back to portfolio
                        </Link>
                        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">ui-kit</p>
                        <h1 className="mt-2 text-2xl font-semibold text-neutral-50">Accessible component library</h1>
                        <p className="mt-2 max-w-xl text-sm text-neutral-500">
                            Five components, each keyboard-operable, screen-reader labeled, and checked against
                            automated accessibility violations in every test file.
                        </p>
                        <a
                            href={SOURCE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-2 rounded-md border border-accent/40 px-4 py-2 text-sm text-accent transition hover:bg-accent/10"
                        >
                            <RiGithubFill />
                            View source on GitHub
                        </a>
                        <nav aria-label="Component sections" className="mt-6 flex flex-wrap gap-2">
                            {SECTIONS.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    onClick={(event) => scrollToId(event, section.id)}
                                    className="rounded-md border border-line px-3 py-1.5 text-sm text-neutral-400 transition hover:border-accent hover:text-accent"
                                >
                                    {section.label}
                                </a>
                            ))}
                        </nav>
                    </header>

                    <p className="mb-8 hidden max-w-xl text-sm text-neutral-500 lg:block">
                        The Select below is a from-scratch ARIA combobox, not a wrapped native element; the Dialog
                        implements a real focus trap with restoration.
                    </p>

                    <div className="divide-y divide-line">
                        <DemoCard
                            id="button"
                            title="Button"
                            description="Variants, sizes, loading and disabled states."
                            checks={['Focus visible', 'Axe-clean']}
                            code={`<Button variant="primary">Save</Button>\n<Button variant="secondary">Cancel</Button>\n<Button isLoading>Saving…</Button>`}
                        >
                            <Button variant="primary">Primary</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="danger">Danger</Button>
                            <Button isLoading={isLoading} onClick={() => setIsLoading(true)}>
                                {isLoading ? 'Saving…' : 'Click to load'}
                            </Button>
                        </DemoCard>

                        <DemoCard
                            id="checkbox"
                            title="Checkbox"
                            description="Labelled input with indeterminate-state support."
                            checks={['Label association', 'Axe-clean']}
                            code={`<Checkbox\n  label="I agree to the terms"\n  checked={agreed}\n  onChange={(e) => setAgreed(e.target.checked)}\n/>`}
                        >
                            <Checkbox label="I agree to the terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                            <Checkbox label="Disabled option" disabled />
                        </DemoCard>

                        <DemoCard
                            id="textfield"
                            title="TextField"
                            description="Label, helper text, and validation error composed into one aria-describedby."
                            checks={['aria-describedby', 'Axe-clean']}
                            code={`<TextField\n  label="Email"\n  value={email}\n  onChange={(e) => setEmail(e.target.value)}\n  error={isInvalid ? 'Enter a valid email.' : undefined}\n/>`}
                        >
                            <TextField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                helperText="We'll never share this."
                                error={email.length > 0 && !email.includes('@') ? 'Enter a valid email.' : undefined}
                            />
                        </DemoCard>

                        <DemoCard
                            id="select"
                            title="Select"
                            description="Custom accessible combobox — full keyboard nav (arrows, Home/End, typeahead), no native <select>."
                            checks={['Keyboard nav', 'Typeahead', 'Axe-clean']}
                            code={`<Select\n  label="Favorite fruit"\n  options={FRUIT_OPTIONS}\n  value={fruit}\n  onChange={setFruit}\n/>`}
                        >
                            <div className="w-56">
                                <Select label="Favorite fruit" options={FRUIT_OPTIONS} value={fruit} onChange={setFruit} />
                            </div>
                        </DemoCard>

                        <DemoCard
                            id="dialog"
                            title="Dialog"
                            description="Focus trap, Escape to close, focus returns to the trigger on close."
                            checks={['Focus trap', 'Focus restoration', 'Axe-clean']}
                            code={`<Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="Delete item">\n  <p>This action can't be undone.</p>\n</Dialog>`}
                        >
                            <Button onClick={() => setIsDialogOpen(true)}>Open dialog</Button>
                            <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Delete item">
                                <p className="text-sm text-neutral-400">This action can't be undone.</p>
                                <div className="mt-6 flex justify-end gap-3">
                                    <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="danger" onClick={() => setIsDialogOpen(false)}>
                                        Delete
                                    </Button>
                                </div>
                            </Dialog>
                        </DemoCard>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UiKitPage;
