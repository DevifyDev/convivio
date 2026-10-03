'use client'

import { useEffect, useRef } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import { sectionHeadingData } from '@/data/sectionHeadingData'
import styles from './Testimonials.module.css'

export type Testimonial = {
  _key: string
  quote: string
  name: string
  source?: string
  rating?: number
}

type TestimonialsProps = {
  description?: string
  testimonials: Testimonial[]
}

function ReviewQuote({ quote }: { quote: string }) {
  const blockRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const closingQuoteRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const block = blockRef.current
    const quoteBody = quoteRef.current
    const closingQuote = closingQuoteRef.current

    if (!block || !quoteBody || !closingQuote) return

    const positionClosingQuote = () => {
      const range = document.createRange()
      range.selectNodeContents(quoteBody)

      const lines = range.getClientRects()
      const lastLine = lines[lines.length - 1]

      if (!lastLine) return

      const blockBounds = block.getBoundingClientRect()
      const quoteBounds = quoteBody.getBoundingClientRect()
      const columnGap = parseFloat(getComputedStyle(block).columnGap) || 0

      closingQuote.style.left = `${quoteBounds.right - blockBounds.left + columnGap}px`
      closingQuote.style.top = `${lastLine.top - blockBounds.top}px`
      closingQuote.style.visibility = 'visible'
    }

    positionClosingQuote()

    const observer = new ResizeObserver(positionClosingQuote)
    observer.observe(block)
    observer.observe(quoteBody)

    document.fonts.ready.then(positionClosingQuote)
    window.addEventListener('resize', positionClosingQuote)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', positionClosingQuote)
    }
  }, [quote])

  return (
    <div className={styles.quoteBlock} ref={blockRef}>
      <span className={styles.quoteMark} aria-hidden='true'>
        <span className={styles.openingQuoteGlyph}>"</span>
      </span>

      <blockquote className={styles.quote} ref={quoteRef}>
        {quote}
      </blockquote>

      <span
        className={styles.closingQuote}
        ref={closingQuoteRef}
        aria-hidden='true'
      >
        "
      </span>
    </div>
  )
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const reviewsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = reviewsRef.current
    if (!container || !('IntersectionObserver' in window)) return

    const stacked = window.matchMedia('(max-width: 1300px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const slots = Array.from(
      container.querySelectorAll<HTMLElement>('[data-review-slot]')
    )
    const revealed = new WeakSet<HTMLElement>()
    let observer: IntersectionObserver | undefined

    const configure = () => {
      observer?.disconnect()

      slots.forEach((slot) => {
        slot.classList.remove(styles.animate, styles.visible)
      })

      if (!stacked.matches || reducedMotion.matches) return

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Tall reviews use a viewport-based fallback.
            const requiredHeight = Math.min(
              entry.boundingClientRect.height * 0.15,
              (entry.rootBounds?.height ?? window.innerHeight) * 0.75
            )

            if (
              !entry.isIntersecting ||
              entry.intersectionRect.height < requiredHeight
            ) {
              return
            }

            const slot = entry.target as HTMLElement
            revealed.add(slot)
            slot.classList.add(styles.visible)
            observer?.unobserve(slot)
          })
        },
        {
          rootMargin: '0px',
          threshold: Array.from({ length: 101 }, (_, index) => index / 100)
        }
      )

      slots.forEach((slot) => {
        slot.classList.add(styles.animate)

        if (revealed.has(slot)) {
          slot.classList.add(styles.visible)
        } else {
          observer?.observe(slot)
        }
      })
    }

    configure()
    stacked.addEventListener('change', configure)
    reducedMotion.addEventListener('change', configure)

    return () => {
      observer?.disconnect()
      stacked.removeEventListener('change', configure)
      reducedMotion.removeEventListener('change', configure)

      slots.forEach((slot) => {
        slot.classList.remove(styles.animate, styles.visible)
      })
    }
  }, [testimonials])

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className={styles.testimonials} id='testimonials'>
      <div className={styles.container}>
        <SectionHeading {...sectionHeadingData.testimonials} />

        <div className={styles.reviews} ref={reviewsRef}>
          {testimonials.map((testimonial) => {
            const rating = Math.min(
              5,
              Math.max(1, Math.round(testimonial.rating ?? 5))
            )

            return (
              <div
                className={styles.reviewSlot}
                key={testimonial._key}
                data-review-slot
              >
                <article className={styles.review}>
                  <ReviewQuote quote={testimonial.quote} />

                  <footer className={styles.reviewer}>
                    <p className={styles.name}>{testimonial.name}</p>

                    <div
                      className={styles.rating}
                      role='img'
                      aria-label={`${rating} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }, (_, index) => (
                        <span
                          className={
                            index < rating ? styles.star : styles.starMuted
                          }
                          key={index}
                          aria-hidden='true'
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    {testimonial.source && (
                      <p className={styles.source}>{testimonial.source}</p>
                    )}
                  </footer>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}