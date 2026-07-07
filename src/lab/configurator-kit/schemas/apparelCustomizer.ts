import type { ConfiguratorSchema } from '../engine/types'

export const apparelCustomizerSchema: ConfiguratorSchema = {
  id: 'apparel-customizer',
  title: 'Hoodie Customizer',
  description: 'Configure a hoodie order for a team or event.',
  currency: 'USD',
  basePrice: 35,
  fields: [
    {
      id: 'size',
      type: 'select',
      label: 'Size',
      defaultValue: 'm',
      validation: [{ type: 'required' }],
      options: [
        { value: 'xs', label: 'XS' },
        { value: 's', label: 'S' },
        { value: 'm', label: 'M' },
        { value: 'l', label: 'L' },
        { value: 'xl', label: 'XL' },
        { value: 'xxl', label: 'XXL', priceModifier: 4 },
      ],
    },
    {
      id: 'color',
      type: 'color',
      label: 'Color',
      defaultValue: 'black',
      options: [
        { value: 'black', label: 'Black', swatch: '#0a0a0a' },
        { value: 'heather-gray', label: 'Heather Gray', swatch: '#9ca3af' },
        { value: 'forest-green', label: 'Forest Green', swatch: '#166534' },
        { value: 'burgundy', label: 'Burgundy', swatch: '#7f1d1d' },
      ],
    },
    {
      id: 'fabric',
      type: 'radio',
      label: 'Fabric weight',
      defaultValue: 'standard',
      options: [
        { value: 'standard', label: 'Standard fleece' },
        { value: 'heavyweight', label: 'Heavyweight fleece', priceModifier: 8 },
        { value: 'organic', label: 'Organic cotton blend', priceModifier: 12 },
      ],
    },
    {
      id: 'quantity',
      type: 'number',
      label: 'Quantity',
      defaultValue: 1,
      min: 1,
      max: 100,
      step: 1,
    },
    {
      id: 'personalize',
      type: 'checkbox',
      label: 'Add a name or number',
      defaultValue: false,
      priceModifier: 6,
    },
    {
      id: 'personalizationText',
      type: 'text',
      label: 'Text to print',
      placeholder: 'e.g. AKELIS 7',
      showIf: { field: 'personalize', equals: true },
      validation: [{ type: 'required' }, { type: 'maxLength', value: 12 }],
    },
  ],
}
