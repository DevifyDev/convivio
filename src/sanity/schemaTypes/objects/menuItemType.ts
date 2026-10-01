import { defineField, defineType } from 'sanity'

export const menuItemType = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',

  fields: [
    defineField({
      name: 'name',
      title: 'Line 1',
      type: 'string',
      description:
        'The main item text. Longer entries will wrap on the website.',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'description',
      title: 'Line 2',
      type: 'text',
      rows: 2,
      description: 'Optional supporting text beneath the top line.'
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description:
        'Enter the price exactly as it should appear, including any symbols.',
      validation: (rule) => rule.required()
    })
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'price'
    }
  }
})