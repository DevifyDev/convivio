import Button from '@/components/Button/Button'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        
        <p className={styles.eyebrow}>Lorem Ipsum Dolor</p>
        
        <h1 className={styles.title}>Lorem Ipsum Dolor</h1>
        
        <h2 className={styles.subtitle}>Lorem Ipsum Dolor</h2>
        
        <p className={styles.address}>Lorem Ipsum Dolor</p>

        <Button label='Lorem Ipsum' href='#menu' variant='cta' />

      </div>
    </section>
  )
}