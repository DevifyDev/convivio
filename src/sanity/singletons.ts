export const singletonDocuments = [
  { type: 'menu', title: 'Food Menu' },
  { type: 'drinksMenu', title: 'Drinks Menu' },
  { type: 'gallery', title: 'Image Gallery' },
  { type: 'events', title: 'Events' },
  { type: 'testimonials', title: 'Reviews' },
  { type: 'staff', title: 'Staff' },
  { type: 'faq', title: 'FAQs' },
  { type: 'businessDetails', title: 'Business Details' },
  { type: 'about', title: 'About Section Images' }
]

export const singletonTypes = new Set(
  singletonDocuments.map(({ type }) => type)
)

export const singletonActions = new Set([
  'publish',
  'discardChanges',
  'restore'
])