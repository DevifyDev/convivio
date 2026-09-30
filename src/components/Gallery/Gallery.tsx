'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Button from '../Button/Button'
import SectionHeading from '../SectionHeading/SectionHeading'
import { sectionHeadingData } from '../../data/sectionHeadingData'
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
  const [isCompact, setIsCompact] = useState(false)

  const visibleImages = images.slice(0, 12)
  const columnCount = Math.min(
    isCompact ? 2 : 4,
    visibleImages.length
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1000px)')
    const updateLayout = () => setIsCompact(mediaQuery.matches)

    updateLayout()
    mediaQuery.addEventListener('change', updateLayout)

    return () => {
      mediaQuery.removeEventListener('change', updateLayout)
    }
  }, [])

  const indexedImages = visibleImages.map((item, index) => ({
    ...item,
    index
  }))

  const columns = Array.from(
    { length: columnCount },
    (_, columnIndex) =>
      indexedImages.filter(
        ({ index }) => index % columnCount === columnIndex
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
          {...sectionHeadingData.gallery}
          description={description ?? sectionHeadingData.gallery.description}
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
                      sizes='(max-width: 499px) 270px, (max-width: 1000px) 320px, (max-width: 1200px) 22vw, 17rem'
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