import type { SliderField } from '../../engine/types'
import { FieldShell } from './FieldShell'
import { describedBy } from './aria'

interface Props {
  field: SliderField
  domId: string
  value: number
  error: string | null
  onChange: (value: number) => void
  onBlur: () => void
}

export function SliderFieldInput({ field, domId, value, error, onChange, onBlur }: Props) {
  return (
    <FieldShell fieldId={domId} label={field.label} description={field.description} error={error}>
      <div className="flex items-center gap-3">
        <input
          id={domId}
          type="range"
          min={field.min}
          max={field.max}
          step={field.step ?? 1}
          value={value ?? field.min}
          onChange={(event) => onChange(Number(event.target.value))}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(domId, Boolean(field.description), Boolean(error))}
          className="h-1.5 flex-1 cursor-pointer accent-cyan-400"
        />
        <span className="w-16 shrink-0 text-right font-mono text-sm text-neutral-300">
          {value ?? field.min}
          {field.unit}
        </span>
      </div>
    </FieldShell>
  )
}
