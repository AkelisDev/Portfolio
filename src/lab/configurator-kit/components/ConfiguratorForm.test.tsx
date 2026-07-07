import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { ConfiguratorForm } from './ConfiguratorForm'
import { ConfiguratorProvider } from '../store'
import { bikeBuilderSchema } from '../schemas'

function renderWithProvider(ui: ReactNode) {
  return render(<ConfiguratorProvider schema={bikeBuilderSchema}>{ui}</ConfiguratorProvider>)
}

describe('ConfiguratorForm', () => {
  it('renders the fields that are visible by default', () => {
    renderWithProvider(<ConfiguratorForm />)

    expect(screen.getByLabelText('Frame size')).toBeInTheDocument()
    expect(screen.getByLabelText('Add custom frame engraving')).toBeInTheDocument()
    expect(screen.queryByLabelText('Engraving text')).not.toBeInTheDocument()
  })

  it('reveals a dependent field once its condition is met', async () => {
    const user = userEvent.setup()
    renderWithProvider(<ConfiguratorForm />)

    await user.click(screen.getByLabelText('Add custom frame engraving'))

    expect(screen.getByLabelText('Engraving text')).toBeInTheDocument()
  })

  it('shows a validation error only after the field has been touched and submitted', async () => {
    const user = userEvent.setup()
    renderWithProvider(<ConfiguratorForm />)

    await user.click(screen.getByLabelText('Add custom frame engraving'))
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Review order' }))

    expect(screen.getByRole('alert')).toHaveTextContent('This field is required.')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('confirms the configuration once all visible fields are valid', async () => {
    const user = userEvent.setup()
    renderWithProvider(<ConfiguratorForm />)

    await user.click(screen.getByRole('button', { name: 'Review order' }))

    expect(screen.getByRole('status')).toHaveTextContent('ready to submit')
  })

  it('keeps state fully isolated between independent provider instances', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <>
        <div data-testid="instance-a">
          <ConfiguratorProvider schema={bikeBuilderSchema}>
            <ConfiguratorForm />
          </ConfiguratorProvider>
        </div>
        <div data-testid="instance-b">
          <ConfiguratorProvider schema={bikeBuilderSchema}>
            <ConfiguratorForm />
          </ConfiguratorProvider>
        </div>
      </>,
    )

    const instanceA = within(container.querySelector('[data-testid="instance-a"]')!)
    const instanceB = within(container.querySelector('[data-testid="instance-b"]')!)

    await user.click(instanceA.getByLabelText('Add custom frame engraving'))

    expect(instanceA.getByLabelText('Engraving text')).toBeInTheDocument()
    expect(instanceB.queryByLabelText('Engraving text')).not.toBeInTheDocument()
  })
})
