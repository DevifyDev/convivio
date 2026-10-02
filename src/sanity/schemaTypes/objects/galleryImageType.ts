import { defineField, defineType } from 'sanity'

export const galleryImageType = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'object',

  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'alt',
      title: 'Image Description',
      type: 'string',
      validation: (rule) => rule.required()
    })
  ],

  preview: {
    select: {
      title: 'alt',
      media: 'image'
    }
  }
})