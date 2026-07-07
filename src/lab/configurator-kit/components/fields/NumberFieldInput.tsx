import type { NumberField } from '../../engine/types'
import { FieldShell } from './FieldShell'
import { describedBy } from './aria'

interface Props {
  field: NumberField
  domId: string
  value: number | undefined
  error: string | null
  onChange: (value: number) => void
  onBlur: () => void
}

export function NumberFieldInput({ field, domId, value, error, onChange, onBlur }: Props) {
  return (
    <FieldShell fieldId={domId} label={field.label} description={field.description} error={error}>
      <input
        id={domId}
        type="number"
        value={value ?? ''}
        min={field.min}
        max={field.max}
        step={field.step ?? 1}
        onChange={(event) => onChange(Number(event.target.value))}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(domId, Boolean(field.description), Boolean(error))}
        className="rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-cyan-400"
      />
    </FieldShell>
  )
}
