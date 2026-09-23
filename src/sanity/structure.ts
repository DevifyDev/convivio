import type { StructureResolver } from 'sanity/structure'

const singletonTypes = new Set([
  'menu',
  'gallery',
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

      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() ?? '')
      )
    ])