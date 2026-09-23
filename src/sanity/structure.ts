import type { StructureResolver } from 'sanity/structure'

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
        )
    ])