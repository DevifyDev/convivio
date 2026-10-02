import { defineArrayMember, defineField, defineType } from 'sanity'

export const menuItemType = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',

  fields: [
    defineField({
      name: 'foodLine1',
      title: 'Line 1',
      type: 'array',
      hidden: ({ document }) => document?._type !== 'menu',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' }
            ],
            annotations: []
          }
        })
      ],
      validation: (rule) => rule.max(1).custom((value, context) => {
        if (context.document?._type !== 'menu') return true
        const blocks = value as { children?: { text?: string }[] }[] | undefined
        const text = blocks?.map((block) =>
          block.children?.map((span) => span.text ?? '').join('') ?? ''
        ).join('').trim()
        const parent = context.parent as { name?: string } | undefined
        return text || parent?.name?.trim()
          ? true
          : 'Enter Line 1 text.'
      })
    }),
    defineField({
      name: 'name',
      title: 'Line 1',
      type: 'string',
      hidden: ({ document, parent }) =>
        document?._type === 'menu' && !!parent?.foodLine1?.length,
      validation: (rule) => rule.custom((value, context) =>
      context.document?._type === 'menu' || value?.trim()
        ? true
        : 'Enter Line 1 text.'
    )
    }),

    defineField({
      name: 'description',
      title: 'Line 2',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: (rule) => rule.required()
    })
  ],

  preview: {
    select: {
      title: 'name',
      foodLine1: 'foodLine1',
      subtitle: 'price'
    },
    prepare({ title, foodLine1, subtitle }) {
      const formattedTitle = foodLine1?.map((block: { children?: { text?: string }[] }) =>
        block.children?.map((span) => span.text ?? '').join('') ?? ''
      ).join(' ')
      return { title: formattedTitle || title || 'Menu Item', subtitle }
    }
  }
})
