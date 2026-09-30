/**
 * StatsSection
 *
 * Displays two comprehensive feature rows below ExploreCategoriesSection:
 *   - Row 1: Platform impact statistics + visual showcase
 *   - Row 2: Creator dashboard visual (with 3 floating metric cards) + creator feature checklist
 *
 * Figma spec:
 *   - Frame #34:1159: background #FAFAFA (bg-off-white), 1200px max content container
 *   - Inner column #34:1160: gap 72px (gap-[72px])
 *   - Row 1 #34:1157: gap 63px on desktop (lg:gap-[63px])
 *   - Row 2 #34:1158: gap 79px on desktop (lg:gap-[79px])
 *   - Checkmark icon: src/assets/icons/icon-check-circle.svg
 *   - Real creator portrait: src/assets/images/stats-portrait.webp
 */

import { AvatarStack, Button, SectionLabel, StarRating } from '../../components/ui'
import iconCheckCircle from '../../assets/icons/icon-check-circle.svg'
import statsPortrait from '../../assets/images/stats-portrait.webp'
import heroPhoto from '../../assets/images/hero-photo.webp'
import sphere1 from '../../assets/images/ornaments/sphere-1.png'
import avatar1 from '../../assets/avatars/avatar-1.svg'
import avatar2 from '../../assets/avatars/avatar-2.svg'
import avatar3 from '../../assets/avatars/avatar-3.svg'
import avatar4 from '../../assets/avatars/avatar-4.svg'

const CREATOR_AVATARS = [avatar1, avatar2, avatar3, avatar4]

/** Documented placeholder copy for Row 2 creator feature checklist */
const CREATOR_FEATURES = [
  'Intuitive course builder with rich media support',
  'Real-time student engagement and revenue analytics',
  'Direct community interaction and messaging tools',
  'Automated certification and assessment workflows',
]

const StatsSection = () => {
  return (
    <section aria-label="Platform Statistics and Creator Tools" className="bg-off-white py-20 lg:py-28 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-12 lg:px-[120px]">
        <div className="flex flex-col gap-16 lg:gap-[72px]">
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           * ROW 1: Stats Content Left + Visual Showcase Right
           * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-[63px]">
            {/* Left: Text + Stats Counters */}
            <div className="flex-1 flex flex-col items-start gap-6 text-left">
              <SectionLabel text="Why Choose Us" />
              <h2 className="font-heading font-semibold text-heading-m text-shuttle-950 leading-tight">
                Your Path to Professional Growth and Success
              </h2>
              <p className="font-body text-body-l text-shuttle-700 leading-relaxed">
                Join thousands of ambitious learners who have advanced their careers, acquired in-demand digital competencies, and achieved their professional milestones with ByteSpace&apos;s industry-aligned curriculum.
              </p>

              {/* 3 Stats Counters */}
              <div className="grid grid-cols-3 gap-6 pt-4 w-full border-t border-shuttle-200">
                <div className="flex flex-col gap-1">
                  <span className="font-heading font-bold text-display-xs text-persian-blue leading-none">
                    12K
                  </span>
                  <span className="font-body text-body-s text-shuttle-600">
                    Active Students
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-heading font-bold text-persian-blue text-display-xs leading-none">
                    70+
                  </span>
                  <span className="font-body text-body-s text-shuttle-600">
                    Curated Courses
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-heading font-bold text-persian-blue text-display-xs leading-none">
                    16
                  </span>
                  <span className="font-body text-body-s text-shuttle-600">
                    Top Creators
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Visual Showcase with Decorative Elements */}
            <div className="flex-1 relative w-full max-w-[540px] lg:max-w-none flex justify-center">
              {/* Decorative Sphere Ornament */}
              <img
                src={sphere1}
                alt=""
                className="hidden lg:block absolute -top-10 -right-8 w-24 h-24 object-contain pointer-events-none z-0 opacity-80"
                aria-hidden="true"
              />

              {/* Main Showcase Image */}
              <div className="relative z-10 w-full max-w-[480px] rounded-[24px] overflow-hidden shadow-card border border-shuttle-200 bg-white">
                <img
                  src={heroPhoto}
                  alt="Student learning with ByteSpace"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-6 flex flex-col gap-2 bg-white">
                  <span className="font-body text-label-xs font-semibold text-persian-blue uppercase tracking-wider">
                    Featured Track
                  </span>
                  <h3 className="font-heading font-semibold text-heading-xs text-shuttle-950">
                    Full-Stack Digital Transformation
                  </h3>
                  <div className="pt-2 flex items-center justify-between">
                    <StarRating rating={4.9} count={320} showCount />
                    <span className="font-body text-body-xs text-shuttle-400">96% Positive</span>
                  </div>
                </div>
              </div>

              {/* Floating "Learning Progress" Card (Desktop only) */}
              <div className="hidden lg:flex absolute -bottom-6 -left-6 z-20 bg-white rounded-[16px] shadow-float border border-shuttle-100 p-4 items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center font-heading font-bold text-shuttle-950 text-label-s shrink-0">
                  92%
                </div>
                <div className="flex flex-col">
                  <span className="font-body text-label-s font-semibold text-shuttle-950">
                    Learning Progress
                  </span>
                  <span className="font-body text-body-xs text-shuttle-400">
                    34 of 38 lessons completed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           * ROW 2: Dashboard Visual Left + Creator Feature Right
           * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-[79px] pt-8 lg:pt-12 border-t border-shuttle-200">
            {/* Left: Dashboard Visual with 3 Floating Metric Cards */}
            <div className="flex-1 relative w-full max-w-[540px] lg:max-w-none flex justify-center">
              {/* Creator Portrait Base Image */}
              <div className="relative z-10 w-full max-w-[440px] rounded-[24px] overflow-hidden shadow-card border border-shuttle-200 bg-white">
                <img
                  src={statsPortrait}
                  alt="Creator using ByteSpace dashboard"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>

              {/* Metric Card 1: Total Revenue (Dark Persian Blue / Shuttle Gray Card) */}
              <div className="hidden lg:flex absolute -top-5 -left-4 z-20 bg-shuttle-950 text-white rounded-[16px] p-4 shadow-float border border-shuttle-800 flex-col gap-1 min-w-[170px]">
                <span className="font-body text-body-xs text-shuttle-300">
                  Total Revenue
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading font-bold text-heading-xs text-white">
                    $45.2K
                  </span>
                  <span className="font-body text-body-xs text-lime-400 font-medium">
                    +18%
                  </span>
                </div>
              </div>

              {/* Metric Card 2: Happy Students 2K+ */}
              <div className="hidden lg:flex absolute bottom-8 -left-6 z-20 bg-white rounded-[16px] shadow-float border border-shuttle-100 p-3.5 items-center gap-3">
                <AvatarStack
                  avatars={CREATOR_AVATARS}
                  maxShown={4}
                  overflowLabel="2K+"
                  size="sm"
                  overflowBg="lime"
                />
                <div className="flex flex-col pr-1">
                  <span className="font-body text-label-xs font-semibold text-shuttle-950">
                    Happy Students
                  </span>
                  <span className="font-body text-body-xs text-shuttle-400">
                    2,000+ Enrolled
                  </span>
                </div>
              </div>

              {/* Metric Card 3: Course Completion Rate */}
              <div className="hidden lg:flex absolute -bottom-5 -right-4 z-20 bg-white rounded-[16px] shadow-float border border-shuttle-100 p-4 items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-persian-blue flex items-center justify-center text-white shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-body text-label-xs font-semibold text-shuttle-950">
                    Course Completion
                  </span>
                  <span className="font-body text-body-xs text-persian-blue font-bold">
                    94% Average
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Feature Description & Checklist */}
            <div className="flex-1 flex flex-col items-start gap-6 text-left">
              <SectionLabel text="For Creators" />
              <h2 className="font-heading font-semibold text-heading-m text-shuttle-950 leading-tight">
                Create &amp; Manage Courses Easily.
              </h2>
              <p className="font-body text-body-l text-shuttle-700 leading-relaxed">
                Experience the collaboration of numerous creators and an expanding selection of courses. Publish your expertise on ByteSpace with modern authoring tools, direct audience engagement, and transparent monetization.
              </p>

              {/* Checklist with confirmed Persian Blue icon-check-circle.svg */}
              <ul className="flex flex-col gap-4 w-full pt-2" aria-label="Creator platform benefits">
                {CREATOR_FEATURES.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <img
                      src={iconCheckCircle}
                      alt=""
                      className="w-5 h-5 mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="font-body text-label-m font-medium text-shuttle-950">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Call to action */}
              <div className="pt-2">
                <Button variant="primary" size="md">
                  Start Teaching Today
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
