import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Review',
  type: 'object',

  fields: [
    defineField({
      name: 'quote',
      title: 'Review',
      type: 'text',
      rows: 4,
      description: 'Maximum 250 characters',
      validation: (rule) => rule.required().max(250)
    }),

    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      initialValue: 5,
      options: {
        list: [
          { title: '1 star', value: 1 },
          { title: '2 stars', value: 2 },
          { title: '3 stars', value: 3 },
          { title: '4 stars', value: 4 },
          { title: '5 stars', value: 5 }
        ]
      },
      validation: (rule) => rule.integer().min(1).max(5)
    }),

    defineField({
      name: 'source',
      title: 'Review Source',
      type: 'string'
    })
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'source'
    }
  }
})