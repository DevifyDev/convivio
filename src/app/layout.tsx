import type { Metadata } from 'next'
import { Fraunces, Hanken_Grotesk, Amatic_SC, Caveat  } from 'next/font/google'
import './globals.css'

const headingFont = Fraunces({
  subsets: ['latin'],
  variable: '--heading-font',
  display: 'swap'
})

// const headingFont = Amatic_SC({ 
//   weight: ['400', '700'], 
//   variable: '--heading-font',
//   subsets: ['latin'] 
// })

// const headingFont = Caveat({ 
//   weight: '400', 
//   variable: '--heading-font',
//   subsets: ['latin'] 
// })

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
      className={`${headingFont.variable} ${bodyFont.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  )
}