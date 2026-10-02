import { defineArrayMember, defineField, defineType } from 'sanity'

export const menuType = defineType({
  name: 'menu',
  title: 'Food Menu',
  type: 'document',

  fields: [
    defineField({
      name: 'categories',
      title: 'Food Menu Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'menuCategory'
        })
      ],
      initialValue: []
    })
  ],

  preview: {
    prepare() {
      return {
        title: 'Food Menu'
      }
    }
  }
})