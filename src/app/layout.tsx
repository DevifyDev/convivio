import type { Metadata } from 'next'
import { Fraunces, Hanken_Grotesk } from 'next/font/google'
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

  title: 'Convivio Wine Bar | Scarborough, Perth',

  description:
    'Convivio is a neighbourhood wine bar in Scarborough, Perth, serving thoughtful wines, generous food and relaxed evenings. View the menu and book a table.',

  alternates: {
    canonical: '/'
  },

  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: '/',
    siteName: 'Convivio Wine Bar',
    title: 'Convivio Wine Bar | Scarborough, Perth',
    description:
      'Convivio is a neighbourhood wine bar in Scarborough, Perth, serving thoughtful wines, generous food and relaxed evenings. View the menu and book a table.'
  },

  creator: 'Devify'
}

export default function Root({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang='en'
      data-theme='convivio'
      className={`${headingFont.variable} ${bodyFont.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  )
}