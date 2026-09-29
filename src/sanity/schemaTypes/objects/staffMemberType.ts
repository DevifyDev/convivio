import { defineField, defineType } from 'sanity'

export const staffMemberType = defineType({
  name: 'staffMember',
  title: 'Staff Member',
  type: 'object',

  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      description: 'Use a portrait photo. The website displays it in a 4:5 frame.',
      validation: (rule) => rule.required().assetRequired()
    }),

    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'role',
      title: 'Role / Position',
      type: 'string',
      description: 'Optional, for example Owner or Chef.'
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required()
    })
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image'
    }
  }
})