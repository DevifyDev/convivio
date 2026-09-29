import { defineArrayMember, defineField, defineType } from 'sanity'

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',

  fields: [
    defineField({
      name: 'items',
      title: 'Questions and Answers',
      type: 'array',
      description:
        'Add, remove or drag entries to change their order on the website.',
      of: [
        defineArrayMember({
          type: 'faqItem'
        })
      ],
      initialValue: []
    })
  ],

  preview: {
    prepare() {
      return {
        title: 'FAQ'
      }
    }
  }
})