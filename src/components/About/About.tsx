import Button from '@/components/Button/Button'
import Image from 'next/image'
import styles from './About.module.css'

export default function About() {
  return (
    <section className={styles.about} id='about'>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Lorem Ipsum Dolor</p>

          <h2 className={styles.heading}>Lorem Ipsum Dolor</h2>

          <p className={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            vitae lorem sed ipsum tincidunt feugiat. Donec vitae lectus eget
            sapien ullamcorper tincidunt.
          </p>

          <p className={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            consequat sapien vitae neque elementum, vitae malesuada lorem
            tincidunt.
          </p>

          <Button label='Lorem Ipsum' href='#' variant='cta' />
        </div>

        <div className={styles.images}>
          <div className={styles.imageOne}>
            <Image
              src='/images/about-1.jpg'
              alt='Convivio wine selection displayed on timber shelves'
              fill
              sizes='(max-width: 800px) 45vw, 18rem'
              className={styles.image}
            />
          </div>

          <div className={styles.imageTwo}>
            <Image
              src='/images/about-2.jpg'
              alt='Outdoor seating area at Convivio Wine Bar'
              fill
              sizes='(max-width: 800px) 45vw, 18rem'
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  )
}