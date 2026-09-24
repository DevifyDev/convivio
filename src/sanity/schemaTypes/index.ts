import { eventsType } from './documents/eventsType'
import { galleryType } from './documents/galleryType'
import { menuType } from './documents/menuType'
import { testimonialsType } from './documents/testimonialsType'

import { galleryImageType } from './objects/galleryImageType'
import { menuCategoryType } from './objects/menuCategoryType'
import { menuItemType } from './objects/menuItemType'
import { specialEventType } from './objects/specialEventType'
import { weeklyEventType } from './objects/weeklyEventType'
import { testimonialType } from './objects/testimonialType'

export const schema = {
  types: [
    menuType,
    galleryType,
    eventsType,
    testimonialsType,

    menuCategoryType,
    menuItemType,
    galleryImageType,
    weeklyEventType,
    specialEventType,
    testimonialType
  ]
}