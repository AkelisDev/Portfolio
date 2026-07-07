import { forwardRef, useEffect, useId, useRef, type InputHTMLAttributes, type Ref, type RefCallback } from 'react'
import { RiCheckLine, RiSubtractLine } from 'react-icons/ri'
import { cx } from '../../utils/cx'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  indeterminate?: boolean
}

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue
      if (typeof ref === 'function') ref(node)
      else (ref as { current: T | null }).current = node
    }
  }
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, indeterminate = false, id, className, disabled, ...rest }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const internalRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate
      }
    }, [indeterminate])

    return (
      <label
        htmlFor={inputId}
        className={cx(
          'inline-flex items-center gap-2.5 text-sm text-neutral-200',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          className,
        )}
      >
        <span className="group relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
          <input
            ref={mergeRefs(ref, internalRef)}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
            {...rest}
          />
          <span
            aria-hidden="true"
            className={cx(
              'pointer-events-none flex h-full w-full items-center justify-center rounded-[5px] border transition-colors duration-150',
              'border-line bg-ink',
              'group-has-[:checked]:border-accent group-has-[:checked]:bg-accent',
              'group-has-[:indeterminate]:border-accent group-has-[:indeterminate]:bg-accent',
              'group-has-[:focus-visible]:outline group-has-[:focus-visible]:outline-2 group-has-[:focus-visible]:outline-offset-2 group-has-[:focus-visible]:outline-accent',
            )}
          >
            <RiCheckLine className="absolute h-3.5 w-3.5 scale-50 text-ink opacity-0 transition-all duration-150 group-has-[:checked]:scale-100 group-has-[:checked]:opacity-100" />
            <RiSubtractLine className="absolute h-3.5 w-3.5 scale-50 text-ink opacity-0 transition-all duration-150 group-has-[:indeterminate]:scale-100 group-has-[:indeterminate]:opacity-100" />
          </span>
        </span>
        {label}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
