import { menuType } from './documents/menuType'
import { galleryType } from './documents/galleryType'
import { eventsType } from './documents/eventsType'
import { testimonialsType } from './documents/testimonialsType'
import { businessDetailsType } from './documents/businessDetailsType'
import { staffType } from './documents/staffType'
import { faqType } from './documents/faqType'
import { aboutType } from './documents/aboutType'
import { drinksMenuType } from './documents/drinksMenuType'


import { menuCategoryType } from './objects/menuCategoryType'
import { menuItemType } from './objects/menuItemType'
import { galleryImageType } from './objects/galleryImageType'
import { weeklyEventType } from './objects/weeklyEventType'
import { specialEventType } from './objects/specialEventType'
import { testimonialType } from './objects/testimonialType'
import { openingHoursType } from './objects/openingHoursType'
import { staffMemberType } from './objects/staffMemberType'
import { faqItemType } from './objects/faqItemType'
import { drinksCategoryType } from './objects/drinksCategoryType'
import { menuSubcategoryType } from './objects/menuSubcategoryType'


export const schema = {
  types: [
    menuType,
    drinksMenuType,
    galleryType,
    eventsType,
    testimonialsType,
    businessDetailsType,
    staffType,
    faqType,
    aboutType,

    menuCategoryType,
    drinksCategoryType,
    menuSubcategoryType,
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