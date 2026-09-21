'use client'

import { useState } from 'react'
import styles from './ThemeSwitcher.module.css'

type Theme = 'premium' | 'convivio'

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('premium')

  function toggleTheme() {
    const nextTheme = theme === 'premium' ? 'convivio' : 'premium'

    document.documentElement.dataset.theme = nextTheme
    setTheme(nextTheme)
  }

  return (
    <button
      className={styles.switcher}
      type='button'
      onClick={toggleTheme}
      aria-label='Switch website theme'
    >
      Theme: {theme}
    </button>
  )
}