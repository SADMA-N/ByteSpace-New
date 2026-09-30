import thumb1 from '../assets/images/course-thumb-1.webp'
import thumb2 from '../assets/images/course-thumb-2.webp'
import thumb3 from '../assets/images/course-thumb-3.webp'
import thumb4 from '../assets/images/course-thumb-4.webp'
import thumb5 from '../assets/images/course-thumb-5.webp'
import thumb6 from '../assets/images/course-thumb-6.webp'

/**
 * Course data used by CoursesSection and CourseCard.
 *
 * All copy (titles, descriptions, instructor names) and prices are inferred
 * placeholder values -- replace with real data when available.
 *
 * category must match one of the tab labels in CoursesSection:
 *   'Design' | 'Development' | 'Business' | 'Marketing' | 'Photography'
 */
export interface CourseData {
  id: string
  title: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  rating: number
  reviewCount: number
  instructor: string
  price: string
  thumbnail: string
  category: string
}

export const COURSES: CourseData[] = [
  {
    id: 'ux-design-fundamentals',
    title: 'UX Design Fundamentals',
    description: 'Learn the core principles of user experience design and start building intuitive digital products.',
    level: 'Beginner',
    rating: 4.5,
    reviewCount: 1240,
    instructor: 'Sarah Johnson',
    price: '$49',
    thumbnail: thumb1,
    category: 'Design',
  },
  {
    id: 'react-typescript-mastery',
    title: 'React & TypeScript Mastery',
    description: 'Build scalable web applications with React and TypeScript from the ground up.',
    level: 'Intermediate',
    rating: 4.8,
    reviewCount: 2850,
    instructor: 'Michael Chen',
    price: '$79',
    thumbnail: thumb2,
    category: 'Development',
  },
  {
    id: 'business-strategy-advanced',
    title: 'Advanced Business Strategy',
    description: 'Develop high-level strategic thinking to drive growth and transformation in any organisation.',
    level: 'Advanced',
    rating: 4.3,
    reviewCount: 980,
    instructor: 'Priya Sharma',
    price: '$89',
    thumbnail: thumb3,
    category: 'Business',
  },
  {
    id: 'digital-marketing-essentials',
    title: 'Digital Marketing Essentials',
    description: 'Master the fundamentals of SEO, social media, and content marketing to grow any brand online.',
    level: 'Beginner',
    rating: 4.6,
    reviewCount: 1580,
    instructor: 'James Rivera',
    price: '$39',
    thumbnail: thumb4,
    category: 'Marketing',
  },
  {
    id: 'ui-design-systems',
    title: 'Advanced UI Design Systems',
    description: 'Create and maintain scalable design systems used by product teams at modern companies.',
    level: 'Advanced',
    rating: 4.7,
    reviewCount: 760,
    instructor: 'Aisha Okafor',
    price: '$89',
    thumbnail: thumb5,
    category: 'Design',
  },
  {
    id: 'photography-fundamentals',
    title: 'Photography Fundamentals',
    description: 'Understand light, composition, and camera settings to capture stunning photographs.',
    level: 'Intermediate',
    rating: 4.4,
    reviewCount: 1120,
    instructor: 'Lena Fischer',
    price: '$34',
    thumbnail: thumb6,
    category: 'Photography',
  },
]
