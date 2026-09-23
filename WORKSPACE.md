# Workspace Export
Generated: 2026-09-23T11:46:51.812Z

## ./sanity.config.ts
```ts
'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
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
import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items(S.documentTypeListItems())

```

## ./src/sanity/lib/client.ts
```ts
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
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

## ./src/sanity/schemaTypes/index.ts
```ts
import { menuType } from './documents/menuType'
import { menuCategoryType } from './objects/menuCategoryType'
import { menuItemType } from './objects/menuItemType'

export const schema = {
  types: [
    menuType,
    menuCategoryType,
    menuItemType
  ]
}
```

## ./src/sanity/schemaTypes/documents/menuType.ts
```ts
import { defineArrayMember, defineField, defineType } from 'sanity'

export const menuType = defineType({
  name: 'menu',
  title: 'Menu',
  type: 'document',

  fields: [
    defineField({
      name: 'categories',
      title: 'Menu Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'menuCategory'
        })
      ],
      validation: (rule) => rule.required().min(1)
    })
  ],

  preview: {
    prepare() {
      return {
        title: 'Convivio Menu'
      }
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

## ./src/sanity/schemaTypes/objects/menuItemType.ts
```ts
import { defineField, defineType } from 'sanity'

export const menuItemType = defineType({
  name: 'menuItem',
  title: 'Menu Item',
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
      rows: 2
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
      subtitle: 'price'
    }
  }
})
```