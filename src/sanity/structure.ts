import type { StructureResolver } from 'sanity/structure'

const singletonTypes = new Set(['menu'])

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

      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() ?? '')
      )
    ])