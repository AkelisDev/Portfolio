import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Button } from './Button'

describe('Button', () => {
  it('renders its label and responds to clicks', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save</Button>)

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled and unclickable while loading', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} isLoading>
        Save
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Save' })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')

    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('respects an explicit disabled prop', () => {
    render(<Button disabled>Save</Button>)
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
  })

  it('forwards a ref to the underlying button element', () => {
    let node: HTMLButtonElement | null = null
    render(
      <Button
        ref={(el) => {
          node = el
        }}
      >
        Save
      </Button>,
    )
    expect(node).toBeInstanceOf(HTMLButtonElement)
  })

  it('has no accessibility violations in any variant', async () => {
    const { container } = render(
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button isLoading>Loading</Button>
      </>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
