import Button from '@/components/Button/Button'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} id='home'>
      <div className={styles.content}>
        
        <p className={styles.eyebrow}>EST. 2022</p>
        
        <h1 className={styles.title}>Convivio</h1>
        
        <p className={styles.subtitle}>Your Neighbourhood Wine Bar</p>
        
        <p className={styles.address}>16E Calais Road, Scarborough</p>

        <Button label='Book A Table' href='https://bookings.nowbookit.com/?accountid=d2961a38-34a5-4012-8856-aebf1af4bdee&venueid=11218&theme=dark&colors=hex,37474f' variant='cta' target='_blank' />

      </div>
    </section>
  )
}