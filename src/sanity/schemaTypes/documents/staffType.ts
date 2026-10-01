import { defineArrayMember, defineField, defineType } from 'sanity'

export const staffType = defineType({
  name: 'staff',
  title: 'Staff',
  type: 'document',

  fields: [
    defineField({
      name: 'groupImage',
      title: 'Staff Photo',
      type: 'image',
      description:
        'Optional',
      options: {
        hotspot: true
      }
    }),

    defineField({
      name: 'groupImageAlt',
      title: 'Image Description',
      type: 'string',
      description:
        'Briefly describe what is displayed in the image',
      validation: (rule) =>
        rule.custom((value, context) => {
          const document = context.document as {
            groupImage?: {
              asset?: {
                _ref?: string
              }
            }
          } | undefined

          if (
            document?.groupImage?.asset?._ref &&
            !value?.trim()
          ) {
            return 'Add a description for the photo'
          }

          return true
        })
    }),

    defineField({
      name: 'members',
      title: 'Staff Members',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'staffMember'
        })
      ],
      initialValue: []
    })
  ],

  preview: {
    select: {
      media: 'groupImage'
    },

    prepare({ media }) {
      return {
        title: 'Staff',
        media
      }
    }
  }
})