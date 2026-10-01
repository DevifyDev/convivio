# Workspace Export
Generated: 2026-10-01T01:38:06.967Z

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
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='8' viewBox='0 0 32 8'%3E%3Cpath d='M0 4 Q8 0 16 4 T32 4' fill='none' stroke='black' stroke-width='2'/%3E%3C/svg%3E") left center / 32px 8px repeat-x;
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

## ./src/components/SvgFilter.tsx
```tsx
export default function SvgFilter() {
  return (
    <svg width='0' height='0' style={{ position: 'absolute' }}>
      <filter id='roughen'>
        <feTurbulence
          type='fractalNoise'
          baseFrequency='0.02 0.15'
          numOctaves='3'
          seed='4'
          result='noise'
        />
        <feDisplacementMap
          in='SourceGraphic'
          in2='noise'
          scale='3'
          xChannelSelector='R'
          yChannelSelector='G'
        />
      </filter>

      <filter id='roughen-reviews'>
        <feTurbulence
          type='fractalNoise'
          baseFrequency='0.02 0.3'
          numOctaves='3'
          seed='4'
          result='review-noise'
        />
        <feDisplacementMap
          in='SourceGraphic'
          in2='review-noise'
          scale='5'
          xChannelSelector='R'
          yChannelSelector='G'
        />
      </filter>
    </svg>
  )
}
```