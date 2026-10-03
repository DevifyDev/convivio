# Workspace Export
Generated: 2026-10-03T07:48:06.770Z

## ./src/components/About/About.tsx
```tsx
'use client'

import { useEffect, useRef } from 'react'
import Button from '@/components/Button/Button'
import Image from 'next/image'
import styles from './About.module.css'

export type AboutImages = {
  imageOne?: string
  imageOneAlt?: string
  imageTwo?: string
  imageTwoAlt?: string
}

export default function About({ images }: { images?: AboutImages | null }) {
  const imagesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
    const container = imagesRef.current
    if (!container || !('IntersectionObserver' in window)) return

    const mobile = window.matchMedia('(max-width: 800px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const slots = Array.from(
      container.querySelectorAll<HTMLElement>('[data-about-image]')
    )
    const lowerImage = slots[0]

    if (!lowerImage) return

    let observer: IntersectionObserver | undefined
    let hasPlayed = false

    const configure = () => {
      observer?.disconnect()

      if (!mobile.matches || reducedMotion.matches) {
        slots.forEach((slot) => {
          slot.classList.remove(styles.animate, styles.visible)
        })
        return
      }

      slots.forEach((slot) => {
        slot.classList.add(styles.animate)

        if (hasPlayed) {
          slot.classList.add(styles.visible)
        }
      })

      if (hasPlayed) return

      // Pixel units keep the offset tied to viewport height.
      const bottomInset = Math.round(window.innerHeight * 0.2)

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return

            hasPlayed = true

            slots.forEach((slot) => {
              slot.classList.add(styles.visible)
            })

            observer?.disconnect()
          })
        },
        {
          threshold: 0,
          rootMargin: `0px 0px -${bottomInset}px 0px`
        }
      )

      observer.observe(lowerImage)
    }

    configure()
    mobile.addEventListener('change', configure)
    reducedMotion.addEventListener('change', configure)
    window.addEventListener('resize', configure)

    return () => {
      observer?.disconnect()
      mobile.removeEventListener('change', configure)
      reducedMotion.removeEventListener('change', configure)
      window.removeEventListener('resize', configure)

      slots.forEach((slot) => {
        slot.classList.remove(styles.animate, styles.visible)
      })
    }
  }, [])

  return (
    <section className={styles.about} id='about'>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Convivio Wine Bar</p>

          <h2 className={styles.heading}>
            Come for a Glass, Stay for a Bottle
          </h2>

          <p className={styles.paragraph}>
            Convivio is a relaxed, welcoming neighbourhood wine bar built around
            good company and relaxed vibes. Drop in during the afternoon or
            evening to enjoy the cozy ambience and great food.
          </p>

          <p className={styles.paragraph}>
            We offer a carefully selected range of European and international
            wines, alongside cocktails with a fresh take on the classics. Our
            dry and dirty Martinis are house favourites, and the menu includes
            small bites and seasonal dishes to enjoy with a drink.
          </p>

          <p className={styles.paragraph}>
            A favourite with locals and a welcoming stop for visitors, Convivio
            is a place to catch up, try something new and enjoy good company.
            With weekly specials, menu updates and events, there’s always
            something new to discover.
          </p>

        <div className={styles.aboutCta}>
            <Button
              label='Explore the Menu'
              href='#menu'
              variant='ctaLarge'
            />
          </div>
          
        </div>

        <div className={styles.images} ref={imagesRef}>
          <div className={styles.imageOne} data-about-image>
            <div className={styles.imageFrame}>
              <div className={styles.imageInner}>
                {images?.imageOne && (
                  <Image
                    src={images.imageOne}
                    alt={images.imageOneAlt || 'Convivio Wine Bar'}
                    fill
                    sizes='(max-width: 800px) 45vw, 18rem'
                    className={styles.image}
                  />
                )}
              </div>
            </div>
          </div>

          <div className={styles.imageTwo} data-about-image>
            <div className={styles.imageFrame}>
              <div className={styles.imageInner}>
                {images?.imageTwo && (
                  <Image
                    src={images.imageTwo}
                    alt={images.imageTwoAlt || 'Inside Convivio Wine Bar'}
                    fill
                    sizes='(max-width: 800px) 45vw, 18rem'
                    className={styles.image}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

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

```

## ./src/components/Staff/Staff.tsx
```tsx
'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import { sectionHeadingData } from '@/data/sectionHeadingData'
import styles from './Staff.module.css'

export type StaffMember = {
  _key: string
  name: string
  description: string
}

type StaffProps = {
  staff?: StaffMember[] | null
  groupImage?: string | null
  groupImageAlt?: string | null
}

const emptyStaff: StaffMember[] = []

export default function Staff({
  staff,
  groupImage,
  groupImageAlt
}: StaffProps) {
  const members = staff ?? emptyStaff
  const staffRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = staffRef.current
    if (!section || !('IntersectionObserver' in window)) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const slots = Array.from(
      section.querySelectorAll<HTMLElement>(
        '[data-staff-slot], [data-group-photo]'
      )
    )
    const revealed = new WeakSet<HTMLElement>()
    let observer: IntersectionObserver | undefined

    const configure = () => {
      observer?.disconnect()

      slots.forEach((slot) => {
        slot.classList.remove(styles.animate, styles.visible)
      })

      if (reducedMotion.matches) return

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Tall biographies use a viewport-based fallback.
            const visibility = entry.target.hasAttribute('data-group-photo')
              ? 0.75
              : 0.15

            const requiredHeight = Math.min(
              entry.boundingClientRect.height * visibility,
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
    reducedMotion.addEventListener('change', configure)

    return () => {
      observer?.disconnect()
      reducedMotion.removeEventListener('change', configure)

      slots.forEach((slot) => {
        slot.classList.remove(styles.animate, styles.visible)
      })
    }
  }, [members, groupImage])

  if (members.length === 0 && !groupImage) return null

  return (
    <section className={styles.staff} id='staff' ref={staffRef}>
      <div className={styles.container}>
        <SectionHeading
          {...sectionHeadingData.staff}
          descriptionClassName={styles.staffHeadingDescription}
          childrenBeforeDescription
        >
          {groupImage && (
            <div className={styles.groupPhotoSlot} data-group-photo>
              <div className={styles.groupPhoto}>
                <div className={styles.groupPhotoInner}>
                  <Image
                    src={groupImage}
                    alt={groupImageAlt || 'The Convivio team'}
                    fill
                    sizes='(max-width: 800px) 100vw, 480px'
                    className={styles.image}
                  />
                </div>
              </div>
            </div>
          )}
        </SectionHeading>

        <div className={styles.staffList}>
          {members.map((member) => (
            <div
              className={styles.staffSlot}
              key={member._key}
              data-staff-slot
            >
              <article className={styles.staffMember}>
                <h3 className={styles.name}>{member.name}</h3>

                <p className={styles.description}>{member.description}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
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
      transform 2400ms cubic-bezier(0.2, 0.65, 0.25, 1),
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
  font-family: var(--body-copy-font), serif;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0;
}
```