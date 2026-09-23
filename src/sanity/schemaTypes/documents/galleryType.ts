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
        'Add, remove or reorder the photos shown in the website gallery.',
      of: [
        defineArrayMember({
          type: 'galleryImage'
        })
      ],
      validation: (rule) => rule.required().min(1)
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