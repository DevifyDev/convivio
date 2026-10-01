# Workspace Export
Generated: 2026-10-01T12:13:41.297Z

## ./package.json
```json
{
  "name": "convivio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@sanity/image-url": "^2.1.1",
    "@sanity/vision": "^5.31.2",
    "next": "16.3.5",
    "next-sanity": "^13.3.4",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "sanity": "^5.31.2",
    "styled-components": "^6.5.3"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.3.5",
    "typescript": "^5"
  }
}

```

## ./src/app/page.tsx
```tsx
import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import About, { type AboutImages } from '@/components/About/About'
import Staff, { type StaffMember } from '@/components/Staff/Staff'
import Menu, { type MenuCategory } from '@/components/Menu/Menu'
import Gallery, { type GalleryImage } from '@/components/Gallery/Gallery'
import Events, {
  type WeeklyEvents,
  type SpecialEvent
} from '@/components/Events/Events'
import Testimonials, {
  type Testimonial
} from '@/components/Testimonials/Testimonials'
import Faq, { type FaqItem } from '@/components/Faq/Faq'
import Location from '@/components/Location/Location'
import Footer from '@/components/Footer/Footer'

import StructuredData from '@/components/StructuredData/StructuredData'
// import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'
import SvgFilter from '@/components/SvgFilter'

import { client } from '@/sanity/lib/client'
import {
  aboutQuery,
  menuQuery,
  galleryQuery,
  eventsQuery,
  testimonialsQuery,
  businessDetailsQuery,
  staffQuery,
  faqQuery
} from '@/sanity/lib/queries'

import type { BusinessDetails } from '@/types/businessDetails'

type MenuData = {
  categories?: MenuCategory[]
}

type GalleryData = {
  images?: GalleryImage[]
}

type EventsData = {
  weeklyEvents?: WeeklyEvents
  specialEvents?: SpecialEvent[]
}

type TestimonialsData = {
  reviews?: Testimonial[]
}

type StaffData = {
  groupImage?: string | null
  groupImageAlt?: string | null
  members?: StaffMember[]
}

type FaqData = {
  items?: FaqItem[]
}

export default async function Homepage() {
    const fetchOptions = {
    perspective: 'published',
    next: { revalidate: 60 }
  } as const

  const [
    menu,
    gallery,
    events,
    testimonials,
    businessDetails,
    staff,
    faq,
    about
  ] = await Promise.all([
    client.fetch<MenuData | null>(menuQuery, {}, fetchOptions),
    client.fetch<GalleryData | null>(galleryQuery, {}, fetchOptions),
    client.fetch<EventsData | null>(eventsQuery, {}, fetchOptions),
    client.fetch<TestimonialsData | null>(
      testimonialsQuery,
      {},
      fetchOptions
    ),
    client.fetch<BusinessDetails | null>(
      businessDetailsQuery,
      {},
      fetchOptions
    ),
    client.fetch<StaffData | null>(staffQuery, {}, fetchOptions),
    client.fetch<FaqData | null>(faqQuery, {}, fetchOptions),
    client.fetch<AboutImages | null>(aboutQuery, {}, fetchOptions)
  ])

  return (
    <>
      <StructuredData businessDetails={businessDetails} />

      <SvgFilter />

      <Header businessDetails={businessDetails} />

      <main>
        <Hero bookingUrl={businessDetails?.bookingUrl} />

        <About images={about} />

        <Staff
          staff={staff?.members ?? []}
          groupImage={staff?.groupImage}
          groupImageAlt={staff?.groupImageAlt}
        />

        <Menu categories={menu?.categories ?? []} />

        <Gallery
          images={gallery?.images ?? []}
          instagramUrl={businessDetails?.instagramUrl}
        />

        <Events
          weeklyEvents={events?.weeklyEvents}
          specialEvents={events?.specialEvents}
        />

        <Testimonials
          testimonials={testimonials?.reviews ?? []}
        />

        <Faq items={faq?.items ?? []} />

        <Location businessDetails={businessDetails} />
      </main>

      <Footer />

      {/* <ThemeSwitcher /> */}
    </>
  )
}
```

## ./src/components/Menu/Menu.tsx
```tsx
'use client'

import { Fragment, useState } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import { sectionHeadingData } from '@/data/sectionHeadingData'
import styles from './Menu.module.css'

export type MenuItem = {
  _key: string
  name: string
  description?: string
  price: string
}

export type MenuCategory = {
  _key: string
  title: string
  items?: MenuItem[]
}

type MenuProps = {
  description?: string
  categories: MenuCategory[]
}

type MenuItemsProps = {
  category: MenuCategory
}

function MenuItems({ category }: MenuItemsProps) {
  return (
    <>
      {category.items?.map((item) => (
        <article className={styles.menuItem} key={item._key}>
          <div className={styles.itemContent}>
            <div className={styles.itemTop}>
              <h3 className={styles.itemName}>{item.name}</h3>

              <span className={styles.dots}></span>

              <span className={styles.price}>{item.price}</span>
            </div>

            {item.description && (
              <p className={styles.description}>{item.description}</p>
            )}
          </div>
        </article>
      ))}
    </>
  )
}

export default function Menu({ categories, description }: MenuProps) {
  const [activeCategory, setActiveCategory] =
    useState<MenuCategory | null>(categories[0] ?? null)

  const [previousCategory, setPreviousCategory] =
    useState<MenuCategory | null>(null)

  function changeCategory(category: MenuCategory) {
    if (category._key === activeCategory?._key) return

    setPreviousCategory(activeCategory)
    setActiveCategory(category)
  }

  if (!activeCategory || categories.length === 0) {
    return null
  }

  return (
    <section className={styles.pricing} id='menu'>
      <div className={styles.container}>
        
        <SectionHeading {...sectionHeadingData.menu} />

        <nav className={styles.categories} aria-label='Menu categories'>
          {categories.map((category, index) => (
            <Fragment key={category._key}>
              <button
                className={`${styles.categoryButton} ${
                  activeCategory._key === category._key ? styles.active : ''
                }`}
                type='button'
                aria-pressed={activeCategory._key === category._key}
                onClick={() => changeCategory(category)}
              >
                {category.title}
              </button>

              {index < categories.length - 1 && (
                <span className={styles.separator}>|</span>
              )}
            </Fragment>
          ))}
        </nav>

        <div className={styles.menuWindow}>
          {previousCategory && (
            <div
              className={`${styles.menuGrid} ${styles.previousMenu}`}
              aria-hidden='true'
            >
              <MenuItems category={previousCategory} />
            </div>
          )}

          <div
            className={`${styles.menuGrid} ${
              previousCategory ? styles.incomingMenu : ''
            }`}
            key={activeCategory._key}
          >
            <MenuItems category={activeCategory} />
          </div>
        </div>
      </div>
    </section>
  )
}
```

## ./src/components/Menu/Menu.module.css
```css
:global(html[data-theme='convivio']) .categoryButton,
:global(html[data-theme='convivio']) .price {
  font-family: var(--body-copy-font), serif;
  font-weight: 400;
}

:global(html[data-theme='convivio']) .itemName {
  font-family: var(--strong-font), serif;
  font-weight: 700;
}

:global(html[data-theme='convivio']) .itemName {
  font-family: var(--strong-font), serif;
  font-weight: 700;
}

.pricing {
  position: relative;
  z-index: 1;
  padding: 6rem;
  background: var(--primary-black);
  color: var(--light-text);
}

.pricing::before,
.pricing::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 24px;
  background: var(--primary-black);
  filter: url('#roughen');
  pointer-events: none;
}

.pricing::before {
  top: -12px;
}

.pricing::after {
  bottom: -12px;
}

.container {
  width: 100%;
  max-width: var(--page-width);
  margin-inline: auto;
}

.categories {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-block: 4rem;
}

.categoryButton {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--light-text);
  font-family: var(--heading-font), serif;
  font-weight: 200;
  font-size: 1.35rem;
  cursor: pointer;
}

.categoryButton:hover {
  opacity: 0.65;
}

.active {
  color: var(--primary-gold);
}

.active:hover {
  opacity: 1;
}

.categoryButton:focus-visible {
  outline: 2px solid var(--accent-on-dark);
  outline-offset: 4px;
}

.separator {
  color: var(--light-text);
  opacity: 0.2;
}

.menuGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem 4rem;
}

.menuWindow {
  position: relative;
  overflow: hidden;
}

.previousMenu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.incomingMenu {
  position: relative;
  z-index: 1;
  background: var(--primary-black);
  box-shadow: 0 -1rem 2rem rgba(0, 0, 0, 0.2);
  animation: turnPage 0.6s ease;
}

@keyframes turnPage {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

.menuItem {
  display: grid;
  /* grid-template-columns: 4rem minmax(0, 1fr); */
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  /* gap: 1rem; */
}

.itemImage {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: #2d2a26;
}

.itemContent {
  min-width: 0;
}

.itemTop {
  display: flex;
  align-items: center;
}

.itemName {
  margin: 0;
  color: var(--light-text);
  font-size: 1.15rem;
  font-weight: 300;
}

.dots {
  flex: 1;
  height: 1px;
  margin-inline: 0.75rem;
  transform: translateY(0.4rem);
  background: repeating-linear-gradient(
    to right,
    rgba(242, 242, 242, 0.25) 0,
    rgba(242, 242, 242, 0.25) 1px,
    transparent 1px,
    transparent 5px
  );
}

.price {
  color: var(--primary-gold);
  font-family: var(--heading-font), serif;
  font-size: 1.15rem;
}

.description {
  margin-top: 0.35rem;
  font-weight: 300;
  margin-bottom: 0;
  color: var(--light-text);
  font-size: 0.95rem;
  opacity: 0.5;
}

@media (max-width: 1200px) {
  .pricing {
    /* min-height: auto; */
    padding-block: 4rem;
    padding-inline: var(--inline-padding);
  }

  .categories {
    gap: 0.75rem;
    margin-block: 3rem;
  }

  .categoryButton {
    font-size: 1.1rem;
  }

  .menuGrid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  /* .menuItem {
    grid-template-columns: 3.5rem minmax(0, 1fr);
    gap: 0.75rem;
  } */

  .itemImage {
    width: 3.5rem;
    height: 3.5rem;
  }

  .itemName,
  .price {
    font-size: 1rem;
  }

  .dots {
    margin-inline: 0.5rem;
  }

  .description {
    font-size: 0.9rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .incomingMenu {
    animation: none;
  }
}
```

## ./src/sanity/singletons.ts
```ts
export const singletonDocuments = [
  { type: 'menu', title: 'Menu' },
  { type: 'gallery', title: 'Gallery' },
  { type: 'events', title: 'Events' },
  { type: 'testimonials', title: 'Testimonials' },
  { type: 'staff', title: 'Staff' },
  { type: 'faq', title: 'FAQ' },
  { type: 'businessDetails', title: 'Business Details' },
  { type: 'about', title: 'About' },
]

export const singletonTypes = new Set(
  singletonDocuments.map(({ type }) => type)
)

export const singletonActions = new Set([
  'publish',
  'discardChanges',
  'restore'
])
```

## ./src/sanity/lib/queries.ts
```ts
export const menuQuery = `
  *[_id == 'menu'][0] {
    categories[] {
      _key,
      title,
      items[] {
        _key,
        name,
        description,
        price
      }
    }
  }
`

export const galleryQuery = `
  *[_id == 'gallery'][0] {
    images[] {
      _key,
      alt,
      'src': image.asset->url
    }
  }
`

export const eventsQuery = `
  *[_id == 'events'][0] {
  
    'weeklyEvents': coalesce(weeklyOffers[] {
      _key,
      schedule,
      title,
      time,
      price,
      description
    }, []),

    specialEvents[] {
      _key,
      date,
      time,
      title,
      description,
      price,
      imageAlt,
      'image': image.asset->url
    }
  }
`

export const testimonialsQuery = `
  *[_id == 'testimonials'][0] {
    reviews[] {
      _key,
      quote,
      name,
      rating,
      source
    }
  }
`

export const businessDetailsQuery = `
  *[_id == 'businessDetails'][0] {
    phone,
    email,
    openingHours {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday
    },
    bookingUrl,
    giftCardUrl,
    instagramUrl,
    facebookUrl
  }
`

export const staffQuery = `
  *[_type == 'staff' && _id == 'staff'][0] {
    'groupImage': groupImage.asset->url,
    groupImageAlt,
    'members': coalesce(members[] {
      _key,
      name,
      description
    }, [])
  }
`

export const faqQuery = `
  *[_type == 'faq' && _id == 'faq'][0] {
    'items': coalesce(items[] {
      _key,
      question,
      answer
    }, [])
  }
`

export const aboutQuery = `
  *[_id == 'about'][0] {
    'imageOne': imageOne.asset->url,
    imageOneAlt,
    'imageTwo': imageTwo.asset->url,
    imageTwoAlt
  }
`
```

## ./src/sanity/schemaTypes/index.ts
```ts
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
```

## ./src/sanity/schemaTypes/objects/menuCategoryType.ts
```ts
import { defineArrayMember, defineField, defineType } from 'sanity'

export const menuCategoryType = defineType({
  name: 'menuCategory',
  title: 'Menu Category',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'menuItem'
        })
      ]
    })
  ],

  preview: {
    select: {
      title: 'title',
      items: 'items'
    },

    prepare({ title, items }) {
      return {
        title,
        subtitle: `${items?.length ?? 0} items`
      }
    }
  }
})
```

## ./src/sanity/schemaTypes/objects/menuItemType.ts
```ts
import { defineField, defineType } from 'sanity'

export const menuItemType = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: (rule) => rule.required()
    })
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'price'
    }
  }
})
```