import SectionHeading from '../SectionHeading/SectionHeading'
import styles from './Faq.module.css'

export type FaqItem = {
  _key: string
  question: string
  answer: string
}

type FaqProps = {
  items?: FaqItem[]
}

export default function Faq({ items = [] }: FaqProps) {
  if (items.length === 0) return null

  return (
    <section className={styles.faq} id='faq'>
      <div className={styles.container}>
        <SectionHeading
          eyebrow='Before You Visit'
          heading='Good To Know'
          description='A few answers to help you plan your time with us.'
          variant='dark'
          icon='sparkle'
        />

        <div className={styles.questions}>
          {items.map((item) => (
            <details className={styles.item} key={item._key}>
              <summary className={styles.question}>
                <span className={styles.questionText}>
                  {item.question}
                </span>
                <span
                  className={styles.toggle}
                  aria-hidden='true'
                ></span>
              </summary>

              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}