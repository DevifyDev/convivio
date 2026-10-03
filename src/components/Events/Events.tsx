import Image from 'next/image'
import SectionHeading from '../SectionHeading/SectionHeading'
import { sectionHeadingData } from '@/data/sectionHeadingData'
import styles from './Events.module.css'

export type WeeklyEvent = {
  _key: string
  schedule: string
  title: string
  time?: string
  price?: string
  description: string
}

export type WeeklyEvents = WeeklyEvent[]

export type SpecialEvent = {
  _key: string
  date: string
  time?: string
  title: string
  description: string
  image?: string
  imageAlt?: string
  price?: string
}

type EventsProps = {
  weeklyEvents?: WeeklyEvents | null
  specialEvents?: SpecialEvent[] | null
}

function getEventDate(dateString: string) {
  const date = new Date(`${dateString}T00:00:00Z`)

  return {
    day: new Intl.DateTimeFormat('en-AU', {
      day: '2-digit',
      timeZone: 'UTC'
    }).format(date),

    month: new Intl.DateTimeFormat('en-AU', {
      month: 'short',
      timeZone: 'UTC'
    }).format(date)
  }
}

export default function Events({
  weeklyEvents,
  specialEvents
}: EventsProps) {
  const weeklyEventList = weeklyEvents ?? []
  const specialEventList = specialEvents ?? []

  if (
    weeklyEventList.length === 0 &&
    specialEventList.length === 0
  ) {
    return null
  }

  return (
    <section className={styles.events} id='events'>
      <div className={styles.container}>
        <SectionHeading {...sectionHeadingData.events} />

        {weeklyEventList.length > 0 && (
          <div className={styles.weeklySection}>
            <div className={styles.subheadingRow}>
              <p className={styles.sectionEyebrow}>What's On</p>

              <h3 className={styles.subheading}>Weekly Offers</h3>
            </div>

            <div className={styles.weeklyGrid}>
              {weeklyEventList.map((event) => (
                <article
                  className={styles.weeklyCard}
                  key={event._key}
                >
                  <p className={styles.dayName}>
                    {event.schedule}
                  </p>

                  <div className={styles.weeklyContent}>
                    <h4 className={styles.weeklyTitle}>
                      {event.title}
                    </h4>

                    {event.time && (
                      <p className={styles.weeklyTime}>
                        {event.time}
                      </p>
                    )}

                    <p className={styles.weeklyPrice}>
                      {event.price || '\u00A0'}
                    </p>

                    <p className={styles.weeklyDescription}>
                      {event.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {specialEventList.length > 0 && (
          <div className={styles.specialSection}>
            <div className={styles.subheadingRow}>
              <p className={styles.sectionEyebrow}>Coming Up</p>

              <h3 className={styles.subheading}>
                Special Events
              </h3>
            </div>

            <div className={styles.specialEvents}>
              {specialEventList.map((event) => {
                const { day, month } = getEventDate(event.date)

                return (
                  <article
                    className={styles.specialEvent}
                    key={event._key}
                  >
                    <time
                      className={styles.date}
                      dateTime={event.date}
                    >
                      <span className={styles.dateDay}>
                        {day}
                      </span>

                      <span className={styles.dateMonth}>
                        {month}
                      </span>
                    </time>

                    <div className={styles.eventImage}>
                      {event.image && (
                        <Image
                          src={event.image}
                          alt={event.imageAlt ?? ''}
                          fill
                          sizes='(max-width: 550px) 100vw, 220px'
                          className={styles.image}
                        />
                      )}
                    </div>

                    <div className={styles.eventContent}>
                      <h4 className={styles.eventTitle}>
                        {event.title}
                      </h4>

                      {event.time && (
                        <p className={styles.weeklyTime}>
                          {event.time}
                        </p>
                      )}

                      <p className={styles.eventDescription}>
                        {event.description}
                      </p>
                    </div>

                    {event.price && (
                      <p className={styles.price}>
                        {event.price}
                      </p>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
