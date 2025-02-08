import {type StructureBuilder} from 'sanity/desk'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('product').title('Products'),
    ])
