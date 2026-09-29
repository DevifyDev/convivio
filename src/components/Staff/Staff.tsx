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

    const rows = list.querySelectorAll<HTMLElement>('[data-staff-member]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target
            .closest('[data-staff-member]')
            ?.classList.add(styles.visible)

          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    )

    rows.forEach((row) => {
      const target = row.querySelector<HTMLElement>('[data-staff-portrait]')

      if (!target) return

      row.classList.add(styles.animate)
      observer.observe(target)
    })

    return () => {
      observer.disconnect()
      rows.forEach((row) => row.classList.remove(styles.animate))
    }
  }, [members])

  if (members.length === 0) return null

  return (
    <section className={styles.staff} id='staff'>
      <div className={styles.container}>
        
        <SectionHeading {...sectionHeadingData.staff} />

        <div className={styles.staffList} ref={staffRef}>
          {members.map((member) => (
            <article
              className={styles.staffMember}
              key={member._key}
              data-staff-member
            >
              <div
                className={styles.portraitSlot}
                data-staff-portrait
              >
                <div className={styles.portrait}>
                  <div className={styles.portraitInner}>
                    {member.image && (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes='(max-width: 600px) 240px, (max-width: 800px) 280px, 320px'
                        className={styles.image}
                        unoptimized
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.biography}>
                <div className={styles.identity}>
                  <h3 className={styles.name}>{member.name}</h3>

                  {member.role && (
                    <p className={styles.role}>{member.role}</p>
                  )}
                </div>

                <span
                  className={styles.rule}
                  aria-hidden='true'
                ></span>

                <p className={styles.description}>
                  {member.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}