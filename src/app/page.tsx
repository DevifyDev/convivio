import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
import Menu from '@/components/Menu/Menu'
import Events from '@/components/Events/Events'
import Gallery from '@/components/Gallery/Gallery'
import Testimonials from '@/components/Testimonials/Testimonials'
import Location from '@/components/Location/Location'
import Footer from '@/components/Footer/Footer'

import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'

export default function Homepage() {
  return (
    <>
      <Header/>
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Events />
      <Testimonials />
      <Location />
      <Footer />
      <ThemeSwitcher />
    </>
  )
}