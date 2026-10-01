import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  linkText: string
  linkTo: string
}

export function AuthLayout({ children, title, subtitle, linkText, linkTo }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-shuttle-50 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Brand logo header */}
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2.5 focus:outline-none" aria-label="ByteSpace Home">
          <div className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center">
            <span className="font-logo font-bold text-shuttle-950 text-xl">b</span>
          </div>
          <span className="font-logo font-bold text-shuttle-950 text-2xl tracking-tight">
            ByteSpace
          </span>
        </Link>
      </div>

      {/* Main auth card */}
      <div className="w-full max-w-[480px] bg-white rounded-feature shadow-card border border-shuttle-200/80 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-heading-s font-heading font-semibold text-shuttle-950">
            {title}
          </h1>
          <p className="mt-2 text-body text-shuttle-600 font-body">
            {subtitle}{' '}
            <Link
              to={linkTo}
              className="font-medium text-shuttle-950 underline underline-offset-4 hover:text-black transition-colors"
            >
              {linkText}
            </Link>
          </p>
        </div>

        {children}
      </div>

      {/* Footer copyright */}
      <div className="mt-8 text-center text-label-s text-shuttle-400 font-body">
        &copy; {new Date().getFullYear()} ByteSpace Inc. All rights reserved.
      </div>
    </div>
  )
}
