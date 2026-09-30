/**
 * SectionLabel
 *
 * Small coloured overline label above section headings.
 *
 * Used on the Home page:
 *   "Featured Categories" — Electric Violet/600 (#7F30F7)
 *
 * Figma: Label L, Satoshi Medium 18px, Electric Violet/600.
 */

export interface SectionLabelProps {
  text: string
  color?: 'violet'
}

const colorClasses = {
  violet: 'text-electric-violet-600',
}

const SectionLabel = ({ text, color = 'violet' }: SectionLabelProps) => {
  return (
    <span
      className={[
        'inline-block',
        'font-body text-label-l font-medium leading-tight',
        colorClasses[color],
      ].join(' ')}
    >
      {text}
    </span>
  )
}

export default SectionLabel
