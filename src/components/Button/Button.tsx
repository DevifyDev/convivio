import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'cta' | 'ctaLarge'

type ButtonProps = {
  label: string
  href: string
  variant?: ButtonVariant
}

export default function Button({ label, href, variant = 'primary' }: ButtonProps) {
  return (
    <a className={`${styles.button} ${styles[variant]}`} href={href}>
      {label}
    </a>
  )
}