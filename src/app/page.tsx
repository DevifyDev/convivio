import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import About, { type AboutImages } from '@/components/About/About'
import Staff, { type StaffMember } from '@/components/Staff/Staff'
import Menu, { type MenuCategory } from '@/components/Menu/Menu'
import Gallery, { type GalleryImage } from '@/components/Gallery/Gallery'
import Events, {
  type WeeklyEvents,
  type SpecialEvent
} from '@/components/Events/Events'
import Testimonials, {
  type Testimonial
} from '@/components/Testimonials/Testimonials'
import Faq, { type FaqItem } from '@/components/Faq/Faq'
import Location from '@/components/Location/Location'
import Footer from '@/components/Footer/Footer'

import StructuredData from '@/components/StructuredData/StructuredData'
// import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'
import SvgFilter from '@/components/SvgFilter'

import { client } from '@/sanity/lib/client'
import {
  aboutQuery,
  menuQuery,
  galleryQuery,
  eventsQuery,
  testimonialsQuery,
  businessDetailsQuery,
  staffQuery,
  faqQuery
} from '@/sanity/lib/queries'

import type { BusinessDetails } from '@/types/businessDetails'

type MenuData = {
  food?: {
    categories?: MenuCategory[]
  } | null

  drinks?: {
    categories?: MenuCategory[]
  } | null
}

type GalleryData = {
  images?: GalleryImage[]
}

type EventsData = {
  weeklyEvents?: WeeklyEvents
  specialEvents?: SpecialEvent[]
}

type TestimonialsData = {
  reviews?: Testimonial[]
}

type StaffData = {
  groupImage?: string | null
  groupImageAlt?: string | null
  members?: StaffMember[]
}

type FaqData = {
  items?: FaqItem[]
}

export default async function Homepage() {
    const fetchOptions = {
    perspective: 'published',
    next: { revalidate: 60 }
  } as const

  const [
    menu,
    gallery,
    events,
    testimonials,
    businessDetails,
    staff,
    faq,
    about
  ] = await Promise.all([
    client.fetch<MenuData | null>(menuQuery, {}, fetchOptions),
    client.fetch<GalleryData | null>(galleryQuery, {}, fetchOptions),
    client.fetch<EventsData | null>(eventsQuery, {}, fetchOptions),
    client.fetch<TestimonialsData | null>(
      testimonialsQuery,
      {},
      fetchOptions
    ),
    client.fetch<BusinessDetails | null>(
      businessDetailsQuery,
      {},
      fetchOptions
    ),
    client.fetch<StaffData | null>(staffQuery, {}, fetchOptions),
    client.fetch<FaqData | null>(faqQuery, {}, fetchOptions),
    client.fetch<AboutImages | null>(aboutQuery, {}, fetchOptions)
  ])

  return (
    <>
      <StructuredData businessDetails={businessDetails} />

      <SvgFilter />

      <Header businessDetails={businessDetails} />

      <main>
        <Hero bookingUrl={businessDetails?.bookingUrl} />

        <About images={about} />

        <Staff
          staff={staff?.members ?? []}
          groupImage={staff?.groupImage}
          groupImageAlt={staff?.groupImageAlt}
        />

        <Menu
          foodCategories={menu?.food?.categories ?? []}
          drinksCategories={menu?.drinks?.categories ?? []}
        />
        
        <Gallery
          images={gallery?.images ?? []}
          instagramUrl={businessDetails?.instagramUrl}
        />

        <Events
          weeklyEvents={events?.weeklyEvents}
          specialEvents={events?.specialEvents}
        />

        <Testimonials
          testimonials={testimonials?.reviews ?? []}
        />

        <Faq items={faq?.items ?? []} />

        <Location businessDetails={businessDetails} />
      </main>

      <Footer />

      {/* <ThemeSwitcher /> */}
    </>
  )
}