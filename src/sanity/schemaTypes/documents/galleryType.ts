import { defineArrayMember, defineField, defineType } from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',

  fields: [
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      description:
        'Add up to 12 images. Images fill each column in pairs before continuing below.',
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
        title: 'Gallery'
      }
    }
  }
})