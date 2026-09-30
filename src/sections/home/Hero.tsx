import Button from '../../components/ui/Button'
import AvatarStack from '../../components/ui/AvatarStack'
import StarRating from '../../components/ui/StarRating'
import { HERO_ORNAMENTS } from '../../data/heroOrnaments'

import bgGridSrc from '../../assets/icons/icon-hero-bg-grid.svg'
import heroPhotoSrc from '../../assets/images/hero-photo.webp'

import avatar1 from '../../assets/avatars/avatar-1.svg'
import avatar2 from '../../assets/avatars/avatar-2.svg'
import avatar3 from '../../assets/avatars/avatar-3.svg'
import avatar4 from '../../assets/avatars/avatar-4.svg'
import avatar5 from '../../assets/avatars/avatar-5.svg'
import avatar6 from '../../assets/avatars/avatar-6.svg'
import avatar7 from '../../assets/avatars/avatar-7.svg'

/**
 * Hero
 *
 * Figma: Hero_Frame #1:1695, 1440x1024px, Persian Blue background.
 * Navbar is a separate sticky <header> above this section.
 *
 * Layer stack (lowest → highest):
 *   z-0   Background grid (absolute inset-0, pointer-events-none)
 *   z-[1] Ornaments (absolute inset-0, lg+ only, pointer-events-none)
 *   z-[2] Hero photo (desktop, absolute, pointer-events-none for overlap zone)
 *   z-10  Text content, search form, float cards
 *
 * Desktop (lg+, ≥1024px):
 *   - Section: lg:min-h-[960px]. Figma frame = 1024px minus 120px navbar = 904px.
 *     Extra 56px provides room for photo bottom with top-[440px] positioning.
 *   - Heading: max-w-[935px], flows in the left portion of the content column.
 *   - Photo: absolute, top-[440px] left-[30%] — starts ~30px below form bottom.
 *     In Figma the photo top (section-y=392px) overlaps the form bottom by ~30px,
 *     resolved by z-ordering. Our impl separates them with 30px gap for clarity.
 *     Photo at z-[2], content at z-10 → form/search always above photo.
 *   - Float cards: absolute, Figma-derived percentage positions, z-10.
 *   - Ornaments: absolute, lg+ only (hidden below lg), z-[1].
 *
 * Mobile/tablet (below lg):
 *   - Single column: heading, subtitle, search bar, photo, float cards in flow.
 *   - Ornaments hidden.
 *
 * Float cards (Figma: white fill, 16px radius, backdrop blur 10px):
 *   1. Learning Progress — "55%", role="progressbar", w-full progress bar
 *   2. Happy Students   — AvatarStack md (lime overflow) + StarRating 4.5 sm
 *   3. UI/UX Design     — "200 Courses • 1000+ Students" (confirmed Figma #46:126)
 *
 * Search bar (Figma #1:1773):
 *   - Solid white fill (#FFFFFF), 24px radius, inline SVG magnifying glass
 *   - icon-search.svg was incorrect (shopping bag path) and has been removed
 *
 * Responsive deviations recorded:
 *   - Photo top-[440px] vs Figma 392px: 48px lower to create clear gap below form
 *   - Section lg:min-h-[960px] vs Figma 904px: extra height to reduce photo clip
 *   - Photo clips ~21px at section bottom (Figma clips ~29px) — overflow-hidden
 *   - Sphere-2 position unknown; placed at right-0 top-[22%] (upper-right non-content)
 *   - Ornaments shown only at lg+ (not md) to avoid 768px heading overlap
 *   - Mobile float cards: 2-col at sm (640px+), 1-col below sm (not 3-col)
 */

const HAPPY_STUDENTS_AVATARS = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7]

/* ─── Float card sub-components ──────────────────────────────────────────── */

const cardBase = 'bg-white rounded-card shadow-float p-4 flex flex-col gap-2 min-w-0'

const LearningProgressCard = () => (
  <div className={cardBase}>
    <p className="font-body text-label-s font-medium text-shuttle-950">
      Learning Progress
    </p>
    <p className="font-heading font-semibold text-[48px] leading-tight tracking-[-0.01em] text-shuttle-950">
      55%
    </p>
    {/*
      Figma: 200x8px progress bar, borderRadius 24px.
      w-full so bar fills card content area at any card width.
      Inline style for the fill % is the only valid approach (dynamic value).
    */}
    <div
      role="progressbar"
      aria-valuenow={55}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Learning progress: 55%"
      className="relative w-full h-2 rounded-full bg-shuttle-100 overflow-hidden"
    >
      <div
        className="absolute inset-y-0 left-0 bg-lime-400 rounded-full"
        style={{ width: '55%' }}
      />
    </div>
  </div>
)

const HappyStudentsCard = () => (
  <div className={cardBase}>
    <div className="flex flex-col gap-1">
      <p className="font-body text-label-m font-medium text-shuttle-950">
        Happy Students
      </p>
      <StarRating rating={4.5} size="sm" />
    </div>
    <AvatarStack
      avatars={HAPPY_STUDENTS_AVATARS}
      maxShown={7}
      overflowLabel="2K+"
      size="md"
      overflowBg="lime"
    />
  </div>
)

const UIUXDesignCard = () => (
  /*
   * Figma #46:126: "UI/UX Design" + info row "200 Courses • 1000+ Students".
   * Confirmed by direct Figma node inspection — not a star-rating card.
   */
  <div className={cardBase}>
    <p className="font-body text-label-m font-medium text-shuttle-950">
      UI/UX Design
    </p>
    <div className="flex items-center gap-2 font-body text-body-xs text-shuttle-400">
      <span>200 Courses</span>
      <span aria-hidden="true">•</span>
      <span>1000+ Students</span>
    </div>
  </div>
)

/* ─── Hero ────────────────────────────────────────────────────────────────── */

const Hero = () => (
  <section
    aria-labelledby="hero-heading"
    className="relative bg-persian-blue overflow-hidden lg:min-h-[960px]"
  >
    {/* ── Layer 0: background grid ────────────────────────────────────────── */}
    <img
      src={bgGridSrc}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 z-0 w-full h-full object-cover pointer-events-none select-none"
    />

    {/* ── Layer 1: ornaments ──────────────────────────────────────────────── */}
    {/*
      Shown only at lg+ (≥1024px). Hidden below lg to avoid heading/subtitle
      overlap at 768px (tablet), where the section is not wide enough to keep
      ornaments out of content areas.

      z-[1]: above bg (z-0), behind all hero content (z-2 and z-10).
      Does NOT use negative z-index.
    */}
    <div
      className="hidden lg:block absolute inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    >
      {HERO_ORNAMENTS.map(({ id, src, width, height, desktopClasses }) => (
        <img
          key={id}
          src={src}
          alt=""
          width={width}
          height={height}
          className={`absolute ${desktopClasses}`}
          style={{ maxWidth: `${width}px` }}
        />
      ))}
    </div>

    {/* ── Layer 2: desktop hero photo ─────────────────────────────────────── */}
    {/*
      Figma: Image #1:1796 at x=431 (30% of 1440px), y=512 in Hero_Frame.
      In section coordinates (Hero_Frame y - 120px navbar): top=392px.

      Implementation uses top-[440px] instead of Figma's 392px:
        - Measured form bottom in section = 410px
        - top-[440px] gives 30px clear gap below the search form
        - Deviation from Figma (+48px) is intentional for legibility

      z-[2]: below content/form (z-10) so the form always appears on top
      in the 30px overlap zone between photo and form edges.

      Photo clips ~21px at section bottom (section min-h 960px, photo
      bottom = 440+541 = 981px). Figma also clips the photo (~29px).
      overflow-hidden on section handles the clip.

      Hidden below lg — mobile photo is in the content flow below.
    */}
    <img
      src={heroPhotoSrc}
      alt="Student learning online with ByteSpace courses"
      width={578}
      height={541}
      className="hidden lg:block absolute z-[2] top-[440px] left-[30%] w-[578px] h-[541px] object-cover rounded-card pointer-events-none"
    />

    {/* ── Layer 10: hero content ──────────────────────────────────────────── */}
    <div className="container relative z-10 pt-10 pb-16 lg:pt-[49px] lg:pb-16">

      {/* Heading, subtitle, search — in normal flow at all breakpoints */}
      <div className="flex flex-col gap-6 lg:gap-[60px]">

        <div className="flex flex-col gap-4 lg:gap-6">
          <h1
            id="hero-heading"
            className="font-heading font-semibold text-4xl md:text-6xl lg:text-[72px] leading-tight lg:leading-[1.2em] tracking-[-0.01em] text-white max-w-full lg:max-w-[935px]"
          >
            Get Access to Hundreds Courses Available
          </h1>
          <p className="font-body text-body-m md:text-body-l text-shuttle-100 max-w-[600px]">
            Unlock your creativity, gain valuable knowledge, and grow your
            business with our wide range of courses.
          </p>
        </div>

        {/* Search bar — solid white fill, accessible form */}
        <form
          role="search"
          className="flex flex-wrap gap-4 items-center"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Search for courses"
        >
          <label htmlFor="hero-search" className="sr-only">
            Search for courses
          </label>
          {/*
            Figma #1:1773: white fill (#FFFFFF), borderRadius 24px, padding 12px 24px.
            Inline SVG magnifying glass (shuttle-400). icon-search.svg was incorrect
            and has been deleted from the project.
          */}
          <div className="flex items-center gap-2 bg-white rounded-control px-6 py-3 flex-1 min-w-0 max-w-full lg:max-w-[461px]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="shrink-0"
            >
              <circle cx="11" cy="11" r="7" stroke="#82868E" strokeWidth="2" strokeLinecap="round" />
              <path d="M16.5 16.5L21 21" stroke="#82868E" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              id="hero-search"
              type="search"
              placeholder="Search for courses..."
              className="bg-transparent text-shuttle-950 placeholder:text-shuttle-400 font-body text-body-m outline-none min-w-0 w-full"
            />
          </div>
          <Button type="submit" variant="primary" size="md">
            Search
          </Button>
        </form>
      </div>

      {/* ── Mobile / tablet: photo + float cards (below lg only) ─────────── */}
      <div className="lg:hidden mt-10 flex flex-col gap-6">
        <img
          src={heroPhotoSrc}
          alt="Student learning online with ByteSpace courses"
          width={578}
          height={541}
          className="w-full max-w-[578px] mx-auto rounded-card object-cover"
        />
        {/*
          Float card grid — responsive:
            <640px  (mobile):  1 column
            640–1023px (sm–md): 2 columns — cards wide enough for their content
            ≥1024px (lg):     desktop absolute layout (this div is hidden)
          
          sm:grid-cols-3 was causing 768px overflow (cards ~234px wide but
          Happy Students needs ~280px+ for avatar row). Fixed to sm:grid-cols-2.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <HappyStudentsCard />
          <LearningProgressCard />
          <UIUXDesignCard />
        </div>
      </div>
    </div>

    {/* ── Layer 10: desktop float cards ───────────────────────────────────── */}
    {/*
      Positions from Figma (Hero_Frame coords → section coords, then %):
        Learning Progress #1:1797: x=842, section-y=531 → left=58.5%, top=55.4%
        Happy Students    #1:1821: x=328, section-y=717 → left=22.8%, top=74.7%
        UI/UX Design      #46:126: x=404, section-y=519 → left=28.1%, top=54.1%

      top-% is relative to the actual section height (min-h 960px on lg):
        531/960=55.3%, 717/960=74.7%, 519/960=54.1%

      z-10: above photo (z-[2]) and ornaments (z-[1]).
    */}
    <div className="hidden lg:block z-10">
      <div className="absolute z-10 left-[58.5%] top-[55%]">
        <LearningProgressCard />
      </div>
      <div className="absolute z-10 left-[22.8%] top-[74%]">
        <HappyStudentsCard />
      </div>
      <div className="absolute z-10 left-[28%] top-[54%]">
        <UIUXDesignCard />
      </div>
    </div>
  </section>
)

export default Hero
