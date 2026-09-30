import Navbar from '../sections/home/Navbar'
import Hero from '../sections/home/Hero'
import LogoMarquee from '../sections/home/LogoMarquee'
import FeaturedCategories from '../sections/home/FeaturedCategories'
import CoursesSection from '../sections/home/CoursesSection'
import ExploreCategoriesSection from '../sections/home/ExploreCategoriesSection'
import StatsSection from '../sections/home/StatsSection'

/**
 * HomePage — ByteSpace landing page.
 * Sections are added here as each task is completed.
 */
const HomePage = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <LogoMarquee />
      <FeaturedCategories />
      <CoursesSection />
      <ExploreCategoriesSection />
      <StatsSection />
      {/* T9 Footer */}
    </main>
  </>
)

export default HomePage
