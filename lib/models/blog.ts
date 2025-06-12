import { prisma } from '@/lib/db'

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: Date
  category: string
  readTime: string
  color: string
  createdAt: Date
  updatedAt: Date
}

export const BlogModel = {
  async create(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) {
    return prisma.blogPost.create({
      data: {
        ...data,
        date: new Date(data.date),
      },
    })
  },

  async findAll(where?: object) {
    return prisma.blogPost.findMany({
      where,
      orderBy: {
        date: 'desc',
      },
    })
  },

  async findById(id: number) {
    return prisma.blogPost.findUnique({
      where: { id },
    })
  },

  async update(id: number, data: Partial<BlogPost>) {
    return prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    })
  },

  async delete(id: number) {
    return prisma.blogPost.delete({
      where: { id },
    })
  },

  async findByCategory(category: string) {
    return prisma.blogPost.findMany({
      where: { category },
      orderBy: {
        date: 'desc',
      },
    })
  },

  async getCategories() {
    const categoryCounts = await prisma.blogPost.groupBy({
      by: ['category', 'color'],
      where: { status: "Published" },
      _count: {
        id: true,
      },
    });

    const formattedCategories = categoryCounts.map(item => ({
      name: item.category,
      count: item._count.id,
      color: item.color,
    }));

    return formattedCategories;
  },

  async getTotalPosts() {
    return prisma.blogPost.count();
  },

  async getPublishedPostsCount() {
    return prisma.blogPost.count({
      where: { status: "Published" },
    });
  },

  async getDraftPostsCount() {
    return prisma.blogPost.count({
      where: { status: "Draft" },
    });
  },

  async getRecentPosts(limit: number = 3) {
    return prisma.blogPost.findMany({
      orderBy: {
        date: 'desc',
      },
      take: limit,
    });
  },
} 