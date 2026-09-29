'use client'

import Image from 'next/image'
import { useRef, useState, type CSSProperties } from 'react'
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
  description = 'A look inside Convivio, where good food, thoughtful wine and familiar faces come together',
  images,
  instagramUrl
}: GalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const visibleImages = images.slice(0, 12)
  const columnCount = Math.min(
    3,
    Math.ceil(visibleImages.length / 2)
  )

  const columns = Array.from(
    { length: columnCount },
    (_, columnIndex) =>
      visibleImages
        .map((item, index) => ({ ...item, index }))
        .filter(
          ({ index }) =>
            Math.floor(index / 2) % columnCount === columnIndex
        )
  )

  function scrollToSlide(index: number) {
    const gallery = galleryRef.current

    if (!gallery) return

    const selected = gallery.querySelector<HTMLElement>(
      `[data-gallery-index='${index}']`
    )

    if (!selected) return

    const left =
      selected.getBoundingClientRect().left -
      gallery.getBoundingClientRect().left +
      gallery.scrollLeft

    gallery.scrollTo({
      left,
      behavior: window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
        ? 'instant'
        : 'smooth'
    })

    setActiveSlide(index)
  }

  function updateActiveSlide() {
    const gallery = galleryRef.current

    if (!gallery || gallery.scrollWidth <= gallery.clientWidth) {
      return
    }

    let closestIndex = 0
    let closestDistance = Infinity
    const left = gallery.getBoundingClientRect().left

    gallery
      .querySelectorAll<HTMLElement>('[data-gallery-index]')
      .forEach((item) => {
        const distance = Math.abs(
          item.getBoundingClientRect().left - left
        )

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = Number(item.dataset.galleryIndex)
        }
      })

    setActiveSlide(closestIndex)
  }

  if (visibleImages.length === 0) return null

  return (
    <section className={styles.gallery} id='gallery'>
      <div className={styles.container}>
        <SectionHeading
          eyebrow='A closer look'
          heading='Food, Wine & Good Company'
          description={description}
          variant='light'
          icon='sparkle'
          className={styles.sectionHeading}
        />

        <div
          className={styles.galleryGrid}
          style={
            { '--gallery-columns': columnCount } as CSSProperties
          }
          ref={galleryRef}
          onScroll={updateActiveSlide}
        >
          {columns.map((column, columnIndex) => (
            <div
              className={styles.galleryColumn}
              key={columnIndex}
            >
              {column.map((item, rowIndex) => {
                const isTall =
                  (columnIndex + rowIndex) % 2 === 1

                return (
                  <div
                    className={`${styles.imageFrame} ${
                      isTall ? styles.tall : styles.short
                    }`}
                    style={{ order: item.index }}
                    data-gallery-index={item.index}
                    key={item._key}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes={
                        columnCount === 3
                          ? '(max-width: 499px) 290px, (max-width: 800px) 33vw, 352px'
                          : '(max-width: 499px) 290px, (max-width: 800px) 50vw, 352px'
                      }
                      className={styles.galleryImage}
                    />
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <div
          className={styles.pagination}
          role='group'
          aria-label='Gallery navigation'
        >
          {visibleImages.map((item, index) => (
            <button
              className={`${styles.dot} ${
                Math.min(activeSlide, visibleImages.length - 1) === index
                  ? styles.activeDot
                  : ''
              }`}
              type='button'
              aria-label={`View image ${index + 1}`}
              aria-pressed={
                Math.min(activeSlide, visibleImages.length - 1) === index
              }
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