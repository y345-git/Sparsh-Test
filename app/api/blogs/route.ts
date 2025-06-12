import { NextResponse } from 'next/server'
import { BlogModel } from '@/lib/models/blog'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const id = searchParams.get('id')
    const type = searchParams.get('type')
    const status = searchParams.get('status')

    // Handle requests for dashboard statistics
    if (type === 'stats') {
      const [total, published, draft] = await Promise.all([
        BlogModel.getTotalPosts(),
        BlogModel.getPublishedPostsCount(),
        BlogModel.getDraftPostsCount(),
      ])
      const recentPosts = await BlogModel.getRecentPosts(3)
      return NextResponse.json({
        totalPosts: total,
        publishedPosts: published,
        draftPosts: draft,
        recentBlogs: recentPosts,
      })
    }

    // Handle categories request
    if (type === 'categories') {
      const categories = await BlogModel.getCategories()
      return NextResponse.json(categories)
    }

    if (id) {
      const post = await BlogModel.findById(Number(id))
      if (!post) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
      }
      return NextResponse.json(post)
    }

    if (category) {
      const posts = await BlogModel.findByCategory(category)
      return NextResponse.json(posts)
    }

    let posts;
    if (status) {
      posts = await BlogModel.findAll({ status });
    } else {
      posts = await BlogModel.findAll();
    }
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const post = await BlogModel.create(data)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const data = await request.json()
    const post = await BlogModel.update(Number(id), data)
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await BlogModel.delete(Number(id))
    return NextResponse.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 