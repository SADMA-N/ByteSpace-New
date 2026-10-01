import { Router, type Request, type Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma.js'
import { loginSchema, registerSchema } from '../../src/shared/validators/auth.js'

export const authRouter = Router()

const isProduction = process.env.NODE_ENV === 'production'

// Cookie options for setting token
const getAuthCookieOptions = () => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
})

// Cookie options for clearing token (WITHOUT maxAge per condition #1)
const getClearCookieOptions = () => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax' as const,
  path: '/',
})

// Constant dummy bcrypt hash for timing attack mitigation (condition #4)
const DUMMY_HASH = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'

interface TokenPayload {
  userId: string
  role: string
}

// ── POST /api/auth/register ─────────────────────────────────────────────────
authRouter.post('/register', async (req: Request, res: Response) => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    return res.status(500).json({
      error: { code: 'SERVER_CONFIGURATION_ERROR', message: 'JWT_SECRET is not configured' },
    })
  }

  const parseResult = registerSchema.safeParse(req.body)
  if (!parseResult.success) {
    const firstIssue = parseResult.error.issues[0]
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: firstIssue?.message || 'Invalid input' },
    })
  }

  const { name, email, password } = parseResult.data

  try {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(409).json({
        error: { code: 'EMAIL_ALREADY_EXISTS', message: 'An account with this email already exists' },
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatarUrl: true,
        bio: true,
      },
    })

    const payload: TokenPayload = { userId: user.id, role: user.role }
    const token = jwt.sign(payload, secret, { expiresIn: '7d' })

    res.cookie('token', token, getAuthCookieOptions())
    return res.status(201).json({ user })
  } catch (err) {
    console.error('Registration error:', err)
    return res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to complete registration' },
    })
  }
})

// ── POST /api/auth/login ────────────────────────────────────────────────────
authRouter.post('/login', async (req: Request, res: Response) => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    return res.status(500).json({
      error: { code: 'SERVER_CONFIGURATION_ERROR', message: 'JWT_SECRET is not configured' },
    })
  }

  const parseResult = loginSchema.safeParse(req.body)
  if (!parseResult.success) {
    const firstIssue = parseResult.error.issues[0]
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: firstIssue?.message || 'Invalid input' },
    })
  }

  const { email, password } = parseResult.data

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      // Run dummy compare to match execution time and prevent timing enumeration (condition #4)
      await bcrypt.compare(password, DUMMY_HASH)
      return res.status(401).json({
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' },
      })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(401).json({
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' },
      })
    }

    const payload: TokenPayload = { userId: user.id, role: user.role }
    const token = jwt.sign(payload, secret, { expiresIn: '7d' })

    res.cookie('token', token, getAuthCookieOptions())
    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
      },
    })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to complete login' },
    })
  }
})

// ── POST /api/auth/logout ───────────────────────────────────────────────────
authRouter.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('token', getClearCookieOptions())
  return res.json({ ok: true })
})

// ── GET /api/auth/me ────────────────────────────────────────────────────────
authRouter.get('/me', async (req: Request, res: Response) => {
  const token = req.cookies?.token
  if (!token) {
    return res.status(401).json({
      error: { code: 'UNAUTHORIZED', message: 'Not authenticated' },
    })
  }

  const secret = process.env.JWT_SECRET
  if (!secret) {
    return res.status(500).json({
      error: { code: 'SERVER_CONFIGURATION_ERROR', message: 'JWT_SECRET is not configured' },
    })
  }

  try {
    const decoded = jwt.verify(token, secret) as TokenPayload
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatarUrl: true,
        bio: true,
      },
    })

    if (!user) {
      res.clearCookie('token', getClearCookieOptions())
      return res.status(401).json({
        error: { code: 'USER_NOT_FOUND', message: 'User session is no longer valid' },
      })
    }

    return res.json({ user })
  } catch {
    res.clearCookie('token', getClearCookieOptions())
    return res.status(401).json({
      error: { code: 'INVALID_TOKEN', message: 'Session expired or invalid' },
    })
  }
})
