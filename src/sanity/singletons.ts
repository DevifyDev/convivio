export const singletonDocuments = [
  { type: 'menu', title: 'Menu' },
  { type: 'gallery', title: 'Gallery' },
  { type: 'events', title: 'Events' },
  { type: 'testimonials', title: 'Testimonials' },
  { type: 'staff', title: 'Staff' },
  { type: 'faq', title: 'FAQ' },
  { type: 'businessDetails', title: 'Business Details' }
]

export const singletonTypes = new Set(
  singletonDocuments.map(({ type }) => type)
)

export const singletonActions = new Set([
  'publish',
  'discardChanges',
  'restore'
])