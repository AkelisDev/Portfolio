import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { cx } from '../../utils/cx'

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string
  error?: string
  helperText?: string
  id?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, helperText, id, className, required, ...rest }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const helperId = `${inputId}-helper`
    const errorId = `${inputId}-error`

    const describedBy = [helperText ? helperId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-neutral-200">
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-red-400">
              *
            </span>
          )}
        </label>
        {helperText && (
          <p id={helperId} className="text-xs text-neutral-500">
            {helperText}
          </p>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cx(
            'rounded-md border bg-ink px-3 py-2 text-sm text-neutral-100 outline-none transition',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
            error ? 'border-red-500' : 'border-line focus:border-accent',
            className,
          )}
          {...rest}
        />
        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    )
  },
)

TextField.displayName = 'TextField'
