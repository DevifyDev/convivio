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
            Convivio is a neighbourhood wine bar made for afternoons that turn
            into evenings. Drop in for a glass from our carefully chosen selection
            of European and international wines, or settle in with one of our
            signature dry or dirty Martinis.
          </p>

          <p className={styles.paragraph}>
            Pair your drink with a few small plates, stay for a seasonal dish and
            enjoy the easy company. With a warm welcome and new specials from the
            kitchen, there’s always a reason to come back.
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