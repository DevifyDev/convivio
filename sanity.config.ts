'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

const singletonTypes = new Set([
  'menu',
  'gallery',
  'events',
  'testimonials',
  'businessDetails',
])

const singletonActions = new Set([
  'publish',
  'discardChanges',
  'restore'
])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,

  document: {
    newDocumentOptions: (prev) =>
      prev.filter(
        ({ templateId }) => !singletonTypes.has(templateId)
      ),

    actions: (prev, context) =>
      singletonTypes.has(context.schemaType)
        ? prev.filter(
            ({ action }) =>
              action && singletonActions.has(action)
          )
        : prev
  },

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion })
  ]
})