import styles from './Location.module.css'

export default function Location() {
  return (
    <section className={styles.location} id='contact'>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Visit Convivio</p>
          <h2 className={styles.heading}>Find Us in Scarborough</h2>

          <div className={styles.divider}>
            <span className={styles.line}></span>

            <span className={styles.headingIcon} aria-hidden='true'></span>

            <span className={styles.line}></span>
          </div>
        </header>

        <div className={styles.content}>
          <article className={styles.contactCard}>
            <div className={styles.detail}>
              <p className={styles.label}>Address</p>
              <p className={styles.value}>
                123 Lorem Ipsum Street
                <br />
                Lorem Ipsum, 6000
              </p>
            </div>

            <div className={styles.contactRow}>
              <div className={styles.detail}>
                <p className={styles.label}>Phone</p>
                <a className={styles.value} href='tel:+61000000000'>
                  +61 00 0000 0000
                </a>
              </div>

              <div className={styles.detail}>
                <p className={styles.label}>Email</p>
                <a className={styles.value} href='mailto:lorem@example.com'>
                  lorem@example.com
                </a>
              </div>
            </div>

            <div className={styles.detail}>
              <p className={styles.label}>Opening Hours</p>

              <div className={styles.hours}>
                <div className={styles.hourRow}>
                  <span>Lorem – Ipsum</span>
                  <span>12:00 – 22:00</span>
                </div>

                <div className={styles.hourRow}>
                  <span>Dolor – Amet</span>
                  <span>12:00 – 23:00</span>
                </div>

                <div className={styles.hourRow}>
                  <span>Consectetur</span>
                  <span>12:00 – 21:00</span>
                </div>
              </div>
            </div>

            <div className={styles.socials}>
              <p className={styles.label}>Social</p>

              <div className={styles.socialLinks}>
                <a className={styles.socialLink} href='#' aria-label='Instagram'>
                  <span className={`${styles.socialIcon} ${styles.instagramIcon}`}></span>
                </a>

                <a className={styles.socialLink} href='#' aria-label='Facebook'>
                  <span className={`${styles.socialIcon} ${styles.facebookIcon}`}></span>
                </a>
              </div>
            </div>
            
          </article>

          <div className={styles.map} aria-label='Google Map placeholder'>
            <div className={styles.mapContent}>
              <p className={styles.mapText}>Google Map</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}