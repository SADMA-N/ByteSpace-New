export interface ApiError {
  code: string
  message: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'USER' | 'CREATOR'
  avatarUrl: string | null
  bio: string | null
}

export class ApiException extends Error {
  code: string

  constructor(error: ApiError) {
    super(error.message)
    this.code = error.code
    this.name = 'ApiException'
  }
}

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {})
  if (!headers.has('Content-Type') && options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
    credentials: 'include', // Automatically send and receive cookies
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    if (data?.error) {
      throw new ApiException(data.error)
    }
    throw new ApiException({
      code: 'HTTP_ERROR',
      message: response.statusText || 'An unexpected error occurred',
    })
  }

  return data as T
}
