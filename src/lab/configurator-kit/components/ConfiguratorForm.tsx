import { useId, useMemo, useState, type FormEvent } from 'react'
import { useConfiguratorStore } from '../store'
import { getVisibleFields } from '../engine/dependencies'
import { validateFields } from '../engine/validation'
import { FieldRenderer } from './fields/FieldRenderer'

export function ConfiguratorForm() {
  const instanceId = useId()
  const schema = useConfiguratorStore((state) => state.schema)
  const values = useConfiguratorStore((state) => state.values)
  const touched = useConfiguratorStore((state) => state.touched)
  const setValue = useConfiguratorStore((state) => state.setValue)
  const touchField = useConfiguratorStore((state) => state.touchField)
  const touchAll = useConfiguratorStore((state) => state.touchAll)

  const [submitted, setSubmitted] = useState(false)

  const visibleFields = useMemo(() => getVisibleFields(schema, values), [schema, values])
  const errors = useMemo(() => validateFields(visibleFields, values), [visibleFields, values])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    touchAll(visibleFields.map((field) => field.id))
    setSubmitted(Object.keys(errors).length === 0)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {visibleFields.map((field) => (
        <FieldRenderer
          key={field.id}
          field={field}
          domId={`${instanceId}-${field.id}`}
          value={values[field.id]}
          error={touched[field.id] ? (errors[field.id] ?? null) : null}
          onChange={(fieldId, value) => {
            setValue(fieldId, value)
            setSubmitted(false)
          }}
          onBlur={touchField}
        />
      ))}
      <button
        type="submit"
        className="mt-2 rounded-md bg-cyan-400 px-4 py-2.5 text-sm font-medium text-neutral-950 shadow-md shadow-cyan-400/20 transition-all duration-150 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/30 active:scale-[0.98] active:shadow-sm"
      >
        Review order
      </button>
      {submitted && (
        <p role="status" className="text-sm text-emerald-400">
          Configuration is valid — ready to submit.
        </p>
      )}
    </form>
  )
}
