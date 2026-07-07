import type { TextField } from '../../engine/types'
import { FieldShell } from './FieldShell'
import { describedBy } from './aria'

interface Props {
  field: TextField
  domId: string
  value: string
  error: string | null
  onChange: (value: string) => void
  onBlur: () => void
}

export function TextFieldInput({ field, domId, value, error, onChange, onBlur }: Props) {
  return (
    <FieldShell fieldId={domId} label={field.label} description={field.description} error={error}>
      <input
        id={domId}
        type="text"
        value={value ?? ''}
        placeholder={field.placeholder}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(domId, Boolean(field.description), Boolean(error))}
        className="rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-cyan-400"
      />
    </FieldShell>
  )
}
