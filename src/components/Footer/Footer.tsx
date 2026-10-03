import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer} data-site-footer>
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

      <a className={styles.studioLink} href='/studio'>
        Studio
      </a>
    </footer>
  )
}