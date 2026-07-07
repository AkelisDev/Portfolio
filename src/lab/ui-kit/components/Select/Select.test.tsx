import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Select } from './Select'

const OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

describe('Select', () => {
  it('shows the placeholder when nothing is selected', () => {
    render(<Select label="Fruit" options={OPTIONS} value={null} onChange={() => {}} placeholder="Pick one" />)
    expect(screen.getByRole('combobox', { name: /fruit/i })).toHaveTextContent('Pick one')
  })

  it('shows the selected option label', () => {
    render(<Select label="Fruit" options={OPTIONS} value="banana" onChange={() => {}} />)
    expect(screen.getByRole('combobox')).toHaveTextContent('Banana')
  })

  it('opens the listbox on click and closes after selecting an option', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Select label="Fruit" options={OPTIONS} value={null} onChange={onChange} />)

    const trigger = screen.getByRole('combobox')
    await user.click(trigger)
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    await user.click(screen.getByRole('option', { name: 'Cherry' }))

    expect(onChange).toHaveBeenCalledWith('cherry')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('opens on ArrowDown and navigates with the keyboard without moving focus off the trigger', async () => {
    const user = userEvent.setup()
    render(<Select label="Fruit" options={OPTIONS} value={null} onChange={() => {}} />)

    const trigger = screen.getByRole('combobox')
    trigger.focus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-activedescendant')
    expect(document.activeElement).toBe(trigger)

    await user.keyboard('{ArrowDown}{ArrowDown}')
    const activeId = trigger.getAttribute('aria-activedescendant')
    expect(document.getElementById(activeId!)).toHaveTextContent('Cherry')
  })

  it('selects the active option on Enter and reports the choice', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Select label="Fruit" options={OPTIONS} value={null} onChange={onChange} />)

    const trigger = screen.getByRole('combobox')
    trigger.focus()
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}')

    expect(onChange).toHaveBeenCalledWith('banana')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('closes without selecting on Escape', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Select label="Fruit" options={OPTIONS} value={null} onChange={onChange} />)

    const trigger = screen.getByRole('combobox')
    trigger.focus()
    await user.keyboard('{ArrowDown}{Escape}')

    expect(onChange).not.toHaveBeenCalled()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('jumps to an option via typeahead', async () => {
    const user = userEvent.setup()
    render(<Select label="Fruit" options={OPTIONS} value={null} onChange={() => {}} />)

    const trigger = screen.getByRole('combobox')
    trigger.focus()
    await user.keyboard('c')

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    const activeId = trigger.getAttribute('aria-activedescendant')
    expect(document.getElementById(activeId!)).toHaveTextContent('Cherry')
  })

  it('closes when clicking outside the component', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <Select label="Fruit" options={OPTIONS} value={null} onChange={() => {}} />
        <button type="button">Outside</button>
      </div>,
    )

    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Outside' }))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('has no accessibility violations open or closed', async () => {
    const { container, rerender } = render(
      <Select label="Fruit" options={OPTIONS} value="apple" onChange={() => {}} error="Required" />,
    )
    expect(await axe(container)).toHaveNoViolations()

    const user = userEvent.setup()
    await user.click(screen.getByRole('combobox'))
    rerender(<Select label="Fruit" options={OPTIONS} value="apple" onChange={() => {}} error="Required" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
