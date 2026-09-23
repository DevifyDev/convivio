import { galleryType } from './documents/galleryType'
import { menuType } from './documents/menuType'

import { galleryImageType } from './objects/galleryImageType'
import { menuCategoryType } from './objects/menuCategoryType'
import { menuItemType } from './objects/menuItemType'

export const schema = {
  types: [
    menuType,
    galleryType,

    menuCategoryType,
    menuItemType,
    galleryImageType
  ]
}