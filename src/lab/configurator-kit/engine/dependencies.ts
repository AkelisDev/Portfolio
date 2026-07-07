import type { ConfiguratorSchema, ConfiguratorValues, Condition, DependencyRule, FieldSchema } from './types'

function evaluateCondition(condition: Condition, values: ConfiguratorValues): boolean {
  const actual = values[condition.field]

  if ('equals' in condition) return actual === condition.equals
  if ('notEquals' in condition) return actual !== condition.notEquals
  if ('in' in condition) return condition.in.includes(actual)
  if ('greaterThan' in condition) return typeof actual === 'number' && actual > condition.greaterThan
  if ('lessThan' in condition) return typeof actual === 'number' && actual < condition.lessThan

  return true
}

export function evaluateRule(rule: DependencyRule, values: ConfiguratorValues): boolean {
  if ('all' in rule) return rule.all.every((child) => evaluateRule(child, values))
  if ('any' in rule) return rule.any.some((child) => evaluateRule(child, values))
  return evaluateCondition(rule, values)
}

export function isFieldVisible(field: FieldSchema, values: ConfiguratorValues): boolean {
  if (!field.showIf) return true
  return evaluateRule(field.showIf, values)
}

export function getVisibleFields(schema: ConfiguratorSchema, values: ConfiguratorValues): FieldSchema[] {
  return schema.fields.filter((field) => isFieldVisible(field, values))
}
