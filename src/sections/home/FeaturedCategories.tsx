/**
 * FeaturedCategories
 *
 * Grid of six category cards shown below LogoMarquee.
 *
 * Figma spec:
 *   - Category frame spacing: 40px gap (lg:gap-10)
 *   - Card styling: rounded-[24px] (border-radius: 24px), border border-shuttle-200 (1px Shuttle Gray/200)
 *   - Content width: 1200px max (1440px canvas with 120px desktop page padding)
 *   - View More button in heading row: variant="primary-alt" (#C1E338) per Figma node #11:26
 *
 * Responsive grid:
 *   375px   -> 2 columns  (grid-cols-2, gap-4)
 *   768px   -> 3 columns  (md:grid-cols-3, gap-6)
 *   ~1100px -> 3 columns  (md:grid-cols-3, gap-10, wide breakpoint not yet active)
 *   1440px  -> 6 columns  (wide:grid-cols-6, gap-10 = 40px, card width ~167px)
 */

import { CATEGORIES } from '../../data/categories'
import { Button, SectionLabel } from '../../components/ui'

const FeaturedCategories = () => (
  <section aria-labelledby="categories-heading" className="bg-shuttle-50 py-20">
    <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-12 lg:px-[120px]">
      {/* Section header with View More button per Figma node #11:22 */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div className="flex flex-col gap-3 text-left">
          <SectionLabel text="Featured Categories" />
          <h2
            id="categories-heading"
            className="font-heading font-semibold text-heading-m text-shuttle-950 leading-tight"
          >
            Browse Top Categories
          </h2>
        </div>
        <Button variant="primary-alt" size="md" className="self-start sm:self-auto shrink-0">
          View More
        </Button>
      </div>

      {/* Category card grid with 40px gap at desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 wide:grid-cols-6 gap-4 sm:gap-6 lg:gap-10">
        {CATEGORIES.map(cat => (
          <div
            key={cat.id}
            className="bg-white rounded-[24px] border border-shuttle-200 shadow-card py-8 px-4 flex flex-col items-center gap-3 text-center transition-transform duration-200 hover:-translate-y-1"
          >
            {/* Icon circle */}
            <div
              className="w-12 h-12 rounded-full bg-shuttle-50 flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <img src={cat.icon} alt="" className="w-6 h-6" />
            </div>

            {/* Label + course count */}
            <div className="flex flex-col gap-1">
              <span className="font-heading font-semibold text-label-m text-shuttle-950 leading-tight">
                {cat.label}
              </span>
              <span className="font-body text-body-xs text-shuttle-400">
                {cat.courseCount} courses
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default FeaturedCategories
