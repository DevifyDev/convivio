# Workspace Export
Generated: 2026-10-02T02:20:06.630Z

## ./src/components/Gallery/Gallery.tsx
```tsx
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
  description,
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
```

## ./src/components/Gallery/Gallery.module.css
```css
.gallery {
  padding: 6rem;
  background: var(--light-background);
}

.container {
  width: 100%;
  max-width: var(--page-width);
  margin-inline: auto;
}

.galleryGrid {
  display: grid;
  grid-template-columns: repeat(
    var(--gallery-columns),
    minmax(0, 1fr)
  );
  align-items: start;
  gap: 1rem;
  width: 100%;
  max-width: calc(
    var(--gallery-columns) * 17rem +
    (var(--gallery-columns) - 1) * 1rem
  );
  margin: 4rem auto 0;
}

.galleryColumn {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
}

.imageFrame {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: var(--shadow-color, #d8dde3);
}

.short {
  aspect-ratio: 4 / 5;
}

.tall {
  aspect-ratio: 2 / 3;
}

.galleryImage {
  object-fit: cover;
  object-position: center;
}

.pagination {
  display: none;
}

.ctaContainer {
  display: flex;
  justify-content: center;
  margin-top: 4rem;
}

@media (max-width: 1000px) {
  .gallery {
    padding-inline: clamp(2rem, 6vw, 4rem);
  }

  .galleryGrid {
    max-width: 41rem;
  }
}

@media (max-width: 800px) {
  .gallery {
    padding: 4rem var(--inline-padding, 1.5rem);
  }

  .galleryGrid {
    margin-top: 3rem;
  }
}

@media (min-width: 600px) and (max-width: 1000px) {
  .galleryGrid {
    max-width: 34rem;
  }
}

@media (max-width: 499px) {
  .gallery {
    padding-inline: 0;
  }

  .sectionHeading {
    padding-inline: 1rem;
  }

  .galleryGrid {
    display: flex;
    width: min(270px, calc(100% - 2rem));
    max-width: none;
    gap: 0;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .galleryGrid::-webkit-scrollbar {
    display: none;
  }

  .galleryColumn {
    display: contents;
  }

  .imageFrame {
    flex: 0 0 100%;
    aspect-ratio: 3 / 4;
    scroll-snap-align: start;
  }

  .pagination {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding-inline: 1rem;
    margin-top: 2rem;
  }

  .dot {
    width: 0.75rem;
    height: 0.75rem;
    padding: 0;
    border: 1px solid var(--primary-gold);
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
  }

  .activeDot {
    background: var(--primary-gold);
  }

  .dot:focus-visible {
    outline: 2px solid var(--primary-gold);
    outline-offset: 3px;
  }

  :global(html[data-theme='convivio']) .dot {
    border-color: var(--accent-on-light-primary);
    opacity: 0.55;
  }

  :global(html[data-theme='convivio']) .activeDot {
    background: var(--accent-on-light-primary);
    opacity: 1;
  }

  :global(html[data-theme='convivio']) .dot:focus-visible {
    outline-color: var(--accent-on-light-primary);
  }

  .ctaContainer {
    margin-top: 2.5rem;
    padding-inline: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .galleryGrid {
    scroll-behavior: auto;
  }
}
```

## ./src/components/SectionHeading/SectionHeading.tsx
```tsx
import type { ReactNode } from 'react'
import styles from './SectionHeading.module.css'

type SectionHeadingProps = {
  eyebrow?: string
  heading: string
  description?: string
  variant?: 'light' | 'dark'
  icon?: 'sparkle' | 'wine' | 'location'
  className?: string
  children?: ReactNode
}

export default function SectionHeading({
  eyebrow,
  heading,
  description,
  variant = 'light',
  className,
  children
}: SectionHeadingProps) {
  return (
    <header
      className={[styles.header, styles[variant], className]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow && (
        <p className={styles.eyebrow}>{eyebrow}</p>
      )}

      <h2 className={styles.heading}>{heading}</h2>

      {description && (
        <p className={styles.description}>{description}</p>
      )}

      {children}

      <div className={styles.divider} aria-hidden='true'>
        <span className={styles.line}></span>
        <span className={styles.olive}></span>
        <span className={styles.line}></span>
      </div>
    </header>
  )
}
```

## ./src/components/SectionHeading/SectionHeading.module.css
```css
.header {
  text-align: center;
}

.light {
  color: var(--primary-black);
}

.dark {
  color: var(--light-text);
}

.eyebrow {
  margin: 0 0 1rem;
  color: var(--section-accent, var(--primary-gold));
  font-family: var(--body-copy-font), serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.heading {
  margin: 0 0 0.65rem;
  line-height: 1.2;
  color: inherit;
  font-family: var(--display-font, var(--heading-font, serif));
  font-size: 2.25rem;
  font-weight: 300;
  letter-spacing: -2px;
}

.description {
  max-width: 38rem;
  margin: 0 auto 1.25rem;
  color: inherit;
  font-family: var(--body-copy-font), serif;
  font-size: 1.05rem;
  font-weight: 400;
  line-height: 1.6;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.line {
  width: 5rem;
  height: 1px;
  background: var(--section-accent, var(--primary-gold));
  opacity: 0.35;
}

.icon {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  background: var(--section-accent, var(--primary-gold));
}

.sparkle {
  mask: url('/icons/sparkle.svg') center / contain no-repeat;
  -webkit-mask: url('/icons/sparkle.svg') center / contain no-repeat;
}

.wine {
  mask: url('/icons/wine-bottle.svg') center / contain no-repeat;
  -webkit-mask: url('/icons/wine-bottle.svg') center / contain no-repeat;
}

.location {
  mask: url('/icons/location-pin.svg') center / contain no-repeat;
  -webkit-mask: url('/icons/location-pin.svg') center / contain no-repeat;
}

/* Convivio theme */

.olive {
  display: none;
  margin: 0 auto;
}

:global(html[data-theme='convivio']) .header {
  --heading-decoration-width: 4rem;
}

:global(html[data-theme='convivio']) .eyebrow {
  display: none;
}

:global(html[data-theme='convivio']) .light {
  --section-accent: var(--accent-on-light);
  color: var(--primary-blue);
}

:global(html[data-theme='convivio']) .dark {
  --section-accent: var(--accent-on-dark);
}

:global(html[data-theme='convivio']) .divider {
  gap: 0;
  margin: 0;
}

:global(html[data-theme='convivio']) .divider .line {
  display: block;
  width: 3.5rem;
  height: 1px;
  background: var(--section-accent);
  opacity: 0.2;
  mask: none;
  -webkit-mask: none;
}

:global(html[data-theme='convivio']) .olive {
  display: block;
  width: 4rem;
  aspect-ratio: 389 / 191;
  flex-shrink: 0;
  margin: 0;
  background: var(--section-accent);
  opacity: 0.3;
  transform: rotate(-20deg);
  mask: url('/icons/olive-skewer-transparent.svg') center / contain no-repeat;
  -webkit-mask: url('/icons/olive-skewer-transparent.svg') center / contain no-repeat;
}

:global(html[data-theme='convivio']) .description {
  color: var(--section-accent);
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.5;
}

:global(html[data-theme='convivio']) .light .description {
  color: var(--primary-black);
}

@media (max-width: 800px) {
  :global(html[data-theme='convivio']) .description {
    font-size: 1.05rem;
  }
}

:global(html[data-theme='convivio']) .dark .olive,
:global(html[data-theme='convivio']) .dark .divider .line {
  background: #a6bbc6;
}

@media (max-width: 800px) {
  .heading {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }
}
```