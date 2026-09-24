import type { StructureResolver } from 'sanity/structure'

const singletonTypes = new Set([
  'menu',
  'gallery',
  'events',
])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Menu')
        .id('menu')
        .child(
          S.document()
            .schemaType('menu')
            .documentId('menu')
        ),

        S.listItem()
          .title('Gallery')
          .id('gallery')
          .schemaType('gallery')
          .child(
            S.editor()
              .id('gallery')
              .schemaType('gallery')
              .documentId('gallery')
          ),

          S.listItem()
            .title('Events')
            .id('events')
            .schemaType('events')
            .child(
              S.editor()
                .id('events')
                .schemaType('events')
                .documentId('events')
            ),

      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() ?? '')
      )
    ])