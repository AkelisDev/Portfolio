import { create } from 'zustand'
import type { ConfiguratorSchema, ConfiguratorValues, FieldValue } from '../engine/types'
import { getDefaultValues } from '../engine/types'

export interface ConfiguratorState {
  schema: ConfiguratorSchema
  values: ConfiguratorValues
  touched: Record<string, boolean>
  loadSchema: (schema: ConfiguratorSchema) => void
  setValue: (fieldId: string, value: FieldValue) => void
  touchField: (fieldId: string) => void
  touchAll: (fieldIds: string[]) => void
}

export function createConfiguratorStore(initialSchema: ConfiguratorSchema) {
  return create<ConfiguratorState>((set) => ({
    schema: initialSchema,
    values: getDefaultValues(initialSchema),
    touched: {},

    loadSchema: (schema) =>
      set({
        schema,
        values: getDefaultValues(schema),
        touched: {},
      }),

    setValue: (fieldId, value) =>
      set((state) => ({
        values: { ...state.values, [fieldId]: value },
      })),

    touchField: (fieldId) =>
      set((state) => ({
        touched: { ...state.touched, [fieldId]: true },
      })),

    touchAll: (fieldIds) =>
      set((state) => ({
        touched: { ...state.touched, ...Object.fromEntries(fieldIds.map((id) => [id, true])) },
      })),
  }))
}
