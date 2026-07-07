import type { ConfiguratorSchema } from '../engine/types'

export const pcBuildSchema: ConfiguratorSchema = {
  id: 'pc-build',
  title: 'PC Build Configurator',
  description: 'Pick components for a custom desktop build.',
  currency: 'USD',
  basePrice: 300,
  fields: [
    {
      id: 'cpuTier',
      type: 'select',
      label: 'Processor',
      defaultValue: 'mid',
      validation: [{ type: 'required' }],
      options: [
        { value: 'entry', label: 'Entry (6-core)' },
        { value: 'mid', label: 'Mid (8-core)', priceModifier: 180 },
        { value: 'high', label: 'High-end (16-core)', priceModifier: 520 },
      ],
    },
    {
      id: 'gpuTier',
      type: 'select',
      label: 'Graphics card',
      defaultValue: 'none',
      options: [
        { value: 'none', label: 'Integrated graphics' },
        { value: 'mid', label: 'Mid-range GPU', priceModifier: 320 },
        { value: 'high', label: 'High-end GPU', priceModifier: 850 },
      ],
    },
    {
      id: 'ramGb',
      type: 'slider',
      label: 'Memory (RAM)',
      defaultValue: 16,
      min: 8,
      max: 64,
      step: 8,
      unit: ' GB',
      priceMultiplier: 4,
    },
    {
      id: 'storageType',
      type: 'radio',
      label: 'Storage',
      defaultValue: 'ssd-512',
      options: [
        { value: 'ssd-512', label: '512 GB SSD' },
        { value: 'ssd-1tb', label: '1 TB SSD', priceModifier: 60 },
        { value: 'ssd-2tb', label: '2 TB SSD', priceModifier: 140 },
      ],
    },
    {
      id: 'liquidCooling',
      type: 'checkbox',
      label: 'Liquid cooling',
      description: 'Recommended for high-end processors.',
      defaultValue: false,
      priceModifier: 130,
      showIf: { field: 'cpuTier', equals: 'high' },
    },
    {
      id: 'rgbLighting',
      type: 'checkbox',
      label: 'RGB case lighting',
      defaultValue: false,
      priceModifier: 35,
    },
    {
      id: 'caseColor',
      type: 'color',
      label: 'Case color',
      defaultValue: 'black',
      options: [
        { value: 'black', label: 'Black', swatch: '#111827' },
        { value: 'white', label: 'White', swatch: '#f3f4f6' },
        { value: 'gunmetal', label: 'Gunmetal', swatch: '#4b5563', priceModifier: 25 },
      ],
    },
  ],
}
