import type { ReactNode } from 'react'
import styles from './SectionHeading.module.css'

type SectionHeadingProps = {
  eyebrow?: string
  heading: string
  description?: string
  variant?: 'light' | 'dark'
  icon?: 'sparkle' | 'wine' | 'location'
  className?: string
  children?: ReactNode
  childrenBeforeDescription?: boolean
  descriptionClassName?: string
}

export default function SectionHeading({
  eyebrow,
  heading,
  description,
  variant = 'light',
  className,
  children,
  childrenBeforeDescription = false,
  descriptionClassName
}: SectionHeadingProps) {
  return (
    <header
      className={[styles.header, styles[variant], className]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}

      <h2 className={styles.heading}>{heading}</h2>

      {childrenBeforeDescription && children}

      {description && (
        <p
          className={[styles.description, descriptionClassName]
            .filter(Boolean)
            .join(' ')}
        >
          {description}
        </p>
      )}

      {!childrenBeforeDescription && children}

      <div className={styles.divider} aria-hidden='true'>
        <span className={styles.line}></span>
        <span className={styles.olive}></span>
        <span className={styles.line}></span>
      </div>
    </header>
  )
}
