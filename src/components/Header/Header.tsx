'use client'

import Image from 'next/image'
import { useState } from 'react'
import Button from '@/components/Button/Button'
import styles from './Header.module.css'

const name = 'Convivio'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
      href: '#location',
      label: 'VISIT'
    },
    {
      href: 'https://www.convivioperth.com.au/s/gift-cards',
      label: 'GIFT CARDS'
    },
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

          <Button label='BOOK A TABLE' href='https://bookings.nowbookit.com/?accountid=d2961a38-34a5-4012-8856-aebf1af4bdee&venueid=11218&theme=dark&colors=hex,37474f' />

        </div>

        <button
          type='button'
          className={styles.menuButton}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls='nav-menu'
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <Image
            className={styles.menuIcon}
            src={isMenuOpen ? '/icons/close.svg' : '/icons/menu.svg'}
            alt=''
            width={32}
            height={32}
            aria-hidden='true'
          />
        </button>
      </nav>
    </header>
  )
}