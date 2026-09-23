import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
import Menu, { type MenuCategory } from '@/components/Menu/Menu'
import Gallery from '@/components/Gallery/Gallery'
import Events from '@/components/Events/Events'
import Testimonials from '@/components/Testimonials/Testimonials'
import Location from '@/components/Location/Location'
import Footer from '@/components/Footer/Footer'

import { client } from '@/sanity/lib/client'
import { menuQuery } from '@/sanity/lib/queries'

type MenuData = {
  categories?: MenuCategory[]
}

export default async function Homepage() {
  const menu = await client.fetch<MenuData | null>(menuQuery)

  return (
    <>
      <Header />
      <Hero />
      <About />

      <Menu categories={menu?.categories ?? []} />

      <Gallery />
      <Events />
      <Testimonials />
      <Location />
      <Footer />
    </>
  )
}