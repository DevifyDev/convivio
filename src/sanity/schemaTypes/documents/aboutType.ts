import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'imageOne',
      title: 'First image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'imageOneAlt',
      title: 'First image description',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'imageTwo',
      title: 'Second image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'imageTwoAlt',
      title: 'Second image description',
      type: 'string',
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    prepare() {
      return { title: 'About' }
    }
  }
})