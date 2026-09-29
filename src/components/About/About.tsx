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
  return (
    <section className={styles.about} id='about'>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Convivio Wine Bar</p>

          <h2 className={styles.heading}>
            Come for a Glass, Stay for a Bottle
          </h2>

          <p className={styles.paragraph}>
            Convivio is a neighbourhood wine bar built around good wine,
            generous food and easy company. Warm, relaxed and welcoming,
            it’s a place to drop in for a quick glass, share a few plates
            and let the evening unfold.
          </p>

          <p className={styles.paragraph}>
            Come with friends, discover something new, or settle in with
            a bottle you already love. There’s no need to rush—the best
            visits often begin with “just one” and end with “just one more.”
          </p>

          <Button label='Explore the Menu' href='#menu' variant='ctaLight' />
        </div>

        <div className={styles.images}>
          <div className={styles.imageOne}>
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

          <div className={styles.imageTwo}>
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
    </section>
  )
}