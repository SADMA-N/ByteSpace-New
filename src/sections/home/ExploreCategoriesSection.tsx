/**
 * ExploreCategoriesSection
 *
 * "Explore Diverse Learning Paths at Bytespace" section positioned
 * between CoursesSection and StatsSection.
 *
 * Figma spec:
 *   - Heading node #34:685: "Explore Diverse Learning Paths at Bytespace" (Heading S)
 *   - Subtitle node #34:686: "At Bytespace, we believe in empowering individuals..." (Body L)
 *   - Cards frame #34:725: 6 category cards, 3 columns, 40px desktop gap (lg:gap-10)
 *   - Card template EL-1c0c5924: rounded-[24px], 1px Shuttle Gray/200 border, bg-white
 *   - Icon badge: Electric Lime (#D4FB20) circle
 */

import iconDesign from '../../assets/icons/icon-category-design.svg'
import iconDev from '../../assets/icons/icon-category-dev.svg'
import iconIt from '../../assets/icons/icon-category-it.svg'
import iconBusiness from '../../assets/icons/icon-category-business.svg'
import iconMarketing from '../../assets/icons/icon-category-marketing.svg'
import iconPhotography from '../../assets/icons/icon-category-photography.svg'

interface LearningPath {
  id: string
  title: string
  description: string
  coursesCount: number
  icon: string
}

const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'design',
    title: 'Design',
    description: 'Master UI/UX design, visual communication, design systems, and creative tools from industry leaders.',
    coursesCount: 85,
    icon: iconDesign,
  },
  {
    id: 'development',
    title: 'Development',
    description: 'Build modern responsive web applications, mobile apps, and full-stack software from foundations to advanced.',
    coursesCount: 200,
    icon: iconDev,
  },
  {
    id: 'it-software',
    title: 'IT & Software',
    description: 'Explore cloud infrastructure, cybersecurity, system administration, and modern enterprise software skills.',
    coursesCount: 95,
    icon: iconIt,
  },
  {
    id: 'business',
    title: 'Business',
    description: 'Develop executive strategy, project management, financial acumen, and high-impact entrepreneurial leadership.',
    coursesCount: 120,
    icon: iconBusiness,
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description: 'Grow brands through data-driven digital marketing, content strategy, paid acquisition, and growth analytics.',
    coursesCount: 70,
    icon: iconMarketing,
  },
  {
    id: 'photography',
    title: 'Photography',
    description: 'Capture compelling visual stories with masterclasses in studio lighting, framing, composition, and editing.',
    coursesCount: 45,
    icon: iconPhotography,
  },
]

const ExploreCategoriesSection = () => {
  return (
    <section aria-labelledby="explore-paths-heading" className="bg-white py-20">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-12 lg:px-[120px]">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 text-center max-w-[780px] mx-auto mb-14">
          <h2
            id="explore-paths-heading"
            className="font-heading font-semibold text-heading-s text-shuttle-950 leading-tight"
          >
            Explore Diverse Learning Paths at Bytespace
          </h2>
          <p className="font-body text-body-l text-shuttle-400 leading-relaxed">
            At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of courses spans various fields, ensuring there&apos;s something for everyone. Unleash your potential and explore our carefully curated categories.
          </p>
        </div>

        {/* 6 Category Cards Grid: 3 columns with 40px desktop gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {LEARNING_PATHS.map(path => (
            <article
              key={path.id}
              className="bg-white rounded-[24px] border border-shuttle-200 p-8 flex flex-col items-start text-left gap-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-card"
            >
              {/* Electric Lime Icon Circle */}
              <div
                className="w-14 h-14 rounded-full bg-lime-400 flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <img src={path.icon} alt="" className="w-7 h-7" />
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-heading font-semibold text-heading-xs text-shuttle-950 leading-tight">
                    {path.title}
                  </h3>
                  <span className="font-body text-body-xs text-shuttle-400 shrink-0">
                    {path.coursesCount} courses
                  </span>
                </div>
                <p className="font-body text-body-s text-shuttle-700 leading-relaxed">
                  {path.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 font-body text-label-s font-semibold text-persian-blue hover:underline cursor-pointer">
                  Explore Learning Path
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExploreCategoriesSection
