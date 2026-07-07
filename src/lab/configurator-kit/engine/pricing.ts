import type { ConfiguratorValues, FieldSchema } from './types'

function fieldContribution(field: FieldSchema, values: ConfiguratorValues): number {
  const value = values[field.id]

  switch (field.type) {
    case 'select':
    case 'radio': {
      const option = field.options.find((candidate) => candidate.value === value)
      return option?.priceModifier ?? 0
    }
    case 'color': {
      const option = field.options.find((candidate) => candidate.value === value)
      return option?.priceModifier ?? 0
    }
    case 'checkbox':
      return value === true ? (field.priceModifier ?? 0) : 0
    case 'number':
    case 'slider':
      return typeof value === 'number' ? value * (field.priceMultiplier ?? 0) : 0
    case 'text':
      return 0
  }
}

export function calculatePrice(
  basePrice: number,
  visibleFields: FieldSchema[],
  values: ConfiguratorValues,
): number {
  const total = visibleFields.reduce((sum, field) => sum + fieldContribution(field, values), basePrice)
  return Math.round(total * 100) / 100
}
