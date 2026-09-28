import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
import Menu, { type MenuCategory } from '@/components/Menu/Menu'
import Gallery, { type GalleryImage } from '@/components/Gallery/Gallery'
import Events, { type WeeklyEvents, type SpecialEvent } from '@/components/Events/Events'
import Testimonials, { type Testimonial } from '@/components/Testimonials/Testimonials'
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
  businessDetailsQuery
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

export default async function Homepage() {
  const [
    menu,
    gallery,
    events,
    testimonials,
    businessDetails
  ] = await Promise.all([
    client.fetch<MenuData | null>(menuQuery),
    client.fetch<GalleryData | null>(galleryQuery),
    client.fetch<EventsData | null>(eventsQuery),
    client.fetch<TestimonialsData | null>(testimonialsQuery),
    client.fetch<BusinessDetails | null>(businessDetailsQuery)
  ])

  return (
    <>
      <StructuredData businessDetails={businessDetails} />

      <SvgFilter />

      <Header businessDetails={businessDetails} />

      <main>
        <Hero bookingUrl={businessDetails?.bookingUrl} />
        <About />
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
        <Location businessDetails={businessDetails} />
      </main>

      <Footer />
      <ThemeSwitcher />
</>
  )
}