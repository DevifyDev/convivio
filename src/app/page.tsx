import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
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
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'
import SvgFilter from '@/components/SvgFilter'

import { client } from '@/sanity/lib/client'
import {
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
  categories?: MenuCategory[]
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
  members?: StaffMember[]
}

type FaqData = {
  items?: FaqItem[]
}

export default async function Homepage() {
  const [
    menu,
    gallery,
    events,
    testimonials,
    businessDetails,
    staff,
    faq
  ] = await Promise.all([
    client.fetch<MenuData | null>(menuQuery),
    client.fetch<GalleryData | null>(galleryQuery),
    client.fetch<EventsData | null>(eventsQuery),
    client.fetch<TestimonialsData | null>(testimonialsQuery),
    client.fetch<BusinessDetails | null>(businessDetailsQuery),

    client.fetch<StaffData | null>(
      staffQuery,
      {},
      {
        perspective: 'published',
        cache: 'no-store'
      }
    ),

    client.fetch<FaqData | null>(
      faqQuery,
      {},
      {
        perspective: 'published',
        cache: 'no-store'
      }
    )
  ])

  return (
    <>
      <StructuredData businessDetails={businessDetails} />

      <SvgFilter />

      <Header businessDetails={businessDetails} />

      <main>
        <Hero bookingUrl={businessDetails?.bookingUrl} />

        <About />

        <Staff staff={staff?.members ?? []} />

        <Menu categories={menu?.categories ?? []} />

        <Gallery
          images={gallery?.images ?? []}
          instagramUrl={businessDetails?.instagramUrl}
        />

        <Events
          weeklyEvents={events?.weeklyEvents}
          specialEvents={events?.specialEvents ?? []}
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