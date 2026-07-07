import type { SelectField } from '../../engine/types'
import { FieldShell } from './FieldShell'

interface Props {
  field: SelectField
  domId: string
  value: string | undefined
  error: string | null
  onChange: (value: string) => void
  onBlur: () => void
}

export function RadioFieldInput({ field, domId, value, error, onChange, onBlur }: Props) {
  return (
    <FieldShell fieldId={domId} label={field.label} description={field.description} error={error}>
      <div role="radiogroup" aria-labelledby={`${domId}-label`} className="flex flex-col gap-2.5">
        {field.options.map((option) => {
          const optionId = `${domId}-${option.value}`
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-300"
            >
              <span className="group relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                <input
                  id={optionId}
                  type="radio"
                  name={domId}
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => onChange(option.value)}
                  onBlur={onBlur}
                  className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none flex h-full w-full items-center justify-center rounded-full border border-neutral-700 bg-neutral-950 transition-colors duration-150 group-has-[:checked]:border-cyan-400 group-has-[:focus-visible]:outline group-has-[:focus-visible]:outline-2 group-has-[:focus-visible]:outline-offset-2 group-has-[:focus-visible]:outline-cyan-400"
                >
                  <span className="h-2 w-2 scale-0 rounded-full bg-cyan-400 transition-transform duration-150 group-has-[:checked]:scale-100" />
                </span>
              </span>
              {option.label}
            </label>
          )
        })}
      </div>
    </FieldShell>
  )
}
