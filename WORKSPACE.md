# Workspace Export
Generated: 2026-09-29T05:45:19.072Z

## ./src/components/Footer/Footer.tsx
```tsx
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} Convivio Wine Bar

        <span className={styles.separator}>·</span>

        <span className={styles.credit}>
          Website by{' '}
          <a
            href='https://devify.dev'
            target='_blank'
            rel='noopener noreferrer'
          >
            Devify
          </a>
        </span>
      </p>
    </footer>
  )
}
```

## ./src/components/Footer/Footer.module.css
```css
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem var(--inline-padding);
  background: var(--primary-black);
  color: var(--primary-white);
}

.copyright {
  margin: 0;
  color: var(--primary-white);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  text-align: center;
  opacity: 0.65;
}

.separator {
  margin-inline: 0.6rem;
  opacity: 0.5;
}

.credit a {
  color: inherit;
  text-decoration: none;
  transition: opacity 180ms ease;
}

.credit a:hover {
  opacity: 0.65;
}

.credit a:focus-visible {
  outline: 1px solid var(--primary-gold);
  outline-offset: 3px;
}

@media (max-width: 500px) {
  .copyright {
    font-size: 0.7rem;
  }

  .separator {
    margin-inline: 0.4rem;
  }
}
```