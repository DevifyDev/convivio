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
          

      <div
            className={`${styles.menuPanel} ${
              selection.version > 0 ? styles.incomingMenu : ''
            }`}
            key={`${activeMenu.id}-${activeCategory?._key ?? 'empty'}-${selection.version}`}
          >
            <CategoryContent
              category={activeCategory}
              menuId={activeMenu.id}
            />
          </div>
        </div>

        {activeMenu.id === 'food' && (
          <p className={styles.dietaryKey}>
            V = Vegetarian, VG = Vegan, GF = Gluten Free,
            DF = Dairy Free, NF = Nut Free
          </p>
        )}
      </div>
    </section>
  )
}
