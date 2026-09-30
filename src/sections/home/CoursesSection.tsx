/**
 * CoursesSection
 *
 * Displays courses with Figma-confirmed heading, subtitle, and 3-row category tabs.
 *
 * Figma spec:
 *   - Heading: "Discover Your Passion, Build Your Skills" (Heading M, #11:65)
 *   - Subtitle: "At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields, from technology to the arts, and make a difference in your career and life." (Body L, #11:64)
 *   - Spacing: 64px vertical offset between heading and tab cluster (mb-16)
 *   - Tab cluster: 3 rows with 18 categories + "+ More" button (#21:33, #21:56, #21:63)
 *   - Course grid: 3 columns with 40px gap at desktop (gap-6 lg:gap-10)
 *   - Container: 1200px max content width (1440px canvas with 120px desktop padding)
 */

import { useState } from 'react'

import { CategoryPill, SectionLabel } from '../../components/ui'
import CourseCard from '../../components/ui/CourseCard'
import { COURSES } from '../../data/courses'

/** 3-row category tab structure from Figma frames #21:33, #21:56, #21:63 */
const TAB_ROWS = [
  [
    'Featured',
    'Music',
    'Drawing & Painting',
    'Marketing',
    'Animation',
    'Social Media',
    'UI/UX Design',
    'Creative Marketing',
  ],
  [
    'Digital Illustration',
    'Film & Video',
    'Crafts',
    'Freelance & Entrepreneurship',
    'Graphic Design',
    'Photography',
  ],
  [
    'Productivity',
    'Web Development',
    'Data Science',
    'Cooking',
  ],
] as const

/** Map subcategory tabs to available mock course categories */
const CATEGORY_MAP: Record<string, string> = {
  'Featured': 'All',
  'UI/UX Design': 'Design',
  'Graphic Design': 'Design',
  'Drawing & Painting': 'Design',
  'Web Development': 'Development',
  'Data Science': 'Development',
  'Marketing': 'Marketing',
  'Social Media': 'Marketing',
  'Creative Marketing': 'Marketing',
  'Photography': 'Photography',
  'Film & Video': 'Photography',
  'Freelance & Entrepreneurship': 'Business',
}

const CoursesSection = () => {
  const [activeTab, setActiveTab] = useState<string>('Featured')

  const targetCategory = CATEGORY_MAP[activeTab] || activeTab
  const visibleCourses =
    targetCategory === 'All'
      ? COURSES
      : COURSES.filter(course => course.category === targetCategory)

  return (
    <section aria-labelledby="courses-heading" className="bg-white py-20">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-12 lg:px-[120px]">
        {/* Section header with Figma-confirmed heading and subtitle */}
        <div className="flex flex-col items-center gap-4 text-center max-w-[588px] mx-auto mb-16">
          <SectionLabel text="Featured Courses" />
          <h2
            id="courses-heading"
            className="font-heading font-semibold text-heading-m text-shuttle-950 leading-tight"
          >
            Discover Your Passion, Build Your Skills
          </h2>
          <p className="font-body text-body-l text-shuttle-400 leading-relaxed">
            At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields, from technology to the arts, and make a difference in your career and life.
          </p>
        </div>

        {/*
         * 3-row category tab cluster from Figma.
         * Centered on desktop; horizontally scrollable per-row on mobile.
         */}
        <div
          className="flex flex-col items-center gap-4 mb-16 w-full"
          role="tablist"
          aria-label="Filter courses by category"
        >
          {/* Row 1 */}
          <div className="flex items-center gap-3 overflow-x-auto max-w-full pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden justify-start md:justify-center [&>*]:shrink-0">
            {TAB_ROWS[0].map(tab => (
              <CategoryPill
                key={tab}
                label={tab}
                isActive={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex items-center gap-3 overflow-x-auto max-w-full pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden justify-start md:justify-center [&>*]:shrink-0">
            {TAB_ROWS[1].map(tab => (
              <CategoryPill
                key={tab}
                label={tab}
                isActive={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </div>

          {/* Row 3 with + More button per Figma node #21:73 */}
          <div className="flex items-center gap-3 overflow-x-auto max-w-full pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden justify-start md:justify-center [&>*]:shrink-0">
            {TAB_ROWS[2].map(tab => (
              <CategoryPill
                key={tab}
                label={tab}
                isActive={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              />
            ))}
            <button
              type="button"
              className="font-body text-label-m font-medium text-persian-blue px-3 py-2 hover:underline cursor-pointer shrink-0"
              aria-label="View more categories"
            >
              + More
            </button>
          </div>
        </div>

        {/* Course card grid with 40px gap at desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {visibleCourses.length > 0 ? (
            visibleCourses.map(course => (
              <CourseCard key={course.id} {...course} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-shuttle-400 font-body text-body-m">
              No courses currently listed under {activeTab}. Explore our other categories above!
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CoursesSection
