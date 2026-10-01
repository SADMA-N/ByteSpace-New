import { useState, type InputHTMLAttributes } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function FormField({ label, error, id, type = 'text', className = '', ...props }: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-label-s font-body font-medium text-shuttle-800">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          id={id}
          type={inputType}
          className={`w-full h-12 px-4 rounded-control bg-shuttle-50/60 border ${
            error ? 'border-red-500 focus:ring-red-400/20' : 'border-shuttle-200 focus:border-shuttle-950 focus:ring-shuttle-950/10'
          } font-body text-body text-shuttle-950 placeholder:text-shuttle-400 transition-all duration-150 focus:outline-none focus:ring-2 ${
            isPassword ? 'pr-12' : ''
          } ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 p-1 text-shuttle-400 hover:text-shuttle-700 transition-colors focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <span className="text-label-s text-red-600 font-body transition-opacity duration-150">
          {error}
        </span>
      )}
    </div>
  )
}
