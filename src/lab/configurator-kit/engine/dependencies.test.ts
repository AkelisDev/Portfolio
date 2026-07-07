import { describe, expect, it } from 'vitest'
import { evaluateRule, getVisibleFields, isFieldVisible } from './dependencies'
import type { ConfiguratorSchema, FieldSchema } from './types'

describe('evaluateRule', () => {
  it('evaluates a simple equals condition', () => {
    expect(evaluateRule({ field: 'color', equals: 'red' }, { color: 'red' })).toBe(true)
    expect(evaluateRule({ field: 'color', equals: 'red' }, { color: 'blue' })).toBe(false)
  })

  it('evaluates notEquals, in, greaterThan, and lessThan', () => {
    expect(evaluateRule({ field: 'tier', notEquals: 'free' }, { tier: 'pro' })).toBe(true)
    expect(evaluateRule({ field: 'tier', in: ['pro', 'enterprise'] }, { tier: 'pro' })).toBe(true)
    expect(evaluateRule({ field: 'tier', in: ['pro', 'enterprise'] }, { tier: 'free' })).toBe(false)
    expect(evaluateRule({ field: 'ram', greaterThan: 16 }, { ram: 32 })).toBe(true)
    expect(evaluateRule({ field: 'ram', lessThan: 16 }, { ram: 32 })).toBe(false)
  })

  it('short-circuits numeric comparisons against non-numeric values', () => {
    expect(evaluateRule({ field: 'ram', greaterThan: 16 }, { ram: 'unlimited' })).toBe(false)
  })

  it('combines conditions with "all" (AND)', () => {
    const rule = {
      all: [
        { field: 'cpuTier', equals: 'high' },
        { field: 'budget', greaterThan: 1000 },
      ],
    }
    expect(evaluateRule(rule, { cpuTier: 'high', budget: 1500 })).toBe(true)
    expect(evaluateRule(rule, { cpuTier: 'high', budget: 500 })).toBe(false)
  })

  it('combines conditions with "any" (OR)', () => {
    const rule = {
      any: [
        { field: 'cpuTier', equals: 'high' },
        { field: 'gpuTier', equals: 'high' },
      ],
    }
    expect(evaluateRule(rule, { cpuTier: 'entry', gpuTier: 'high' })).toBe(true)
    expect(evaluateRule(rule, { cpuTier: 'entry', gpuTier: 'entry' })).toBe(false)
  })

  it('supports nested composite rules', () => {
    const rule = {
      all: [
        { field: 'personalize', equals: true },
        { any: [{ field: 'size', equals: 'xl' }, { field: 'size', equals: 'xxl' }] },
      ],
    }
    expect(evaluateRule(rule, { personalize: true, size: 'xl' })).toBe(true)
    expect(evaluateRule(rule, { personalize: true, size: 'm' })).toBe(false)
    expect(evaluateRule(rule, { personalize: false, size: 'xl' })).toBe(false)
  })
})

describe('isFieldVisible / getVisibleFields', () => {
  const engravingField: FieldSchema = {
    id: 'engravingText',
    type: 'text',
    label: 'Engraving',
    showIf: { field: 'customEngraving', equals: true },
  }

  it('is visible when there is no showIf rule', () => {
    const field: FieldSchema = { id: 'size', type: 'text', label: 'Size' }
    expect(isFieldVisible(field, {})).toBe(true)
  })

  it('respects showIf against current values', () => {
    expect(isFieldVisible(engravingField, { customEngraving: true })).toBe(true)
    expect(isFieldVisible(engravingField, { customEngraving: false })).toBe(false)
    expect(isFieldVisible(engravingField, {})).toBe(false)
  })

  it('filters a schema down to only its visible fields', () => {
    const schema: ConfiguratorSchema = {
      id: 'test',
      title: 'Test',
      currency: 'USD',
      basePrice: 0,
      fields: [{ id: 'customEngraving', type: 'checkbox', label: 'Engrave' }, engravingField],
    }

    expect(getVisibleFields(schema, { customEngraving: false }).map((f) => f.id)).toEqual([
      'customEngraving',
    ])
    expect(getVisibleFields(schema, { customEngraving: true }).map((f) => f.id)).toEqual([
      'customEngraving',
      'engravingText',
    ])
  })
})
