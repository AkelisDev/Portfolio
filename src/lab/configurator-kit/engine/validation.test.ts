import { describe, expect, it } from 'vitest'
import { validateField, validateFields } from './validation'
import type { FieldSchema } from './types'

describe('validateField', () => {
  it('returns null when the field has no validation rules', () => {
    const field: FieldSchema = { id: 'note', type: 'text', label: 'Note' }
    expect(validateField(field, {})).toBeNull()
  })

  it('flags a missing required value', () => {
    const field: FieldSchema = {
      id: 'size',
      type: 'select',
      label: 'Size',
      options: [],
      validation: [{ type: 'required' }],
    }
    expect(validateField(field, {})).toBe('This field is required.')
    expect(validateField(field, { size: 'm' })).toBeNull()
  })

  it('uses a custom message when provided', () => {
    const field: FieldSchema = {
      id: 'size',
      type: 'select',
      label: 'Size',
      options: [],
      validation: [{ type: 'required', message: 'Pick a size.' }],
    }
    expect(validateField(field, {})).toBe('Pick a size.')
  })

  it('enforces min and max for numeric fields', () => {
    const field: FieldSchema = {
      id: 'quantity',
      type: 'number',
      label: 'Quantity',
      validation: [{ type: 'min', value: 1 }, { type: 'max', value: 10 }],
    }
    expect(validateField(field, { quantity: 0 })).toContain('at least 1')
    expect(validateField(field, { quantity: 11 })).toContain('at most 10')
    expect(validateField(field, { quantity: 5 })).toBeNull()
  })

  it('enforces minLength and maxLength for text fields', () => {
    const field: FieldSchema = {
      id: 'engravingText',
      type: 'text',
      label: 'Engraving',
      validation: [{ type: 'maxLength', value: 5 }],
    }
    expect(validateField(field, { engravingText: 'toolong' })).toContain('at most 5')
    expect(validateField(field, { engravingText: 'ok' })).toBeNull()
  })

  it('enforces a pattern on non-empty strings only', () => {
    const field: FieldSchema = {
      id: 'code',
      type: 'text',
      label: 'Code',
      validation: [{ type: 'pattern', value: '^[A-Z]{3}$', message: 'Three uppercase letters.' }],
    }
    expect(validateField(field, { code: 'abc' })).toBe('Three uppercase letters.')
    expect(validateField(field, { code: 'ABC' })).toBeNull()
    expect(validateField(field, {})).toBeNull()
  })

  it('reports only the first failing rule', () => {
    const field: FieldSchema = {
      id: 'name',
      type: 'text',
      label: 'Name',
      validation: [{ type: 'required', message: 'Required.' }, { type: 'maxLength', value: 3 }],
    }
    expect(validateField(field, {})).toBe('Required.')
  })
})

describe('validateFields', () => {
  it('only reports errors for fields that are passed in as visible', () => {
    const requiredText: FieldSchema = {
      id: 'a',
      type: 'text',
      label: 'A',
      validation: [{ type: 'required' }],
    }
    const requiredNumber: FieldSchema = {
      id: 'b',
      type: 'number',
      label: 'B',
      validation: [{ type: 'required' }],
    }

    expect(validateFields([requiredText], {})).toEqual({ a: 'This field is required.' })
    expect(validateFields([requiredText, requiredNumber], {})).toEqual({
      a: 'This field is required.',
      b: 'This field is required.',
    })
  })
})
