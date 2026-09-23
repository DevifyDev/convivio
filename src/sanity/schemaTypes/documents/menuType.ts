import { defineArrayMember, defineField, defineType } from 'sanity'

export const menuType = defineType({
  name: 'menu',
  title: 'Menu',
  type: 'document',

  fields: [
    defineField({
      name: 'categories',
      title: 'Menu Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'menuCategory'
        })
      ],
      validation: (rule) => rule.required().min(1)
    })
  ],

  preview: {
    prepare() {
      return {
        title: 'Convivio Menu'
      }
    }
  }
})