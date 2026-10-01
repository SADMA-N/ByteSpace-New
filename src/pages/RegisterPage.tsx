import { useState, useEffect, type FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthLayout } from '../components/auth/AuthLayout'
import { FormField } from '../components/auth/FormField'
import { SocialAuthButtons } from '../components/auth/SocialAuthButtons'
import Button from '../components/ui/Button'
import { useAuth } from '../context/useAuth'
import { ApiException } from '../lib/api'
import { registerSchema } from '../shared/validators/auth'

export default function RegisterPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isLoading, register } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; general?: string }>({})
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

    const validation = registerSchema.safeParse({ name, email, password })
    if (!validation.success) {
      const fieldErrors: { name?: string; email?: string; password?: string } = {}
      for (const issue of validation.error.issues) {
        if (issue.path[0] === 'name') fieldErrors.name = issue.message
        if (issue.path[0] === 'email') fieldErrors.email = issue.message
        if (issue.path[0] === 'password') fieldErrors.password = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await register(validation.data)
      const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/'
      navigate(from, { replace: true })
    } catch (err) {
      if (err instanceof ApiException) {
        setErrors({ general: err.message })
      } else {
        setErrors({ general: 'Failed to create account. Please try again.' })
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
      title="Create an account"
      subtitle="Already have an account?"
      linkText="Sign in"
      linkTo="/login"
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
          id="register-name"
          label="Full name"
          type="text"
          placeholder="e.g. Alex Morgan"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          autoComplete="name"
          required
        />

        <FormField
          id="register-email"
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
          id="register-password"
          label="Password (min. 6 characters)"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="new-password"
          required
        />

        <p className="text-label-s text-shuttle-500 font-body leading-relaxed mt-1">
          By registering, you agree to our Terms of Service and Privacy Policy.
        </p>

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isSubmitting}
          className="w-full justify-center mt-3"
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>

      <div className="mt-6">
        <SocialAuthButtons />
      </div>
    </AuthLayout>
  )
}
