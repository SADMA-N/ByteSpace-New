import businessIcon from '../assets/icons/icon-category-business.svg'
import designIcon from '../assets/icons/icon-category-design.svg'
import devIcon from '../assets/icons/icon-category-dev.svg'
import itIcon from '../assets/icons/icon-category-it.svg'
import marketingIcon from '../assets/icons/icon-category-marketing.svg'
import photographyIcon from '../assets/icons/icon-category-photography.svg'

export interface Category {
  id: string
  /** Display label shown on the card */
  label: string
  /** Imported SVG icon path */
  icon: string
  /** Course count shown below the label (inferred placeholder value) */
  courseCount: number
}

/**
 * Static category list for FeaturedCategories.
 * Course counts are inferred placeholders -- update when real data is available.
 */
export const CATEGORIES: Category[] = [
  { id: 'design',       label: 'Design',        icon: designIcon,      courseCount: 85  },
  { id: 'development',  label: 'Development',   icon: devIcon,         courseCount: 200 },
  { id: 'business',     label: 'Business',      icon: businessIcon,    courseCount: 120 },
  { id: 'marketing',    label: 'Marketing',     icon: marketingIcon,   courseCount: 70  },
  { id: 'it',           label: 'IT & Software', icon: itIcon,          courseCount: 95  },
  { id: 'photography',  label: 'Photography',   icon: photographyIcon, courseCount: 45  },
]
