import { defineArrayMember, defineField, defineType } from 'sanity'

export const menuSubcategoryType = defineType({
  name: 'menuSubcategory',
  title: 'Menu Subcategory',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Subcategory Heading',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      description:
        'Add items and drag them to change their order.',
      of: [
        defineArrayMember({
          type: 'menuItem'
        })
      ],
      initialValue: []
    })
  ],

  preview: {
    select: {
      title: 'title',
      items: 'items'
    },

    prepare({ title, items }) {
      return {
        title,
        subtitle: `${items?.length ?? 0} items`
      }
    }
  }
})