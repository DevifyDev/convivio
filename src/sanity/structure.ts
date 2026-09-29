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