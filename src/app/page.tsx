import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
import Menu, { type MenuCategory } from '@/components/Menu/Menu'
import Gallery, { type GalleryImage } from '@/components/Gallery/Gallery'
import Events from '@/components/Events/Events'
import Testimonials from '@/components/Testimonials/Testimonials'
import Location from '@/components/Location/Location'
import Footer from '@/components/Footer/Footer'

import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'

import { client } from '@/sanity/lib/client'
import { menuQuery } from '@/sanity/lib/queries'
import { galleryQuery } from '@/sanity/lib/queries'

type MenuData = {
  categories?: MenuCategory[]
}

type GalleryData = {
  images?: GalleryImage[]
}

export default async function Homepage() {
  const [menu, gallery] = await Promise.all([
    client.fetch<MenuData | null>(menuQuery),
    client.fetch<GalleryData | null>(galleryQuery)
  ])

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Menu categories={menu?.categories ?? []} />
      <Gallery images={gallery?.images ?? []} />
      <Events />
      <Testimonials />
      <Location />
      <Footer />
      <ThemeSwitcher />
    </>
  )
}