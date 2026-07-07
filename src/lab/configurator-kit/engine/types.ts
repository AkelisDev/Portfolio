export type FieldValue = string | number | boolean

export type ConfiguratorValues = Record<string, FieldValue>

export type Condition =
  | { field: string; equals: FieldValue }
  | { field: string; notEquals: FieldValue }
  | { field: string; in: FieldValue[] }
  | { field: string; greaterThan: number }
  | { field: string; lessThan: number }

export type DependencyRule = Condition | { all: DependencyRule[] } | { any: DependencyRule[] }

export type ValidationRule =
  | { type: 'required'; message?: string }
  | { type: 'min'; value: number; message?: string }
  | { type: 'max'; value: number; message?: string }
  | { type: 'minLength'; value: number; message?: string }
  | { type: 'maxLength'; value: number; message?: string }
  | { type: 'pattern'; value: string; message?: string }

interface BaseField {
  id: string
  label: string
  description?: string
  showIf?: DependencyRule
  validation?: ValidationRule[]
}

export interface TextField extends BaseField {
  type: 'text'
  placeholder?: string
  defaultValue?: string
}

export interface NumberField extends BaseField {
  type: 'number'
  min?: number
  max?: number
  step?: number
  defaultValue?: number
  priceMultiplier?: number
}

export interface SelectOption {
  value: string
  label: string
  priceModifier?: number
}

export interface SelectField extends BaseField {
  type: 'select' | 'radio'
  options: SelectOption[]
  defaultValue?: string
}

export interface SliderField extends BaseField {
  type: 'slider'
  min: number
  max: number
  step?: number
  unit?: string
  defaultValue?: number
  priceMultiplier?: number
}

export interface CheckboxField extends BaseField {
  type: 'checkbox'
  defaultValue?: boolean
  priceModifier?: number
}

export interface ColorOption {
  value: string
  label: string
  swatch: string
  priceModifier?: number
}

export interface ColorField extends BaseField {
  type: 'color'
  options: ColorOption[]
  defaultValue?: string
}

export type FieldSchema =
  | TextField
  | NumberField
  | SelectField
  | SliderField
  | CheckboxField
  | ColorField

export interface ConfiguratorSchema {
  id: string
  title: string
  description?: string
  currency: string
  basePrice: number
  fields: FieldSchema[]
}

export function getDefaultValues(schema: ConfiguratorSchema): ConfiguratorValues {
  const values: ConfiguratorValues = {}
  for (const field of schema.fields) {
    if (field.defaultValue !== undefined) {
      values[field.id] = field.defaultValue
    }
  }
  return values
}
