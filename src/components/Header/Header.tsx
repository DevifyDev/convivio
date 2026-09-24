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