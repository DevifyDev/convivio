import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
import Pricing from '@/components/Pricing/Pricing'
import Gallery from '@/components/Gallery/Gallery'
import Location from '@/components/Location/Location'
import Footer from '@/components/Footer/Footer'

export default function Homepage() {
  return (
    <>
      <Header/>
      <Hero />
      <About />
      <Pricing />
      <Gallery />
      <Location />
      <Footer />
    </>
  )
}