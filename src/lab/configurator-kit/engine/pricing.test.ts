import { describe, expect, it } from 'vitest'
import { calculatePrice } from './pricing'
import type { FieldSchema } from './types'

describe('calculatePrice', () => {
  const colorField: FieldSchema = {
    id: 'frameColor',
    type: 'color',
    label: 'Color',
    options: [
      { value: 'black', label: 'Black', swatch: '#000' },
      { value: 'chrome', label: 'Chrome', swatch: '#ccc', priceModifier: 60 },
    ],
  }

  const brakesField: FieldSchema = {
    id: 'discBrakes',
    type: 'checkbox',
    label: 'Disc brakes',
    priceModifier: 75,
  }

  const bottleHoldersField: FieldSchema = {
    id: 'bottleHolders',
    type: 'number',
    label: 'Bottle holders',
    priceMultiplier: 8,
  }

  it('returns the base price when there are no contributing fields', () => {
    expect(calculatePrice(450, [], {})).toBe(450)
  })

  it('adds the priceModifier of the selected option', () => {
    expect(calculatePrice(450, [colorField], { frameColor: 'chrome' })).toBe(510)
    expect(calculatePrice(450, [colorField], { frameColor: 'black' })).toBe(450)
  })

  it('adds a checkbox priceModifier only when checked', () => {
    expect(calculatePrice(450, [brakesField], { discBrakes: true })).toBe(525)
    expect(calculatePrice(450, [brakesField], { discBrakes: false })).toBe(450)
    expect(calculatePrice(450, [brakesField], {})).toBe(450)
  })

  it('multiplies a numeric value by its priceMultiplier', () => {
    expect(calculatePrice(450, [bottleHoldersField], { bottleHolders: 3 })).toBe(474)
  })

  it('ignores fields that are not visible', () => {
    const visibleFields = [colorField]
    expect(calculatePrice(450, visibleFields, { frameColor: 'chrome', discBrakes: true })).toBe(510)
  })

  it('sums contributions across multiple fields', () => {
    expect(
      calculatePrice(450, [colorField, brakesField, bottleHoldersField], {
        frameColor: 'chrome',
        discBrakes: true,
        bottleHolders: 2,
      }),
    ).toBe(450 + 60 + 75 + 16)
  })

  it('rounds away floating-point drift to two decimal places', () => {
    const multiplierField: FieldSchema = {
      id: 'ramGb',
      type: 'number',
      label: 'RAM',
      priceMultiplier: 0.1,
    }
    // 7 * 0.1 is 0.7000000000000001 in raw floating point arithmetic.
    expect(calculatePrice(0, [multiplierField], { ramGb: 7 })).toBe(0.7)
  })
})
