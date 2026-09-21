'use client'

import { useRef, useState } from 'react'
import Button from '../Button/Button'
import styles from './Gallery.module.css'

const galleryItems = [1, 2, 3, 4, 5, 6]

export default function Gallery() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  function scrollToSlide(index: number) {
    const gallery = galleryRef.current

    if (!gallery) return

    const items = Array.from(gallery.children) as HTMLElement[]
    const firstItem = items[0]
    const selectedItem = items[index]

    gallery.scrollTo({
      left: selectedItem.offsetLeft - firstItem.offsetLeft,
      behavior: 'smooth'
    })

    setActiveSlide(index)
  }

  function updateActiveSlide() {
    const gallery = galleryRef.current

    if (!gallery) return

    const items = Array.from(gallery.children) as HTMLElement[]
    const firstItem = items[0]

    let closestIndex = 0
    let closestDistance = Infinity

    items.forEach((item, index) => {
      const itemPosition = item.offsetLeft - firstItem.offsetLeft
      const distance = Math.abs(gallery.scrollLeft - itemPosition)

      if (distance < closestDistance) {
        closestIndex = index
        closestDistance = distance
      }
    })

    setActiveSlide(closestIndex)
  }

  return (
    <section className={styles.gallery} id='gallery'>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Lorem Ipsum Dolor</p>
          <h2 className={styles.heading}>Lorem Ipsum</h2>

          <div className={styles.divider}>
            <span className={styles.line}></span>

            <span className={styles.icon} aria-hidden='true'></span>

            <span className={styles.line}></span>
          </div>
        </header>

        <div
          className={styles.galleryGrid}
          ref={galleryRef}
          onScroll={updateActiveSlide}
        >
          {galleryItems.map((item) => (
            <div className={styles.imagePlaceholder} key={item}></div>
          ))}
        </div>

        <div className={styles.pagination} aria-label='Gallery navigation'>
          {galleryItems.map((item, index) => (
            <button
              className={`${styles.dot} ${
                activeSlide === index ? styles.activeDot : ''
              }`}
              type='button'
              aria-label={`View image ${index + 1}`}
              onClick={() => scrollToSlide(index)}
              key={item}
            ></button>
          ))}
        </div>

        <div className={styles.ctaContainer}>
          <Button label='Lorem Ipsum' href='#' variant='ctaLarge' />
        </div>

      </div>
    </section>
  )
}