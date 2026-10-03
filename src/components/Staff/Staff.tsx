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
    const photo = section.querySelector<HTMLElement>('[data-group-photo]')
    const heading = section.querySelector<HTMLElement>(
      `.${styles.staffHeadingDescription}`
    )
    const headingContainer = section.querySelector<HTMLElement>(
      `.${styles.staffHeading}`
    )
    const bios = Array.from(
      section.querySelectorAll<HTMLElement>('[data-staff-slot]')
    )
    const animatedElements = [
      ...bios,
      ...(photo ? [photo] : []),
      ...(heading ? [heading] : [])
    ]

    const revealed = new WeakSet<HTMLElement>()
    const pendingBios = new Set<HTMLElement>()
    const timers = new Set<number>()

    let bioObserver: IntersectionObserver | undefined
    let photoObserver: IntersectionObserver | undefined
    let headingObserver: IntersectionObserver | undefined
    let sequenceStarted = false
    let biosReady = !heading

    const reveal = (element: HTMLElement) => {
      revealed.add(element)
      element.classList.add(styles.visible)
    }

    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer)
        callback()
      }, delay)

      timers.add(timer)
    }

    const clearTimers = () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      timers.clear()
    }

    const releaseBios = () => {
      biosReady = true
      pendingBios.forEach(reveal)
      pendingBios.clear()
    }

    const startHeadingSequence = () => {
      if (sequenceStarted) return
      sequenceStarted = true

      if (!heading) {
        releaseBios()
        return
      }

      schedule(() => reveal(heading), 300)
      schedule(releaseBios, 1200)
    }

    const disconnectObservers = () => {
      bioObserver?.disconnect()
      photoObserver?.disconnect()
      headingObserver?.disconnect()
    }

    const configure = () => {
      disconnectObservers()

      animatedElements.forEach((element) => {
        element.classList.remove(styles.animate, styles.visible)
      })

      if (reducedMotion.matches) {
        clearTimers()
        sequenceStarted = true
        animatedElements.forEach(reveal)
        releaseBios()
        return
      }

      animatedElements.forEach((element) => {
        element.classList.add(styles.animate)

        if (revealed.has(element)) {
          element.classList.add(styles.visible)
        }
      })

      // Preserve the bios' 15% viewport lead.
      const bioLead = Math.round(window.innerHeight * 0.15)

      bioObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const aboveViewport = entry.boundingClientRect.bottom <= 0
            if (!entry.isIntersecting && !aboveViewport) return

            const bio = entry.target as HTMLElement

            if (biosReady) {
              reveal(bio)
            } else {
              pendingBios.add(bio)
            }

            bioObserver?.unobserve(bio)
          })
        },
        {
          threshold: 0,
          rootMargin: `0px 0px ${bioLead}px 0px`
        }
      )

      bios.forEach((bio) => {
        if (!revealed.has(bio)) {
          bioObserver?.observe(bio)
        }
      })

      if (photo && !revealed.has(photo)) {
        photoObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const requiredHeight = Math.min(
                entry.boundingClientRect.height * 0.75,
                (entry.rootBounds?.height ?? window.innerHeight) * 0.75
              )
              const aboveViewport = entry.boundingClientRect.bottom <= 0

              if (
                !aboveViewport &&
                (!entry.isIntersecting ||
                  entry.intersectionRect.height < requiredHeight)
              ) {
                return
              }

              reveal(photo)
              startHeadingSequence()
              photoObserver?.unobserve(photo)
            })
          },
          {
            rootMargin: '0px',
            threshold: Array.from(
              { length: 101 },
              (_, index) => index / 100
            )
          }
        )

        photoObserver.observe(photo)
      } else if (photo) {
        startHeadingSequence()
      } else if (headingContainer && !sequenceStarted) {
        // Keep the heading and bios working when no photo is supplied.
        headingObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const aboveViewport = entry.boundingClientRect.bottom <= 0
              if (!entry.isIntersecting && !aboveViewport) return

              startHeadingSequence()
              headingObserver?.disconnect()
            })
          },
          {
            threshold: 0,
            rootMargin: `0px 0px ${bioLead}px 0px`
          }
        )

        headingObserver.observe(headingContainer)
      } else if (!headingContainer) {
        startHeadingSequence()
      }
    }

    configure()
    reducedMotion.addEventListener('change', configure)
    window.addEventListener('resize', configure)

    return () => {
      disconnectObservers()
      clearTimers()
      pendingBios.clear()
      reducedMotion.removeEventListener('change', configure)
      window.removeEventListener('resize', configure)

      animatedElements.forEach((element) => {
        element.classList.remove(styles.animate, styles.visible)
      })
    }
  }, [members, groupImage])

  if (members.length === 0 && !groupImage) return null

  return (
    <section className={styles.staff} id='staff' ref={staffRef}>
      <div className={styles.container}>
        <SectionHeading
          {...sectionHeadingData.staff}
          className={styles.staffHeading}
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