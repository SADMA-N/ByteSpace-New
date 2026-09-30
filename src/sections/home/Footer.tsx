import { useState, type FormEvent } from 'react'
import LogoIcon from '../../components/icons/LogoIcon'
import { Button } from '../../components/ui'

/**
 * Footer
 *
 * Final section of the ByteSpace landing page.
 *
 * Figma spec:
 *   - Frame #34:1256 / #78:1555: 1440px canvas, height: 525px, background #FFFFFF
 *   - Top border #78:1211: 1px Shuttle Gray/200 (#CED0D3)
 *   - Content column #34:1257: 1200px max width, pt-[71px], vertical gap 130px on desktop
 *   - Footer_Nav #34:1258: 92px horizontal gap between brand/newsletter and directory links
 *   - Brand & Newsletter EL-705f10d1: 528px width
 *   - Link Directory EL-c309bf68: 580px width, 3 columns with 40px gap
 *   - Copyright Bar #34:1296 / EL-91644f66: 1200px width, 42px height, 1px divider
 *
 * Responsive behavior:
 *   - 1280px, 1366px, 1440px: Exact 1200px Figma proportions (528px + 92px + 580px)
 *   - 1024px to 1279px (1100px): Fluid shrink/reflow with side-by-side blocks
 *   - 768px to 1023px: Brand/newsletter stacks above 3-column link directory
 *   - 375px: Single column mobile stack, newsletter form vertical, 0px overflow
 */

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title?: string
  links: FooterLink[]
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Browse',
    links: [
      { label: 'Featured Courses', href: '#' },
      { label: 'Featured Categories', href: '#' },
      { label: 'Business', href: '#' },
      { label: 'IT', href: '#' },
      { label: 'Design', href: '#' },
    ],
  },
  {
    // Continuation column of Browse
    links: [
      { label: 'Development', href: '#' },
      { label: 'Marketing', href: '#' },
      { label: 'Photography', href: '#' },
      { label: 'Finance', href: '#' },
      { label: 'Sport', href: '#' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Become a Creator', href: '#' },
      { label: 'Affiliate Program', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Help', href: '#' },
      { label: 'About', href: '#' },
    ],
  },
]

const LEGAL_LINKS: FooterLink[] = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookies Settings', href: '#' },
]

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="w-full bg-white border-t border-shuttle-200">
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-12 lg:px-8 xl:px-0 pt-16 lg:pt-[71px] pb-10 xl:pb-[54px] flex flex-col gap-16 lg:gap-[100px] xl:gap-[130px]">
        {/* Upper Navigation Row: Brand + Newsletter (Left) & Link Directory (Right) */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-10 xl:gap-[92px]">
          {/* Left Block: Brand & Newsletter (Figma EL-705f10d1: 528px) */}
          <div className="w-full lg:flex-1 lg:max-w-[528px] xl:w-[528px] xl:flex-none flex flex-col gap-6 items-start text-left">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-[9px] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-persian-blue focus-visible:outline-offset-4 rounded-tag"
              aria-label="ByteSpace home"
            >
              <LogoIcon width={29} aria-hidden="true" />
              <span className="font-logo font-bold text-[24px] text-shuttle-950 leading-none select-none">
                ByteSpace
              </span>
            </a>

            {/* Tagline */}
            <p className="font-body text-body-s text-shuttle-950 leading-relaxed max-w-[528px]">
              Stay Up to date with our latest features and releases by joining our newsletter.
            </p>

            {/* Newsletter Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full"
              aria-label="Newsletter Subscription"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Enter your email
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 min-w-0 px-5 py-3 rounded-control border border-shuttle-200 bg-white font-body text-body-m text-shuttle-950 placeholder:text-shuttle-400 focus:outline-none focus:border-persian-blue transition-colors"
              />
              <Button variant="primary" size="sm" type="submit" className="shrink-0">
                Subscribe
              </Button>
            </form>

            {isSubscribed && (
              <p className="font-body text-body-xs text-persian-blue font-medium" role="status">
                Thank you for subscribing!
              </p>
            )}

            {/* Privacy Consent Notice */}
            <p className="font-body text-body-xs text-shuttle-950 leading-normal max-w-[504px]">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>

          {/* Right Block: Directory Link Columns (Figma EL-c309bf68: 580px) */}
          <nav
            aria-label="Footer Navigation"
            className="w-full lg:flex-1 lg:max-w-[580px] xl:w-[580px] xl:flex-none grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 xl:gap-10"
          >
            {FOOTER_COLUMNS.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col items-start text-left">
                {column.title ? (
                  <h3 className="font-body font-semibold text-body-m text-shuttle-950 mb-4 h-[26px] flex items-center">
                    {column.title}
                  </h3>
                ) : (
                  <div className="h-[26px] mb-4 hidden sm:block" aria-hidden="true" />
                )}
                <ul className="flex flex-col gap-4 w-full">
                  {column.links.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="font-body text-body-s text-shuttle-950 hover:text-persian-blue transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Copyright & Legal Bar (Figma #34:1296 / EL-91644f66) */}
        <div className="w-full border-t border-shuttle-200 pt-6">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 text-center sm:text-left">
            <p className="font-body text-body-xs text-shuttle-950">
              @ 2023 ByteSpace. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6 font-body text-body-xs text-shuttle-950">
              {LEGAL_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:underline hover:text-persian-blue transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
