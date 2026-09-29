import { defineField, defineType } from 'sanity'

export const faqItemType = defineType({
  name: 'faqItem',
  title: 'Question and Answer',
  type: 'object',

  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required()
    })
  ],

  preview: {
    select: {
      title: 'question',
      subtitle: 'answer'
    }
  }
})