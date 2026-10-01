import { defineField, defineType } from 'sanity'

export const weeklyEventType = defineType({
  name: 'weeklyEvent',
  title: 'Weekly Offer',
  type: 'object',

  fields: [
    defineField({
      name: 'schedule',
      title: 'Days / Schedule',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'title',
      title: 'Weekly Event',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'Optional'
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Optional'
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description: 'Maximum 500 characters.',
      validation: (rule) => rule.required().max(500)
    })
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'schedule'
    }
  }
})