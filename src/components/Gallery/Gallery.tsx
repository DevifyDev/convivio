'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import Button from '../Button/Button'
import styles from './Gallery.module.css'

const galleryItems = [
  {
    src: '/images/gallery-1.jpg',
    alt: 'Guests dining inside Convivio Wine Bar'
  },
  {
    src: '/images/gallery-2.jpg',
    alt: 'Fresh pasta served at Convivio'
  },
  {
    src: '/images/gallery-3.jpg',
    alt: 'Wine and olives outside Convivio'
  },
  {
    src: '/images/gallery-4.jpg',
    alt: 'Convivio Bianco and Rosso wines'
  },
  {
    src: '/images/gallery-5.jpg',
    alt: 'Dessert being shared at Convivio'
  },
  {
    src: '/images/gallery-6.jpg',
    alt: 'Cocktail served in front of the Convivio wine selection'
  }
]

export default function Gallery() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  function scrollToSlide(index: number) {
    const gallery = galleryRef.current

    if (!gallery) return

    const items = Array.from(gallery.children) as HTMLElement[]
    const firstItem = items[0]
    const selectedItem = items[index]

    if (!firstItem || !selectedItem) return

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

    if (!firstItem) return

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
          <p className={styles.eyebrow}>Inside Convivio</p>
          <h2 className={styles.heading}>Food, Wine & Good Company</h2>

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
            <div className={styles.imageFrame} key={item.src}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes='(max-width: 499px) 290px, (max-width: 699px) 50vw, (max-width: 1099px) 33vw, 25vw'
                className={styles.galleryImage}
              />
            </div>
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
              key={item.src}
            ></button>
          ))}
        </div>

        <div className={styles.ctaContainer}>
          <Button label='See More On Instagram' href='https://www.instagram.com/conviviowinebar/?hl=en' variant='ctaLarge' target='_blank' />
        </div>
      </div>
    </section>
  )
}