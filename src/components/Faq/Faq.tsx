'use client'

import { useId, useState } from 'react'
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
  const faqId = useId()
  const [openItems, setOpenItems] = useState<Set<string>>(() => new Set())

  if (items.length === 0) return null

  const toggleItem = (key: string) => {
    setOpenItems((currentItems) => {
      const nextItems = new Set(currentItems)

      if (nextItems.has(key)) {
        nextItems.delete(key)
      } else {
        nextItems.add(key)
      }

      return nextItems
    })
  }

  return (
    <section className={styles.faq} id='faq'>
      <div className={styles.container}>
        <SectionHeading {...sectionHeadingData.faq} />

        <div className={styles.questions}>
          {items.map((item) => {
            const isOpen = openItems.has(item._key)
            const questionId = `${faqId}-question-${item._key}`
            const answerId = `${faqId}-answer-${item._key}`

            return (
              <div
                className={styles.item}
                data-open={isOpen}
                key={item._key}
              >
                <button
                  className={styles.question}
                  id={questionId}
                  type='button'
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleItem(item._key)}
                >
                  <span className={styles.questionText}>
                    {item.question}
                  </span>
                  <span
                    className={styles.toggle}
                    aria-hidden='true'
                  ></span>
                </button>

                <div
                  className={styles.answerPanel}
                  id={answerId}
                  role='region'
                  aria-labelledby={questionId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                >
                  <div className={styles.answerInner}>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}