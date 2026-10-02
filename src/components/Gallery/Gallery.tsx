'use client'

import Image from 'next/image'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties
} from 'react'
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
  description,
  images,
  instagramUrl
}: GalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isCompact, setIsCompact] = useState(false)
  const activeSlideRef = useRef(0)
  const animationRef = useRef<number | null>(null)
  const restoreScrollRef = useRef<(() => void) | null>(null)

  const cancelSlide = useCallback(() => {
    if (animationRef.current !== null)
      window.cancelAnimationFrame(animationRef.current)
    animationRef.current = null
    restoreScrollRef.current?.()
    restoreScrollRef.current = null
  }, [])

  const visibleImages = images.slice(0, 12)
  const columnCount = Math.min(isCompact ? 2 : 4, visibleImages.length)

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

  const columns = Array.from({ length: columnCount }, (_, columnIndex) =>
    indexedImages.filter(({ index }) => index % columnCount === columnIndex)
  )

  const scrollToSlide = useCallback(
    (index: number) => {
      const gallery = galleryRef.current
      if (!gallery) return
      cancelSlide()
      const selected = gallery.querySelector<HTMLElement>(
        `[data-gallery-index='${index}']`
      )
      if (!selected) return
      const left =
        selected.getBoundingClientRect().left -
        gallery.getBoundingClientRect().left +
        gallery.scrollLeft
      const target = Math.max(
        0,
        Math.min(left, gallery.scrollWidth - gallery.clientWidth)
      )
      activeSlideRef.current = index
      setActiveSlide(index)

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gallery.scrollTo({ left: target, behavior: 'instant' })
        return
      }

      const start = gallery.scrollLeft
      const distance = target - start
      if (Math.abs(distance) < 1) return
      const previousSnap = gallery.style.scrollSnapType
      const previousBehavior = gallery.style.scrollBehavior
      gallery.style.scrollSnapType = 'none'
      gallery.style.scrollBehavior = 'auto'
      restoreScrollRef.current = () => {
        gallery.style.scrollSnapType = previousSnap
        gallery.style.scrollBehavior = previousBehavior
      }
      const duration = Math.min(
        2800,
        1400 * Math.sqrt(Math.max(1, Math.abs(distance) / gallery.clientWidth))
      )
      const started = performance.now()
      const animate = (now: number) => {
        const progress = Math.min(1, (now - started) / duration)
        const eased = (1 - Math.cos(Math.PI * progress)) / 2
        gallery.scrollLeft = start + distance * eased
        if (progress < 1) {
          animationRef.current = window.requestAnimationFrame(animate)
        } else {
          animationRef.current = null
          restoreScrollRef.current?.()
          restoreScrollRef.current = null
        }
      }
      animationRef.current = window.requestAnimationFrame(animate)
    },
    [cancelSlide]
  )

  useEffect(() => () => cancelSlide(), [cancelSlide])

  function updateActiveSlide() {
    const gallery = galleryRef.current

    if (animationRef.current !== null) return

    if (!gallery || gallery.scrollWidth <= gallery.clientWidth) {
      return
    }

    let closestIndex = 0
    let closestDistance = Infinity
    const left = gallery.getBoundingClientRect().left

    gallery
      .querySelectorAll<HTMLElement>('[data-gallery-index]')
      .forEach((item) => {
        const distance = Math.abs(item.getBoundingClientRect().left - left)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = Number(item.dataset.galleryIndex)
        }
      })

    activeSlideRef.current = closestIndex
    setActiveSlide(closestIndex)
  }

  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery || visibleImages.length < 2) return
    const mobile = window.matchMedia('(max-width: 499px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let interacting = false
    const pause = () => {
      interacting = true
      cancelSlide()
    }
    const resume = () => {
      interacting = false
    }
    const timer = window.setInterval(() => {
      if (
        !mobile.matches ||
        reducedMotion.matches ||
        interacting ||
        document.hidden
      )
        return
      const bounds = gallery.getBoundingClientRect()
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return
      const index = (activeSlideRef.current + 1) % visibleImages.length
      scrollToSlide(index)
    }, 4000)
    gallery.addEventListener('pointerdown', pause)
    window.addEventListener('pointerup', resume)
    window.addEventListener('pointercancel', resume)
    gallery.addEventListener('focusin', pause)
    gallery.addEventListener('focusout', resume)
    return () => {
      window.clearInterval(timer)
      gallery.removeEventListener('pointerdown', pause)
      window.removeEventListener('pointerup', resume)
      window.removeEventListener('pointercancel', resume)
      gallery.removeEventListener('focusin', pause)
      gallery.removeEventListener('focusout', resume)
    }
  }, [visibleImages.length, scrollToSlide, cancelSlide])

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
          style={{ '--gallery-columns': columnCount } as CSSProperties}
          ref={galleryRef}
          onScroll={updateActiveSlide}
        >
          {columns.map((column, columnIndex) => (
            <div className={styles.galleryColumn} key={columnIndex}>
              {column.map((item, rowIndex) => {
                const isTall = (columnIndex + rowIndex) % 2 === 1

                return (
                  <div
                    className={`${styles.imageFrame} ${
                      isTall ? styles.tall : styles.short
                    }`}
                    style={{ order: item.index }}
                    data-gallery-index={item.index}
                    key={item._key}
                  >
                    <div className={styles.imageInner}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes='(max-width: 499px) 270px, (max-width: 1000px) 320px, (max-width: 1200px) 22vw, 17rem'
                        className={styles.galleryImage}
                      />
                    </div>
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
