import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { SummaryPanel } from './SummaryPanel'
import { ConfiguratorForm } from './ConfiguratorForm'
import { ConfiguratorProvider } from '../store'
import { bikeBuilderSchema } from '../schemas'

function renderWithProvider(ui: ReactNode) {
  return render(<ConfiguratorProvider schema={bikeBuilderSchema}>{ui}</ConfiguratorProvider>)
}

describe('SummaryPanel', () => {
  it('shows the base price plus the default options baked into the schema', () => {
    renderWithProvider(<SummaryPanel />)
    // basePrice 450 + 1 default bottle holder * 8/unit = 458.
    expect(screen.getByText('$458.00')).toBeInTheDocument()
  })

  it('updates the price live as options are selected in the form', async () => {
    const user = userEvent.setup()
    renderWithProvider(
      <>
        <ConfiguratorForm />
        <SummaryPanel />
      </>,
    )

    await user.click(screen.getByLabelText('Hydraulic disc brakes'))

    expect(screen.getByText('$533.00')).toBeInTheDocument()
  })

  it('lists the currently visible fields with their selected values', () => {
    renderWithProvider(<SummaryPanel />)
    expect(screen.getByText('Matte Black')).toBeInTheDocument()
  })
})
