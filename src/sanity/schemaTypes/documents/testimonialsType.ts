import { defineArrayMember, defineField, defineType } from 'sanity'

export const testimonialsType = defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',

  fields: [
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      description:
        'Add, remove or reorder the customer reviews displayed on the website',
      of: [
        defineArrayMember({
          type: 'testimonial'
        })
      ]
    })
  ],

  preview: {
    prepare() {
      return {
        title: 'Testimonials'
      }
    }
  }
})