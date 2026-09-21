import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'cta' | 'ctaLight' | 'ctaLarge'

type ButtonProps = {
  label: string
  href: string
  variant?: ButtonVariant
  target?: '_self' | '_blank'
}

export default function Button({
  label,
  href,
  variant = 'primary',
  target = '_self'
}: ButtonProps) {
  return (
    <a
      className={`${styles.button} ${styles[variant]}`}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    >
      {label}
    </a>
  )
}