'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/Button/Button'
import styles from './Header.module.css'

const name = 'Convivio'

const menuItems = [
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
  },
  {
    href: 'https://www.convivioperth.com.au/s/gift-cards',
    label: 'GIFT CARDS'
  }
]

const bookingUrl =
  'https://bookings.nowbookit.com/?accountid=d2961a38-34a5-4012-8856-aebf1af4bdee&venueid=11218&theme=dark&colors=hex,37474f'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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
    document.body.classList.toggle('mobile-menu-open', isMenuOpen)

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

            <Button
              label='BOOK A TABLE'
              href={bookingUrl}
              target='_blank'
            />
          </div>

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
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span
              className={`${styles.menuIcon} ${
                isMenuOpen ? styles.closeIcon : styles.openIcon
              }`}
              aria-hidden='true'
            ></span>
          </button>
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