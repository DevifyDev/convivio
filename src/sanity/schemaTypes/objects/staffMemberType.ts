import { defineField, defineType } from 'sanity'

export const staffMemberType = defineType({
  name: 'staffMember',
  title: 'Staff Member',
  type: 'object',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required()
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
      subtitle: 'description'
    }
  }
})