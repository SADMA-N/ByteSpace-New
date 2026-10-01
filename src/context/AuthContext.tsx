import { useState, useEffect, type ReactNode } from 'react'
import { apiFetch, type User } from '../lib/api'
import type { LoginInput, RegisterInput } from '../shared/validators/auth'
import { AuthContext } from './auth-context-base'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = async () => {
    try {
      const data = await apiFetch<{ user: User }>('/api/auth/me')
      setUser(data.user)
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true
    apiFetch<{ user: User }>('/api/auth/me')
      .then((data) => {
        if (isMounted) setUser(data.user)
      })
      .catch(() => {
        if (isMounted) setUser(null)
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const login = async (credentials: LoginInput): Promise<User> => {
    const data = await apiFetch<{ user: User }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    setUser(data.user)
    return data.user
  }

  const register = async (input: RegisterInput): Promise<User> => {
    const data = await apiFetch<{ user: User }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(input),
    })
    setUser(data.user)
    return data.user
  }

  const logout = async (): Promise<void> => {
    try {
      await apiFetch<{ ok: boolean }>('/api/auth/logout', { method: 'POST' })
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}
