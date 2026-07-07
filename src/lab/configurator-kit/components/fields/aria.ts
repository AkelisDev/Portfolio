export function describedBy(fieldId: string, hasDescription: boolean, hasError: boolean): string | undefined {
  const ids = [hasDescription ? `${fieldId}-description` : null, hasError ? `${fieldId}-error` : null].filter(
    Boolean,
  )
  return ids.length ? ids.join(' ') : undefined
}
