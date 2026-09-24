import type {
  BusinessDetails,
  DayKey
} from '@/types/businessDetails'

import styles from './Location.module.css'

type LocationProps = {
  businessDetails?: BusinessDetails | null
}

const days: {
  key: DayKey
  label: string
}[] = [
  {
    key: 'monday',
    label: 'Monday'
  },
  {
    key: 'tuesday',
    label: 'Tuesday'
  },
  {
    key: 'wednesday',
    label: 'Wednesday'
  },
  {
    key: 'thursday',
    label: 'Thursday'
  },
  {
    key: 'friday',
    label: 'Friday'
  },
  {
    key: 'saturday',
    label: 'Saturday'
  },
  {
    key: 'sunday',
    label: 'Sunday'
  }
]

function getPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export default function Location({
  businessDetails
}: LocationProps) {
  const hasOpeningHours = days.some(
    ({ key }) => businessDetails?.openingHours?.[key]
  )

  return (
    <section className={styles.location} id='location'>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Visit Convivio</p>

          <h2 className={styles.heading}>
            Find Us in Scarborough
          </h2>

          <div className={styles.divider}>
            <span className={styles.line}></span>

            <span
              className={styles.headingIcon}
              aria-hidden='true'
            ></span>

            <span className={styles.line}></span>
          </div>
        </header>

        <div className={styles.content}>
          <article className={styles.contactCard}>
            <div className={styles.detail}>
              <p className={styles.label}>Address</p>

              <p className={styles.value}>
                16E Calais Road
                <br />
                Scarborough, 6019
              </p>
            </div>

            {(businessDetails?.phone ||
              businessDetails?.email) && (
              <div className={styles.contactRow}>
                {businessDetails.phone && (
                  <div className={styles.detail}>
                    <p className={styles.label}>Phone</p>

                    <a
                      className={styles.value}
                      href={getPhoneHref(
                        businessDetails.phone
                      )}
                    >
                      {businessDetails.phone}
                    </a>
                  </div>
                )}

                {businessDetails.email && (
                  <div className={styles.detail}>
                    <p className={styles.label}>Email</p>

                    <a
                      className={styles.value}
                      href={`mailto:${businessDetails.email}`}
                    >
                      {businessDetails.email}
                    </a>
                  </div>
                )}
              </div>
            )}

            {hasOpeningHours && (
              <div className={styles.detail}>
                <p className={styles.label}>
                  Opening Hours
                </p>

                <div className={styles.hours}>
                  {days.map(({ key, label }) => {
                    const hours =
                      businessDetails?.openingHours?.[key]

                    if (!hours) return null

                    return (
                      <div
                        className={styles.hourRow}
                        key={key}
                      >
                        <span>{label}</span>
                        <span>{hours}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {(businessDetails?.instagramUrl ||
              businessDetails?.facebookUrl) && (
              <div className={styles.socials}>
                <p className={styles.label}>Social</p>

                <div className={styles.socialLinks}>
                  {businessDetails.instagramUrl && (
                    <a
                      className={styles.socialLink}
                      href={
                        businessDetails.instagramUrl
                      }
                      aria-label='Instagram'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <span
                        className={`${styles.socialIcon} ${styles.instagramIcon}`}
                      ></span>
                    </a>
                  )}

                  {businessDetails.facebookUrl && (
                    <a
                      className={styles.socialLink}
                      href={
                        businessDetails.facebookUrl
                      }
                      aria-label='Facebook'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <span
                        className={`${styles.socialIcon} ${styles.facebookIcon}`}
                      ></span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </article>

          <div className={styles.map}>
            <iframe
              className={styles.mapFrame}
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3387.24680837167!2d115.7656974756268!3d-31.899890874042427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32afb7c7ea452d%3A0x29c2e19ef5eedb04!2sConvivio%20Wine%20Bar!5e0!3m2!1sen!2sau!4v1789992364904!5m2!1sen!2sau'
              title='Map showing Convivio Wine Bar in Scarborough'
              loading='lazy'
              allowFullScreen
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}