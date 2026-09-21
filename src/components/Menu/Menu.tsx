'use client'

import { Fragment, useState } from 'react'
import { menuCategories, menuItemsByCategory, type MenuCategory } from '@/data/menuData'
import styles from './Menu.module.css'

type MenuItemsProps = {
  category: MenuCategory
}

function MenuItems({ category }: MenuItemsProps) {
  return (
    <>
      {menuItemsByCategory[category].map((item, index) => (
        <article className={styles.menuItem} key={`${category}-${index}`}>
          {/* <div className={styles.itemImage}></div> */}

          <div className={styles.itemContent}>
            <div className={styles.itemTop}>
              <h3 className={styles.itemName}>{item.name}</h3>
              <span className={styles.dots}></span>
              <span className={styles.price}>{item.price}</span>
            </div>

            <p className={styles.description}>{item.description}</p>
          </div>
        </article>
      ))}
    </>
  )
}

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(menuCategories[0])
  const [previousCategory, setPreviousCategory] = useState<MenuCategory | null>(null)

  function changeCategory(category: MenuCategory) {
    if (category === activeCategory) return

    setPreviousCategory(activeCategory)
    setActiveCategory(category)
  }

  return (
    <section className={styles.pricing} id='menu'>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Food & Wine</p>
          <h2 className={styles.heading}>Menu Book</h2>

          <div className={styles.divider}>
            <span className={styles.line}></span>
            <span className={styles.icon} aria-hidden='true'></span>
            <span className={styles.line}></span>
          </div>
        </header>

        <nav className={styles.categories} aria-label='Menu categories'>
          {menuCategories.map((category, index) => (
            <Fragment key={category}>
              <button
                className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
                type='button'
                aria-pressed={activeCategory === category}
                onClick={() => changeCategory(category)}
              >
                {category}
              </button>

              {index < menuCategories.length - 1 && (
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
            key={activeCategory}
          >
            <MenuItems category={activeCategory} />
          </div>
        </div>
      </div>
    </section>
  )
}