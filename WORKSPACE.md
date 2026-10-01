# Workspace Export
Generated: 2026-10-01T02:09:21.433Z

## ./src/components/Faq/Faq.tsx
```tsx
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
```

## ./src/components/Faq/Faq.module.css
```css
.faq {
  position: relative;
  z-index: 1;
  padding: 6rem;
  background: var(--primary-black);
  color: var(--light-text);
}

.container {
  position: relative;
  width: 100%;
  max-width: var(--page-width);
  margin-inline: auto;
}

.questions {
  max-width: 54rem;
  margin: 4rem auto 0;
  border-top: 1px solid rgb(248 247 244 / 0.25);
}

.item {
  margin: 0;
  border-bottom: 1px solid rgb(248 247 244 / 0.25);
}

.question {
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 1fr) 1.5rem;
  align-items: center;
  gap: 1.25rem;
  padding-block: 1.75rem;
  border: 0;
  background: transparent;
  color: var(--light-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.questionText {
  font-family: var(--body-copy-font), sans-serif;
  font-size: clamp(1.15rem, 2vw, 1.55rem);
  font-weight: 400;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.toggle {
  position: relative;
  width: 1.25rem;
  height: 1.25rem;
  justify-self: end;
}

.toggle::before,
.toggle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1rem;
  height: 1px;
  background: var(--light-text);
  transform: translate(-50%, -50%);
}

.toggle::after {
  transform: translate(-50%, -50%) rotate(90deg);
  transition: transform 180ms ease;
}

.item[data-open='true'] .toggle::after {
  transform: translate(-50%, -50%) rotate(0);
}

.question:focus-visible {
  outline: 2px solid var(--primary-gold);
  outline-offset: 4px;
}

.answerPanel {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  opacity: 0;
  transition:
    grid-template-rows 480ms ease,
    opacity 360ms ease;
}

.item[data-open='true'] .answerPanel {
  grid-template-rows: 1fr;
  opacity: 1;
}

.answerInner {
  min-height: 0;
  overflow: hidden;
}

.answer {
  max-width: 44rem;
  margin: -0.25rem 2.75rem 2rem 0;
  color: rgb(248 247 244 / 0.85);
  font-family: var(--body-copy-font), sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75;
  overflow-wrap: anywhere;
}

/* Convivio theme */

:global(html[data-theme='convivio']) .faq {
  background: var(--primary-blue);
}

:global(html[data-theme='convivio']) .faq::before,
:global(html[data-theme='convivio']) .faq::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 24px;
  background: var(--primary-blue);
  filter: url('#roughen');
  clip-path: inset(-12px 0);
  pointer-events: none;
}

:global(html[data-theme='convivio']) .faq::before {
  top: -12px;
}

:global(html[data-theme='convivio']) .faq::after {
  bottom: -12px;
}

:global(html[data-theme='convivio']) .questions {
  --faq-wave: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='8' viewBox='0 0 32 8'%3E%3Cpath d='M0 4 Q8 0 16 4 T32 4' fill='none' stroke='black' stroke-width='0.75'/%3E%3C/svg%3E");
  border-top: 0;
}

:global(html[data-theme='convivio']) .item {
  border-bottom: 0;
}

:global(html[data-theme='convivio']) .question::before,
:global(html[data-theme='convivio']) .questions::after {
  content: '';
  display: block;
  width: 100%;
  height: 8px;
  background: var(--accent-on-dark);
  opacity: 0.3;
  mask: var(--faq-wave) left center / 32px 8px repeat-x;
  -webkit-mask: var(--faq-wave) left center / 32px 8px repeat-x;
  pointer-events: none;
}

:global(html[data-theme='convivio']) .question::before {
  position: absolute;
  top: 0;
  left: 0;
}

:global(html[data-theme='convivio']) .faq :global(header p) {
  color: var(--accent-on-dark);
}

:global(html[data-theme='convivio']) .faq :global(header > div[aria-hidden='true']) {
  color: var(--light-text);
}

:global(html[data-theme='convivio']) .questions .item:first-child .question::before {
  display: none;
}

:global(html[data-theme='convivio']) .faq .questions {
  margin-top: 2.5rem;
}

@media (max-width: 800px) {
  .faq {
    padding-block: 4rem;
    padding-inline: var(--inline-padding);
  }

  .questions {
    margin-top: 3rem;
  }

  .question {
    grid-template-columns: minmax(0, 1fr) 1.25rem;
    gap: 0.75rem;
    padding-block: 1.5rem;
  }

  .answer {
    margin: -0.25rem 2rem 1.75rem 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .toggle::after,
  .answerPanel {
    transition: none;
  }
}
```

## ./src/components/SectionHeading/SectionHeading.tsx
```tsx
import styles from './SectionHeading.module.css'

type SectionHeadingProps = {
  eyebrow?: string
  heading: string
  description?: string
  variant?: 'light' | 'dark'
  icon?: 'sparkle' | 'wine' | 'location'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  heading,
  description,
  variant = 'light',
  icon = 'sparkle',
  className
}: SectionHeadingProps) {
  return (
    <header
      className={[styles.header, styles[variant], className]
        .filter(Boolean)
        .join(' ')}
    >
      <p className={styles.eyebrow}>{eyebrow ?? ''}</p>

      <h2 className={styles.heading}>{heading}</h2>

      <p className={styles.description}>{description ?? ''}</p>

      <div className={styles.divider} aria-hidden='true'>
        <span className={styles.line}></span>
        <span className={`${styles.icon} ${styles[icon]}`}></span>
        <span className={styles.line}></span>
      </div>
    </header>
  )
}
```

## ./src/components/SectionHeading/SectionHeading.module.css
```css
.header {
  text-align: center;
}

.light {
  color: var(--primary-black);
}

.dark {
  color: var(--light-text);
}

.eyebrow {
  margin: 0 0 1rem;
  color: var(--section-accent, var(--primary-gold));
  font-family: var(--body-copy-font), serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.heading {
  margin: 0 0 1.5rem;
  color: inherit;
  font-family: var(--display-font, var(--heading-font, serif));
  font-size: 2.25rem;
  font-weight: 300;
  letter-spacing: -2px;
}

.description {
  max-width: 38rem;
  margin: 0 auto 1.5rem;
  color: inherit;
  font-family: var(--body-copy-font), serif;
  font-size: 1.05rem;
  font-weight: 400;
  line-height: 1.6;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.line {
  width: 5rem;
  height: 1px;
  background: var(--section-accent, var(--primary-gold));
  opacity: 0.35;
}

.icon {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  background: var(--section-accent, var(--primary-gold));
}

.sparkle {
  mask: url('/icons/sparkle.svg') center / contain no-repeat;
  -webkit-mask: url('/icons/sparkle.svg') center / contain no-repeat;
}

.wine {
  mask: url('/icons/wine-bottle.svg') center / contain no-repeat;
  -webkit-mask: url('/icons/wine-bottle.svg') center / contain no-repeat;
}

.location {
  mask: url('/icons/location-pin.svg') center / contain no-repeat;
  -webkit-mask: url('/icons/location-pin.svg') center / contain no-repeat;
}

/* Convivio theme */

:global(html[data-theme='convivio']) .light {
  --section-accent: var(--accent-on-light);
  color: var(--primary-blue);
}

:global(html[data-theme='convivio']) .dark {
  --section-accent: var(--accent-on-dark);
}

:global(html[data-theme='convivio']) .icon,
:global(html[data-theme='convivio']) .line:last-child {
  display: none;
}

:global(html[data-theme='convivio']) .divider {
  gap: 0;
}

:global(html[data-theme='convivio']) .line {
  width: min(8rem, 760px);
  height: 8px;
  opacity: 1;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='8' viewBox='0 0 32 8'%3E%3Cpath d='M0 4 Q8 0 16 4 T32 4' fill='none' stroke='black' stroke-width='2.5'/%3E%3C/svg%3E") left center / 32px 8px repeat-x;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='8' viewBox='0 0 32 8'%3E%3Cpath d='M0 4 Q8 0 16 4 T32 4' fill='none' stroke='black' stroke-width='0.75'/%3E%3C/svg%3E") left center / 32px 8px repeat-x;
}

:global(html[data-theme='convivio']) .light .line {
  background: var(--accent-line-on-light);
}

@media (max-width: 800px) {
  .heading {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }
}
```