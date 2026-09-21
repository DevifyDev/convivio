export type MenuItem = {
  name: string
  description: string
  price: string
}

export type MenuCategory =
  | 'Small'
  | 'Something Heavier'
  | 'Sides'
  | 'Kids'
  | 'Light & Sweet'
  | 'Red Wine'
  | 'White Wine'
  | 'Cocktails'

export const menuCategories: MenuCategory[] = [
  'Small',
  'Something Heavier',
  'Sides',
  'Kids',
  'Light & Sweet',
  'Red Wine',
  'White Wine',
  'Cocktails'
]

export const menuItemsByCategory: Record<MenuCategory, MenuItem[]> = {
  Small: [
    {
      name: 'Calamari Fritti',
      description: 'with whipped lemon ricotta & hot honey (nf)',
      price: '18'
    },
    {
      name: 'Grilled King Prawns',
      description: 'with smoky paprika sauce & grilled lemon (gf, df, nf)',
      price: '21.5'
    },
    {
      name: 'Grilled Polenta Chips',
      description: 'with anchovy mayo & grana padano (nf, gf)',
      price: '16'
    },
    {
      name: 'Baked Camembert',
      description: 'with roasted grapes & toasted focaccia (nf, v)',
      price: '19'
    },
    {
      name: 'Homemade Olive Focaccia',
      description: 'with olive oil & balsamic (df, nf, v)',
      price: '12.5'
    },
    {
      name: 'Convivio Cured Meat Platter',
      description: '2 pax / 4 pax (df)',
      price: '32'
    }
  ],

  'Something Heavier': [
    {
      name: 'Pumpkin And Stracchino Ravioli',
      description: 'with burnt butter & sage. Manjimup truffle add-on + 15 (nf, v)',
      price: '28'
    },
    {
      name: 'Donnybrook Pink Sirloin 220g',
      description: 'with salsa verde (gf, nf, df)',
      price: '30'
    },
    {
      name: 'Cauliflower Three Ways',
      description: 'with cashew butter and salted seed mix (ve, gf)',
      price: '24.5'
    },
    {
      name: 'Sous Vide Chicken Breast & Olive Caponata',
      description: 'with mint (df, nf)',
      price: '32.5'
    },
  ],

  Sides: [
    {
      name: 'Radicchio Chicory & Rocket Salad',
      description: 'with buttermilk & pistachio (v, gf)',
      price: '11.5'
    },
    {
      name: 'Fennel Salt Fries',
      description: 'with aioli (v, df, nf)',
      price: '10.5'
    },
  ],

  'Kids': [
    {
      name: 'Pasta Bolognese',
      description: '(nf, df)',
      price: '8'
    },
    {
      name: 'Chicken Tenders & Chips',
      description: '(nf, df)',
      price: '8'
    }
  ],

  'Light & Sweet': [
    {
      name: 'Convivio Seasonal Cheese Board',
      description: '',
      price: '29.5'
    },
    {
      name: 'Mr Black & Cointreau Dark Chocolate & Orange Tiramisu',
      description: '(nf)',
      price: '21'
    },
  ],

  'Red Wine': [
    {
      name: '2004 G. B. Montepulciano D\'abruzzo',
      description: 'Abruzzo, Italy',
      price: '14'
    },
    {
      name: '2004 Ministry Of Clouds Tempranillo Grenache',
      description: 'McLaren Vale, South Australia',
      price: '15'
    },
    {
      name: '2004 Yangarra Gsm',
      description: 'McLaren Vale, South Australia',
      price: '18'
    },
    {
      name: '2024 Barringwood Pinot Noir',
      description: 'Tasmania, Australia',
      price: '19'
    },
    {
      name: '2022 San Leonino Chianti Classico',
      description: 'Tuscany, Italy',
      price: '20'
    },
    {
      name: '2022 Fraser Gallop Parterre Cabernet Sauvignon',
      description: 'Margaret River, Western Australia',
      price: '25'
    },
  ],

   'White Wine': [
    {
      name: '2024 Domaine Naturaliste Chardonnay',
      description: 'Margaret River, Western Australia',
      price: '82'
    },
    {
      name: '2024 Domaine Roux Aligote Albus',
      description: 'Margaret River, Western Australia',
      price: '95'
    },
    {
      name: '2024 Cloudy Bay Sauvignon Blanc',
      description: 'Marlborough, New Zealand',
      price: '110'
    },
    {
      name: '2025 Singlefile Family Reserve Chardonnay',
      description: 'Great Southern Region, Denmark',
      price: '115'
    },
  ],

   'Cocktails': [
    {
      name: 'Convivio Martini',
      description: '',
      price: '24'
    },
    {
      name: 'Blushing Plum Bellini',
      description: '',
      price: '19'
    },
    {
      name: 'Morning Coco',
      description: '',
      price: '22'
    },
    {
      name: 'Aperol Twist',
      description: '',
      price: '19'
    },
    {
      name: 'Moonlit Mint',
      description: '',
      price: '21'
    },
    {
      name: 'Spicy Shadow',
      description: '',
      price: '22'
    },
  ]
}