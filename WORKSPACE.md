# Workspace Export
Generated: 2026-10-01T03:26:49.030Z

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
      <div className={styles.divider} aria-hidden='true'>
        <span className={styles.line}></span>
        <span className={styles.olive}></span>
        <span className={styles.line}></span>
      </div>

      {eyebrow && (
        <p className={styles.eyebrow}>{eyebrow}</p>
      )}

      <h2 className={styles.heading}>{heading}</h2>

      {description && (
        <p className={styles.description}>{description}</p>
      )}

      <span className={styles.olive} aria-hidden='true'></span>
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

.olive {
  display: none;
  margin: 0 auto;
}

:global(html[data-theme='convivio']) .header {
  --heading-decoration-width: 4rem;
}

:global(html[data-theme='convivio']) .eyebrow {
  display: none;
}

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
  gap: 1rem;
  margin: 0;
}

:global(html[data-theme='convivio']) .divider .line {
  display: block;
  width: 3.5rem;
  height: 1px;
  background: var(--section-accent);
  opacity: 0.3;
  mask: none;
  -webkit-mask: none;
}

:global(html[data-theme='convivio']) .olive {
  display: block;
  width: 4rem;
  aspect-ratio: 389 / 191;
  flex-shrink: 0;
  margin: 0;
  background: var(--section-accent);
  opacity: 0.3;
  transform: rotate(-20deg);
  mask: url('/icons/olive-skewer-transparent.svg') center / contain no-repeat;
  -webkit-mask: url('/icons/olive-skewer-transparent.svg') center / contain no-repeat;
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