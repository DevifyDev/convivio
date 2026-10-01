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
  const staffRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = staffRef.current

    if (
      !list ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return

    const slots = list.querySelectorAll<HTMLElement>(
      '[data-staff-slot]'
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add(styles.visible)
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 160px 0px'
      }
    )

    slots.forEach((slot) => {
      slot.classList.add(styles.animate)
      observer.observe(slot)
    })

    return () => {
      observer.disconnect()

      slots.forEach((slot) => {
        slot.classList.remove(styles.animate, styles.visible)
      })
    }
  }, [members])

  if (members.length === 0 && !groupImage) return null

  return (
    <section className={styles.staff} id='staff'>
      <div className={styles.container}>
        
        <SectionHeading {...sectionHeadingData.staff}>
          {groupImage && (
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
          )}
        </SectionHeading>

        <div className={styles.staffList} ref={staffRef}>
          {members.map((member) => (
            <div
              className={styles.staffSlot}
              key={member._key}
              data-staff-slot
            >
              <article className={styles.staffMember}>
                <h3 className={styles.name}>
                  {member.name}
                </h3>

                <p className={styles.description}>
                  {member.description}
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}