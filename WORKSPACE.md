# Workspace Export
Generated: 2026-10-03T13:15:10.937Z

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
    let bioObserver: IntersectionObserver | undefined
    let photoObserver: IntersectionObserver | undefined

    const configure = () => {
      bioObserver?.disconnect()
      photoObserver?.disconnect()

      slots.forEach((slot) => {
        slot.classList.remove(styles.animate, styles.visible)
      })

      if (reducedMotion.matches) return

      const reveal = (slot: HTMLElement) => {
        revealed.add(slot)
        slot.classList.add(styles.visible)
      }

      // Bios start 15% of the viewport height before entering the screen.
      const bioLead = Math.round(window.innerHeight * 0.15)

      bioObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return

            const slot = entry.target as HTMLElement
            reveal(slot)
            bioObserver?.unobserve(slot)
          })
        },
        {
          threshold: 0,
          rootMargin: `0px 0px ${bioLead}px 0px`
        }
      )

      // Preserve the team photo's 75% visibility trigger.
      photoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const requiredHeight = Math.min(
              entry.boundingClientRect.height * 0.75,
              (entry.rootBounds?.height ?? window.innerHeight) * 0.75
            )

            if (
              !entry.isIntersecting ||
              entry.intersectionRect.height < requiredHeight
            ) {
              return
            }

            const slot = entry.target as HTMLElement
            reveal(slot)
            photoObserver?.unobserve(slot)
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
        } else if (slot.hasAttribute('data-group-photo')) {
          photoObserver?.observe(slot)
        } else {
          bioObserver?.observe(slot)
        }
      })
    }

    configure()
    reducedMotion.addEventListener('change', configure)
    window.addEventListener('resize', configure)

    return () => {
      bioObserver?.disconnect()
      photoObserver?.disconnect()
      reducedMotion.removeEventListener('change', configure)
      window.removeEventListener('resize', configure)

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
  opacity: 0.65;

  mask: linear-gradient(
    to right,
    #000 0%,
    #000 19.1%,
    transparent 19.4%,
    transparent 20%,
    #000 20.7%,
    #000 32.8%,
    transparent 33.6%,
    #000 35.2%,
    #000 71.3%,
    transparent 71.5%,
    transparent 73.1%,
    #000 73.5%,
    #000 90.6%,
    transparent 91.2%,
    #000 91.7%,
    #000 100%
  );

  -webkit-mask: linear-gradient(
    to right,
    #000 0%,
    #000 19.1%,
    transparent 19.4%,
    transparent 20%,
    #000 20.7%,
    #000 32.8%,
    transparent 33.6%,
    #000 35.2%,
    #000 71.3%,
    transparent 71.5%,
    transparent 73.1%,
    #000 73.5%,
    #000 90.6%,
    transparent 91.2%,
    #000 91.7%,
    #000 100%
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

/* Wider biographies on tablets and smaller desktops */

@media (min-width: 801px) and (max-width: 1200px) {
  .staff {
    padding-inline: 3rem;
  }

  .staffList {
    width: 90%;
  }
}

:global(html[data-theme='convivio']) .description {
  color: var(--premium-black);
}

:global(html[data-theme='convivio']) .name,
:global(html[data-theme='convivio']) .staff .staffHeadingDescription {
  color: var(--primary-blue);
}

:global(html[data-theme='convivio']) .light .description {
  color: var(--premium-black);
}

:global(html[data-theme='convivio']) .staff .staffHeadingDescription {
  font-size: 1.6rem;
  font-weight: 900;
  line-height: 1.2;
}

@media (max-width: 800px) {
  :global(html[data-theme='convivio']) .staff .staffHeadingDescription {
    font-size: 1.5rem;
  }
}
```