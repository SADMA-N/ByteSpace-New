import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

class CustomWebSocket extends ws {
  constructor(address: string | URL, protocols?: string | string[], options?: ws.ClientOptions) {
    super(address, protocols, { ...options, family: 4 })
  }
}
neonConfig.webSocketConstructor = CustomWebSocket

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL || ''

const adapter = new PrismaNeon({ connectionString })

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
