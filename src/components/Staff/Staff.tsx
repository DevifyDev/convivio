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

        // Bios start when their top reaches 15% up from the screen bottom.
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