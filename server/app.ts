import express, { type Request, type Response, type NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import { healthRouter } from './routes/health.js'
import { authRouter } from './routes/auth.js'

const app = express()

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json())
app.use(cookieParser())

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/health', healthRouter)
app.use('/api/auth', authRouter)

// ── 404 handler ─────────────────────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } })
})

// ── Global error handler ─────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.message)
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } })
})

export default app
