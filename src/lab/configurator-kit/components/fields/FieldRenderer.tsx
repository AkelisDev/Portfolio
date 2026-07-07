import type { FieldSchema, FieldValue } from '../../engine/types'
import { TextFieldInput } from './TextFieldInput'
import { NumberFieldInput } from './NumberFieldInput'
import { SelectFieldInput } from './SelectFieldInput'
import { RadioFieldInput } from './RadioFieldInput'
import { SliderFieldInput } from './SliderFieldInput'
import { CheckboxFieldInput } from './CheckboxFieldInput'
import { ColorFieldInput } from './ColorFieldInput'

interface Props {
  field: FieldSchema
  domId: string
  value: FieldValue | undefined
  error: string | null
  onChange: (fieldId: string, value: FieldValue) => void
  onBlur: (fieldId: string) => void
}

export function FieldRenderer({ field, domId, value, error, onChange, onBlur }: Props) {
  const handleBlur = () => onBlur(field.id)

  switch (field.type) {
    case 'text':
      return (
        <TextFieldInput
          field={field}
          domId={domId}
          value={(value as string) ?? ''}
          error={error}
          onChange={(next) => onChange(field.id, next)}
          onBlur={handleBlur}
        />
      )
    case 'number':
      return (
        <NumberFieldInput
          field={field}
          domId={domId}
          value={value as number | undefined}
          error={error}
          onChange={(next) => onChange(field.id, next)}
          onBlur={handleBlur}
        />
      )
    case 'select':
      return (
        <SelectFieldInput
          field={field}
          domId={domId}
          value={value as string | undefined}
          error={error}
          onChange={(next) => onChange(field.id, next)}
          onBlur={handleBlur}
        />
      )
    case 'radio':
      return (
        <RadioFieldInput
          field={field}
          domId={domId}
          value={value as string | undefined}
          error={error}
          onChange={(next) => onChange(field.id, next)}
          onBlur={handleBlur}
        />
      )
    case 'slider':
      return (
        <SliderFieldInput
          field={field}
          domId={domId}
          value={value as number}
          error={error}
          onChange={(next) => onChange(field.id, next)}
          onBlur={handleBlur}
        />
      )
    case 'checkbox':
      return (
        <CheckboxFieldInput
          field={field}
          domId={domId}
          value={value as boolean}
          error={error}
          onChange={(next) => onChange(field.id, next)}
          onBlur={handleBlur}
        />
      )
    case 'color':
      return (
        <ColorFieldInput
          field={field}
          domId={domId}
          value={value as string | undefined}
          error={error}
          onChange={(next) => onChange(field.id, next)}
          onBlur={handleBlur}
        />
      )
  }
}
