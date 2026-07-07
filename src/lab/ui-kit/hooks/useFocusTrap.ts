import { useEffect, type RefObject } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
}

export function useFocusTrap(containerRef: RefObject<HTMLElement | null>, isActive: boolean) {
  useEffect(() => {
    if (!isActive) return

    const container = containerRef.current
    if (!container) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const focusable = getFocusableElements(container)
    ;(focusable[0] ?? container).focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const focusableNow = getFocusableElements(container)
      if (focusableNow.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusableNow[0]!
      const last = focusableNow[focusableNow.length - 1]!
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [isActive, containerRef])
}
