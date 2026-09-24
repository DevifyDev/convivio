import Button from '@/components/Button/Button'
import styles from './Hero.module.css'

type HeroProps = {
  bookingUrl?: string
}

export default function Hero({
  bookingUrl
}: HeroProps) {
  return (
    <section className={styles.hero} id='home'>
      <div className={styles.content}>
        <p className={styles.eyebrow}>EST. 2026</p>

        <h1 className={styles.title}>Convivio</h1>

        <p className={styles.subtitle}>Your Neighbourhood Wine Bar</p>

        <p className={styles.address}>16E Calais Road, Scarborough</p>

        {bookingUrl && (
          <Button
            label='Book A Table'
            href={bookingUrl}
            variant='cta'
            target='_blank'
          />
        )}
      </div>
    </section>
  )
}