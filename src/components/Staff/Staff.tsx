'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import { sectionHeadingData } from '@/data/sectionHeadingData'
import styles from './Staff.module.css'

export type StaffMember = {
  _key: string
  name: string
  role?: string
  description: string
  image?: string
}

type StaffProps = {
  staff?: StaffMember[] | null
}

const emptyStaff: StaffMember[] = []

export default function Staff({ staff }: StaffProps) {
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
        rootMargin: '0px'
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

  if (members.length === 0) return null

  return (
    <section className={styles.staff} id='staff'>
      <div className={styles.container}>
        <SectionHeading {...sectionHeadingData.staff} />

        <div className={styles.staffList} ref={staffRef}>
          {members.map((member) => (
            <div
              className={styles.staffSlot}
              key={member._key}
              data-staff-slot
            >
              <article className={styles.staffMember}>
                <div className={styles.portraitSlot}>
                  <div className={styles.portrait}>
                    <div className={styles.portraitInner}>
                      {member.image && (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes='(max-width: 600px) 240px, (max-width: 800px) 280px, 320px'
                          className={styles.image}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.biography}>
                  <div className={styles.identity}>
                    <h3 className={styles.name}>
                      {member.name}
                    </h3>

                    {member.role && (
                      <p className={styles.role}>
                        {member.role}
                      </p>
                    )}
                  </div>

                  <p className={styles.description}>
                    {member.description}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}