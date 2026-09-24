export type DayKey =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export type OpeningHours = Partial<Record<DayKey, string>>

export type BusinessDetails = {
  phone?: string
  email?: string
  openingHours?: OpeningHours
  bookingUrl?: string
  giftCardUrl?: string
  instagramUrl?: string
  facebookUrl?: string
}