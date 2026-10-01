import { useState } from 'react'
import { Link } from 'react-router-dom'
import LogoIcon from '../../components/icons/LogoIcon'
import shoppingBagIcon from '../../assets/icons/icon-shopping-bag.svg'
import { useAuth } from '../../context/useAuth'

/**
 * Navbar
 *
 * Figma: Header_Frame #1:1778, 1440x120px, Persian Blue background.
 * Sits at y=0 inside the Hero_Frame — visually part of the hero section.
 *
 * Auth state integration (P1):
 *   - While isLoading: displays neutral placeholder to prevent layout shift.
 *   - When logged out: shows Sign In (/login) and Join Us (/register).
 *   - When logged in: displays avatar/initials, truncated user name, and Log out action.
 *   - Mobile menu reflects identical auth state.
 */

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/search' },
  { label: 'Creators', href: '/creators/cmup6dgw00009oapxel6h0aso' },
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
      <>
        <line x1="5" y1="5" x2="19" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="19" y1="5" x2="5" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </>
    ) : (
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
  const { user, isLoading, logout } = useAuth()

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 bg-persian-blue">
      {/* Desktop / tablet bar */}
      <div className="container flex items-center justify-between min-h-[120px]">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-[9px] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400 focus-visible:outline-offset-4 rounded-tag"
          aria-label="ByteSpace home"
        >
          <LogoIcon width={29} aria-hidden="true" />
          <span className="font-logo font-bold text-[24px] text-white leading-none select-none">
            ByteSpace
          </span>
        </Link>

        {/* Desktop center navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className="font-body text-label-m text-white hover:text-lime-400 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400 focus-visible:outline-offset-2 rounded-tag"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-6">
          {isLoading ? (
            // Neutral placeholder while loading auth state (Condition #7)
            <div className="w-28 h-8 rounded-control bg-white/10 animate-pulse" />
          ) : user ? (
            // Logged in state
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-lime-400 text-shuttle-950 font-bold text-xs flex items-center justify-center shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span
                  className="font-body text-body-m text-white font-medium truncate max-w-[120px]"
                  title={user.name}
                >
                  {user.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => void logout()}
                className="font-body text-label-s text-white/80 hover:text-white px-3 py-1.5 rounded-control border border-white/20 hover:border-white/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400"
              >
                Log out
              </button>
            </div>
          ) : (
            // Logged out state
            <>
              <Link
                to="/login"
                className="font-body text-body-m text-white hover:text-lime-400 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400 focus-visible:outline-offset-2 rounded-tag"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="font-body text-body-m text-white hover:text-lime-400 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400 focus-visible:outline-offset-2 rounded-tag"
              >
                Join Us
              </Link>
            </>
          )}

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
          onClick={() => setIsOpen((prev) => !prev)}
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
              <Link
                key={label}
                to={href}
                onClick={closeMenu}
                className="font-body text-label-m text-white py-3 border-b border-white/10 last:border-b-0 hover:text-lime-400 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400 focus-visible:outline-offset-2"
              >
                {label}
              </Link>
            ))}

            {isLoading ? (
              <div className="py-3">
                <div className="w-24 h-6 rounded-control bg-white/10 animate-pulse" />
              </div>
            ) : user ? (
              <div className="flex items-center justify-between pt-4 mt-1 border-t border-white/10">
                <div className="flex items-center gap-2.5">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-lime-400 text-shuttle-950 font-bold text-xs flex items-center justify-center shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="font-body text-body-m text-white font-medium truncate max-w-[150px]">
                    {user.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu()
                    void logout()
                  }}
                  className="font-body text-label-s text-white/80 hover:text-white px-3 py-1.5 rounded-control border border-white/20"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 pt-4 mt-1 border-t border-white/10">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="font-body text-body-m text-white hover:text-lime-400 transition-colors duration-150"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="font-body text-body-m text-white hover:text-lime-400 transition-colors duration-150"
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navbar
