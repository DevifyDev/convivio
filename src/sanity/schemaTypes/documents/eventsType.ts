import { defineArrayMember, defineField, defineType } from 'sanity'

export const eventsType = defineType({
  name: 'events',
  title: 'Events',
  type: 'document',

  fields: [
    defineField({
      name: 'weeklyEvents',
      title: 'Weekly Events',
      type: 'object',
      description: 
        'Add details for weekly events',

      fields: [
        defineField({
          name: 'monday',
          title: 'Monday',
          type: 'weeklyEvent',
          options: {
            collapsible: true,
            collapsed: true
          },
        }),

        defineField({
          name: 'tuesday',
          title: 'Tuesday',
          type: 'weeklyEvent',
          options: {
            collapsible: true,
            collapsed: true
          }
        }),

        defineField({
          name: 'wednesday',
          title: 'Wednesday',
          type: 'weeklyEvent',
          options: {
            collapsible: true,
            collapsed: true
          }
        }),

        defineField({
          name: 'thursday',
          title: 'Thursday',
          type: 'weeklyEvent',
          options: {
            collapsible: true,
            collapsed: true
          }
        }),

        defineField({
          name: 'friday',
          title: 'Friday',
          type: 'weeklyEvent',
          options: {
            collapsible: true,
            collapsed: true
          }
        }),

        defineField({
          name: 'saturday',
          title: 'Saturday',
          type: 'weeklyEvent',
          options: {
            collapsible: true,
            collapsed: true
          }
        }),

        defineField({
          name: 'sunday',
          title: 'Sunday',
          type: 'weeklyEvent',
          options: {
            collapsible: true,
            collapsed: true
          }
        })
      ]
    }),

    defineField({
      name: 'specialEvents',
      title: 'Special Events',
      type: 'array',
      description:
        'Add upcoming one-off events such as dinners, tastings or guest chef nights.',

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