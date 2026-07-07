import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cx } from '../../utils/cx'

export type ButtonVariant = 'primary' | 'secondary' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white shadow-md shadow-accent/20 hover:bg-accent-dim hover:shadow-lg hover:shadow-accent/30 active:shadow-sm',
  secondary:
    'border border-line bg-transparent text-neutral-100 shadow-sm hover:border-neutral-500 hover:bg-white/5',
  danger: 'bg-red-600 text-white shadow-md shadow-red-950/40 hover:bg-red-500 hover:shadow-lg hover:shadow-red-950/50 active:shadow-sm',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, disabled, className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        className={cx(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-150',
          'active:scale-[0.98]',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none',
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          className,
        )}
        {...rest}
      >
        {isLoading && (
          <span
            aria-hidden="true"
            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
        )}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
