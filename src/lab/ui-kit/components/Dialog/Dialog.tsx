import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { cx } from '../../utils/cx'

export interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}

export function Dialog({ isOpen, onClose, title, children, className }: DialogProps) {
  const generatedId = useId()
  const titleId = `${generatedId}-title`
  const containerRef = useRef<HTMLDivElement>(null)

  useFocusTrap(containerRef, isOpen)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        className="animate-overlay-in absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cx(
          'animate-pop-in relative z-10 w-full max-w-md rounded-xl border border-white/10 bg-surface p-6 outline-none',
          'shadow-[0_25px_80px_-20px_rgba(0,0,0,0.9)]',
          'before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:rounded-t-xl before:bg-white/10',
          className,
        )}
      >
        <h2 id={titleId} className="text-lg font-semibold text-neutral-100">
          {title}
        </h2>
        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
