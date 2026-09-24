import Image from 'next/image'
import styles from './Events.module.css'

export type WeeklyEvent = {
  title: string
  time?: string
  description: string
}

export type WeeklyEvents = {
  monday?: WeeklyEvent
  tuesday?: WeeklyEvent
  wednesday?: WeeklyEvent
  thursday?: WeeklyEvent
  friday?: WeeklyEvent
  saturday?: WeeklyEvent
  sunday?: WeeklyEvent
}

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
  weeklyEvents?: WeeklyEvents
  specialEvents?: SpecialEvent[]
}

const days: {
  key: keyof WeeklyEvents
  label: string
}[] = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' }
]

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
    }).format(date),

    weekday: new Intl.DateTimeFormat('en-AU', {
      weekday: 'long',
      timeZone: 'UTC'
    }).format(date)
  }
}

export default function Events({
  weeklyEvents,
  specialEvents = []
}: EventsProps) {
  const weeklyEventList = days.flatMap(({ key, label }) => {
    const event = weeklyEvents?.[key]

    if (!event) return []

    return [
      {
        day: label,
        ...event
      }
    ]
  })

  if (weeklyEventList.length === 0 && specialEvents.length === 0) {
    return null
  }

  return (
    <section className={styles.events} id='events'>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>What&apos;s On</p>

          <h2 className={styles.heading}>Upcoming Events</h2>

          <div className={styles.divider}>
            <span className={styles.line}></span>
            <span
              className={styles.headingIcon}
              aria-hidden='true'
            ></span>
            <span className={styles.line}></span>
          </div>
        </header>

        {weeklyEventList.length > 0 && (
          <div className={styles.weeklySection}>
            <div className={styles.subheadingRow}>
              <p className={styles.sectionEyebrow}>Every Week</p>
              <h3 className={styles.subheading}>
                Weekly at Convivio
              </h3>
            </div>

            <div className={styles.weeklyGrid}>
              {weeklyEventList.map((event) => (
                <article
                  className={styles.weeklyCard}
                  key={event.day}
                >
                  <p className={styles.dayName}>{event.day}</p>

                  <div className={styles.weeklyContent}>
                    <h4 className={styles.weeklyTitle}>
                      {event.title}
                    </h4>

                    {event.time && (
                      <p className={styles.weeklyTime}>
                        {event.time}
                      </p>
                    )}

                    <p className={styles.weeklyDescription}>
                      {event.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {specialEvents.length > 0 && (
          <div className={styles.specialSection}>
            <div className={styles.subheadingRow}>
              <p className={styles.sectionEyebrow}>Coming Up</p>
              <h3 className={styles.subheading}>
                Special Events
              </h3>
            </div>

            <div className={styles.specialEvents}>
              {specialEvents.map((event) => {
                const { day, month, weekday } = getEventDate(
                  event.date
                )

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
                          sizes='(max-width: 650px) 100vw, 220px'
                          className={styles.image}
                        />
                      )}
                    </div>

                    <div className={styles.eventContent}>
                      <p className={styles.eventMeta}>
                        {weekday}
                        {event.time && ` · ${event.time}`}
                      </p>

                      <h4 className={styles.eventTitle}>
                        {event.title}
                      </h4>

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