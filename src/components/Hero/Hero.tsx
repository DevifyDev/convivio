import Button from '@/components/Button/Button'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        
        <p className={styles.eyebrow}>EST. 2026 </p>
        
        <h1 className={styles.title}>Convivio Wine Bar</h1>
        
        <h2 className={styles.subtitle}>Your Neighbourhood Wine Bar</h2>
        
        <p className={styles.address}>16E Calais Road, Scarborough</p>

        <Button label='Book A Table' href='#menu' variant='cta' />

      </div>
    </section>
  )
}