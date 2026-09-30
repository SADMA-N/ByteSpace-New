import Navbar from '../sections/home/Navbar'
import Hero from '../sections/home/Hero'
import LogoMarquee from '../sections/home/LogoMarquee'
import FeaturedCategories from '../sections/home/FeaturedCategories'
import CoursesSection from '../sections/home/CoursesSection'

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
      {/* T8 Stats + Explore Learning Paths */}
      {/* T9 Footer */}
    </main>
  </>
)

export default HomePage
