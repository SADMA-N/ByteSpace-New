/**
 * LogoMarquee
 *
 * Horizontally scrolling strip of partner logos displayed below the Hero.
 *
 * Figma spec:
 *   - Frame #1:1794 dimensions: 1440x202px
 *   - Background: Shuttle Gray/50 (#F5F5F6)
 *   - Logo row #1:1708: native logo height ~41-42px, gap: 72px (mx-9 = 36px each side)
 *   - Height at desktop: 202px (lg:h-[202px] flex flex-col justify-center)
 *
 * Assets: five partner SVG logos from src/assets/logos/ confirmed in T1.
 *
 * Animation: two copies of the five logos concatenated into one flex row.
 * The CSS animation translates the track by -50% of its total width, which
 * equals exactly one copy's width, creating a seamless infinite loop.
 *
 * The animate-marquee utility maps to --animate-marquee defined in globals.css.
 * prefers-reduced-motion: animation is paused via globals.css override.
 */

import logo1 from '../../assets/logos/partner-logo-1.svg'
import logo2 from '../../assets/logos/partner-logo-2.svg'
import logo3 from '../../assets/logos/partner-logo-3.svg'
import logo4 from '../../assets/logos/partner-logo-4.svg'
import logo5 from '../../assets/logos/partner-logo-5.svg'

const PARTNER_LOGOS = [logo1, logo2, logo3, logo4, logo5]

const LogoMarquee = () => (
  <section
    aria-label="Partner logos"
    className="bg-shuttle-50 min-h-[202px] lg:h-[202px] flex flex-col justify-center py-8 lg:py-0 overflow-hidden"
  >
    <p className="font-body text-body-s text-shuttle-400 text-center mb-4">
      Trusted by professionals from
    </p>
    {/*
     * The outer div clips the animated track horizontally.
     * The inner div (w-max) is wide enough to hold both copies side by side.
     */}
    <div className="overflow-hidden" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-10 lg:h-[42px] w-auto shrink-0 mx-8 lg:mx-9"
          />
        ))}
      </div>
    </div>
  </section>
)

export default LogoMarquee
