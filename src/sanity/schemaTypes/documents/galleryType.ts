import { defineArrayMember, defineField, defineType } from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',

  fields: [
    defineField({
      name: 'images',
      title: 'Image Gallery',
      type: 'array',
      description:
        'Add up to 12 images',
      of: [
        defineArrayMember({
          type: 'galleryImage'
        })
      ],
      validation: (rule) => rule.required().min(1).max(12)
    })
  ],

  preview: {
    prepare() {
      return {
        title: 'Image Gallery'
      }
    }
  }
})