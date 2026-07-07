import '@testing-library/jest-dom/vitest'
import { afterEach, expect } from 'vitest'
import { cleanup } from '@testing-library/react'
import { toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

afterEach(() => {
  cleanup()
})

// jsdom doesn't implement layout/scrolling; components that call this in effects need a no-op here.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}

interface AxeMatchers<R = unknown> {
  toHaveNoViolations(): R
}

declare module 'vitest' {
  interface Assertion<T = any> extends AxeMatchers<T> {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
