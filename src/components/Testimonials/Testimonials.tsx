import SectionHeading from '../SectionHeading/SectionHeading'
import { sectionHeadingData } from '@/data/sectionHeadingData'
import styles from './Testimonials.module.css'

export type Testimonial = {
  _key: string
  quote: string
  name: string
  source?: string
}

type TestimonialsProps = {
  description?: string
  testimonials: Testimonial[]
}

export default function Testimonials({
  description,
  testimonials
}: TestimonialsProps) {
  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className={styles.testimonials} id='testimonials'>
      <div className={styles.container}>
        
        <SectionHeading {...sectionHeadingData.testimonials} />

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