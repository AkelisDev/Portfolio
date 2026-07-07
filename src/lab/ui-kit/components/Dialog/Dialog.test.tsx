import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Dialog } from './Dialog'

function Harness({ initialOpen = false }: { initialOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(initialOpen)
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open dialog
      </button>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm action">
        <p>Are you sure?</p>
        <button type="button">Cancel</button>
        <button type="button">Confirm</button>
      </Dialog>
    </div>
  )
}

describe('Dialog', () => {
  it('renders nothing when closed', () => {
    render(
      <Dialog isOpen={false} onClose={() => {}} title="Hidden">
        content
      </Dialog>,
)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders the title and content when open', () => {
    render(
      <Dialog isOpen onClose={() => {}} title="Confirm action">
        <p>Are you sure?</p>
      </Dialog>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAccessibleName('Confirm action')
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()
  })

  it('moves focus into the dialog when it opens', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.click(screen.getByRole('button', { name: 'Open dialog' }))

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Cancel' }))
  })

  it('returns focus to the trigger element after closing', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    const trigger = screen.getByRole('button', { name: 'Open dialog' })
    await user.click(trigger)
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.activeElement).toBe(trigger)
  })

  it('calls onClose on Escape', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Dialog isOpen onClose={onClose} title="Confirm action">
        content
      </Dialog>,
    )

    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when clicking the backdrop but not when clicking dialog content', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Dialog isOpen onClose={onClose} title="Confirm action">
        <p>Are you sure?</p>
      </Dialog>,
    )

    await user.click(screen.getByText('Are you sure?'))
    expect(onClose).not.toHaveBeenCalled()

    await user.click(screen.getByRole('dialog').previousSibling as Element)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('traps Tab focus within the dialog', async () => {
    const user = userEvent.setup()
    render(<Harness initialOpen />)

    const cancel = screen.getByRole('button', { name: 'Cancel' })
    const confirm = screen.getByRole('button', { name: 'Confirm' })
    expect(document.activeElement).toBe(cancel)

    await user.tab()
    expect(document.activeElement).toBe(confirm)

    await user.tab()
    expect(document.activeElement).toBe(cancel)

    await user.tab({ shift: true })
    expect(document.activeElement).toBe(confirm)
  })

  it('has no accessibility violations while open', async () => {
    const { baseElement } = render(
      <Dialog isOpen onClose={() => {}} title="Confirm action">
        <p>Are you sure?</p>
      </Dialog>,
    )
    expect(await axe(baseElement)).toHaveNoViolations()
  })
})
