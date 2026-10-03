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