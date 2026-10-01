import { defineArrayMember, defineField, defineType } from 'sanity'

export const drinksMenuType = defineType({
  name: 'drinksMenu',
  title: 'Drinks Menu',
  type: 'document',

  fields: [
    defineField({
      name: 'categories',
      title: 'Drinks Categories',
      type: 'array',
      description:
        'Add drinks categories and drag them to change their order.',
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