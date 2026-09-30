/**
 * CategoryPill
 *
 * Used on the Home page:
 *   Courses section tab bar — active (Electric Lime) and inactive (Shuttle Gray/50)
 *
 * Figma: padding 12px 16px, border-radius 24px, Label M (Satoshi 500 16px)
 */

export interface CategoryPillProps {
  label: string
  isActive?: boolean
  onClick?: () => void
}

const CategoryPill = ({ label, isActive = false, onClick }: CategoryPillProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={[
        'inline-flex items-center justify-center',
        'px-4 py-3 rounded-control border-0',
        'font-body text-label-m font-medium leading-tight',
        'cursor-pointer whitespace-nowrap',
        'transition-colors duration-150',
        'focus-visible:outline focus-visible:outline-2',
        'focus-visible:outline-persian-blue focus-visible:outline-offset-2',
        isActive
          ? 'bg-lime-400 text-shuttle-950'
          : 'bg-shuttle-50 text-shuttle-700 hover:bg-shuttle-100',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {label}
    </button>
  )
}

export default CategoryPill
