import SectionHeading from '../SectionHeading/SectionHeading'
import { sectionHeadingData } from '@/data/sectionHeadingData'
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
        
        <SectionHeading {...sectionHeadingData.faq} />

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