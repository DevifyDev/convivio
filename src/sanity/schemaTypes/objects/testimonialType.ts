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
      validation: (rule) =>
        rule.required().max(250)
    }),

    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      description: 'Enter the customer name',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'source',
      title: 'Review Source',
      type: 'string',
      description: 'For example: Google Review or Facebook Review'
    })
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'source'
    }
  }
})