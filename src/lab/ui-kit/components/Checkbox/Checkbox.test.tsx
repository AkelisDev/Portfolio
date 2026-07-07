import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('associates the visible label with the input via htmlFor', () => {
    render(<Checkbox label="Accept terms" onChange={() => {}} />)
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
  })

  it('toggles on click and calls onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox label="Accept terms" onChange={onChange} />)

    await user.click(screen.getByLabelText('Accept terms'))

    expect(onChange).toHaveBeenCalledOnce()
  })

  it('sets the DOM indeterminate property, which has no HTML attribute equivalent', () => {
    render(<Checkbox label="Select all" checked={false} onChange={() => {}} indeterminate />)
    const input = screen.getByLabelText('Select all') as HTMLInputElement
    expect(input.indeterminate).toBe(true)
  })

  it('forwards a ref while still managing indeterminate internally', () => {
    let node: HTMLInputElement | null = null
    render(
      <Checkbox
        label="Select all"
        onChange={() => {}}
        indeterminate
        ref={(el) => {
          node = el
        }}
      />,
    )
    expect(node).toBeInstanceOf(HTMLInputElement);
    expect((node as unknown as HTMLInputElement).indeterminate).toBe(true)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <>
        <Checkbox label="Accept terms" onChange={() => {}} />
        <Checkbox label="Disabled option" onChange={() => {}} disabled />
      </>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
