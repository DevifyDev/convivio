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
      description: 'Enter the time in any format using numbers or words',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description:
        'A short description explaining the event',
      validation: (rule) => rule.required()
    })
  ]
})