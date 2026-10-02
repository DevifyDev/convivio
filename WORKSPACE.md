# Workspace Export
Generated: 2026-10-02T00:29:40.780Z

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

function getDefaultCategory(
  menuId: MenuId,
  categories: MenuCategory[]
) {
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
                {span.marks?.includes('strong') ? <strong>{emphasis}</strong> : emphasis}
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
              <h4
              className={`${styles.itemName} ${
                menuId === 'food' && item.foodLine1?.length ? styles.foodLine1 : ''
              }`}
            >
              {menuId === 'food' && item.foodLine1?.length ? (
                <FoodLine1 blocks={item.foodLine1} />
              ) : item.name}
            </h4>

              <span className={styles.dots} aria-hidden='true' />

              <span className={styles.price}>{item.price}</span>
            </div>

            {item.description && (
              <p className={styles.description}>
                {item.description}
              </p>
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
    return (
      <p className={styles.emptyMessage}>
        This menu is being updated.
      </p>
    )
  }

  return (
    <div className={styles.categoryContent}>
      {!!category.items?.length && (
        <MenuItems items={category.items} menuId={menuId} />
      )}

      {category.subcategories?.map((subcategory) => (
        <section
          className={styles.subcategory}
          key={subcategory._key}
        >
          <h3 className={styles.subcategoryHeading}>
            {subcategory.title}
          </h3>

          <MenuItems items={subcategory.items} menuId={menuId} />
        </section>
      ))}
    </div>
  )
}

export default function Menu({
  foodCategories,
  drinksCategories
}: MenuProps) {
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
    categoryKey:
      getDefaultCategory('food', foodCategories)?._key ?? null,
    previousCategory: null,
    previousMenu: null,
    version: 0
  }))

  const activeMenu =
    menus.find((menu) => menu.id === selection.menuId) ?? menus[0]

  const activeCategory =
    activeMenu.categories.find(
      (category) => category._key === selection.categoryKey
    ) ??
    getDefaultCategory(activeMenu.id, activeMenu.categories)

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
      categoryKey:
        getDefaultCategory(menu.id, menu.categories)?._key ?? null,
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

  if (
    foodCategories.length === 0 &&
    drinksCategories.length === 0
  ) {
    return null
  }

  return (
    <section className={styles.pricing} id='menu'>
      <div className={styles.container}>
        <SectionHeading {...sectionHeadingData.menu} />

        <nav
          className={styles.menuButtons}
          aria-label='Choose a menu'
        >
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
                <span
                  className={styles.separator}
                  aria-hidden='true'
                >
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
              selection.previousMenu
                ? styles.incomingCategories
                : ''
            }`}
            aria-label={`${activeMenu.label} categories`}
            key={activeMenu.id}
          >
            {activeMenu.categories.map((category, index) => (
              <Fragment key={category._key}>
                <button
                  className={`${styles.categoryButton} ${
                    activeCategory?._key === category._key
                      ? styles.active
                      : ''
                  }`}
                  type='button'
                  aria-pressed={
                    activeCategory?._key === category._key
                  }
                  onClick={() => changeCategory(category)}
                >
                  {category.title}
                </button>

                {index < activeMenu.categories.length - 1 && (
                  <span
                    className={styles.separator}
                    aria-hidden='true'
                  >
                    |
                  </span>
                )}
              </Fragment>
            ))}
          </nav>
        </div>

        <div className={styles.menuWindow}>
          {selection.previousCategory && (
            <div
              className={styles.previousMenu}
              aria-hidden='true'
            >
              <CategoryContent
                category={selection.previousCategory}
              menuId={selection.previousMenu?.id ?? activeMenu.id}
              />
            </div>
          )}
{activeMenu.id === 'food' && (
  <p className={styles.dietaryKey}>
    V = Vegetarian, VG = Vegan, GF = Gluten Free, DF = Dairy Free, NF = Nut Free
  </p>
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
  display: flex;
  align-items: flex-end;
}

.itemName {
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
  flex: 1 0 1.5rem;
  height: 1px;
  margin-inline: 0.75rem;
  margin-bottom: 0.35rem;
  background: repeating-linear-gradient(
  to right,
  var(--light-text) 0,
  var(--light-text) 1px,
  transparent 1px,
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

```

## ./src/sanity/schemaTypes/documents/menuType.ts
```ts
import { defineArrayMember, defineField, defineType } from 'sanity'

export const menuType = defineType({
  name: 'menu',
  title: 'Food Menu',
  type: 'document',

  fields: [
    defineField({
      name: 'categories',
      title: 'Food Categories',
      type: 'array',
      description:
        'Add food categories and drag them to change their order.',
      of: [
        defineArrayMember({
          type: 'menuCategory'
        })
      ],
      initialValue: []
    })
  ],

  preview: {
    prepare() {
      return {
        title: 'Food Menu'
      }
    }
  }
})
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
import { defineArrayMember, defineField, defineType } from 'sanity'

export const menuItemType = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',

  fields: [
    defineField({
      name: 'foodLine1',
      title: 'Line 1',
      type: 'array',
      description: 'Food item and accompaniments. Select text to apply bold or italic. This text wraps naturally on the website.',
      hidden: ({ document }) => document?._type !== 'menu',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' }
            ],
            annotations: []
          }
        })
      ],
      validation: (rule) => rule.max(1).custom((value, context) => {
        if (context.document?._type !== 'menu') return true
        const blocks = value as { children?: { text?: string }[] }[] | undefined
        const text = blocks?.map((block) =>
          block.children?.map((span) => span.text ?? '').join('') ?? ''
        ).join('').trim()
        const parent = context.parent as { name?: string } | undefined
        return text || parent?.name?.trim()
          ? true
          : 'Enter Line 1 text.'
      })
    }),
    defineField({
      name: 'name',
      title: 'Line 1',
      type: 'string',
      hidden: ({ document, parent }) =>
        document?._type === 'menu' && !!parent?.foodLine1?.length,
      description:
        'Plain text for drinks or existing food items. For food, use the formatted Line 1 field above; this fallback is hidden once formatted text is saved.',
      validation: (rule) => rule.custom((value, context) =>
      context.document?._type === 'menu' || value?.trim()
        ? true
        : 'Enter Line 1 text.'
    )
    }),

    defineField({
      name: 'description',
      title: 'Line 2',
      type: 'text',
      rows: 2,
      description: 'Optional supporting text beneath the top line.'
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description:
        'Enter the price exactly as it should appear, including any symbols.',
      validation: (rule) => rule.required()
    })
  ],

  preview: {
    select: {
      title: 'name',
      foodLine1: 'foodLine1',
      subtitle: 'price'
    },
    prepare({ title, foodLine1, subtitle }) {
      const formattedTitle = foodLine1?.map((block: { children?: { text?: string }[] }) =>
        block.children?.map((span) => span.text ?? '').join('') ?? ''
      ).join(' ')
      return { title: formattedTitle || title || 'Menu Item', subtitle }
    }
  }
})

```