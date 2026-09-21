import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
import Menu from '@/components/Menu/Menu'
import Gallery from '@/components/Gallery/Gallery'
import Location from '@/components/Location/Location'
import Footer from '@/components/Footer/Footer'

export default function Homepage() {
  return (
    <>
      <Header/>
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Location />
      <Footer />
    </>
  )
}