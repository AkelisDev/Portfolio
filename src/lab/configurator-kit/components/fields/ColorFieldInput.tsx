import type { ColorField } from '../../engine/types'
import { FieldShell } from './FieldShell'

interface Props {
  field: ColorField
  domId: string
  value: string | undefined
  error: string | null
  onChange: (value: string) => void
  onBlur: () => void
}

export function ColorFieldInput({ field, domId, value, error, onChange, onBlur }: Props) {
  return (
    <FieldShell fieldId={domId} label={field.label} description={field.description} error={error}>
      <div role="radiogroup" aria-labelledby={`${domId}-label`} className="flex flex-wrap gap-3">
        {field.options.map((option) => {
          const selected = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              title={option.label}
              onClick={() => onChange(option.value)}
              onBlur={onBlur}
              className={`h-8 w-8 rounded-full border-2 transition ${
                selected ? 'border-cyan-400 ring-2 ring-cyan-400/40' : 'border-neutral-700'
              }`}
              style={{ backgroundColor: option.swatch }}
            />
          )
        })}
      </div>
    </FieldShell>
  )
}
