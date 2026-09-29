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
        
        <SectionHeading
          {...sectionHeadingData.menu}
          description={description}
        />

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