import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { RiArrowDownSLine, RiCheckLine } from 'react-icons/ri'
import { cx } from '../../utils/cx'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  label: string
  options: SelectOption[]
  value: string | null
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: string
  id?: string
}

const TYPEAHEAD_RESET_MS = 500

export function Select({ label, options, value, onChange, placeholder = 'Select an option', disabled, error, id }: SelectProps) {
  const generatedId = useId()
  const baseId = id ?? generatedId
  const triggerId = `${baseId}-trigger`
  const listboxId = `${baseId}-listbox`
  const errorId = `${baseId}-error`

  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const containerRef = useRef<HTMLDivElement>(null)
  const optionRefs = useRef<Array<HTMLLIElement | null>>([])
  const typeaheadRef = useRef({ query: '', timeout: 0 })

  const selectedIndex = options.findIndex((option) => option.value === value)
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  useEffect(() => {
    if (isOpen && activeIndex >= 0) {
      optionRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' })
    }
  }, [isOpen, activeIndex])

  const openAt = (index: number) => {
    setIsOpen(true)
    setActiveIndex(index)
  }

  const commitActive = () => {
    if (activeIndex >= 0 && options[activeIndex]) {
      onChange(options[activeIndex].value)
    }
    setIsOpen(false)
  }

  const jumpToTypedLetter = (letter: string) => {
    window.clearTimeout(typeaheadRef.current.timeout)
    typeaheadRef.current.query += letter.toLowerCase()
    const query = typeaheadRef.current.query

    const searchFrom = isOpen ? activeIndex + 1 : 0
    const ordered = [...options.slice(searchFrom), ...options.slice(0, searchFrom)]
    const match = ordered.find((option) => option.label.toLowerCase().startsWith(query))

    if (match) {
      const matchIndex = options.indexOf(match)
      if (isOpen) setActiveIndex(matchIndex)
      else openAt(matchIndex)
    }

    typeaheadRef.current.timeout = window.setTimeout(() => {
      typeaheadRef.current.query = ''
    }, TYPEAHEAD_RESET_MS)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault()
        if (!isOpen) {
          openAt(selectedIndex >= 0 ? selectedIndex : 0)
        } else {
          setActiveIndex((current) => Math.min(current + 1, options.length - 1))
        }
        return
      }
      case 'ArrowUp': {
        event.preventDefault()
        if (!isOpen) {
          openAt(selectedIndex >= 0 ? selectedIndex : options.length - 1)
        } else {
          setActiveIndex((current) => Math.max(current - 1, 0))
        }
        return
      }
      case 'Home': {
        if (!isOpen) return
        event.preventDefault()
        setActiveIndex(0)
        return
      }
      case 'End': {
        if (!isOpen) return
        event.preventDefault()
        setActiveIndex(options.length - 1)
        return
      }
      case 'Enter':
      case ' ': {
        event.preventDefault()
        if (!isOpen) {
          openAt(selectedIndex >= 0 ? selectedIndex : 0)
        } else {
          commitActive()
        }
        return
      }
      case 'Escape': {
        if (!isOpen) return
        event.preventDefault()
        setIsOpen(false)
        return
      }
      case 'Tab': {
        setIsOpen(false)
        return
      }
      default: {
        if (event.key.length === 1 && /\S/.test(event.key)) {
          jumpToTypedLetter(event.key)
        }
      }
    }
  }

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      <label id={`${baseId}-label`} htmlFor={triggerId} className="text-sm font-medium text-neutral-200">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          id={triggerId}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={isOpen && activeIndex >= 0 ? `${baseId}-option-${activeIndex}` : undefined}
          aria-labelledby={`${baseId}-label ${triggerId}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          disabled={disabled}
          onClick={() => (isOpen ? setIsOpen(false) : openAt(selectedIndex >= 0 ? selectedIndex : 0))}
          onKeyDown={handleKeyDown}
          className={cx(
            'flex w-full items-center justify-between gap-2 rounded-md border bg-ink px-3 py-2 text-left text-sm text-neutral-100 outline-none transition',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-red-500' : 'border-line',
          )}
        >
          <span className={selectedOption ? '' : 'text-neutral-500'}>{selectedOption?.label ?? placeholder}</span>
          <RiArrowDownSLine
            aria-hidden="true"
            className={cx('shrink-0 text-neutral-500 transition-transform duration-150', isOpen && 'rotate-180')}
          />
        </button>

        {isOpen && (
          <ul
            id={listboxId}
            role="listbox"
            aria-labelledby={`${baseId}-label`}
            className="animate-pop-in absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-white/10 bg-surface py-1 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)]"
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={`${baseId}-option-${index}`}
                role="option"
                aria-selected={option.value === value}
                ref={(el) => {
                  optionRefs.current[index] = el
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={cx(
                  'flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm text-neutral-200',
                  index === activeIndex && 'bg-accent/20 text-white',
                  option.value === value && 'font-medium',
                )}
              >
                {option.label}
                {option.value === value && <RiCheckLine aria-hidden="true" className="text-accent" />}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
