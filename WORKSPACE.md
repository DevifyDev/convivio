# Workspace Export
Generated: 2026-10-03T07:04:12.269Z

## ./src/components/Events/Events.tsx
```tsx
import Image from 'next/image'
import SectionHeading from '../SectionHeading/SectionHeading'
import { sectionHeadingData } from '@/data/sectionHeadingData'
import styles from './Events.module.css'

export type WeeklyEvent = {
  _key: string
  schedule: string
  title: string
  time?: string
  price?: string
  description: string
}

export type WeeklyEvents = WeeklyEvent[]

export type SpecialEvent = {
  _key: string
  date: string
  time?: string
  title: string
  description: string
  image?: string
  imageAlt?: string
  price?: string
}

type EventsProps = {
  weeklyEvents?: WeeklyEvents | null
  specialEvents?: SpecialEvent[] | null
}

function getEventDate(dateString: string) {
  const date = new Date(`${dateString}T00:00:00Z`)

  return {
    day: new Intl.DateTimeFormat('en-AU', {
      day: '2-digit',
      timeZone: 'UTC'
    }).format(date),

    month: new Intl.DateTimeFormat('en-AU', {
      month: 'short',
      timeZone: 'UTC'
    }).format(date)
  }
}

export default function Events({
  weeklyEvents,
  specialEvents
}: EventsProps) {
  const weeklyEventList = weeklyEvents ?? []
  const specialEventList = specialEvents ?? []

  if (
    weeklyEventList.length === 0 &&
    specialEventList.length === 0
  ) {
    return null
  }

  return (
    <section className={styles.events} id='events'>
      <div className={styles.container}>
        <SectionHeading {...sectionHeadingData.events} />

        {weeklyEventList.length > 0 && (
          <div className={styles.weeklySection}>
            <div className={styles.subheadingRow}>
              <p className={styles.sectionEyebrow}>What's On</p>

              <h3 className={styles.subheading}>Weekly Offers</h3>
            </div>

            <div className={styles.weeklyGrid}>
              {weeklyEventList.map((event) => (
                <article
                  className={styles.weeklyCard}
                  key={event._key}
                >
                  <p className={styles.dayName}>
                    {event.schedule}
                  </p>

                  <div className={styles.weeklyContent}>
                    <h4 className={styles.weeklyTitle}>
                      {event.title}
                    </h4>

                    {event.time && (
                      <p className={styles.weeklyTime}>
                        {event.time}
                      </p>
                    )}

                    <p className={styles.weeklyPrice}>
                      {event.price || '\u00A0'}
                    </p>

                    <p className={styles.weeklyDescription}>
                      {event.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {specialEventList.length > 0 && (
          <div className={styles.specialSection}>
            <div className={styles.subheadingRow}>
              <p className={styles.sectionEyebrow}>Coming Up</p>

              <h3 className={styles.subheading}>
                Special Events
              </h3>
            </div>

            <div className={styles.specialEvents}>
              {specialEventList.map((event) => {
                const { day, month } = getEventDate(event.date)

                return (
                  <article
                    className={styles.specialEvent}
                    key={event._key}
                  >
                    <time
                      className={styles.date}
                      dateTime={event.date}
                    >
                      <span className={styles.dateDay}>
                        {day}
                      </span>

                      <span className={styles.dateMonth}>
                        {month}
                      </span>
                    </time>

                    <div className={styles.eventImage}>
                      {event.image && (
                        <Image
                          src={event.image}
                          alt={event.imageAlt ?? ''}
                          fill
                          sizes='(max-width: 550px) 100vw, 220px'
                          className={styles.image}
                        />
                      )}
                    </div>

                    <div className={styles.eventContent}>
                      <h4 className={styles.eventTitle}>
                        {event.title}
                      </h4>

                      {event.time && (
                        <p className={styles.weeklyTime}>
                          {event.time}
                        </p>
                      )}

                      <p className={styles.eventDescription}>
                        {event.description}
                      </p>
                    </div>

                    {event.price && (
                      <p className={styles.price}>
                        {event.price}
                      </p>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
```

## ./src/components/Events/Events.module.css
```css
.events {
  position: relative;
  z-index: 1;
  padding-block: 6rem;
  padding-inline: 6rem;
  background: var(--dark-background);
  color: var(--light-text);
}

.events::before,
.events::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 24px;
  background: var(--dark-background);
  filter: url('#roughen');
  pointer-events: none;
}

.events::before {
  top: -12px;
}

.events::after {
  bottom: -12px;
}

.container {
  width: 100%;
  max-width: var(--page-width);
  margin-inline: auto;
}

/* SECTION HEADINGS */

.weeklySection {
  margin-top: 5rem;
}

.specialSection {
  margin-top: 6rem;
}

.subheadingRow {
  margin-bottom: 2rem;
}

.sectionEyebrow {
  margin: 0 0 0.6rem;
  color: var(--primary-gold);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}

.subheading {
  margin: 0;
  color: var(--light-text);
  font-size: 1.75rem;
  font-weight: 300;
  letter-spacing: -1px;
}

/* WEEKLY EVENTS */

.weeklyGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
  gap: 1.25rem;
}

.weeklyCard {
  display: grid;
  grid-template-columns: 6.5rem minmax(0, 1fr);
  align-items: start;
  gap: 1.5rem;
  padding: 1.75rem 2rem;
  border: 0.25px solid rgba(200, 185, 149, 0.5);
  background: rgba(248, 247, 244, 0.035);
  transition:
    border-color 180ms ease,
    transform 180ms ease;
}

.weeklyCard:hover {
  border-color: var(--accent-on-dark);
  transform: translateY(-2px);
}

.dayName {
  margin: 0;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--primary-gold);
  color: var(--primary-gold);
  font-family: var(--display-font), serif;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
}

:global(html[data-theme='convivio']) .dayName {
  position: relative;
  width: max-content;
  max-width: 100%;
  justify-self: center;
  padding-bottom: 0.85rem;
  border-bottom: 0;
}

:global(html[data-theme='convivio']) .dayName::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 8px;
  background: var(--primary-gold);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='8' viewBox='0 0 32 8'%3E%3Cpath d='M0 4 Q8 0 16 4 T32 4' fill='none' stroke='black' stroke-width='0.75'/%3E%3C/svg%3E") left center / 32px 8px repeat-x;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='8' viewBox='0 0 32 8'%3E%3Cpath d='M0 4 Q8 0 16 4 T32 4' fill='none' stroke='black' stroke-width='0.75'/%3E%3C/svg%3E") left center / 32px 8px repeat-x;
}

.weeklyContent {
  min-width: 0;
}

.weeklyTitle {
  margin: 0 0 0.4rem;
  color: var(--light-text);
  font-family: var(--display-font), serif;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.2;
}

.weeklyTime {
  margin: 0 0 0.9rem;
  color: var(--primary-gold);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.weeklyDescription {
  margin: 0;
  color: var(--light-text);
  opacity: 0.9;
  font-size: 0.85rem;
  font-weight: 200;
  line-height: 1.6;
}

/* SPECIAL EVENTS */

.specialEvents {
  display: grid;
  gap: 1rem;
}

.specialEvent {
  display: grid;
  grid-template-columns: 5rem 13rem minmax(0, 1fr) auto;
  align-items: center;
  gap: 2rem;
  padding: 1rem 2rem 1rem 1.5rem;
  border: 0.25px solid rgba(200, 185, 149, 0.5);
  background: rgba(248, 247, 244, 0.035);
  transition: border-color 180ms ease;
}

.specialEvent:hover {
  transform: translateY(-2px);
}

.date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dateDay {
  color: var(--primary-gold);
  font-family: var(--display-font), serif;
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1;
}

.dateMonth {
  margin-top: 0.4rem;
  color: rgba(242, 242, 242, 0.65);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.eventImage {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.eventImage:empty {
  visibility: hidden;
}

.image {
  object-fit: cover;
}

.eventContent {
  min-width: 0;
}

.eventMeta {
  margin: 0 0 0.5rem;
  color: var(--primary-gold);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.eventTitle {
  margin: 0 0 0.6rem;
  color: var(--light-text);
  font-family: var(--display-font), serif;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.2;
}

.eventDescription {
  max-width: 38rem;
  margin: 0;
  color: var(--light-text);
  opacity: 0.9;
  font-size: 0.85rem;
  font-weight: 200;
  line-height: 1.6;
}

.price {
  margin: 0;
  color: var(--light-text);
  font-family: var(--display-font), serif;
  font-size: 1.05rem;
  white-space: nowrap;
}

:global(html[data-theme='convivio']) .sectionEyebrow,
:global(html[data-theme='convivio']) .dayName,
:global(html[data-theme='convivio']) .weeklyTime,
:global(html[data-theme='convivio']) .dateDay,
:global(html[data-theme='convivio']) .eventMeta {
  color: var(--accent-on-dark);
}

:global(html[data-theme='convivio']) .dateMonth {
  color: var(--accent-on-dark);
  font-family: var(--display-font);
  font-size: 1.1rem;
}

:global(html[data-theme='convivio']) .dayName::after {
  background: var(--accent-on-dark);
}

/* CONTINUOUS DAY-NAME RIPPLE */

@keyframes dayWaveRipple {
  from {
    -webkit-mask-position: 0 center;
    mask-position: 0 center;
  }

  to {
    -webkit-mask-position: 32px center;
    mask-position: 32px center;
  }
}

@media (prefers-reduced-motion: no-preference) {
  :global(html[data-theme='convivio']) .dayName::after {
    animation: dayWaveRipple 4000ms linear infinite;
  }

  :global(html[data-theme='convivio'])
    .weeklyCard:nth-child(even) .dayName::after {
    animation-delay: -2000ms;
  }
}

/* SMALL DESKTOP / TABLET */

@media (max-width: 1350px) {
  .events {
    padding-inline: 3rem;
  }

  .weeklyGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .specialEvent {
    grid-template-columns: 5rem 11rem minmax(0, 1fr);
  }

  .price {
    grid-column: 3;
  }
}

/* MOBILE / NARROW TABLET */

@media (max-width: 1000px) {
  .events {
    padding-block: 4rem;
    padding-inline: var(--inline-padding);
  }

  .weeklySection {
    margin-top: 4rem;
  }

  .specialSection {
    margin-top: 4rem;
  }

  .weeklyGrid {
    grid-template-columns: 1fr;
  }

  .specialEvent {
    grid-template-columns: 4.5rem 9rem minmax(0, 1fr);
    align-items: center;
    gap: 1.25rem;
    padding: 1.25rem;
  }

  .eventImage {
    grid-column: 2;
  }

  .eventContent {
    grid-column: 3;
  }

  .price {
    grid-column: 3;
  }

  .date {
    grid-row: auto;
    padding-top: 0;
  }

  .eventTitle {
    font-size: 1.3rem;
  }
}

/* SMALL MOBILE */

@media (max-width: 550px) {
  .weeklyCard {
    grid-template-columns: 6rem minmax(0, 1fr);
    gap: 1rem;
    padding: 1.5rem;
  }

  .dayName {
    font-size: 0.9rem;
  }

  .specialEvent {
    grid-template-columns: 1fr;
    padding: 1.25rem;
  }

  .date {
    grid-row: auto;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.5rem;
  }

  .dateDay {
    font-size: 2rem;
  }

  .dateMonth {
    margin-top: 0;
  }

  .eventImage,
  .eventContent,
  .price {
    grid-column: 1;
  }

  .eventImage {
    width: 100%;
    height: 11rem;
    aspect-ratio: auto;
  }

  .eventImage:empty {
    display: none;
  }
}

/* WEEKLY EVENTS OVERRIDES */

.weeklyGrid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.weeklyCard {
  grid-template-columns: 8rem minmax(0, 1fr);
}

.dayName {
  line-height: 1.5;
  white-space: normal;
  overflow-wrap: anywhere;
}

.weeklyPrice {
  margin: 0 0 0.9rem;
  color: var(--accent-on-dark, var(--primary-gold));
  font-family: var(--body-copy-font), serif;
  font-size: 1rem;
  font-weight: 700;
}

.weeklyDescription {
  white-space: pre-line;
}

@media (max-width: 1000px) {
  .weeklyGrid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 550px) {
  .weeklyCard {
    grid-template-columns: minmax(0, 1fr);
  }

  .weeklyCard .dayName {
    justify-self: start;
    text-align: left;
  }
}
```

## ./src/components/Menu/Menu.tsx
```tsx
'use client'

import { Fragment, useEffect, useState } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import { sectionHeadingData } from '@/data/sectionHeadingData'
import styles from './Menu.module.css'

type FoodLine1Span = {
  _key: string
  _type: 'span'
  text: string
  marks?: string[]
}

type FoodLine1Block = {
  _key: string
  _type: 'block'
  children: FoodLine1Span[]
}

export type MenuItem = {
  _key: string
  name: string
  foodLine1?: FoodLine1Block[]
  description?: string
  price: string
}

export type MenuSubcategory = {
  _key: string
  title: string
  items?: MenuItem[]
}

export type MenuCategory = {
  _key: string
  title: string
  items?: MenuItem[]
  subcategories?: MenuSubcategory[]
}

type MenuProps = {
  foodCategories: MenuCategory[]
  drinksCategories: MenuCategory[]
}

type MenuId = 'food' | 'drinks'

type MenuDefinition = {
  id: MenuId
  label: string
  categories: MenuCategory[]
}

type MenuSelection = {
  menuId: MenuId
  categoryKey: string | null
  previousCategory: MenuCategory | null
  previousMenu: MenuDefinition | null
  version: number
}

function getDefaultCategory(menuId: MenuId, categories: MenuCategory[]) {
  if (menuId === 'food') {
    return (
      categories.find(
        (category) => category.title.trim().toLowerCase() === 'small'
      ) ??
      categories[0] ??
      null
    )
  }

  return categories[0] ?? null
}

function FoodLine1({ blocks }: { blocks: FoodLine1Block[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <Fragment key={block._key}>
          {index > 0 && <br />}
          {block.children.map((span) => {
            const text = span.text.split('\n').map((line, lineIndex) => (
              <Fragment key={lineIndex}>
                {lineIndex > 0 && <br />}
                {line}
              </Fragment>
            ))
            const emphasis = span.marks?.includes('em') ? <em>{text}</em> : text

            return (
              <Fragment key={span._key}>
                {span.marks?.includes('strong') ? (
                  <strong>{emphasis}</strong>
                ) : (
                  emphasis
                )}
              </Fragment>
            )
          })}
        </Fragment>
      ))}
    </>
  )
}

function MenuItems({ items, menuId }: { items?: MenuItem[]; menuId: MenuId }) {
  return (
    <div className={styles.menuGrid}>
      {items?.map((item) => (
        <article className={styles.menuItem} key={item._key}>
          <div className={styles.itemContent}>
            <div className={styles.itemTop}>
              <div className={styles.itemLabel}>
                <h4
                  className={`${styles.itemName} ${
                    menuId === 'food' && item.foodLine1?.length
                      ? styles.foodLine1
                      : ''
                  }`}
                >
                  {menuId === 'food' && item.foodLine1?.length ? (
                    <FoodLine1 blocks={item.foodLine1} />
                  ) : (
                    item.name
                  )}
                </h4>

                <span className={styles.dots} aria-hidden='true' />
              </div>

              <span className={styles.price}>{item.price}</span>
            </div>

            {item.description && (
              <p className={styles.description}>{item.description}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

function CategoryContent({
  category,
  menuId
}: {
  category: MenuCategory | null
  menuId: MenuId
}) {
  if (!category) {
    return <p className={styles.emptyMessage}>This menu is being updated.</p>
  }

  return (
    <div className={styles.categoryContent}>
      {!!category.items?.length && (
        <MenuItems items={category.items} menuId={menuId} />
      )}

      {category.subcategories?.map((subcategory) => (
        <section className={styles.subcategory} key={subcategory._key}>
          <h3 className={styles.subcategoryHeading}>{subcategory.title}</h3>

          <MenuItems items={subcategory.items} menuId={menuId} />
        </section>
      ))}
    </div>
  )
}

export default function Menu({ foodCategories, drinksCategories }: MenuProps) {
  const menus: MenuDefinition[] = [
    {
      id: 'food',
      label: 'Chefs Selection',
      categories: foodCategories
    },
    {
      id: 'drinks',
      label: 'Wine List & Drinks',
      categories: drinksCategories
    }
  ]

  const [selection, setSelection] = useState<MenuSelection>(() => ({
    menuId: 'food',
    categoryKey: getDefaultCategory('food', foodCategories)?._key ?? null,
    previousCategory: null,
    previousMenu: null,
    version: 0
  }))

  const activeMenu =
    menus.find((menu) => menu.id === selection.menuId) ?? menus[0]

  const activeCategory =
    activeMenu.categories.find(
      (category) => category._key === selection.categoryKey
    ) ?? getDefaultCategory(activeMenu.id, activeMenu.categories)

  useEffect(() => {
    if (selection.version === 0) return

    const version = selection.version

    const timeout = window.setTimeout(() => {
      setSelection((current) =>
        current.version === version
          ? {
              ...current,
              previousCategory: null,
              previousMenu: null
            }
          : current
      )
    }, 600)

    return () => window.clearTimeout(timeout)
  }, [selection.version])

  function changeMenu(menu: MenuDefinition) {
    if (menu.id === activeMenu.id) return

    setSelection({
      menuId: menu.id,
      categoryKey: getDefaultCategory(menu.id, menu.categories)?._key ?? null,
      previousCategory: activeCategory,
      previousMenu: activeMenu,
      version: selection.version + 1
    })
  }

  function changeCategory(category: MenuCategory) {
    if (category._key === activeCategory?._key) return

    setSelection({
      menuId: activeMenu.id,
      categoryKey: category._key,
      previousCategory: activeCategory,
      previousMenu: null,
      version: selection.version + 1
    })
  }

  if (foodCategories.length === 0 && drinksCategories.length === 0) {
    return null
  }

  return (
    <section className={styles.pricing} id='menu'>
      <div className={styles.container}>
        <SectionHeading {...sectionHeadingData.menu} />

        <nav className={styles.menuButtons} aria-label='Choose a menu'>
          {menus.map((menu, index) => (
            <Fragment key={menu.id}>
              <button
                className={`${styles.menuButton} ${
                  activeMenu.id === menu.id ? styles.active : ''
                }`}
                type='button'
                aria-pressed={activeMenu.id === menu.id}
                onClick={() => changeMenu(menu)}
              >
                {menu.label}
              </button>

              {index < menus.length - 1 && (
                <span className={styles.separator} aria-hidden='true'>
                  |
                </span>
              )}
            </Fragment>
          ))}
        </nav>

        <div className={styles.categoryWindow}>
          {selection.previousMenu && (
            <div
              className={`${styles.categories} ${styles.outgoingCategories}`}
              aria-hidden='true'
              key={`previous-${selection.version}`}
            >
              {selection.previousMenu.categories.map(
                (category, index, categories) => (
                  <Fragment key={category._key}>
                    <span className={styles.categoryButton}>
                      {category.title}
                    </span>

                    {index < categories.length - 1 && (
                      <span className={styles.separator}>|</span>
                    )}
                  </Fragment>
                )
              )}
            </div>
          )}

          <nav
            className={`${styles.categories} ${
              selection.previousMenu ? styles.incomingCategories : ''
            }`}
            aria-label={`${activeMenu.label} categories`}
            key={activeMenu.id}
          >
            {activeMenu.categories.map((category, index) => (
              <Fragment key={category._key}>
                <button
                  className={`${styles.categoryButton} ${
                    activeCategory?._key === category._key ? styles.active : ''
                  }`}
                  type='button'
                  aria-pressed={activeCategory?._key === category._key}
                  onClick={() => changeCategory(category)}
                >
                  {category.title}
                </button>

                {index < activeMenu.categories.length - 1 && (
                  <span className={styles.separator} aria-hidden='true'>
                    |
                  </span>
                )}
              </Fragment>
            ))}
          </nav>
        </div>

        <div className={styles.menuWindow}>
          {selection.previousCategory && (
            <div className={styles.previousMenu} aria-hidden='true'>
              <CategoryContent
                category={selection.previousCategory}
                menuId={selection.previousMenu?.id ?? activeMenu.id}
              />
            </div>
          )}

          <div
            className={`${styles.menuPanel} ${
              selection.version > 0 ? styles.incomingMenu : ''
            }`}
            key={`${activeMenu.id}-${activeCategory?._key ?? 'empty'}-${selection.version}`}
          >
            <CategoryContent category={activeCategory} menuId={activeMenu.id} />
          </div>
        </div>

        {activeMenu.id === 'food' && (
          <p className={styles.dietaryKey}>
            V = Vegetarian, VG = Vegan, GF = Gluten Free, DF = Dairy Free, NF =
            Nut Free
          </p>
        )}
      </div>
    </section>
  )
}

```

## ./src/components/Menu/Menu.module.css
```css
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

.menuButtons,
.categories {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.menuButtons {
  margin: 3rem 0 2rem;
}

.menuButton,
.categoryButton {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--light-text);
  cursor: pointer;
}

.menuButton {
  font-family: var(--display-font), serif;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.5;
}

.categoryButton {
  font-family: var(--body-copy-font), serif;
  font-size: 1.35rem;
  font-weight: 400;
  line-height: 1.5;
}

.menuButton:hover,
.categoryButton:hover {
  opacity: 0.65;
}

.active {
  color: var(--primary-gold);
}

.active:hover {
  opacity: 1;
}

.menuButton:focus-visible,
.categoryButton:focus-visible {
  outline: 2px solid var(--accent-on-dark);
  outline-offset: 4px;
}

.separator {
  color: var(--light-text);
  opacity: 0.2;
}

.categoryWindow {
  position: relative;
  overflow: hidden;
  margin-bottom: 4rem;
  padding: 0.5rem;
}

.categories {
  position: relative;
  margin: 0;
}

.outgoingCategories {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  left: 0.5rem;
  pointer-events: none;
  animation: categoriesOut 0.6s ease both;
}

.incomingCategories {
  animation: categoriesIn 0.6s ease both;
}

@keyframes categoriesOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }

  to {
    transform: translateX(110%);
    opacity: 0;
  }
}

@keyframes categoriesIn {
  from {
    transform: translateX(-110%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.menuWindow {
  position: relative;
  overflow: hidden;
}

.menuPanel {
  position: relative;
  background: var(--primary-black);
}

.previousMenu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.incomingMenu {
  z-index: 1;
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

.categoryContent {
  display: grid;
  gap: 3.5rem;
}

.menuGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.5rem 4rem;
}

.subcategory {
  min-width: 0;
}

.subcategoryHeading {
  margin: 0 0 1.75rem;
  color: var(--primary-gold);
  font-family: var(--strong-font), serif;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.4;
}

.menuItem {
  min-width: 0;
}

.itemContent {
  min-width: 0;
}

.itemTop {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  column-gap: 1.125rem;
}

.itemLabel {
  font-family: var(--body-copy-font), serif;
  min-width: 0;
  overflow: hidden;
  font-size: 1.15rem;
  line-height: 1.45;
}

.itemName {
  display: inline;
  flex: 0 1 auto;
  min-width: 0;
  margin: 0;
  color: var(--light-text);
  font-family: var(--strong-font), serif;
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.dots {
  display: inline-block;
  width: 100%;
  height: 1px;
  margin-left: 1.125rem;
  margin-right: calc(-100% - 1.125rem);
  vertical-align: 0.12em;
  opacity: 0.3;
  background: repeating-linear-gradient(
    to right,
    var(--light-text) 0,
    var(--light-text) 0.75px,
    transparent 0.75px,
    transparent 5px
  );
}

.price {
  flex-shrink: 0;
  color: var(--primary-gold);
  font-family: var(--body-copy-font), serif;
  font-size: 1.15rem;
  font-weight: 400;
  line-height: 1.45;
  white-space: nowrap;
}

.description {
  margin: 0.35rem 0 0;
  color: var(--light-text);
  font-family: var(--body-copy-font), serif;
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.6;
  opacity: 0.5;
  white-space: pre-line;
}

.emptyMessage {
  margin: 0;
  text-align: center;
  opacity: 0.65;
}

.dietaryKey {
  margin: 2.5rem 0 0;
  color: var(--light-text);
  font-family: var(--body-copy-font), serif;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.6;
  text-align: center;
}

@media (max-width: 1200px) {
  .pricing {
    padding-block: 4rem;
    padding-inline: var(--inline-padding);
  }

  .menuButtons,
  .categories {
    gap: 0.75rem;
  }

  .menuButtons {
    margin-top: 2.5rem;
  }

  .categoryWindow {
    margin-bottom: 3rem;
  }

  .categoryButton {
    font-size: 1.1rem;
  }

  .menuGrid {
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
  }

  .itemLabel,
  .itemName,
  .price {
    font-size: 1rem;
  }

  .itemTop {
    column-gap: 0.75rem;
  }

  .dots {
    margin-left: 0.75rem;
    margin-right: calc(-100% - 0.75rem);
  }

  .description {
    font-size: 0.9rem;
  }

  .subcategoryHeading {
    font-size: 1.25rem;
  }
}

@media (max-width: 550px) {
  .menuButtons {
    flex-direction: column;
  }

  .menuButtons > .separator {
    display: none;
  }

  .menuButton {
    font-size: 1.1rem;
  }

  .categoryContent {
    gap: 3rem;
  }

  .subcategoryHeading {
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .incomingMenu,
  .incomingCategories {
    animation: none;
  }

  .outgoingCategories {
    display: none;
  }
}

/* Formatted food text uses regular weight unless the editor applies bold. */
.foodLine1 {
  font-family: var(--body-copy-font), serif;
  font-weight: 400;
  overflow-wrap: break-word;
}

.foodLine1 strong {
  color: var(--primary-gold);
  font-family: var(--strong-font), serif;
  font-weight: 700;
}

.foodLine1 em {
  font-style: italic;
}

/* Reserve space before food prices while keeping the dotted leader. */

.itemLabel {
  --leader-reserve: 0rem;
  --leader-text-gap: 1.125rem;
  padding-right: var(--leader-reserve);
}

.itemLabel:has(.foodLine1) {
  --leader-reserve: 6rem;
}

.dots {
  width: calc(100% + var(--leader-reserve));
  margin-left: var(--leader-text-gap);
  margin-right: calc(
    -100% - var(--leader-reserve) - var(--leader-text-gap)
  );
  vertical-align: 0;
  opacity: 1;
  background: repeating-linear-gradient(
    to right,
    var(--light-text) 0,
    var(--light-text) 0.75px,
    transparent 0.75px,
    transparent 5px
  );
}

@media (max-width: 1200px) {
  .itemLabel {
    --leader-text-gap: 0.75rem;
  }
}

```