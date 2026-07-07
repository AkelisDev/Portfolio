import { createContext, useContext, useState, type ReactNode } from 'react'
import { createConfiguratorStore, type ConfiguratorState } from './configuratorStore'
import type { ConfiguratorSchema } from '../engine/types'

type ConfiguratorStoreHook = ReturnType<typeof createConfiguratorStore>

const ConfiguratorStoreContext = createContext<ConfiguratorStoreHook | null>(null)

export interface ConfiguratorProviderProps {
  schema: ConfiguratorSchema
  children: ReactNode
}

export function ConfiguratorProvider({ schema, children }: ConfiguratorProviderProps) {
  const [useStoreHook] = useState(() => createConfiguratorStore(schema))
  return <ConfiguratorStoreContext.Provider value={useStoreHook}>{children}</ConfiguratorStoreContext.Provider>
}

export function useConfiguratorStore<T>(selector: (state: ConfiguratorState) => T): T {
  const useStoreHook = useContext(ConfiguratorStoreContext)
  if (!useStoreHook) {
    throw new Error('useConfiguratorStore must be used within a <ConfiguratorProvider>')
  }
  return useStoreHook(selector)
}
