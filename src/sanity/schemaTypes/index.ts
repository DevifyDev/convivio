import { eventsType } from './documents/eventsType'
import { galleryType } from './documents/galleryType'
import { menuType } from './documents/menuType'

import { galleryImageType } from './objects/galleryImageType'
import { menuCategoryType } from './objects/menuCategoryType'
import { menuItemType } from './objects/menuItemType'
import { specialEventType } from './objects/specialEventType'
import { weeklyEventType } from './objects/weeklyEventType'

export const schema = {
  types: [
    menuType,
    galleryType,
    eventsType,

    menuCategoryType,
    menuItemType,
    galleryImageType,
    weeklyEventType,
    specialEventType
  ]
}