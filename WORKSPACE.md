# Workspace Export
Generated: 2026-09-30T01:10:27.357Z

## ./src/components/Faq/Faq.tsx
```tsx
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
  grid-template-columns: minmax(0, 1fr) 1.5rem;
  align-items: center;
  gap: 1.25rem;
  padding-block: 1.75rem;
  color: var(--light-text);
  cursor: pointer;
  list-style: none;
}

.question::-webkit-details-marker {
  display: none;
}

.question::marker {
  content: '';
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
  background: var(--primary-gold);
  transform: translate(-50%, -50%);
}

.toggle::after {
  transform: translate(-50%, -50%) rotate(90deg);
  transition: transform 180ms ease;
}

.item[open] .toggle::after {
  transform: translate(-50%, -50%) rotate(0);
}

.question:focus-visible {
  outline: 2px solid var(--primary-gold);
  outline-offset: 4px;
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
  --faq-wave: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='8' viewBox='0 0 32 8'%3E%3Cpath d='M0 4 Q8 0 16 4 T32 4' fill='none' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E");
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
  opacity: 0.45;
  mask: var(--faq-wave) left center / 32px 8px repeat-x;
  -webkit-mask: var(--faq-wave) left center / 32px 8px repeat-x;
  pointer-events: none;
}

:global(html[data-theme='convivio']) .question::before {
  position: absolute;
  top: 0;
  left: 0;
}

:global(html[data-theme='convivio']) .faq :global(header > div[aria-hidden='true']) {
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
  .toggle::after {
    transition: none;
  }
}
```