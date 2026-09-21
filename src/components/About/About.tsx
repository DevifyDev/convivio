import Button from '@/components/Button/Button'
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
          <div className={styles.imageOne}></div>
          <div className={styles.imageTwo}></div>
        </div>
      </div>
    </section>
  )
}