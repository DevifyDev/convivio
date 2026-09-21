export type MenuItem = {
  name: string
  description: string
  price: string
}

export type MenuCategory =
  | 'Lorem'
  | 'Ipsum'
  | 'Dolor'
  | 'Sit'
  | 'Amet'
  | 'Consectetur'
  | 'Elit'

export const menuCategories: MenuCategory[] = [
  'Lorem',
  'Ipsum',
  'Dolor',
  'Sit',
  'Amet',
  'Consectetur',
  'Elit'
]

export const menuItemsByCategory: Record<MenuCategory, MenuItem[]> = {
  Lorem: [
    {
      name: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet',
      price: '$18.00'
    }
  ],

  Ipsum: [
    {
      name: 'Ipsum Dolor',
      description: 'Consectetur adipiscing elit',
      price: '$22.00'
    }
  ],

  Dolor: [
    {
      name: 'Amet Elit',
      description: 'Integer vitae lorem ipsum',
      price: '$22.00'
    },
  ],

  Sit: [
    {
      name: 'Ipsum Amet',
      description: 'Malesuada lorem tincidunt',
      price: '$26.00'
    },
  ],

  Amet: [
    {
      name: 'Dolor Vitae',
      description: 'Lorem ipsum consectetur',
      price: '$30.00'
    }
  ],

  Consectetur: [
    {
      name: 'Sapien Elit',
      description: 'Integer vitae lorem sed',
      price: '$32.00'
    },
  ],

  Elit: [
    {
      name: 'Praesent Vitae',
      description: 'Donec vitae lectus sapien',
      price: '$28.00'
    },
  ]
}