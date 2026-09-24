import { defineField, defineType } from 'sanity'

export const specialEventType = defineType({
  name: 'specialEvent',
  title: 'Special Event',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Event Name',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'Enter the time in any format using numbers or words',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description:
        'A short description explaining the event',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'image',
      title: 'Event Photo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),

    defineField({
      name: 'imageAlt',
      title: 'Image Description',
      type: 'string',
      description:
        'Briefly describe what is shown in the image'
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description:
        'Leave blank if there is no advertised price'
    })
  ],

  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image'
    },

    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date || 'Date not set',
        media
      }
    }
  }
})