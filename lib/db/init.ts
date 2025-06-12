import { PrismaClient } from '@prisma/client'
import { join } from 'path'
import { mkdir } from 'fs/promises'

const prisma = new PrismaClient()

export async function initializeDatabase() {
  try {
    // Ensure the database directory exists
    const dbDir = join(process.cwd(), 'prisma')
    await mkdir(dbDir, { recursive: true })

    // Create the database and tables
    await prisma.$executeRaw`PRAGMA foreign_keys = ON;`
    
    // Add some initial categories if they don't exist
    const categories = [
      { name: "Pregnancy", color: "pink" },
      { name: "Fertility", color: "rose" },
      { name: "Menopause", color: "fuchsia" },
      { name: "Health Tips", color: "purple" },
      { name: "Surgery", color: "pink" },
    ]

    // Add a sample blog post if none exist
    const postCount = await prisma.blogPost.count()
    if (postCount === 0) {
      await prisma.blogPost.create({
        data: {
          title: "Welcome to Our Health Blog",
          excerpt: "Your trusted source for women's health information and expert advice.",
          content: "Welcome to our health blog! Here you'll find valuable information about women's health, expert advice, and the latest medical insights.",
          image: "/placeholder.svg?height=300&width=400",
          author: "Dr. Sarah Johnson",
          date: new Date(),
          category: "Health Tips",
          readTime: "2 min read",
          color: "pink",
        },
      })
    }

    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
} 