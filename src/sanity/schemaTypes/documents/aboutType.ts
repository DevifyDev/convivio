import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About Section Images',
  type: 'document',

  fields: [
    defineField({
      name: 'imageOne',
      title: 'First Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'imageOneAlt',
      title: 'First Image Description',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'imageTwo',
      title: 'Second Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'imageTwoAlt',
      title: 'Second Image Description',
      type: 'string',
      validation: (rule) => rule.required()
    })
  ],

  preview: {
    prepare() {
      return { title: 'About Section Images' }
    }
  }
})