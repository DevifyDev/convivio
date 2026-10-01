# Workspace Export
Generated: 2026-10-01T08:10:01.009Z

## ./src/components/Events/Events.tsx
```tsx
import Image from 'next/image'
import SectionHeading from '../SectionHeading/SectionHeading'
import { sectionHeadingData } from '@/data/sectionHeadingData'
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
  description?: string
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
  description,
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
        <SectionHeading {...sectionHeadingData.events} />

        {weeklyEventList.length > 0 && (
          <div className={styles.weeklySection}>
            <div className={styles.subheadingRow}>
              <p className={styles.sectionEyebrow}>What's On</p>
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
                          sizes='(max-width: 650px) 100vw, 220px'
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
```

## ./src/components/Events/Events.module.css
```css
.events {
  position: relative;
  z-index: 1;
  padding-block: 6rem;
  padding-inline: 6rem;
  background: var(--dark-background);
  color: var(--light-text);
}

.events::before,
.events::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 24px;
  background: var(--dark-background);
  filter: url('#roughen');
  pointer-events: none;
}

.events::before {
  top: -12px;
}

.events::after {
  bottom: -12px;
}

.container {
  width: 100%;
  max-width: var(--page-width);
  margin-inline: auto;
}

/* SECTION HEADINGS */

.weeklySection {
  margin-top: 5rem;
}

.specialSection {
  margin-top: 6rem;
}

.subheadingRow {
  margin-bottom: 2rem;
}

.sectionEyebrow {
  margin: 0 0 0.6rem;
  color: var(--primary-gold);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}

.subheading {
  margin: 0;
  color: var(--light-text);
  font-size: 1.75rem;
  font-weight: 300;
  letter-spacing: -1px;
}

/* WEEKLY EVENTS */

.weeklyGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: 1.25rem;
}

.weeklyCard {
  display: grid;
  grid-template-columns: 6.5rem minmax(0, 1fr);
  align-items: start;
  gap: 1.5rem;
  padding: 1.75rem 2rem;
  border: 1px solid rgba(248, 247, 244, 0.12);
  background: rgba(248, 247, 244, 0.035);
  transition:
    border-color 180ms ease,
    transform 180ms ease;
}

.weeklyCard:hover {
  border-color: var(--accent-on-dark);
  transform: translateY(-2px);
}

.dayName {
  margin: 0;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--primary-gold);
  color: var(--primary-gold);
  font-family: var(--display-font), serif;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
}

:global(html[data-theme='convivio']) .dayName {
  position: relative;
  width: max-content;
  max-width: 100%;
  justify-self: center;
  padding-bottom: 0.85rem;
  border-bottom: 0;
}

:global(html[data-theme='convivio']) .dayName::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 8px;
  background: var(--primary-gold);
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='8' viewBox='0 0 32 8'%3E%3Cpath d='M0 4 Q8 0 16 4 T32 4' fill='none' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E") left center / 32px 8px repeat-x;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='8' viewBox='0 0 32 8'%3E%3Cpath d='M0 4 Q8 0 16 4 T32 4' fill='none' stroke='black' stroke-width='0.75'/%3E%3C/svg%3E") left center / 32px 8px repeat-x;
}

.weeklyContent {
  min-width: 0;
}

.weeklyTitle {
  margin: 0 0 0.4rem;
  color: var(--light-text);
  font-family: var(--display-font), serif;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.2;
}

.weeklyTime {
  margin: 0 0 0.9rem;
  color: var(--primary-gold);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.weeklyDescription {
  margin: 0;
  color: var(--light-text);
  opacity: 0.9;
  font-size: 0.85rem;
  font-weight: 200;
  line-height: 1.6;
}

/* SPECIAL EVENTS */

.specialEvents {
  display: grid;
  gap: 1rem;
}

.specialEvent {
  display: grid;
  grid-template-columns: 5rem 13rem minmax(0, 1fr) auto;
  align-items: center;
  gap: 2rem;
  padding: 1rem 2rem 1rem 1.5rem;
  border: 1px solid rgba(248, 247, 244, 0.1);
  background: rgba(248, 247, 244, 0.035);
  transition: border-color 180ms ease;
}

.specialEvent:hover {
   border-color: var(--accent-on-dark);
}

.date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dateDay {
  color: var(--primary-gold);
  font-family: var(--display-font), serif;
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1;
}

.dateMonth {
  margin-top: 0.4rem;
  color: rgba(242, 242, 242, 0.65);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.eventImage {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.eventImage:empty {
  visibility: hidden;
}

.image {
  object-fit: cover;
}

.eventContent {
  min-width: 0;
}

.eventMeta {
  margin: 0 0 0.5rem;
  color: var(--primary-gold);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.eventTitle {
  margin: 0 0 0.6rem;
  color: var(--light-text);
  font-family: var(--display-font), serif;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.2;
}

.eventDescription {
  max-width: 38rem;
  margin: 0;
  color: var(--light-text);
  opacity: 0.9;
  font-size: 0.85rem;
  font-weight: 200;
  line-height: 1.6;
}

.price {
  margin: 0;
  color: var(--light-text);
  font-family: var(--display-font), serif;
  font-size: 1.05rem;
  white-space: nowrap;
}

:global(html[data-theme='convivio']) .sectionEyebrow,
:global(html[data-theme='convivio']) .dayName,
:global(html[data-theme='convivio']) .weeklyTime,
:global(html[data-theme='convivio']) .dateDay,
:global(html[data-theme='convivio']) .eventMeta {
  color: var(--accent-on-dark);
}

:global(html[data-theme='convivio']) .dateMonth {
  color: var(--accent-on-dark);
  font-family: var(--display-font);
  font-size: 1.1rem;
}

:global(html[data-theme='convivio']) .dayName::after {
  background: var(--accent-on-dark);
}

/* SMALL DESKTOP / TABLET */

@media (max-width: 1350px) {
  .events {
    padding-inline: 3rem;
  }

  .weeklyGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .specialEvent {
    grid-template-columns: 5rem 11rem minmax(0, 1fr);
  }

  .price {
    grid-column: 3;
  }
}

/* MOBILE / NARROW TABLET */

@media (max-width: 1000px) {
  .events {
    padding-block: 4rem;
    padding-inline: var(--inline-padding);
  }

  .weeklySection {
    margin-top: 4rem;
  }

  .specialSection {
    margin-top: 4rem;
  }

  .weeklyGrid {
    grid-template-columns: 1fr;
  }

  .specialEvent {
    grid-template-columns: 4.5rem 9rem minmax(0, 1fr);
    align-items: center;
    gap: 1.25rem;
    padding: 1.25rem;
  }

  .eventImage {
    grid-column: 2;
  }

  .eventContent {
    grid-column: 3;
  }

  .price {
    grid-column: 3;
  }

  .date {
    grid-row: auto;
    padding-top: 0;
  }

  .eventTitle {
    font-size: 1.3rem;
  }
}

/* SMALL MOBILE */

@media (max-width: 550px) {
  .weeklyCard {
    grid-template-columns: 6rem minmax(0, 1fr);
    gap: 1rem;
    padding: 1.5rem;
  }

  .dayName {
    font-size: 0.9rem;
  }

  .specialEvent {
    grid-template-columns: 1fr;
    padding: 1.25rem;
  }

  .date {
    grid-row: auto;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.5rem;
  }

  .dateDay {
    font-size: 2rem;
  }

  .dateMonth {
    margin-top: 0;
  }

  .eventImage,
  .eventContent,
  .price {
    grid-column: 1;
  }

  .eventImage {
    width: 100%;
    height: 11rem;
    aspect-ratio: auto;
  }

  .eventImage:empty {
    display: none;
  }
}
```

## ./src/sanity/schemaTypes/documents/eventsType.ts
```ts
import { defineArrayMember, defineField, defineType } from 'sanity'

export const eventsType = defineType({
  name: 'events',
  title: 'Events',
  type: 'document',

  fields: [
    defineField({
      name: 'weeklyEvents',
      title: 'Weekly Events',
      type: 'object',
      description: 
        'Add details for weekly events',

      fields: [
        defineField({
          name: 'monday',
          title: 'Monday',
          type: 'weeklyEvent',
          options: {
            collapsible: true,
            collapsed: true
          },
        }),

        defineField({
          name: 'tuesday',
          title: 'Tuesday',
          type: 'weeklyEvent',
          options: {
            collapsible: true,
            collapsed: true
          }
        }),

        defineField({
          name: 'wednesday',
          title: 'Wednesday',
          type: 'weeklyEvent',
          options: {
            collapsible: true,
            collapsed: true
          }
        }),

        defineField({
          name: 'thursday',
          title: 'Thursday',
          type: 'weeklyEvent',
          options: {
            collapsible: true,
            collapsed: true
          }
        }),

        defineField({
          name: 'friday',
          title: 'Friday',
          type: 'weeklyEvent',
          options: {
            collapsible: true,
            collapsed: true
          }
        }),

        defineField({
          name: 'saturday',
          title: 'Saturday',
          type: 'weeklyEvent',
          options: {
            collapsible: true,
            collapsed: true
          }
        }),

        defineField({
          name: 'sunday',
          title: 'Sunday',
          type: 'weeklyEvent',
          options: {
            collapsible: true,
            collapsed: true
          }
        })
      ]
    }),

    defineField({
      name: 'specialEvents',
      title: 'Special Events',
      type: 'array',
      description:
        'Add details for special events',

      of: [
        defineArrayMember({
          type: 'specialEvent'
        })
      ]
    })
  ],

  preview: {
    prepare() {
      return {
        title: 'Events'
      }
    }
  }
})
```

## ./src/sanity/schemaTypes/objects/specialEventType.ts
```ts
import { defineField, defineType } from 'sanity'

export const specialEventType = defineType({
  name: 'specialEvent',
  title: 'Special Event',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Event Name',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Maximum 250 characters',
      validation: (rule) =>
        rule.required().max(250)
          }),

    defineField({
        name: 'image',
        title: 'Event Photo',
        type: 'image',
        description: 'Optional',
        options: {
          hotspot: true
        }
      }),

      defineField({
        name: 'imageAlt',
        title: 'Image Description',
        type: 'string',
        description:
          'Required when an image is included',

        validation: (rule) =>
          rule.custom((value, context) => {
            const parent = context.parent as {
              image?: unknown
            }

            if (parent?.image && !value) {
              return 'Image description is required'
            }

            return true
          })
      }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description:
        'Optional'
    })
  ],

  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image'
    },

    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date || 'Date not set',
        media
      }
    }
  }
})
```

## ./src/sanity/schemaTypes/objects/weeklyEventType.ts
```ts
import { defineField, defineType } from 'sanity'

export const weeklyEventType = defineType({
  name: 'weeklyEvent',
  title: 'Weekly Event',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Event Name',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description:
        'Maximum 180 characters',
      validation: (rule) =>
        rule.required().max(180)
    })
  ]
})
```