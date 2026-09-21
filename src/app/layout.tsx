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
  title: 'Convivio | Perth',
  description: 'Convivio wine bar'
}

export default function Root({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang='en'
      data-theme='premium'
      className={`${headingFont.variable} ${bodyFont.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  )
}