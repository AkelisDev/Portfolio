import type { ReactNode } from 'react'

interface FieldShellProps {
  fieldId: string
  label: string
  description?: string
  error?: string | null
  children: ReactNode
}

export function FieldShell({ fieldId, label, description, error, children }: FieldShellProps) {
  const errorId = `${fieldId}-error`
  const descriptionId = `${fieldId}-description`

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label id={`${fieldId}-label`} htmlFor={fieldId} className="text-sm font-medium text-neutral-200">
          {label}
        </label>
      )}
      {description && (
        <p id={descriptionId} className="text-xs text-neutral-500">
          {description}
        </p>
      )}
      {children}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
