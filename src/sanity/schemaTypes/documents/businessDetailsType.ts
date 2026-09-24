import { defineField, defineType } from 'sanity'

export const businessDetailsType = defineType({
  name: 'businessDetails',
  title: 'Business Details',
  type: 'document',

  fields: [
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),

    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),

    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'openingHours',
    }),

    defineField({
      name: 'bookingUrl',
      title: 'Booking Link',
      type: 'url',
    }),

    defineField({
      name: 'giftCardUrl',
      title: 'Gift Card Link',
      type: 'url',
    }),

    defineField({
      name: 'instagramUrl',
      title: 'Instagram Link',
      type: 'url'
    }),

    defineField({
      name: 'facebookUrl',
      title: 'Facebook Link',
      type: 'url'
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Business Details'
      }
    }
  }
})