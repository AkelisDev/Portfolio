import type { SelectField } from '../../engine/types'
import { FieldShell } from './FieldShell'
import { describedBy } from './aria'

interface Props {
  field: SelectField
  domId: string
  value: string | undefined
  error: string | null
  onChange: (value: string) => void
  onBlur: () => void
}

export function SelectFieldInput({ field, domId, value, error, onChange, onBlur }: Props) {
  return (
    <FieldShell fieldId={domId} label={field.label} description={field.description} error={error}>
      <select
        id={domId}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(domId, Boolean(field.description), Boolean(error))}
        className="rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-cyan-400"
      >
        <option value="" disabled>
          Select an option
        </option>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}
