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