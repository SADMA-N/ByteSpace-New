import type { ButtonHTMLAttributes } from 'react'

/**
 * Button
 *
 * Variants in use on the Home page:
 *   primary     — Electric Lime fill (#D4FB20), dark text
 *                 Hero search, Footer subscribe
 *   primary-alt — Lime-green-alt fill (#C1E338), dark text
 *                 Featured Categories "View More"
 *
 * Sizes:
 *   sm — 12px 24px padding  (Footer)
 *   md — 14px 28px padding  (Hero, Categories)
 */

export type ButtonVariant = 'primary' | 'primary-alt'
export type ButtonSize = 'sm' | 'md'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  'primary':     'bg-lime-400 text-shuttle-950',
  'primary-alt': 'bg-lime-green-alt text-shuttle-950',
}

const sizeClasses: Record<ButtonSize, string> = {
  'sm': 'text-label-m px-6 py-3',
  'md': 'text-label-l px-7 py-[14px]',
}

const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  type = 'button',
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center gap-2',
        'rounded-control border-0',
        'font-body font-medium leading-tight',
        'cursor-pointer whitespace-nowrap',
        'transition-all duration-150',
        'hover:brightness-95 active:brightness-90',
        'focus-visible:outline focus-visible:outline-2',
        'focus-visible:outline-persian-blue focus-visible:outline-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
