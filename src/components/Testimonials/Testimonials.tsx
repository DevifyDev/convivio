import styles from './Testimonials.module.css'

export type Testimonial = {
  _key: string
  quote: string
  name: string
  source?: string
}

type TestimonialsProps = {
  testimonials: Testimonial[]
}

export default function Testimonials({
  testimonials
}: TestimonialsProps) {
  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className={styles.testimonials} id='testimonials'>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Kind Words</p>

          <h2 className={styles.heading}>What Our Guests Say</h2>

          <div className={styles.divider}>
            <span className={styles.line}></span>
            <span
              className={styles.headingIcon}
              aria-hidden='true'
            ></span>
            <span className={styles.line}></span>
          </div>
        </header>

        <div className={styles.reviews}>
          {testimonials.map((testimonial) => (
            <article
              className={styles.review}
              key={testimonial._key}
            >
              <span className={styles.quoteMark} aria-hidden='true'>
                “
              </span>

              <blockquote className={styles.quote}>
                {testimonial.quote}
              </blockquote>

              <footer className={styles.reviewer}>
                <p className={styles.name}>
                  {testimonial.name}
                </p>

                {testimonial.source && (
                  <p className={styles.source}>
                    {testimonial.source}
                  </p>
                )}
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}