'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import Button from '../Button/Button'
import SectionHeading from '../SectionHeading/SectionHeading'
import styles from './Gallery.module.css'

export type GalleryImage = {
  _key: string
  src: string
  alt: string
}

type GalleryProps = {
  description?: string
  images: GalleryImage[]
  instagramUrl?: string
}

export default function Gallery({
  description,
  images,
  instagramUrl
}: GalleryProps) {
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

  if (images.length === 0) {
    return null
  }

  return (
    <section className={styles.gallery} id='gallery'>
      <div className={styles.container}>
        <SectionHeading
          eyebrow='A closer look'
          heading='Food, Wine & Good Company'
          description='A look inside Convivio, where good food, thoughtful wine and familiar faces come together'
          variant='light'
          icon='sparkle'
          className={styles.sectionHeading}
        />

        <div
          className={styles.galleryGrid}
          ref={galleryRef}
          onScroll={updateActiveSlide}
        >
          {images.map((item) => (
            <div className={styles.imageFrame} key={item._key}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes='(max-width: 499px) 290px, (max-width: 699px) 50vw, 33vw'
                className={styles.galleryImage}
              />
            </div>
          ))}
        </div>

        <div
          className={styles.pagination}
          role='group'
          aria-label='Gallery navigation'
        >
          {images.map((item, index) => (
            <button
              className={`${styles.dot} ${
                activeSlide === index ? styles.activeDot : ''
              }`}
              type='button'
              aria-label={`View image ${index + 1}`}
              onClick={() => scrollToSlide(index)}
              key={item._key}
            ></button>
          ))}
        </div>

        {instagramUrl && (
          <div className={styles.ctaContainer}>
            <Button
              label='See More On Instagram'
              href={instagramUrl}
              variant='ctaLarge'
              target='_blank'
            />
          </div>
        )}
      </div>
    </section>
  )
}