import { RiCheckLine } from 'react-icons/ri'
import type { CheckboxField } from '../../engine/types'
import { FieldShell } from './FieldShell'
import { describedBy } from './aria'

interface Props {
  field: CheckboxField
  domId: string
  value: boolean
  error: string | null
  onChange: (value: boolean) => void
  onBlur: () => void
}

export function CheckboxFieldInput({ field, domId, value, error, onChange, onBlur }: Props) {
  return (
    <FieldShell fieldId={domId} label="" description={field.description} error={error}>
      <label htmlFor={domId} className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-200">
        <span className="group relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
          <input
            id={domId}
            type="checkbox"
            checked={value ?? false}
            onChange={(event) => onChange(event.target.checked)}
            onBlur={onBlur}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy(domId, Boolean(field.description), Boolean(error))}
            className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none flex h-full w-full items-center justify-center rounded-[5px] border border-neutral-700 bg-neutral-950 transition-colors duration-150 group-has-[:checked]:border-cyan-400 group-has-[:checked]:bg-cyan-400 group-has-[:focus-visible]:outline group-has-[:focus-visible]:outline-2 group-has-[:focus-visible]:outline-offset-2 group-has-[:focus-visible]:outline-cyan-400"
          >
            <RiCheckLine className="h-3.5 w-3.5 scale-50 text-neutral-950 opacity-0 transition-all duration-150 group-has-[:checked]:scale-100 group-has-[:checked]:opacity-100" />
          </span>
        </span>
        {field.label}
      </label>
    </FieldShell>
  )
}
