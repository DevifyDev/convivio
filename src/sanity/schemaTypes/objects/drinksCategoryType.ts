import { defineArrayMember, defineField, defineType } from 'sanity'

export const drinksCategoryType = defineType({
  name: 'drinksCategory',
  title: 'Drinks Category',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'items',
      title: 'Items Without a Subcategory',
      type: 'array',
      description:
        'These items appear first, above any subcategories',
      of: [
        defineArrayMember({
          type: 'menuItem'
        })
      ],
      initialValue: []
    }),

    defineField({
      name: 'subcategories',
      title: 'Subcategories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'menuSubcategory'
        })
      ],
      initialValue: []
    })
  ],

  preview: {
    select: {
      title: 'title',
      items: 'items',
      subcategories: 'subcategories'
    },

    prepare({ title, items, subcategories }) {
      return {
        title,
        subtitle:
          `${items?.length ?? 0} direct items · ` +
          `${subcategories?.length ?? 0} subcategories`
      }
    }
  }
})