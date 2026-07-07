import { useMemo } from 'react'
import { useConfiguratorStore } from '../store'
import { getVisibleFields } from '../engine/dependencies'
import { calculatePrice } from '../engine/pricing'
import { describeFieldValue } from '../engine/summary'

export function SummaryPanel() {
  const schema = useConfiguratorStore((state) => state.schema)
  const values = useConfiguratorStore((state) => state.values)

  const visibleFields = useMemo(() => getVisibleFields(schema, values), [schema, values])
  const price = useMemo(
    () => calculatePrice(schema.basePrice, visibleFields, values),
    [schema.basePrice, visibleFields, values],
  )

  const formattedPrice = useMemo(
    () => new Intl.NumberFormat('en-US', { style: 'currency', currency: schema.currency }).format(price),
    [price, schema.currency],
  )

  return (
    <aside className="flex h-fit flex-col gap-4 rounded-xl border border-line bg-ink/50 p-6">
      <div>
        <h2 className="text-lg font-semibold text-neutral-100">{schema.title}</h2>
        {schema.description && <p className="mt-1 text-sm text-neutral-500">{schema.description}</p>}
      </div>

      <dl className="flex flex-col gap-2 border-t border-line pt-4">
        {visibleFields.map((field) => (
          <div key={field.id} className="flex items-baseline justify-between gap-4 text-sm">
            <dt className="text-neutral-500">{field.label || field.id}</dt>
            <dd className="text-right font-medium text-neutral-200">{describeFieldValue(field, values)}</dd>
          </div>
        ))}
      </dl>

      <div className="flex items-baseline justify-between border-t border-line pt-4">
        <span className="text-sm text-neutral-500">Price</span>
        <span className="font-mono text-2xl font-semibold text-accent">{formattedPrice}</span>
      </div>
    </aside>
  )
}
