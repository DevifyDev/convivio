import { menuType } from './documents/menuType'
import { galleryType } from './documents/galleryType'
import { eventsType } from './documents/eventsType'
import { testimonialsType } from './documents/testimonialsType'
import { businessDetailsType } from './documents/businessDetailsType'
import { staffType } from './documents/staffType'
import { faqType } from './documents/faqType'
import { aboutType } from './documents/aboutType'

import { menuCategoryType } from './objects/menuCategoryType'
import { menuItemType } from './objects/menuItemType'
import { galleryImageType } from './objects/galleryImageType'
import { weeklyEventType } from './objects/weeklyEventType'
import { specialEventType } from './objects/specialEventType'
import { testimonialType } from './objects/testimonialType'
import { openingHoursType } from './objects/openingHoursType'
import { staffMemberType } from './objects/staffMemberType'
import { faqItemType } from './objects/faqItemType'

export const schema = {
  types: [
    menuType,
    galleryType,
    eventsType,
    testimonialsType,
    businessDetailsType,
    staffType,
    faqType,
    aboutType,

    menuCategoryType,
    menuItemType,
    galleryImageType,
    weeklyEventType,
    specialEventType,
    testimonialType,
    openingHoursType,
    staffMemberType,
    faqItemType
  ]
}