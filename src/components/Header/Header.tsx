'use client'

import { useState } from 'react'
import Button from '@/components/Button/Button'
import styles from './Header.module.css'

const name = 'Name'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    {
      href: '#home',
      label: 'Home'
    },
    {
      href: '#about',
      label: 'About'
    },
    {
      href: '#pricing',
      label: 'Pricing'
    },
    {
      href: '#gallery',
      label: 'Gallery'
    },
    {
      href: '#location',
      label: 'Location'
    },
    {
      href: '#contact',
      label: 'Contact'
    }
  ]

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className={styles.header}>
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
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </div>

          <Button label='CTA Button' href='https://www.example.com' />

        </div>

        <button
          type='button'
          className={styles.menuButton}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls='nav-menu'
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <img
            className={styles.menuIcon}
            src={isMenuOpen ? '/icons/close.svg' : '/icons/menu.svg'}
            alt=''
            aria-hidden='true'
          />
        </button>
      </nav>
    </header>
  )
}