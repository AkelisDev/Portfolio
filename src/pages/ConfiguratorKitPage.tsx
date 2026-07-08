import { Link } from 'react-router-dom'
import { RiArrowLeftLine, RiGithubFill } from 'react-icons/ri'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { schemas, bikeBuilderSchema } from '../lab/configurator-kit/schemas'
import { ConfiguratorProvider, useConfiguratorStore } from '../lab/configurator-kit/store'
import { ConfiguratorForm } from '../lab/configurator-kit/components/ConfiguratorForm'
import { SummaryPanel } from '../lab/configurator-kit/components/SummaryPanel'

const SOURCE_URL = 'https://github.com/AkelisDev/configurator-kit'

const STATS = [
    { value: '3', label: 'Example domains' },
    { value: '7', label: 'Field types' },
    { value: '32', label: 'Tests passing' },
]

const SCHEMA_SNIPPET = `{
  id: 'discBrakes',
  type: 'checkbox',
  label: 'Hydraulic disc brakes',
  priceModifier: 75,
},
{
  id: 'engravingText',
  type: 'text',
  label: 'Engraving text',
  showIf: { field: 'customEngraving', equals: true },
  validation: [{ type: 'required' }, { type: 'maxLength', value: 20 }],
}`

const ConfiguratorDemo = () => {
    useDocumentTitle('configurator-kit — Žilvinas Akelis')
    const activeSchemaId = useConfiguratorStore((state) => state.schema.id)
    const loadSchema = useConfiguratorStore((state) => state.loadSchema)

    return (
        <div className="container mx-auto px-8 py-12">
            <Link to="/" className="flex items-center gap-2 text-sm text-neutral-400 transition hover:text-accent">
                <RiArrowLeftLine />
                Back to portfolio
            </Link>

            <header className="mb-10 mt-8 border-b border-line pb-10">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">configurator-kit</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">
                    Schema-driven product configurator engine
                </h1>
                <p className="mt-3 max-w-2xl text-neutral-400">
                    One generic engine — dependency rules, live pricing, and validation — rendering three
                    unrelated product domains from plain schema data below. It's the public, non-proprietary
                    version of the same problem I solve daily on Ryterna's product configurator platform.
                </p>

                <a
                    href={SOURCE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-md border border-accent/40 px-4 py-2 text-sm text-accent transition hover:bg-accent/10"
                >
                    <RiGithubFill />
                    View source on GitHub
                </a>

                <div className="mt-8 grid grid-cols-3 gap-6 rounded-xl border border-line bg-surface/50 p-6">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="font-mono text-2xl font-semibold text-accent lg:text-3xl">{stat.value}</p>
                            <p className="mt-1 text-xs text-neutral-500">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </header>

            <div role="tablist" aria-label="Example schemas" className="mb-6 flex flex-wrap gap-2">
                {schemas.map((schema) => (
                    <button
                        key={schema.id}
                        role="tab"
                        aria-selected={schema.id === activeSchemaId}
                        onClick={() => loadSchema(schema)}
                        className={`rounded-md border px-3 py-1.5 text-sm transition ${
                            schema.id === activeSchemaId
                                ? 'border-accent bg-accent/10 text-accent'
                                : 'border-line text-neutral-400 hover:border-neutral-600 hover:text-neutral-200'
                        }`}
                    >
                        {schema.title}
                    </button>
                ))}
            </div>

            <div className="overflow-hidden rounded-xl border border-line">
                <div className="bg-ink bg-blueprint bg-grid p-8">
                    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                        <ConfiguratorForm />
                        <SummaryPanel />
                    </div>
                </div>
                <div className="border-t border-line bg-surface px-5 py-4">
                    <p className="mb-2 font-mono text-xs uppercase tracking-wide text-neutral-500">
                        Two fields from the bike builder schema — plain data, not custom code
                    </p>
                    <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-neutral-400">
                        <code>{SCHEMA_SNIPPET}</code>
                    </pre>
                </div>
            </div>
        </div>
    )
}

const ConfiguratorKitPage = () => {
    return (
        <ConfiguratorProvider schema={bikeBuilderSchema}>
            <ConfiguratorDemo />
        </ConfiguratorProvider>
    )
}

export default ConfiguratorKitPage
