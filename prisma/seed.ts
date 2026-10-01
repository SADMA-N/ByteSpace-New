import 'dotenv/config'
import { PrismaClient, Level, Role } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neonConfig } from '@neondatabase/serverless'
import ws from 'ws'
import bcrypt from 'bcryptjs'

class CustomWebSocket extends ws {
  constructor(address: string | URL, protocols?: string | string[], options?: ws.ClientOptions) {
    super(address, protocols, { ...options, family: 4 })
  }
}
neonConfig.webSocketConstructor = CustomWebSocket

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL || ''
const adapter = new PrismaNeon({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  // ── Categories ──────────────────────────────────────────────────────────
  const categories = await prisma.$transaction([
    prisma.category.upsert({ where: { slug: 'design' }, update: {}, create: { name: 'Design', slug: 'design' } }),
    prisma.category.upsert({ where: { slug: 'development' }, update: {}, create: { name: 'Development', slug: 'development' } }),
    prisma.category.upsert({ where: { slug: 'marketing' }, update: {}, create: { name: 'Marketing', slug: 'marketing' } }),
    prisma.category.upsert({ where: { slug: 'photography' }, update: {}, create: { name: 'Photography', slug: 'photography' } }),
    prisma.category.upsert({ where: { slug: 'music' }, update: {}, create: { name: 'Music', slug: 'music' } }),
    prisma.category.upsert({ where: { slug: 'business' }, update: {}, create: { name: 'Business', slug: 'business' } }),
  ])
  const [design, dev, marketing, photography, music, business] = categories

  // ── Creators ────────────────────────────────────────────────────────────
  const hash = (pw: string) => bcrypt.hashSync(pw, 10)

  const creator1 = await prisma.user.upsert({
    where: { email: 'alex.morgan@bytespace.dev' },
    update: {},
    create: {
      name: 'Alex Morgan',
      email: 'alex.morgan@bytespace.dev',
      passwordHash: hash('creator123'),
      role: Role.CREATOR,
      avatarUrl: 'https://i.pravatar.cc/150?u=alexmorgan',
      bio: 'Senior UX designer with 10+ years of experience building digital products for Fortune 500 companies.',
    },
  })

  const creator2 = await prisma.user.upsert({
    where: { email: 'sofia.chen@bytespace.dev' },
    update: {},
    create: {
      name: 'Sofia Chen',
      email: 'sofia.chen@bytespace.dev',
      passwordHash: hash('creator123'),
      role: Role.CREATOR,
      avatarUrl: 'https://i.pravatar.cc/150?u=sofiachen',
      bio: 'Full-stack engineer and educator passionate about making web development accessible to everyone.',
    },
  })

  const creator3 = await prisma.user.upsert({
    where: { email: 'james.okafor@bytespace.dev' },
    update: {},
    create: {
      name: 'James Okafor',
      email: 'james.okafor@bytespace.dev',
      passwordHash: hash('creator123'),
      role: Role.CREATOR,
      avatarUrl: 'https://i.pravatar.cc/150?u=jamesokafor',
      bio: 'Growth marketer and entrepreneur who has scaled startups from zero to millions of users.',
    },
  })

  // ── Demo user ────────────────────────────────────────────────────────────
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@bytespace.dev' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'demo@bytespace.dev',
      passwordHash: hash('demo1234'),
      role: Role.USER,
      avatarUrl: 'https://i.pravatar.cc/150?u=demobytespace',
      bio: 'Demo account for reviewers.',
    },
  })

  // ── Courses ──────────────────────────────────────────────────────────────
  type CourseInput = {
    slug: string
    title: string
    description: string
    thumbnail: string
    level: Level
    rating: number
    ratingCount: number
    studentCount: number
    durationMinutes: number
    categoryId: string
    creatorId: string
  }

  const courseSeed: CourseInput[] = [
    {
      slug: 'ui-ux-design-fundamentals',
      title: 'UI/UX Design Fundamentals',
      description: 'Master the core principles of user interface and experience design. Learn wireframing, prototyping, and design systems that ship.',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600',
      level: Level.BEGINNER,
      rating: 4.8,
      ratingCount: 1240,
      studentCount: 8900,
      durationMinutes: 480,
      categoryId: design.id,
      creatorId: creator1.id,
    },
    {
      slug: 'advanced-figma-design-systems',
      title: 'Advanced Figma: Design Systems',
      description: 'Build scalable design systems in Figma with tokens, components, and auto-layout. Collaborate at team scale.',
      thumbnail: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600',
      level: Level.ADVANCED,
      rating: 4.9,
      ratingCount: 876,
      studentCount: 5200,
      durationMinutes: 360,
      categoryId: design.id,
      creatorId: creator1.id,
    },
    {
      slug: 'react-typescript-complete-guide',
      title: 'React & TypeScript: Complete Guide',
      description: 'Build production-ready React applications with TypeScript. Covers hooks, context, routing, testing, and performance.',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
      level: Level.INTERMEDIATE,
      rating: 4.9,
      ratingCount: 2100,
      studentCount: 14500,
      durationMinutes: 720,
      categoryId: dev.id,
      creatorId: creator2.id,
    },
    {
      slug: 'fullstack-nextjs-prisma',
      title: 'Full-Stack with Next.js & Prisma',
      description: 'Build and deploy full-stack web apps using Next.js App Router, Prisma ORM, and PostgreSQL on modern cloud platforms.',
      thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab19836100?w=600',
      level: Level.ADVANCED,
      rating: 4.8,
      ratingCount: 540,
      studentCount: 3800,
      durationMinutes: 600,
      categoryId: dev.id,
      creatorId: creator2.id,
    },
    {
      slug: 'digital-marketing-masterclass',
      title: 'Digital Marketing Masterclass',
      description: 'Learn SEO, paid social, email marketing, and analytics to grow any brand or business online from scratch.',
      thumbnail: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600',
      level: Level.BEGINNER,
      rating: 4.7,
      ratingCount: 1820,
      studentCount: 12000,
      durationMinutes: 540,
      categoryId: marketing.id,
      creatorId: creator3.id,
    },
    {
      slug: 'growth-hacking-saas',
      title: 'Growth Hacking for SaaS Products',
      description: 'Data-driven growth strategies used by top SaaS companies. PLG, activation funnels, retention loops, and virality.',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
      level: Level.INTERMEDIATE,
      rating: 4.6,
      ratingCount: 430,
      studentCount: 2900,
      durationMinutes: 300,
      categoryId: marketing.id,
      creatorId: creator3.id,
    },
    {
      slug: 'photography-composition-mastery',
      title: 'Photography: Composition Mastery',
      description: 'Elevate your photography with professional composition techniques, rule of thirds, leading lines, and storytelling through images.',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
      level: Level.BEGINNER,
      rating: 4.8,
      ratingCount: 720,
      studentCount: 5600,
      durationMinutes: 240,
      categoryId: photography.id,
      creatorId: creator1.id,
    },
    {
      slug: 'portrait-lighting-studio',
      title: 'Portrait Lighting in the Studio',
      description: 'Professional studio lighting setups for portrait photography. Rembrandt, split, beauty dish, and creative lighting patterns.',
      thumbnail: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600',
      level: Level.INTERMEDIATE,
      rating: 4.7,
      ratingCount: 390,
      studentCount: 2800,
      durationMinutes: 300,
      categoryId: photography.id,
      creatorId: creator1.id,
    },
    {
      slug: 'music-production-ableton',
      title: 'Music Production with Ableton Live',
      description: 'Create professional electronic music tracks from scratch with Ableton Live. Synthesis, sampling, mixing, and mastering fundamentals.',
      thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600',
      level: Level.BEGINNER,
      rating: 4.6,
      ratingCount: 580,
      studentCount: 4100,
      durationMinutes: 420,
      categoryId: music.id,
      creatorId: creator2.id,
    },
    {
      slug: 'guitar-fundamentals',
      title: 'Guitar Fundamentals for Beginners',
      description: 'Learn to play guitar from the ground up. Chords, scales, strumming patterns, and your first songs in 30 days.',
      thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600',
      level: Level.BEGINNER,
      rating: 4.9,
      ratingCount: 1450,
      studentCount: 9800,
      durationMinutes: 360,
      categoryId: music.id,
      creatorId: creator3.id,
    },
    {
      slug: 'startup-fundraising-essentials',
      title: 'Startup Fundraising Essentials',
      description: 'Raise your seed round with confidence. Pitch deck creation, investor outreach, term sheet negotiation, and cap table basics.',
      thumbnail: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=600',
      level: Level.INTERMEDIATE,
      rating: 4.8,
      ratingCount: 310,
      studentCount: 2100,
      durationMinutes: 240,
      categoryId: business.id,
      creatorId: creator3.id,
    },
    {
      slug: 'product-management-zero-to-one',
      title: 'Product Management: Zero to One',
      description: 'Become a product manager from scratch. User research, roadmapping, Agile execution, and stakeholder management.',
      thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600',
      level: Level.BEGINNER,
      rating: 4.7,
      ratingCount: 890,
      studentCount: 6700,
      durationMinutes: 480,
      categoryId: business.id,
      creatorId: creator2.id,
    },
  ]

  for (const courseData of courseSeed) {
    await prisma.course.upsert({
      where: { slug: courseData.slug },
      update: {},
      create: courseData,
    })
  }

  // ── Lessons (3 per first 3 courses as sample) ────────────────────────────
  const courses = await prisma.course.findMany({ take: 4, orderBy: { createdAt: 'asc' } })

  const lessonTemplates: Record<string, { title: string; durationMinutes: number }[]> = {
    'ui-ux-design-fundamentals': [
      { title: 'Introduction to UX Research', durationMinutes: 18 },
      { title: 'User Personas and Journey Mapping', durationMinutes: 22 },
      { title: 'Wireframing with Figma', durationMinutes: 30 },
      { title: 'Usability Testing Principles', durationMinutes: 20 },
      { title: 'Handoff to Development', durationMinutes: 15 },
    ],
    'advanced-figma-design-systems': [
      { title: 'Setting Up Design Tokens', durationMinutes: 25 },
      { title: 'Component Architecture', durationMinutes: 35 },
      { title: 'Auto Layout Deep Dive', durationMinutes: 28 },
      { title: 'Variants and Interactive Components', durationMinutes: 30 },
    ],
    'react-typescript-complete-guide': [
      { title: 'TypeScript Essentials for React', durationMinutes: 40 },
      { title: 'Functional Components and Hooks', durationMinutes: 45 },
      { title: 'State Management with Context', durationMinutes: 38 },
      { title: 'React Router v7', durationMinutes: 30 },
      { title: 'Testing with Vitest and RTL', durationMinutes: 35 },
      { title: 'Performance Optimization', durationMinutes: 28 },
    ],
    'fullstack-nextjs-prisma': [
      { title: 'Next.js App Router Fundamentals', durationMinutes: 42 },
      { title: 'Prisma Schema Design', durationMinutes: 35 },
      { title: 'Server Actions and API Routes', durationMinutes: 38 },
      { title: 'Authentication with NextAuth', durationMinutes: 40 },
      { title: 'Deploying to Vercel', durationMinutes: 20 },
    ],
  }

  for (const course of courses) {
    const lessons = lessonTemplates[course.slug]
    if (!lessons) continue
    for (let i = 0; i < lessons.length; i++) {
      const l = lessons[i]
      await prisma.lesson.upsert({
        where: { id: `${course.id}-lesson-${i}` },
        update: {},
        create: {
          id: `${course.id}-lesson-${i}`,
          courseId: course.id,
          title: l.title,
          durationMinutes: l.durationMinutes,
          order: i + 1,
        },
      })
    }
  }

  // ── Reviews (demo user + creators review first 4 courses) ─────────────────
  const reviewData = [
    { userId: demoUser.id, slug: 'ui-ux-design-fundamentals', rating: 5, comment: 'The best UX course I have taken. Alex explains concepts clearly with real-world examples.' },
    { userId: creator2.id, slug: 'ui-ux-design-fundamentals', rating: 5, comment: 'Highly recommend this for any developer who wants to understand design thinking.' },
    { userId: demoUser.id, slug: 'react-typescript-complete-guide', rating: 5, comment: 'I went from knowing basic React to building a full production app after this course.' },
    { userId: creator3.id, slug: 'react-typescript-complete-guide', rating: 4, comment: 'Excellent content. The TypeScript section alone is worth the price.' },
    { userId: demoUser.id, slug: 'digital-marketing-masterclass', rating: 5, comment: 'James breaks down growth strategies in a way that is immediately actionable.' },
    { userId: creator1.id, slug: 'digital-marketing-masterclass', rating: 4, comment: 'Great overview of the modern marketing stack. Would love more on paid acquisition.' },
  ]

  for (const r of reviewData) {
    const course = await prisma.course.findUnique({ where: { slug: r.slug } })
    if (!course) continue
    await prisma.review.upsert({
      where: { courseId_userId: { courseId: course.id, userId: r.userId } },
      update: {},
      create: {
        courseId: course.id,
        userId: r.userId,
        rating: r.rating,
        comment: r.comment,
      },
    })
  }

  console.log('Seed complete.')
  console.log(`Demo login: demo@bytespace.dev / demo1234`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
