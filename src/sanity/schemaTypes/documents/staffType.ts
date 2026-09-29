import { defineArrayMember, defineField, defineType } from 'sanity'

export const staffType = defineType({
  name: 'staff',
  title: 'Staff',
  type: 'document',

  fields: [
    defineField({
      name: 'members',
      title: 'Staff Members',
      type: 'array',
      description:
        'Add, remove or drag entries to change their order on the website.',
      of: [
        defineArrayMember({
          type: 'staffMember'
        })
      ],
      initialValue: []
    })
  ],

  preview: {
    prepare() {
      return {
        title: 'Staff'
      }
    }
  }
})