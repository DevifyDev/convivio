# Workspace Export
Generated: 2026-10-03T15:26:28.682Z

## ./src/app/page.tsx
```tsx
import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import About, { type AboutImages } from '@/components/About/About'
import Staff, { type StaffMember } from '@/components/Staff/Staff'
import Menu, { type MenuCategory } from '@/components/Menu/Menu'
import Gallery, { type GalleryImage } from '@/components/Gallery/Gallery'
import Events, {
  type WeeklyEvents,
  type SpecialEvent
} from '@/components/Events/Events'
import Testimonials, {
  type Testimonial
} from '@/components/Testimonials/Testimonials'
import Faq, { type FaqItem } from '@/components/Faq/Faq'
import Location from '@/components/Location/Location'
import Footer from '@/components/Footer/Footer'

import StructuredData from '@/components/StructuredData/StructuredData'
// import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'
import SvgFilter from '@/components/SvgFilter'

import { client } from '@/sanity/lib/client'
import {
  aboutQuery,
  menuQuery,
  galleryQuery,
  eventsQuery,
  testimonialsQuery,
  businessDetailsQuery,
  staffQuery,
  faqQuery
} from '@/sanity/lib/queries'

import type { BusinessDetails } from '@/types/businessDetails'

type MenuData = {
  food?: {
    categories?: MenuCategory[]
  } | null

  drinks?: {
    categories?: MenuCategory[]
  } | null
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

type StaffData = {
  groupImage?: string | null
  groupImageAlt?: string | null
  members?: StaffMember[]
}

type FaqData = {
  items?: FaqItem[]
}

export default async function Homepage() {
    const fetchOptions = {
    perspective: 'published',
    next: { revalidate: 60 }
  } as const

  const [
    menu,
    gallery,
    events,
    testimonials,
    businessDetails,
    staff,
    faq,
    about
  ] = await Promise.all([
    client.fetch<MenuData | null>(menuQuery, {}, fetchOptions),
    client.fetch<GalleryData | null>(galleryQuery, {}, fetchOptions),
    client.fetch<EventsData | null>(eventsQuery, {}, fetchOptions),
    client.fetch<TestimonialsData | null>(
      testimonialsQuery,
      {},
      fetchOptions
    ),
    client.fetch<BusinessDetails | null>(
      businessDetailsQuery,
      {},
      fetchOptions
    ),
    client.fetch<StaffData | null>(staffQuery, {}, fetchOptions),
    client.fetch<FaqData | null>(faqQuery, {}, fetchOptions),
    client.fetch<AboutImages | null>(aboutQuery, {}, fetchOptions)
  ])

  return (
    <>
      <StructuredData businessDetails={businessDetails} />

      <SvgFilter />

      <Header businessDetails={businessDetails} />

      <main>
        <Hero bookingUrl={businessDetails?.bookingUrl} />

        <About images={about} />

        <Staff
          staff={staff?.members ?? []}
          groupImage={staff?.groupImage}
          groupImageAlt={staff?.groupImageAlt}
        />

        <Menu
          foodCategories={menu?.food?.categories ?? []}
          drinksCategories={menu?.drinks?.categories ?? []}
        />
        
        <Gallery
          images={gallery?.images ?? []}
          instagramUrl={businessDetails?.instagramUrl}
        />

        <Events
          weeklyEvents={events?.weeklyEvents}
          specialEvents={events?.specialEvents}
        />

        <Testimonials
          testimonials={testimonials?.reviews ?? []}
        />

        <Faq items={faq?.items ?? []} />

        <Location businessDetails={businessDetails} />
      </main>

      <Footer />

      {/* <ThemeSwitcher /> */}
    </>
  )
}
```

## ./src/components/Footer/Footer.tsx
```tsx
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} Convivio Wine Bar

        <span className={styles.separator}>·</span>

        <span className={styles.credit}>
          Website by{' '}
          <a
            href='https://devify.dev'
            target='_blank'
            rel='noopener noreferrer'
          >
            Devify
          </a>
        </span>
      </p>

      <a className={styles.studioLink} href='/studio'>
        Studio
      </a>
    </footer>
  )
}
```

## ./src/components/Footer/Footer.module.css
```css
.footer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem var(--inline-padding, 1.5rem) 2.75rem;
  background: var(--primary-black);
  color: var(--primary-white);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.04em;
}

.copyright {
  margin: 0;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  text-align: center;
  opacity: 0.65;
}

.separator {
  margin-inline: 0.6rem;
  opacity: 0.5;
}

.credit a,
.studioLink {
  color: inherit;
  text-decoration: none;
  transition: opacity 180ms ease;
}

.credit a:hover {
  opacity: 0.65;
}

.studioLink {
  position: absolute;
  right: 1.5rem;
  bottom: 0.75rem;
  font: inherit;
  letter-spacing: inherit;
  line-height: 1.4;
  opacity: 0.65;
}

.studioLink:hover {
  opacity: 1;
}

.credit a:focus-visible,
.studioLink:focus-visible {
  outline: 1px solid var(--primary-gold);
  outline-offset: 3px;
}

@media (max-width: 500px) {
  .footer {
    font-size: 0.7rem;
  }

  .separator {
    margin-inline: 0.4rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .credit a,
  .studioLink {
    transition: none;
  }
}

/* Convivio gradient background */

:global(html[data-theme='convivio']) .footer {
  background: var(--dark-background-gradient);
}
```

## ./src/components/Header/Header.tsx
```tsx
'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/Button/Button'
import type { BusinessDetails } from '@/types/businessDetails'
import styles from './Header.module.css'

const name = 'Convivio'

const baseMenuItems = [
  {
    href: '#about',
    label: 'ABOUT'
  },
  {
    href: '#menu',
    label: 'MENU'
  },
  {
    href: '#gallery',
    label: 'GALLERY'
  },
  {
    href: '#events',
    label: 'EVENTS'
  },
  {
    href: '#location',
    label: 'VISIT'
  }
]

type HeaderProps = {
  businessDetails?: BusinessDetails | null
}

export default function Header({
  businessDetails
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const menuItems = [
    ...baseMenuItems,
    ...(businessDetails?.giftCardUrl
      ? [
          {
            href: businessDetails.giftCardUrl,
            label: 'GIFT CARDS'
          }
        ]
      : [])
  ]

  function closeMenu() {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20)
      setIsMenuOpen(false)
    }

    function handleResize() {
      if (window.innerWidth > 950) {
        setIsMenuOpen(false)
      }
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  useEffect(() => {
    document.body.classList.toggle(
      'mobile-menu-open',
      isMenuOpen
    )

    return () => {
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isMenuOpen])

  return (
    <>
      <header
        className={`${styles.header} ${
          isScrolled ? styles.headerScrolled : ''
        } ${isMenuOpen ? styles.headerMenuOpen : ''}`}
      >
        <nav className={styles.nav} aria-label='Main navigation'>
          <a
            className={styles.name}
            href='#home'
            aria-label={`${name} home`}
            onClick={closeMenu}
          >
            {name}
          </a>

          <button
            type='button'
            className={`${styles.menuButton} ${
              isMenuOpen ? styles.menuButtonOpen : ''
            }`}
            aria-label={
              isMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={isMenuOpen}
            aria-controls='nav-menu'
            onClick={() =>
              setIsMenuOpen((current) => !current)
            }
          >
            <span
              className={`${styles.menuIcon} ${
                isMenuOpen
                  ? styles.closeIcon
                  : styles.openIcon
              }`}
              aria-hidden='true'
            ></span>
          </button>

          <div
            id='nav-menu'
            className={`${styles.menuContainer} ${
              isMenuOpen ? styles.menuContainerOpen : ''
            }`}
          >
            <div className={styles.menuItems}>
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {businessDetails?.bookingUrl && (
              <Button
                label='BOOK A TABLE'
                href={businessDetails.bookingUrl}
                target='_blank'
              />
            )}
          </div>
        </nav>
        
      </header>

      {isMenuOpen && (
        <button
          type='button'
          className={styles.backdrop}
          aria-label='Close navigation menu'
          onClick={closeMenu}
        ></button>
      )}
    </>
  )
}
```

## ./src/components/Header/Header.module.css
```css
:global(body.mobile-menu-open) section,
:global(body.mobile-menu-open) footer {
  filter: blur(8px);
}

.header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  background: transparent;
  transition:
    background 220ms ease,
    box-shadow 220ms ease;
}

.headerScrolled {
  position: fixed;
  background: rgba(248, 247, 244, 0.94);
  box-shadow: 0 0.25px 0 var(--accent-on-light-secondary);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.nav {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 4rem;
  align-items: center;
  justify-content: space-between;
  padding-inline: var(--inline-padding);
}

.nav a:focus-visible,
.menuButton:focus-visible {
  outline: 2px solid var(--primary-gold);
  outline-offset: 4px;
}

.name {
  color: var(--light-text);
  font-family: 'Aloja Extended', serif;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.03em;
  transition: color 220ms ease;
}

.headerScrolled .name {
  color: var(--primary-blue);
}

/* DESKTOP NAVIGATION */

.menuContainer {
  display: flex;
  align-items: center;
  gap: 2.25rem;
}

.menuItems {
  display: flex;
  align-items: center;
  gap: 2.25rem;
}

.menuItems > a {
  color: var(--light-text);
  font-size: 0.85rem;
  font-weight: 200;
  letter-spacing: 0.05em;
  transition:
    color 180ms ease,
    opacity 180ms ease;
}

.menuItems > a:hover {
  opacity: 0.65;
}

.headerScrolled .menuItems > a {
  color: var(--primary-blue);
}

.headerScrolled .menuContainer > a,
.headerMenuOpen .menuContainer > a {
  border-width: 1px;
  border-color: var(--accent-on-light-secondary);
  color: var(--accent-on-light-secondary);
  transition:
    background 180ms ease,
    border-color 180ms ease,
    color 180ms ease;
}

.headerScrolled .menuContainer > a {
  background: transparent;
}

.headerMenuOpen .menuContainer > a {
  background: var(--light-background);
}

.headerScrolled .menuContainer > a:hover,
.headerMenuOpen .menuContainer > a:hover {
  border-color: var(--primary-blue);
  background: var(--primary-blue);
  color: var(--light-text);
  opacity: 1;
}

/* MOBILE MENU BUTTON */

.menuButton {
  display: none;
  width: 3rem;
  height: 3rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--light-text);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: color 180ms ease;
}

.headerScrolled .menuButton {
  color: var(--primary-blue);
}

.menuButtonOpen {
  color: var(--primary-blue);
}

.menuIcon {
  display: block;
  width: 2rem;
  height: 2rem;
  background: currentColor;
}

.openIcon {
  mask: url('/icons/menu.svg') center / contain no-repeat;
  -webkit-mask: url('/icons/menu.svg') center / contain no-repeat;
}

.closeIcon {
  mask: url('/icons/close.svg') center / contain no-repeat;
  -webkit-mask: url('/icons/close.svg') center / contain no-repeat;
}

/* BACKDROP */

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 90;
  padding: 0;
  border: 0;
  background: rgba(22, 18, 14, 0.15);
  cursor: default;
}

/* MOBILE */

@media (max-width: 950px) {
  .name {
    font-size: 1.65rem;
  }

  .menuButton {
    display: flex;
  }

  .menuContainer {
    position: absolute;
    top: calc(100% + 0.75rem);
    left: 50%;
    z-index: 110;
    display: flex;
    width: calc(100% - 2rem);
    max-width: 32rem;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid rgba(40, 51, 76, 0.12);
    border-radius: 0.75rem;
    background: rgba(248, 247, 244, 0.97);
    box-shadow:
      0 1rem 3rem rgba(22, 18, 14, 0.14),
      0 0.25rem 0.75rem rgba(22, 18, 14, 0.08);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translate(-50%, -0.5rem);
    transition:
      opacity 180ms ease,
      transform 180ms ease,
      visibility 180ms ease;
  }

  .menuContainerOpen {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translate(-50%, 0);
  }

  .menuItems {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }

  .menuItems > a {
    padding: 0.9rem 1rem;
    border-bottom: 1px solid rgba(40, 51, 76, 0.08);
    color: var(--primary-blue);
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.08em;
  }

  .menuItems > a:last-child {
    border-bottom: 0;
  }

  .menuItems > a:hover {
    background: rgba(40, 51, 76, 0.04);
    opacity: 1;
  }

  .menuContainer > a {
    width: 100%;
    min-height: 3rem;
    border-color: var(--primary-blue);
    color: var(--primary-blue);
  }
}

@media (max-width: 950px) {
  .header .nav {
    min-height: 4.5rem;
    height: auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-block: 0.75rem;
  }

  .header .menuButtonOpen {
    color: var(--light-text);
  }

  .headerScrolled .menuButtonOpen {
    border-radius: 0.25rem;
    background: var(--primary-blue);
  }
}

:global(html[data-theme='convivio']) .headerScrolled {
  background: var(--light-background-gradient);
}

@media (max-width: 950px) {
  :global(html[data-theme='convivio']) .menuContainer {
    background: var(--light-background-gradient);
  }

  :global(html[data-theme='convivio']) .header .menuContainer > a {
    border-color: var(--premium-purple);
    background: transparent;
    color: var(--premium-purple);
  }

  :global(html[data-theme='convivio']) .header .menuContainer > a:hover {
    border-color: var(--premium-purple);
    background: var(--premium-purple);
    color: var(--light-text);
    opacity: 1;
  }

  :global(html[data-theme='convivio']) .header .menuContainer > a:focus-visible {
    outline-color: var(--premium-purple);
  }
}

```