import { defineArrayMember, defineField, defineType } from 'sanity'

export const drinksMenuType = defineType({
  name: 'drinksMenu',
  title: 'Drinks Menu Categories',
  type: 'document',

  fields: [
    defineField({
      name: 'categories',
      title: 'Drinks Menu Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'drinksCategory'
        })
      ],
      initialValue: []
    })
  ],

  preview: {
    prepare() {
      return {
        title: 'Drinks Menu'
      }
    }
  }
})