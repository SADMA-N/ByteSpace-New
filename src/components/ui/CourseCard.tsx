/**
 * CourseCard
 *
 * Reusable card component for displaying a single course.
 * Used in CoursesSection in a responsive 1/2/3-column grid.
 *
 * Design intent and layout are inferred (Figma API unavailable).
 * All prop types are explicit to make future Figma-driven adjustments easy.
 */

import Badge from './Badge'
import Button from './Button'
import StarRating from './StarRating'

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export interface CourseCardProps {
  title: string
  description: string
  level: CourseLevel
  rating: number
  reviewCount: number
  instructor: string
  price: string
  thumbnail: string
  /** Matches one of the CoursesSection tab labels */
  category: string
}

const CourseCard = ({
  title,
  description,
  level,
  rating,
  reviewCount,
  instructor,
  price,
  thumbnail,
}: CourseCardProps) => (
  <article className="bg-white rounded-[24px] border border-shuttle-200 shadow-card p-4 flex flex-col">
    {/* Thumbnail with Figma-confirmed 12px corner radius */}
    <div className="aspect-video overflow-hidden rounded-[12px] shrink-0 bg-shuttle-100">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Card body */}
    <div className="pt-4 flex flex-col gap-3 flex-1">
      {/* Level badge — self-start prevents flex-col stretch to full card width */}
      <Badge label={level} className="self-start" />

      {/* Title + description */}
      <div className="flex flex-col gap-1">
        <h3 className="font-heading font-semibold text-heading-xs text-shuttle-950 leading-tight line-clamp-2">
          {title}
        </h3>
        <p className="font-body text-body-s text-shuttle-700 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* Rating */}
      <StarRating rating={rating} count={reviewCount} showCount />

      {/* Instructor row — pushes to fill remaining space */}
      <div className="flex items-center gap-2 mt-auto">
        {/* Placeholder avatar circle (no instructor photo assets available) */}
        <div
          className="w-7 h-7 rounded-full bg-shuttle-100 shrink-0"
          aria-hidden="true"
        />
        <span className="font-body text-body-xs text-shuttle-700 truncate">
          {instructor}
        </span>
      </div>

      {/* Price + CTA */}
      <div className="flex items-center justify-between pt-3 border-t border-shuttle-100">
        <span className="font-body font-semibold text-label-m text-shuttle-950">
          {price}
        </span>
        <Button variant="primary" size="sm">
          Enroll
        </Button>
      </div>
    </div>
  </article>
)

export default CourseCard
