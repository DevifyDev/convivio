import type {
  BusinessDetails,
  DayKey
} from '@/types/businessDetails'

type StructuredDataProps = {
  businessDetails?: BusinessDetails | null
}

const dayNames: Record<DayKey, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday'
}

function parseTime(
  value: string,
  fallbackPeriod?: 'am' | 'pm'
) {
  const match = value
    .trim()
    .toLowerCase()
    .match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/)

  if (!match) return null

  const [
    ,
    hourString,
    minuteString = '00',
    periodMatch
  ] = match

  let hour = Number(hourString)
  const minute = Number(minuteString)

  const period =
    (periodMatch as 'am' | 'pm' | undefined) ??
    fallbackPeriod

  if (!period || hour > 12 || minute > 59) {
    return null
  }

  if (period === 'am' && hour === 12) {
    hour = 0
  }

  if (period === 'pm' && hour !== 12) {
    hour += 12
  }

  return `${String(hour).padStart(2, '0')}:${String(
    minute
  ).padStart(2, '0')}`
}

function parseOpeningHours(
  openingHours?: BusinessDetails['openingHours']
) {
  if (!openingHours) return []

  return Object.entries(openingHours).flatMap(
    ([day, value]) => {
      if (!value) return []

      const cleanValue = value.trim().toLowerCase()

      if (cleanValue === 'closed') {
        return []
      }

      const parts = value.split(/\s*[–—-]\s*/)

      if (parts.length !== 2) {
        return []
      }

      const [, endPeriod] =
        parts[1]
          .trim()
          .toLowerCase()
          .match(/(am|pm)$/) ?? []

      const closes = parseTime(parts[1])

      const opens = parseTime(
        parts[0],
        endPeriod as 'am' | 'pm' | undefined
      )

      if (!opens || !closes) {
        return []
      }

      return [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: dayNames[day as DayKey],
          opens,
          closes
        }
      ]
    }
  )
}

export default function StructuredData({
  businessDetails
}: StructuredDataProps) {
  const sameAs = [
    businessDetails?.instagramUrl,
    businessDetails?.facebookUrl
  ].filter((url): url is string => Boolean(url))

  const openingHoursSpecification =
    parseOpeningHours(businessDetails?.openingHours)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',

    name: 'Convivio Wine Bar',

    description:
      'Convivio is a neighbourhood wine bar in Scarborough, Perth, serving thoughtful wines, generous food and relaxed evenings.',

    url: 'https://www.convivioperth.com.au',

    image:
      'https://www.convivioperth.com.au/images/hero-background.jpg',

    address: {
      '@type': 'PostalAddress',
      streetAddress: '16E Calais Road',
      addressLocality: 'Scarborough',
      addressRegion: 'WA',
      postalCode: '6019',
      addressCountry: 'AU'
    },

    geo: {
      '@type': 'GeoCoordinates',
      latitude: -31.899891,
      longitude: 115.765697
    },

    ...(businessDetails?.phone && {
      telephone: businessDetails.phone
    }),

    ...(businessDetails?.bookingUrl && {
      acceptsReservations: businessDetails.bookingUrl
    }),

    ...(openingHoursSpecification.length > 0 && {
      openingHoursSpecification
    }),

    hasMenu:
      'https://www.convivioperth.com.au/#menu',

    ...(sameAs.length > 0 && {
      sameAs
    })
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}