import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { TextField } from './TextField'

describe('TextField', () => {
  it('associates the label with the input', () => {
    render(<TextField label="Email" onChange={() => {}} />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('calls onChange as the user types', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TextField label="Email" onChange={onChange} />)

    await user.type(screen.getByLabelText('Email'), 'a')

    expect(onChange).toHaveBeenCalled()
  })

  it('wires an error message via aria-describedby and aria-invalid', () => {
    render(<TextField label="Email" onChange={() => {}} error="Enter a valid email." />)

    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')

    const describedBy = input.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    const errorNode = document.getElementById(describedBy!.split(' ')[0]!)
    expect(errorNode).toHaveTextContent('Enter a valid email.')
  })

  it('wires helper text and error together when both are present', () => {
    render(
      <TextField
        label="Email"
        onChange={() => {}}
        helperText="We'll never share this."
        error="Enter a valid email."
      />,
    )

    const input = screen.getByLabelText('Email');
    const ids = input.getAttribute('aria-describedby')!.split(' ');
    expect(ids).toHaveLength(2)
  })

  it('has no accessibility violations, with or without an error', async () => {
    const { container } = render(
      <>
        <TextField label="Email" onChange={() => {}} />
        <TextField label="Password" type="password" onChange={() => {}} error="Too short." required />
      </>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
