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
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Maximum 250 characters',
      validation: (rule) =>
        rule.required().max(250)
          }),

    defineField({
        name: 'image',
        title: 'Event Photo',
        type: 'image',
        description: 'Optional',
        options: {
          hotspot: true
        }
      }),

      defineField({
        name: 'imageAlt',
        title: 'Image Description',
        type: 'string',
        description:
          'Required when an image is included',

        validation: (rule) =>
          rule.custom((value, context) => {
            const parent = context.parent as {
              image?: unknown
            }

            if (parent?.image && !value) {
              return 'Image description is required'
            }

            return true
          })
      }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description:
        'Optional'
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