/**
 * StarRating
 *
 * Used on the Home page:
 *   - Course card: rating 4.5, size sm, lime filled stars
 *   - Hero "Happy Students" card: rating 4.5, size sm, lime filled stars
 *
 * Stars are rendered as inline SVG paths.
 * Fill colors use Tailwind fill-* utilities (fill-lime-400, fill-shuttle-200).
 *
 * Half-star: two overlaid SVG paths — empty star base + filled star
 * clipped to left 50% via SVG clipPath.
 *
 * Rounding:
 *   fraction >= 0.5 → half star
 *   fraction <  0.5 → floor (no half star)
 *   4.5 → 4 full + 1 half   |   4.2 → 4 full + 1 empty   |   3.5 → 3 full + 1 half + 1 empty
 *
 * Accessibility: aria-label on wrapper; all stars are aria-hidden.
 */

export interface StarRatingProps {
  /** Numeric rating between 0 and 5 */
  rating: number
  /** Total review count, shown in parentheses when provided */
  count?: number
  showCount?: boolean
  /** sm = 16px stars, md = 20px stars */
  size?: 'sm' | 'md'
}

const TOTAL_STARS = 5

const STAR_PATH =
  'M12 2L14.9 9.26L22 10.27L17 15.14L18.18 22.02L12 18.77L5.82 22.02L7 15.14L2 10.27L9.1 9.26L12 2Z'

const HALF_CLIP_ID = 'sr-half-clip'

interface StarIconProps {
  type: 'filled' | 'half' | 'empty'
  px: number
}

const StarIcon = ({ type, px }: StarIconProps) => {
  if (type === 'half') {
    return (
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={HALF_CLIP_ID}>
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
        </defs>
        {/* Empty star base */}
        <path d={STAR_PATH} className="fill-shuttle-200" />
        {/* Filled star clipped to left 50% */}
        <path d={STAR_PATH} className="fill-lime-400" clipPath={`url(#${HALF_CLIP_ID})`} />
      </svg>
    )
  }

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d={STAR_PATH}
        className={type === 'filled' ? 'fill-lime-400' : 'fill-shuttle-200'}
      />
    </svg>
  )
}

const StarRating = ({
  rating,
  count,
  showCount = false,
  size = 'sm',
}: StarRatingProps) => {
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5
  const emptyStars = TOTAL_STARS - fullStars - (hasHalf ? 1 : 0)

  const label =
    count !== undefined
      ? `${rating} out of ${TOTAL_STARS} stars, ${count} reviews`
      : `${rating} out of ${TOTAL_STARS} stars`

  const px = size === 'sm' ? 16 : 20

  const valueClass = size === 'sm'
    ? 'font-body font-medium text-label-m text-shuttle-950 leading-none'
    : 'font-body font-medium text-label-l text-shuttle-950 leading-none'

  const countClass = size === 'sm'
    ? 'font-body font-normal text-body-xs text-shuttle-400'
    : 'font-body font-normal text-body-s text-shuttle-400'

  return (
    <div className="inline-flex items-center gap-1" aria-label={label}>
      <span className={valueClass}>{rating}</span>
      <span className="inline-flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: fullStars }, (_, i) => (
          <StarIcon key={`f${i}`} type="filled" px={px} />
        ))}
        {hasHalf && <StarIcon key="half" type="half" px={px} />}
        {Array.from({ length: emptyStars }, (_, i) => (
          <StarIcon key={`e${i}`} type="empty" px={px} />
        ))}
      </span>
      {showCount && count !== undefined && (
        <span className={countClass}>({count})</span>
      )}
    </div>
  )
}

export default StarRating
