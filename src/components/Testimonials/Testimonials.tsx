import styles from './Testimonials.module.css'

const testimonials = [
  {
    quote:
      'Absolutely loved our evening at Convivio. The food was beautiful, the wine selection was excellent and the atmosphere made it very easy to stay for another glass.',
    name: 'Sarah M.',
    source: 'Google Review'
  },
  {
    quote:
      'A fantastic neighbourhood wine bar with genuinely warm service. Great food, thoughtful wine recommendations and a really relaxed atmosphere.',
    name: 'Daniel R.',
    source: 'Google Review'
  },
  {
    quote:
      'One of our favourite places in Scarborough. Everything feels considered without being pretentious, and the team always make you feel welcome.',
    name: 'Emma T.',
    source: 'Google Review'
  }
]

export default function Testimonials() {
  return (
    <section className={styles.testimonials} id='testimonials'>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Kind Words</p>

          <h2 className={styles.heading}>What Our Guests Say</h2>

          <div className={styles.divider}>
            <span className={styles.line}></span>
            <span className={styles.headingIcon} aria-hidden='true'></span>
            <span className={styles.line}></span>
          </div>
        </header>

        <div className={styles.reviews}>
          {testimonials.map((testimonial) => (
            <article className={styles.review} key={testimonial.name}>
              <span className={styles.quoteMark} aria-hidden='true'>
                “
              </span>

              <blockquote className={styles.quote}>
                {testimonial.quote}
              </blockquote>

              <footer className={styles.reviewer}>
                <p className={styles.name}>{testimonial.name}</p>
                <p className={styles.source}>{testimonial.source}</p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}