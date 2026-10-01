export const singletonDocuments = [
  { type: 'menu', title: 'Food Menu' },
  { type: 'drinksMenu', title: 'Drinks Menu' },
  { type: 'gallery', title: 'Gallery' },
  { type: 'events', title: 'Events' },
  { type: 'testimonials', title: 'Testimonials' },
  { type: 'staff', title: 'Staff' },
  { type: 'faq', title: 'FAQ' },
  { type: 'businessDetails', title: 'Business Details' },
  { type: 'about', title: 'About' },
]

export const singletonTypes = new Set(
  singletonDocuments.map(({ type }) => type)
)

export const singletonActions = new Set([
  'publish',
  'discardChanges',
  'restore'
])