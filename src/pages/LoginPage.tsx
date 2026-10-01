import { useState, useEffect, type FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthLayout } from '../components/auth/AuthLayout'
import { FormField } from '../components/auth/FormField'
import { SocialAuthButtons } from '../components/auth/SocialAuthButtons'
import Button from '../components/ui/Button'
import { useAuth } from '../context/useAuth'
import { ApiException } from '../lib/api'
import { loginSchema } from '../shared/validators/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isLoading, login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect to / if already logged in (Condition #6)
  useEffect(() => {
    if (user && !isLoading) {
      navigate('/', { replace: true })
    }
  }, [user, isLoading, navigate])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrors({})

    const validation = loginSchema.safeParse({ email, password })
    if (!validation.success) {
      const fieldErrors: { email?: string; password?: string } = {}
      for (const issue of validation.error.issues) {
        if (issue.path[0] === 'email') fieldErrors.email = issue.message
        if (issue.path[0] === 'password') fieldErrors.password = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await login(validation.data)
      const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/'
      navigate(from, { replace: true })
    } catch (err) {
      if (err instanceof ApiException) {
        setErrors({ general: err.message })
      } else {
        setErrors({ general: 'Failed to sign in. Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }


  if (isLoading) {
    return (
      <div className="min-h-screen bg-shuttle-50 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-shuttle-300 border-t-shuttle-950 animate-spin" />
      </div>
    )
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Don't have an account?"
      linkText="Sign up"
      linkTo="/register"
    >
      {errors.general && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-control bg-red-50 border border-red-200 text-label-m text-red-700 font-body flex items-start gap-2.5"
        >
          <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{errors.general}</span>
        </div>
      )}



      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          id="login-email"
          label="Email address"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
          required
        />

        <FormField
          id="login-password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="current-password"
          required
        />

        <div className="flex items-center justify-between mt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-shuttle-300 text-lime-400 focus:ring-lime-400/30"
            />
            <span className="text-label-s text-shuttle-700 font-body">Remember me</span>
          </label>

          <button
            type="button"
            disabled
            aria-label="Forgot password (disabled)"
            className="text-label-s text-shuttle-400 cursor-not-allowed font-body"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isSubmitting}
          className="w-full justify-center mt-3"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-6">
        <SocialAuthButtons />
      </div>
    </AuthLayout>
  )
}
