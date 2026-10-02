import { defineArrayMember, defineField, defineType } from 'sanity'

export const eventsType = defineType({
  name: 'events',
  title: 'Events',
  type: 'document',

  fields: [
    defineField({
      name: 'weeklyOffers',
      title: 'Weekly Offers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'weeklyEvent'
        })
      ],
      initialValue: []
    }),

    defineField({
      name: 'specialEvents',
      title: 'Special Events',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'specialEvent'
        })
      ]
    })
  ],

  preview: {
    prepare() {
      return {
        title: 'Events'
      }
    }
  }
})