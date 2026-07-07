import type { ConfiguratorValues, FieldSchema } from './types'

export function describeFieldValue(field: FieldSchema, values: ConfiguratorValues): string {
  const value = values[field.id]

  switch (field.type) {
    case 'select':
    case 'radio':
      return field.options.find((option) => option.value === value)?.label ?? '—'
    case 'color':
      return field.options.find((option) => option.value === value)?.label ?? '—'
    case 'checkbox':
      return value === true ? 'Yes' : 'No'
    case 'slider':
      return typeof value === 'number' ? `${value}${field.unit ?? ''}` : '—'
    case 'number':
      return typeof value === 'number' ? String(value) : '—'
    case 'text':
      return typeof value === 'string' && value !== '' ? value : '—'
  }
}
