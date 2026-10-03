# Workspace Export
Generated: 2026-10-03T11:22:19.027Z

## ./src/components/About/About.module.css
```css
:global(html[data-theme='convivio']) .heading {
  color: var(--primary-blue);
}

.about {
  overflow-x: clip;
  display: flex;
  align-items: center;
  min-height: 100vh;
  padding-block: var(--block-padding);
  padding-inline: 6rem;
  background: var(--light-background);
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
  width: 100%;
  max-width: var(--page-width);
  margin-inline: auto;
}

.eyebrow {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--primary-gold);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.heading {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--primary-black);
  font-size: 2.25rem;
  font-weight: 300;
  line-height: 1;
  letter-spacing: -2px;
}

.paragraph {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--secondary-black);
  font-size: 0.9rem;
  line-height: 1.7;
  font-weight: 200;
}

.images {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  justify-items: center;
  gap: 2rem;
}

.imageOne,
.imageTwo {
  position: relative;
  width: 100%;
  max-width: 18rem;
  aspect-ratio: 2 / 3;
}

.image {
  object-fit: cover;
}

.imageOne {
  margin-top: 6rem;
}

:global(html[data-theme='convivio']) .eyebrow {
  color: var(--accent-on-light-primary);
}

@media (min-width: 801px) and (max-width: 990px) {
  .about {
    padding-inline: 3rem;
  }

  .container {
    gap: 2rem;
  }

  .images {
    gap: 1rem;
  }

  .imageOne {
    margin-top: 4rem;
  }
}

@media (max-width: 800px) {
  .about {
    min-height: auto;
    padding-inline: var(--inline-padding);
  }

  .container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .heading {
    font-size: 2rem;
  }

  .images {
    grid-template-columns: repeat(2, minmax(0, 15rem));
    justify-content: center;
    gap: 1.25rem;
  }

  .imageOne {
    margin-top: 4rem;
  }
}

/* Keep the wrappers for animation, without a decorative frame. */
.imageFrame {
  position: relative;
  width: 100%;
  height: 100%;
}

.imageInner {
  position: relative;
  height: 100%;
  overflow: hidden;
}

@media (max-width: 800px) and (prefers-reduced-motion: no-preference) {
  .animate .imageFrame {
    opacity: 0;
    transform: translateX(-100vw);
    transition:
      transform 2800ms cubic-bezier(0.2, 0.65, 0.25, 1),
      opacity 1400ms ease;
  }

  .imageTwo.animate .imageFrame {
    transform: translateX(100vw);
  }

  .animate.visible .imageFrame {
    opacity: 1;
    transform: none;
  }
}

:global(html[data-theme='convivio']) .aboutCta a {
  border-color: var(--cta-btn-accent-dark);
  color: var(--cta-btn-accent-dark);
}

:global(html[data-theme='convivio']) .aboutCta a:hover {
  border-color: var(--primary-blue);
  background: var(--primary-blue);
  color: var(--light-text);
}

:global(html[data-theme='convivio']) .aboutCta a:focus-visible {
  outline-color: var(--cta-btn-accent-dark);
}

@media (max-width: 800px) {
  .content > .paragraph:last-of-type {
    margin-bottom: 0;
  }

  .aboutCta {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }

  .container {
    gap: 3rem;
  }
}

/* Convivio gradient background */

:global(html[data-theme='convivio']) .about {
  background: var(--light-background-gradient);
}
```

## ./src/components/Location/Location.tsx
```tsx
import type {
  BusinessDetails,
  DayKey
} from '@/types/businessDetails'

import SectionHeading from '../SectionHeading/SectionHeading'
import { sectionHeadingData } from '@/data/sectionHeadingData'
import styles from './Location.module.css'

type LocationProps = {
  description?: string
  businessDetails?: BusinessDetails | null
}

const days: {
  key: DayKey
  label: string
}[] = [
  {
    key: 'monday',
    label: 'Monday'
  },
  {
    key: 'tuesday',
    label: 'Tuesday'
  },
  {
    key: 'wednesday',
    label: 'Wednesday'
  },
  {
    key: 'thursday',
    label: 'Thursday'
  },
  {
    key: 'friday',
    label: 'Friday'
  },
  {
    key: 'saturday',
    label: 'Saturday'
  },
  {
    key: 'sunday',
    label: 'Sunday'
  }
]

function getPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export default function Location({
  description,
  businessDetails
}: LocationProps) {
  const hasOpeningHours = days.some(
    ({ key }) => businessDetails?.openingHours?.[key]
  )

  return (
    <section className={styles.location} id='location'>
      <div className={styles.container}>
        
        <SectionHeading {...sectionHeadingData.location} />

        <div className={styles.content}>
          <article className={styles.contactCard}>
            <div className={styles.detail}>
              <p className={styles.label}>Address</p>

              <p className={styles.value}>
                16E Calais Road
                <br />
                Scarborough, 6019
              </p>
            </div>

            {(businessDetails?.phone ||
              businessDetails?.email) && (
              <div className={styles.contactRow}>
                {businessDetails.phone && (
                  <div className={styles.detail}>
                    <p className={styles.label}>Phone</p>

                    <a
                      className={styles.value}
                      href={getPhoneHref(businessDetails.phone)}
                    >
                      {businessDetails.phone}
                    </a>
                  </div>
                )}

                {businessDetails.email && (
                  <div className={styles.detail}>
                    <p className={styles.label}>Email</p>

                    <a
                      className={styles.value}
                      href={`mailto:${businessDetails.email}`}
                    >
                      {businessDetails.email}
                    </a>
                  </div>
                )}
              </div>
            )}

            {hasOpeningHours && (
              <div className={styles.detail}>
                <p className={styles.label}>Opening Hours</p>

                <div className={styles.hours}>
                  {days.map(({ key, label }) => {
                    const hours =
                      businessDetails?.openingHours?.[key]

                    if (!hours) return null

                    return (
                      <div
                        className={styles.hourRow}
                        key={key}
                      >
                        <span>{label}</span>
                        <span>{hours}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {(businessDetails?.instagramUrl ||
              businessDetails?.facebookUrl) && (
              <div className={styles.socials}>
                <p className={styles.label}>Social</p>

                <div className={styles.socialLinks}>
                  {businessDetails.instagramUrl && (
                    <a
                      className={styles.socialLink}
                      href={businessDetails.instagramUrl}
                      aria-label='Instagram'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <span
                        className={`${styles.socialIcon} ${styles.instagramIcon}`}
                      ></span>
                    </a>
                  )}

                  {businessDetails.facebookUrl && (
                    <a
                      className={styles.socialLink}
                      href={businessDetails.facebookUrl}
                      aria-label='Facebook'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <span
                        className={`${styles.socialIcon} ${styles.facebookIcon}`}
                      ></span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </article>

          <div className={styles.map}>
            <iframe
              className={styles.mapFrame}
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3387.24680837167!2d115.7656974756268!3d-31.899890874042427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32afb7c7ea452d%3A0x29c2e19ef5eedb04!2sConvivio%20Wine%20Bar!5e0!3m2!1sen!2sau!4v1789992364904!5m2!1sen!2sau'
              title='Map showing Convivio Wine Bar in Scarborough'
              loading='lazy'
              allowFullScreen
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
```

## ./src/components/Location/Location.module.css
```css
.location {
  min-height: 100vh;
  padding-block: 6rem;
  padding-inline: clamp(2rem, 6vw, 6rem);
  background: var(--primary-white);
  color: var(--dark-text);
}

.container {
  width: 100%;
  max-width: var(--page-width);
  margin-inline: auto;
}

.content {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 4rem;
}

.contactCard {
  min-width: 0;
  padding: 3rem;
  border: 1px solid var(--primary-gold);
  background: var(--primary-white);
  color: var(--primary-black);
}

.contactRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.detail {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgb(22 18 14 / 0.15);
}

.label {
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: var(--primary-gold);
  font-family: var(--body-copy-font), sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.value,
.hourRow {
  color: inherit;
  font-family: var(--body-copy-font), sans-serif;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.55;
}

.value {
  margin: 0;
}

a.value:hover {
  color: var(--primary-gold);
}

.hours {
  display: grid;
  gap: 0.75rem;
}

.hourRow {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.socials {
  margin-top: 0.5rem;
}

.socialLinks {
  display: flex;
  gap: 0.75rem;
}

.socialLink {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  border: 1px solid var(--accent-on-light-secondary);
  color: var(--primary-gold);
  transition:
    background 180ms ease,
    color 180ms ease;
}

.socialIcon {
  display: block;
  width: 1.2rem;
  height: 1.2rem;
  background: var(--accent-on-light-secondary);
}

.instagramIcon {
  mask: url('/icons/instagram.svg') center / contain no-repeat;
  -webkit-mask: url('/icons/instagram.svg') center / contain no-repeat;
}

.facebookIcon {
  mask: url('/icons/facebook.svg') center / contain no-repeat;
  -webkit-mask: url('/icons/facebook.svg') center / contain no-repeat;
}

.socialLink:hover {
  background: var(--accent-on-light);
  color: var(--primary-black);
}

:global(html[data-theme='convivio']) .socialLink:hover .socialIcon {
  background: var(--primary-white);
}

.socialLink:focus-visible {
  outline: 2px solid var(--primary-gold);
  outline-offset: 4px;
}

.map {
  display: grid;
  min-width: 0;
  min-height: 34rem;
  place-items: center;
  border: 1px solid var(--primary-gold);
  background: var(--primary-white);
  text-align: center;
}

.mapFrame {
  width: 100%;
  height: 100%;
  border: 0;
}

:global(html[data-theme='convivio']) .contactCard {
  color: var(--primary-blue);
}

:global(html[data-theme='convivio']) .contactCard,
:global(html[data-theme='convivio']) .map {
  border-color: var(--accent-on-light);
}

:global(html[data-theme='convivio']) .label {
  color: var(--accent-on-light);
}

:global(html[data-theme='convivio']) a.value:hover {
  color: var(--accent-on-light);
}

:global(html[data-theme='convivio']) .socialLink {
  border-color: var(--accent-on-light-secondary);
}

@media (max-width: 1200px) {
  .contactCard {
    padding: 2rem;
  }

  .contactRow {
    gap: 1rem;
  }

  .value,
  .hourRow {
    font-size: 1.1rem;
  }

  .contactRow .value {
    overflow-wrap: anywhere;
  }

  .detail {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
  }
}

@media (max-width: 1000px) {
  .location {
    min-height: auto;
    padding-block: 4rem;
    padding-inline: var(--inline-padding);
  }

  .content {
    grid-template-columns: 1fr;
    margin-top: 3rem;
  }

  .contactCard {
    min-height: auto;
    padding: 2rem;
  }

  .map {
    min-height: 22rem;
  }
}

@media (max-width: 550px) {
  .contactRow {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .contactCard {
    padding: 1.5rem;
  }

  .value,
  .hourRow {
    font-size: 1.1rem;
  }

  .hourRow {
    gap: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .socialLink {
    transition: none;
  }
}

/* Convivio gradient background */

:global(html[data-theme='convivio']) .location {
  background: var(--light-background-gradient);
}

:global(html[data-theme='convivio']) .contactCard,
:global(html[data-theme='convivio']) .map {
  background: transparent;
}
```

## ./src/components/Staff/Staff.module.css
```css
.staff {
  position: relative;
  padding: 6rem;
  overflow-x: clip;
  background: var(--light-background);
  color: var(--dark-text);
}

.staff::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    color-mix(in srgb, var(--accent-on-light-primary) 20%, transparent) 8%,
    color-mix(in srgb, var(--accent-on-light-primary) 20%, transparent) 92%,
    transparent 100%
  );
  mask: repeating-linear-gradient(
    90deg,
    #000 0 17px,
    transparent 17px 18px,
    #000 18px 39px,
    transparent 39px 40px
  );
  -webkit-mask: repeating-linear-gradient(
    90deg,
    #000 0 17px,
    transparent 17px 18px,
    #000 18px 39px,
    transparent 39px 40px
  );
  pointer-events: none;
}

.staff,
.staff * {
  box-sizing: border-box;
}

.container {
  width: 100%;
  max-width: var(--page-width);
  margin-inline: auto;
}

/* Shared team photo */

.groupPhotoSlot {
  perspective: 1200px;
}

.groupPhoto {
  position: relative;
  width: 100%;
  max-width: 30rem;
  margin: 1.5rem auto 0.75rem;
  padding: 1rem;
  background: var(--primary-blue);
}

.groupPhoto::after {
  content: '';
  position: absolute;
  inset: 0.5rem;
  border: 1px solid rgb(255 255 255 / 0.45);
  pointer-events: none;
}

.groupPhotoInner {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--primary-white);
}

.image {
  object-fit: cover;
}

/* Centred biographies */

.staffList {
  display: grid;
  gap: 4rem;
  width: 60%;
  margin: 4rem auto 0;
}

.staffSlot {
  display: flex;
  justify-content: center;
  min-width: 0;
}

.staffMember {
  width: 100%;
  min-width: 0;
}

.name {
  margin: 0 0 1.25rem;
  color: var(--primary-blue);
  font-family: var(--display-font, var(--heading-font, serif));
  font-size: clamp(1.6rem, 2.7vw, 2.2rem);
  font-weight: 400;
  line-height: 1.2;
  text-align: center;
  overflow-wrap: anywhere;
}

.description {
  padding-inline: 1rem;
  margin: 0;
  color: var(--dark-text);
  font-family: var(--body-copy-font), serif;
  font-size: 1.05rem;
  font-weight: 400;
  line-height: 1.8;
  text-align: left;
  white-space: pre-line;
  overflow-wrap: anywhere;
}

/* Alternating biography entrances */

@media (prefers-reduced-motion: no-preference) {
  .staffSlot.animate .staffMember {
    opacity: 0;
    transform: translateX(-100vw);
    transition:
      transform 4500ms ease-in-out,
      opacity 2200ms ease;
  }

  .staffSlot:nth-child(even).animate .staffMember {
    transform: translateX(100vw);
  }

  .staffSlot.animate.visible .staffMember,
  .staffSlot:nth-child(even).animate.visible .staffMember {
    opacity: 1;
    transform: none;
  }

  .groupPhotoSlot.animate .groupPhoto {
    opacity: 0;
    transform: translateX(-100vw) rotateX(360deg) scale(0.9);
    transform-origin: center;
    transition:
      transform 1800ms cubic-bezier(0.2, 0.65, 0.25, 1),
      opacity 1200ms ease;
  }

  .groupPhotoSlot.animate.visible .groupPhoto {
    opacity: 1;
    transform: none;
  }
}

/* Mobile */

@media (max-width: 800px) {
  .staff {
    padding: 4rem var(--inline-padding, 1.5rem);
  }

  .groupPhoto {
    padding: 0.75rem;
  }

  .groupPhoto::after {
    inset: 0.375rem;
  }

  .staffList {
    width: 100%;
    gap: 3rem;
    margin-top: 3rem;
  }

  .name {
    font-size: clamp(1.5rem, 4vw, 1.7rem);
  }

  .description {
    font-size: 1rem;
  }
}

:global(html[data-theme='convivio']) .staff .staffHeadingDescription {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  color: var(--primary-blue);
  font-family: var(--strong-font), serif;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

@media (max-width: 800px) {
  :global(html[data-theme='convivio']) .staff .staffHeadingDescription {
    font-size: 1.65rem;
  }
}

/* Convivio gradient background */

:global(html[data-theme='convivio']) .staff {
  background: var(--light-background-gradient);
}
```

## ./src/components/Testimonials/Testimonials.tsx
```tsx
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
```

## ./src/components/Testimonials/Testimonials.module.css
```css
.testimonials {
  padding-block: 6rem;
  padding-inline: 6rem;
  background: var(--light-background);
  color: var(--dark-text);
}

.container {
  width: 100%;
  max-width: var(--page-width);
  margin-inline: auto;
}

/* Reviews */

.reviews {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 4rem;
  border: 0.5px solid rgba(40, 51, 76, 0.12);
  background: rgba(40, 51, 76, 0.045);
}

.reviewSlot {
  min-width: 0;
}

.review {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  padding: 3rem;
  border-right: 1px solid rgba(40, 51, 76, 0.12);
}

.reviewSlot:last-child .review {
  border-right: 0;
}

.quoteBlock {
  display: flex;
  flex-direction: column;
}

.quoteMark {
  display: block;
  height: 3rem;
  color: var(--accent-on-light-primary);
  font-family: var(--display-font), serif;
  font-size: 5rem;
  font-weight: 300;
  line-height: 1;
}

.quote {
  margin: 0;
  color: var(--primary-blue);
  font-family: var(--body-copy-font), serif;
  font-size: 1.3rem;
  font-weight: 300;
  line-height: 1.5;
}

.closingQuote {
  display: none;
}

.reviewer {
  margin-top: 2rem;
}

.name {
  margin: 0 0 0.35rem;
  color: var(--primary-blue);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.rating {
  display: none;
}

.star,
.starMuted {
  display: inline-block;
}

.source {
  margin: 0;
  color: var(--accent-on-light-primary);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

/* Convivio theme */

:global(html[data-theme='convivio']) .testimonials {
  --review-accent: var(--accent-on-light-secondary);
}

:global(html[data-theme='convivio']) .reviews {
  gap: 1rem;
  border: 0;
  background: transparent;
}

:global(html[data-theme='convivio']) .review,
:global(html[data-theme='convivio']) .reviewSlot:last-child .review {
  position: relative;
  isolation: isolate;
  border: 0;
  background: transparent;
}

:global(html[data-theme='convivio']) .review::before {
  content: '';
  position: absolute;
  z-index: 0;
  inset: 0;
  background: rgba(40, 51, 76, 0.18);
  filter: url('#roughen-reviews');
  pointer-events: none;
}

:global(html[data-theme='convivio']) .review::after {
  content: '';
  position: absolute;
  z-index: 1;
  inset: 1px;
  background: color-mix(in srgb, #28334c 4.5%, var(--light-background));
  pointer-events: none;
}

:global(html[data-theme='convivio']) .review > * {
  position: relative;
  z-index: 2;
}

:global(html[data-theme='convivio']) .quoteBlock {
  position: relative;
  display: grid;
  grid-template-columns: 2rem minmax(0, 1fr) 2rem;
  column-gap: 0.5rem;
  padding-bottom: 1.25rem;
}

:global(html[data-theme='convivio']) .quoteMark {
  grid-column: 1;
  grid-row: 1;
  align-self: start;
  height: auto;
  font-size: 3.75rem;
}

:global(html[data-theme='convivio']) .quote {
  grid-column: 2;
  grid-row: 1;
}

:global(html[data-theme='convivio']) .closingQuote {
  display: block;
  position: absolute;
  visibility: hidden;
  color: var(--review-accent);
  font-family: var(--display-font), serif;
  font-size: 3.75rem;
  font-weight: 300;
  line-height: 1;
}

:global(html[data-theme='convivio']) .source {
  color: var(--review-accent);
}

:global(html[data-theme='convivio']) .reviewer {
  margin-top: 1.25rem;
  margin-left: 2.5rem;
}

:global(html[data-theme='convivio']) .rating {
  display: flex;
  gap: 0.05rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  line-height: 1;
}

:global(html[data-theme='convivio']) .star {
  color: #fbbc04;
}

:global(html[data-theme='convivio']) .starMuted {
  color: rgb(251 188 4 / 0.3);
}

:global(html[data-theme='convivio']) .source {
  margin-top: 0.5rem;
}

@media (min-width: 501px) and (max-width: 1000px) {
  :global(html[data-theme='convivio']) .reviews {
    width: min(72vw, 48rem);
    margin-inline: auto;
  }
}

/* Tablet / stacked reviews */

@media (max-width: 1300px) {
  .testimonials {
    overflow-x: clip;
  }

  .reviews {
    grid-template-columns: 1fr;
  }

  .review {
    border-right: 0;
    border-bottom: 1px solid var(--shadow-color);
  }

  .reviewSlot:last-child .review {
    border-bottom: 0;
  }
}

/* Alternating entrances for stacked reviews */

@media (max-width: 1300px) and (prefers-reduced-motion: no-preference) {
  .reviewSlot.animate .review {
    opacity: 0;
    transform: translateX(-100vw);
    transition:
      transform 2400ms cubic-bezier(0.2, 0.65, 0.25, 1),
      opacity 1200ms ease;
  }

  .reviewSlot:nth-child(even).animate .review {
    transform: translateX(100vw);
  }

  .reviewSlot.animate.visible .review,
  .reviewSlot:nth-child(even).animate.visible .review {
    opacity: 1;
    transform: none;
  }
}

/* Mobile */

@media (max-width: 800px) {
  .testimonials {
    padding-block: 4rem;
    padding-inline: var(--inline-padding);
  }

  .reviews {
    margin-top: 4rem;
  }

  .review {
    padding: 2rem 1rem;
  }

  .quote {
    font-size: 1.15rem;
  }
}

:global(html[data-theme='convivio']) .quoteMark .openingQuoteGlyph {
  display: inline-block;
  transform: scaleX(-1);
  transform-origin: center;
}

/* Convivio gradient background */

:global(html[data-theme='convivio']) .testimonials {
  background: var(--light-background-gradient);
}
```