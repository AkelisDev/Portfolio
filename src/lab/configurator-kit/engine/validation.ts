import type { ConfiguratorValues, FieldSchema, ValidationRule } from './types'

type FieldValueLike = string | number | boolean | undefined

function isEmpty(value: FieldValueLike): boolean {
  return value === undefined || value === null || value === ''
}

function checkRule(rule: ValidationRule, value: FieldValueLike): string | null {
  switch (rule.type) {
    case 'required':
      return isEmpty(value) ? (rule.message ?? 'This field is required.') : null
    case 'min':
      return typeof value === 'number' && value < rule.value
        ? (rule.message ?? `Must be at least ${rule.value}.`)
        : null
    case 'max':
      return typeof value === 'number' && value > rule.value
        ? (rule.message ?? `Must be at most ${rule.value}.`)
        : null
    case 'minLength':
      return typeof value === 'string' && value.length < rule.value
        ? (rule.message ?? `Must be at least ${rule.value} characters.`)
        : null
    case 'maxLength':
      return typeof value === 'string' && value.length > rule.value
        ? (rule.message ?? `Must be at most ${rule.value} characters.`)
        : null
    case 'pattern':
      return typeof value === 'string' && value !== '' && !new RegExp(rule.value).test(value)
        ? (rule.message ?? 'Value is not in the expected format.')
        : null
  }
}

export function validateField(field: FieldSchema, values: ConfiguratorValues): string | null {
  if (!field.validation) return null

  const value = values[field.id]
  for (const rule of field.validation) {
    const error = checkRule(rule, value)
    if (error) return error
  }
  return null
}

export function validateFields(
  visibleFields: FieldSchema[],
  values: ConfiguratorValues,
): Record<string, string> {
  const errors: Record<string, string> = {}
  for (const field of visibleFields) {
    const error = validateField(field, values)
    if (error) errors[field.id] = error
  }
  return errors
}
