import { defineField, defineType } from 'sanity'

export const weeklyEventType = defineType({
  name: 'weeklyEvent',
  title: 'Weekly Event',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Event Name',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description:
        'Maximum 180 characters',
      validation: (rule) =>
        rule.required().max(180)
    })
  ]
})