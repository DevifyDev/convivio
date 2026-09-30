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
      const openingQuote = block.querySelector(`.${styles.quoteMark}`)

      if (!lastLine || !openingQuote) return

      const blockBounds = block.getBoundingClientRect()
      const quoteGap = openingQuote.getBoundingClientRect().height

      closingQuote.style.left = `${lastLine.right - blockBounds.left}px`
      closingQuote.style.top = `${lastLine.bottom - blockBounds.top + quoteGap}px`
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
        "
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

export default function Testimonials({
  testimonials
}: TestimonialsProps) {
  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className={styles.testimonials} id='testimonials'>
      <div className={styles.container}>
        <SectionHeading {...sectionHeadingData.testimonials} />

        <div className={styles.reviews}>
          {testimonials.map((testimonial) => {
            const rating = Math.min(
              5,
              Math.max(1, Math.round(testimonial.rating ?? 5))
            )

            return (
              <article
                className={styles.review}
                key={testimonial._key}
              >
                <ReviewQuote quote={testimonial.quote} />

                <footer className={styles.reviewer}>
                  <p className={styles.name}>
                    {testimonial.name}
                  </p>

                  <div
                    className={styles.rating}
                    role='img'
                    aria-label={`${rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <span
                        className={
                          index < rating
                            ? styles.star
                            : styles.starMuted
                        }
                        key={index}
                        aria-hidden='true'
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {testimonial.source && (
                    <p className={styles.source}>
                      {testimonial.source}
                    </p>
                  )}
                </footer>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}