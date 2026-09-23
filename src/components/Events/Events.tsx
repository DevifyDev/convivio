import Image from 'next/image'
import styles from './Events.module.css'

const weeklyEvents = [
  {
    day: 'Monday',
    title: 'Steak Night',
    time: 'From 5pm',
    description:
      'Premium cuts, seasonal sides and wines selected to complement the evening.'
  },
  {
    day: 'Wednesday',
    title: 'Pasta Night',
    time: 'From 5pm',
    description:
      'Fresh pasta, classic Italian flavours and a rotating selection of wines by the glass.'
  },
  {
    day: 'Thursday',
    title: 'Wine Night',
    time: 'From 6pm',
    description:
      'Discover featured bottles, new producers and special pours selected by the Convivio team.'
  }
]

const specialEvents = [
  {
    date: '2026-10-25',
    day: '25',
    month: 'Oct',
    weekday: 'Sunday',
    time: '6:30pm',
    title: 'Celebrity Chef Cooking Night',
    description:
      'A special evening of food, wine and conversation with a guest chef taking over the Convivio kitchen.',
    image: '/images/gallery-1.jpg',
    imageAlt: 'Guests dining inside Convivio Wine Bar',
    price: '$120 pp'
  },
  {
    date: '2026-11-08',
    day: '08',
    month: 'Nov',
    weekday: 'Sunday',
    time: '6:00pm',
    title: 'Winemaker Dinner',
    description:
      'An intimate evening featuring a curated menu alongside a guided selection of wines from a visiting producer.',
    image: '/images/gallery-4.jpg',
    imageAlt: 'Convivio wine selection',
    price: '$95 pp'
  }
]

export default function Events() {
  return (
    <section className={styles.events} id='events'>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>What&apos;s On</p>

          <h2 className={styles.heading}>Upcoming Events</h2>

          <div className={styles.divider}>
            <span className={styles.line}></span>
            <span className={styles.headingIcon} aria-hidden='true'></span>
            <span className={styles.line}></span>
          </div>
        </header>

        <div className={styles.weeklySection}>
          <div className={styles.subheadingRow}>
            <p className={styles.sectionEyebrow}>Every Week</p>
            <h3 className={styles.subheading}>Weekly at Convivio</h3>
          </div>

          <div className={styles.weeklyGrid}>
            {weeklyEvents.map((event) => (
              <article
                className={styles.weeklyCard}
                key={`${event.day}-${event.title}`}
              >
                <p className={styles.dayName}>{event.day}</p>

                <div className={styles.weeklyContent}>
                  <h4 className={styles.weeklyTitle}>
                    {event.title}
                  </h4>

                  <p className={styles.weeklyTime}>
                    {event.time}
                  </p>

                  <p className={styles.weeklyDescription}>
                    {event.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.specialSection}>
          <div className={styles.subheadingRow}>
            <p className={styles.sectionEyebrow}>Coming Up</p>
            <h3 className={styles.subheading}>Special Events</h3>
          </div>

          <div className={styles.specialEvents}>
            {specialEvents.map((event) => (
              <article className={styles.specialEvent} key={event.date}>
                <time className={styles.date} dateTime={event.date}>
                  <span className={styles.dateDay}>
                    {event.day}
                  </span>

                  <span className={styles.dateMonth}>
                    {event.month}
                  </span>
                </time>

                <div className={styles.eventImage}>
                  <Image
                    src={event.image}
                    alt={event.imageAlt}
                    fill
                    sizes='(max-width: 650px) 100vw, 220px'
                    className={styles.image}
                  />
                </div>

                <div className={styles.eventContent}>
                  <p className={styles.eventMeta}>
                    {event.weekday} · {event.time}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}