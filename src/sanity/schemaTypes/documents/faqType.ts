import { defineArrayMember, defineField, defineType } from 'sanity'

export const faqType = defineType({
  name: 'faq',
  title: 'FAQs',
  type: 'document',

  fields: [
    defineField({
      name: 'items',
      title: 'Questions and Answers',
      type: 'array',
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
        title: 'FAQs'
      }
    }
  }
})