import { useState } from 'react'
import LogoIcon from '../../components/icons/LogoIcon'
import shoppingBagIcon from '../../assets/icons/icon-shopping-bag.svg'

/**
 * Navbar
 *
 * Figma: Header_Frame #1:1778, 1440x120px, Persian Blue background.
 * Sits at y=0 inside the Hero_Frame — visually part of the hero section.
 *
 * Desktop layout (md and up):
 *   Left   — Logo mark + "ByteSpace" wordmark (Clash Display Bold 24px)
 *   Center — Nav links: Home, Courses, Creators (Label M, gap 24px)
 *   Right  — Sign In, Join Us (text links) + shopping bag icon button (gap 24px)
 *
 * Mobile layout (below md):
 *   Left   — Logo mark + wordmark
 *   Right  — Hamburger toggle button
 *   Below  — Full-width dropdown menu panel (when open)
 *
 * Accessibility:
 *   - <header> landmark
 *   - <nav aria-label="Main navigation"> on desktop nav
 *   - <nav aria-label="Mobile navigation"> on mobile panel
 *   - Hamburger button: aria-expanded, aria-controls="mobile-menu"
 *   - Menu closes on any link click
 *   - Shopping bag: aria-label
 *   - Logo link: aria-label="ByteSpace home"
 */

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Creators', href: '/creators' },
]

const ACTION_LINKS = [
  { label: 'Sign In', href: '/signin' },
  { label: 'Join Us', href: '/join' },
]

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {isOpen ? (
      // X icon
      <>
        <line x1="5" y1="5" x2="19" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="19" y1="5" x2="5" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </>
    ) : (
      // Three bars
      <>
        <line x1="3" y1="7" x2="21" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="12" x2="21" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="17" x2="21" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </>
    )}
  </svg>
)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 bg-persian-blue">
      {/* Desktop / tablet bar */}
      <div className="container flex items-center justify-between min-h-[120px]">

        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-[9px] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400 focus-visible:outline-offset-4 rounded-tag"
          aria-label="ByteSpace home"
        >
          <LogoIcon width={29} aria-hidden="true" />
          <span className="font-logo font-bold text-[24px] text-white leading-none select-none">
            ByteSpace
          </span>
        </a>

        {/* Desktop center navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-body text-label-m text-white hover:text-lime-400 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400 focus-visible:outline-offset-2 rounded-tag"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-6">
          {ACTION_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-body text-body-m text-white hover:text-lime-400 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400 focus-visible:outline-offset-2 rounded-tag"
            >
              {label}
            </a>
          ))}
          <button
            type="button"
            aria-label="Shopping bag"
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400 focus-visible:outline-offset-2"
          >
            <img src={shoppingBagIcon} alt="" aria-hidden="true" className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-tag hover:bg-white/10 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400 focus-visible:outline-offset-2"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsOpen(prev => !prev)}
        >
          <HamburgerIcon isOpen={isOpen} />
        </button>
      </div>

      {/* Mobile navigation panel */}
      {isOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden border-t border-white/15 bg-persian-blue"
          aria-label="Mobile navigation"
        >
          <div className="container py-4 flex flex-col">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={closeMenu}
                className="font-body text-label-m text-white py-3 border-b border-white/10 last:border-b-0 hover:text-lime-400 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400 focus-visible:outline-offset-2"
              >
                {label}
              </a>
            ))}
            <div className="flex items-center gap-4 pt-4 mt-1">
              {ACTION_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  className="font-body text-body-m text-white hover:text-lime-400 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400 focus-visible:outline-offset-2"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navbar
