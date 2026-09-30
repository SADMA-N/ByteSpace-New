import Navbar from '../sections/home/Navbar'
import Hero from '../sections/home/Hero'
import LogoMarquee from '../sections/home/LogoMarquee'
import FeaturedCategories from '../sections/home/FeaturedCategories'
import CoursesSection from '../sections/home/CoursesSection'
import ExploreCategoriesSection from '../sections/home/ExploreCategoriesSection'
import StatsSection from '../sections/home/StatsSection'
import Footer from '../sections/home/Footer'

/**
 * HomePage — ByteSpace landing page.
 * Fully assembled Landing Page for Milestone 1.
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
    </main>
    <Footer />
  </>
)

export default HomePage
