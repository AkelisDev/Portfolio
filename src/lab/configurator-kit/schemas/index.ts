import type { ConfiguratorSchema } from '../engine/types'
import { bikeBuilderSchema } from './bikeBuilder'
import { pcBuildSchema } from './pcBuild'
import { apparelCustomizerSchema } from './apparelCustomizer'

export const schemas: ConfiguratorSchema[] = [bikeBuilderSchema, pcBuildSchema, apparelCustomizerSchema]

export { bikeBuilderSchema, pcBuildSchema, apparelCustomizerSchema }
