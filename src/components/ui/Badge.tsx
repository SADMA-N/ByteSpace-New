import type { ReactNode } from 'react'

/**
 * Badge
 *
 * Used on the Home page:
 *   gray — course card level indicator (Beginner / Intermediate / Advanced)
 *          Shuttle Gray/50 bg, Shuttle Gray/700 text, optional left icon
 *
 * Figma: padding 6px 12px, border-radius 24px, Label XS (12px), icon 16x16.
 */

export interface BadgeProps {
  label: string
  /** Left icon — pass an <img> or inline SVG. Wrap it in aria-hidden. */
  icon?: ReactNode
  className?: string
}

const Badge = ({ label, icon, className = '' }: BadgeProps) => {
  return (
    <span
      className={[
        'inline-flex items-center gap-1',
        'bg-shuttle-50 text-shuttle-700',
        'rounded-control px-3 py-1.5',
        'font-body text-label-xs font-medium leading-tight',
        'whitespace-nowrap',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {icon && (
        <span className="inline-flex items-center shrink-0 [&_img]:w-4 [&_img]:h-4 [&_svg]:w-4 [&_svg]:h-4" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{label}</span>
    </span>
  )
}

export default Badge
