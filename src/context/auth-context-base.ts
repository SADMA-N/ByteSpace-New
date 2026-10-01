import { createContext } from 'react'
import type { User } from '../lib/api'
import type { LoginInput, RegisterInput } from '../shared/validators/auth'

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (credentials: LoginInput) => Promise<User>
  register: (data: RegisterInput) => Promise<User>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
