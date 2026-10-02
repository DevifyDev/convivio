# Workspace Export
Generated: 2026-10-02T05:18:37.132Z

## ./sanity.config.ts
```ts
'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'
import {
  singletonActions,
  singletonTypes
} from './src/sanity/singletons'

export default defineConfig({
  name: 'default',
  title: 'Convivio',
  basePath: '/studio',
  projectId,
  dataset,

  schema: {
    ...schema,

    templates: (templates) =>
      templates.filter(
        ({ schemaType }) => !singletonTypes.has(schemaType)
      )
  },

  document: {
    newDocumentOptions: (prev) =>
      prev.filter(
        ({ templateId }) => !singletonTypes.has(templateId)
      ),

    actions: (prev, context) =>
      singletonTypes.has(context.schemaType)
        ? prev.filter(
            ({ action }) => action && singletonActions.has(action)
          )
        : prev
  },

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion })
  ]
})
```

## ./src/sanity/env.ts
```ts
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-09-23'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

```

## ./src/sanity/structure.ts
```ts
import type { StructureResolver } from 'sanity/structure'
import { singletonDocuments, singletonTypes } from './singletons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...singletonDocuments.map(({ type, title }) =>
        S.listItem()
          .title(title)
          .id(type)
          .schemaType(type)
          .child(
            S.document()
              .schemaType(type)
              .documentId(type)
          )
      ),

      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() ?? '')
      )
    ])
```

## ./src/sanity/singletons.ts
```ts
export const singletonDocuments = [
  { type: 'menu', title: 'Food Menu' },
  { type: 'drinksMenu', title: 'Drinks Menu' },
  { type: 'gallery', title: 'Image Gallery' },
  { type: 'events', title: 'Events' },
  { type: 'testimonials', title: 'Reviews' },
  { type: 'staff', title: 'Staff' },
  { type: 'faq', title: 'FAQs' },
  { type: 'businessDetails', title: 'Business Details' },
  { type: 'about', title: 'About Section Images' }
]

export const singletonTypes = new Set(
  singletonDocuments.map(({ type }) => type)
)

export const singletonActions = new Set([
  'publish',
  'discardChanges',
  'restore'
])
```

## ./src/sanity/lib/client.ts
```ts
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

```

## ./src/sanity/lib/image.ts
```ts
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

```

## ./src/sanity/lib/live.ts
```ts
// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client,
});

```

## ./src/sanity/lib/queries.ts
```ts
export const menuQuery = `
  {
    'food': *[_type == 'menu' && _id == 'menu'][0] {
      categories[] {
        _key,
        title,
        items[] {
          _key,
          name,
          foodLine1,
          description,
          price
        }
      }
    },

    'drinks': *[_type == 'drinksMenu' && _id == 'drinksMenu'][0] {
      categories[] {
        _key,
        title,
        items[] {
          _key,
          name,
          description,
          price
        },
        subcategories[] {
          _key,
          title,
          items[] {
            _key,
            name,
            description,
            price
          }
        }
      }
    }
  }
`

export const galleryQuery = `
  *[_id == 'gallery'][0] {
    images[] {
      _key,
      alt,
      'src': image.asset->url
    }
  }
`

export const eventsQuery = `
  *[_id == 'events'][0] {
  
    'weeklyEvents': coalesce(weeklyOffers[] {
      _key,
      schedule,
      title,
      time,
      price,
      description
    }, []),

    specialEvents[] {
      _key,
      date,
      time,
      title,
      description,
      price,
      imageAlt,
      'image': image.asset->url
    }
  }
`

export const testimonialsQuery = `
  *[_id == 'testimonials'][0] {
    reviews[] {
      _key,
      quote,
      name,
      rating,
      source
    }
  }
`

export const businessDetailsQuery = `
  *[_id == 'businessDetails'][0] {
    phone,
    email,
    openingHours {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday
    },
    bookingUrl,
    giftCardUrl,
    instagramUrl,
    facebookUrl
  }
`

export const staffQuery = `
  *[_type == 'staff' && _id == 'staff'][0] {
    'groupImage': groupImage.asset->url,
    groupImageAlt,
    'members': coalesce(members[] {
      _key,
      name,
      description
    }, [])
  }
`

export const faqQuery = `
  *[_type == 'faq' && _id == 'faq'][0] {
    'items': coalesce(items[] {
      _key,
      question,
      answer
    }, [])
  }
`

export const aboutQuery = `
  *[_id == 'about'][0] {
    'imageOne': imageOne.asset->url,
    imageOneAlt,
    'imageTwo': imageTwo.asset->url,
    imageTwoAlt
  }
`
```

## ./src/sanity/schemaTypes/index.ts
```ts
import { menuType } from './documents/menuType'
import { galleryType } from './documents/galleryType'
import { eventsType } from './documents/eventsType'
import { testimonialsType } from './documents/testimonialsType'
import { businessDetailsType } from './documents/businessDetailsType'
import { staffType } from './documents/staffType'
import { faqType } from './documents/faqType'
import { aboutType } from './documents/aboutType'
import { drinksMenuType } from './documents/drinksMenuType'


import { menuCategoryType } from './objects/menuCategoryType'
import { menuItemType } from './objects/menuItemType'
import { galleryImageType } from './objects/galleryImageType'
import { weeklyEventType } from './objects/weeklyEventType'
import { specialEventType } from './objects/specialEventType'
import { testimonialType } from './objects/testimonialType'
import { openingHoursType } from './objects/openingHoursType'
import { staffMemberType } from './objects/staffMemberType'
import { faqItemType } from './objects/faqItemType'
import { drinksCategoryType } from './objects/drinksCategoryType'
import { menuSubcategoryType } from './objects/menuSubcategoryType'


export const schema = {
  types: [
    menuType,
    drinksMenuType,
    galleryType,
    eventsType,
    testimonialsType,
    businessDetailsType,
    staffType,
    faqType,
    aboutType,

    menuCategoryType,
    drinksCategoryType,
    menuSubcategoryType,
    menuItemType,
    galleryImageType,
    weeklyEventType,
    specialEventType,
    testimonialType,
    openingHoursType,
    staffMemberType,
    faqItemType
  ]
}
```

## ./src/sanity/schemaTypes/documents/aboutType.ts
```ts
import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About Section Images',
  type: 'document',

  fields: [
    defineField({
      name: 'imageOne',
      title: 'First Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'imageOneAlt',
      title: 'First Image Description',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'imageTwo',
      title: 'Second Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'imageTwoAlt',
      title: 'Second Image Description',
      type: 'string',
      validation: (rule) => rule.required()
    })
  ],

  preview: {
    prepare() {
      return { title: 'About Section Images' }
    }
  }
})
```

## ./src/sanity/schemaTypes/documents/businessDetailsType.ts
```ts
import { defineField, defineType } from 'sanity'

export const businessDetailsType = defineType({
  name: 'businessDetails',
  title: 'Business Details',
  type: 'document',

  fields: [
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),

    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),

    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'openingHours',
    }),

    defineField({
      name: 'bookingUrl',
      title: 'Booking Link',
      type: 'url',
    }),

    defineField({
      name: 'giftCardUrl',
      title: 'Gift Card Link',
      type: 'url',
    }),

    defineField({
      name: 'instagramUrl',
      title: 'Instagram Link',
      type: 'url'
    }),

    defineField({
      name: 'facebookUrl',
      title: 'Facebook Link',
      type: 'url'
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Business Details'
      }
    }
  }
})
```

## ./src/sanity/schemaTypes/documents/drinksMenuType.ts
```ts
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
```

## ./src/sanity/schemaTypes/documents/eventsType.ts
```ts
import { defineArrayMember, defineField, defineType } from 'sanity'

export const eventsType = defineType({
  name: 'events',
  title: 'Events',
  type: 'document',

  fields: [
    defineField({
      name: 'weeklyOffers',
      title: 'Weekly Offers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'weeklyEvent'
        })
      ],
      initialValue: []
    }),

    defineField({
      name: 'specialEvents',
      title: 'Special Events',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'specialEvent'
        })
      ]
    })
  ],

  preview: {
    prepare() {
      return {
        title: 'Events'
      }
    }
  }
})
```

## ./src/sanity/schemaTypes/documents/faqType.ts
```ts
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
```

## ./src/sanity/schemaTypes/documents/galleryType.ts
```ts
import { defineArrayMember, defineField, defineType } from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',

  fields: [
    defineField({
      name: 'images',
      title: 'Image Gallery',
      type: 'array',
      description:
        'Add up to 12 images',
      of: [
        defineArrayMember({
          type: 'galleryImage'
        })
      ],
      validation: (rule) => rule.required().min(1).max(12)
    })
  ],

  preview: {
    prepare() {
      return {
        title: 'Image Gallery'
      }
    }
  }
})
```

## ./src/sanity/schemaTypes/documents/menuType.ts
```ts
import { defineArrayMember, defineField, defineType } from 'sanity'

export const menuType = defineType({
  name: 'menu',
  title: 'Food Menu',
  type: 'document',

  fields: [
    defineField({
      name: 'categories',
      title: 'Food Menu Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'menuCategory'
        })
      ],
      initialValue: []
    })
  ],

  preview: {
    prepare() {
      return {
        title: 'Food Menu'
      }
    }
  }
})
```

## ./src/sanity/schemaTypes/documents/staffType.ts
```ts
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
        'Required when an image is included',
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
```

## ./src/sanity/schemaTypes/documents/testimonialsType.ts
```ts
import { defineArrayMember, defineField, defineType } from 'sanity'

export const testimonialsType = defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',

  fields: [
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      description:
        'Add, remove or reorder the customer reviews displayed on the website',
      of: [
        defineArrayMember({
          type: 'testimonial'
        })
      ]
    })
  ],

  preview: {
    prepare() {
      return {
        title: 'Testimonials'
      }
    }
  }
})
```

## ./src/sanity/schemaTypes/objects/drinksCategoryType.ts
```ts
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
```

## ./src/sanity/schemaTypes/objects/faqItemType.ts
```ts
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
```

## ./src/sanity/schemaTypes/objects/galleryImageType.ts
```ts
import { defineField, defineType } from 'sanity'

export const galleryImageType = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'object',

  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'alt',
      title: 'Image Description',
      type: 'string',
      validation: (rule) => rule.required()
    })
  ],

  preview: {
    select: {
      title: 'alt',
      media: 'image'
    }
  }
})
```

## ./src/sanity/schemaTypes/objects/menuCategoryType.ts
```ts
import { defineArrayMember, defineField, defineType } from 'sanity'

export const menuCategoryType = defineType({
  name: 'menuCategory',
  title: 'Menu Category',
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
      title: 'Menu Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'menuItem'
        })
      ]
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
```

## ./src/sanity/schemaTypes/objects/menuSubCategoryType.ts
```ts
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
```

## ./src/sanity/schemaTypes/objects/menuItemType.ts
```ts
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

```

## ./src/sanity/schemaTypes/objects/openingHoursType.ts
```ts
import { defineField, defineType } from 'sanity'

export const openingHoursType = defineType({
  name: 'openingHours',
  title: 'Opening Hours',
  type: 'object',

  fields: [
    defineField({
      name: 'monday',
      title: 'Monday',
      type: 'string'
    }),

    defineField({
      name: 'tuesday',
      title: 'Tuesday',
      type: 'string'
    }),

    defineField({
      name: 'wednesday',
      title: 'Wednesday',
      type: 'string'
    }),

    defineField({
      name: 'thursday',
      title: 'Thursday',
      type: 'string'
    }),

    defineField({
      name: 'friday',
      title: 'Friday',
      type: 'string'
    }),

    defineField({
      name: 'saturday',
      title: 'Saturday',
      type: 'string'
    }),

    defineField({
      name: 'sunday',
      title: 'Sunday',
      type: 'string'
    })
  ]
})
```

## ./src/sanity/schemaTypes/objects/specialEventType.ts
```ts
import { defineField, defineType } from 'sanity'

export const specialEventType = defineType({
  name: 'specialEvent',
  title: 'Special Event',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Event Name',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Maximum 250 characters',
      validation: (rule) =>
        rule.required().max(250)
          }),

    defineField({
        name: 'image',
        title: 'Event Photo',
        type: 'image',
        description: 'Optional',
        options: {
          hotspot: true
        }
      }),

      defineField({
        name: 'imageAlt',
        title: 'Image Description',
        type: 'string',
        description:
          'Required when an image is included',

        validation: (rule) =>
          rule.custom((value, context) => {
            const parent = context.parent as {
              image?: unknown
            }

            if (parent?.image && !value) {
              return 'Image description is required'
            }

            return true
          })
      }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description:
        'Optional'
    })
  ],

  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image'
    },

    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date || 'Date not set',
        media
      }
    }
  }
})
```

## ./src/sanity/schemaTypes/objects/testimonialType.ts
```ts
import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Review',
  type: 'object',

  fields: [
    defineField({
      name: 'quote',
      title: 'Review',
      type: 'text',
      rows: 4,
      description: 'Maximum 250 characters',
      validation: (rule) => rule.required().max(250)
    }),

    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      initialValue: 5,
      options: {
        list: [
          { title: '1 star', value: 1 },
          { title: '2 stars', value: 2 },
          { title: '3 stars', value: 3 },
          { title: '4 stars', value: 4 },
          { title: '5 stars', value: 5 }
        ]
      },
      validation: (rule) => rule.integer().min(1).max(5)
    }),

    defineField({
      name: 'source',
      title: 'Review Source',
      type: 'string'
    })
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'source'
    }
  }
})
```

## ./src/sanity/schemaTypes/objects/weeklyEventType.ts
```ts
import { defineField, defineType } from 'sanity'

export const weeklyEventType = defineType({
  name: 'weeklyEvent',
  title: 'Weekly Offer',
  type: 'object',

  fields: [
    defineField({
      name: 'schedule',
      title: 'Days / Schedule',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'title',
      title: 'Event',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'Optional'
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Optional'
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description: 'Maximum 500 characters.',
      validation: (rule) => rule.required().max(500)
    })
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'schedule'
    }
  }
})
```

## ./src/sanity/schemaTypes/objects/staffMemberType.ts
```ts
import { defineField, defineType } from 'sanity'

export const staffMemberType = defineType({
  name: 'staffMember',
  title: 'Staff Member',
  type: 'object',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required()
    })
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'description'
    }
  }
})
```