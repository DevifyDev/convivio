import type { Metadata } from 'next'
import { Fraunces, Hanken_Grotesk } from 'next/font/google'
import { preload } from 'react-dom'
import './globals.css'


const headingFont = Fraunces({
  subsets: ['latin'],
  variable: '--heading-font',
  display: 'swap'
})

const bodyFont = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--body-font',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.convivioperth.com.au'),

  title: 'Convivio Wine Bar | Scarborough',

  description:
    'Mediterranean soul. Coastal spirit. Convivio is your neighbourhood wine bar, serving European wines, signature cocktails and seasonal plates',

  alternates: {
    canonical: '/'
  },

  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: '/',
    siteName: 'Convivio Wine Bar',
    title: 'Convivio Wine Bar | Scarborough',
    description:
      'Mediterranean soul. Coastal spirit. Convivio is your neighbourhood wine bar, serving European wines, signature cocktails and seasonal plates'
  },

  creator: 'Devify'
}

export default function Root({
  children
}: Readonly<{ children: React.ReactNode }>) {
  preload('/fonts/aloja-extended.woff2', {
  as: 'font',
  type: 'font/woff2',
  crossOrigin: 'anonymous'
})
  preload('/images/hero-background.webp', {
    as: 'image',
    fetchPriority: 'high'
  })

  return (
    <html
      lang='en'
      data-theme='convivio'
      className={`${headingFont.variable} ${bodyFont.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}