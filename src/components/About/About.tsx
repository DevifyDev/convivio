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
            Convivio is a relaxed, welcoming neighbourhood wine bar in Scarborough. 
            Drop in during the afternoon for a drink and a few nibbles, or join us for an 
            evening out.
          </p>

          <p className={styles.paragraph}>
            We offer a carefully selected range of European and international wines, 
            alongside cocktails with a fresh take on the classics. Our dry and dirty Martinis 
            are house favourites, and the menu includes small bites and seasonal dishes to 
            enjoy with a drink.
          </p>

          <p className={styles.paragraph}>
            A favourite with locals and a welcoming stop for visitors, Convivio is a place to 
            catch up, try something new and enjoy good company. With weekly specials, menu 
            updates and events, there’s always a reason to come back.
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