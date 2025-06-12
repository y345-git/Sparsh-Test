"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Calendar, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  image: string
  color: string
  readTime: string
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blogs')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const response = await fetch(`/api/blogs?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPosts(posts.filter(post => post.id !== id))
      } else {
        throw new Error('Failed to delete post')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 pt-16">
      <div className="container mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-10 bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-pink-100"
        >
          <h1 className="text-3xl font-bold text-gray-800 font-poppins">Manage Blog Posts</h1>
          <Link href="/admin/blogs/new">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-md hover:shadow-lg transition-all">
              <Plus className="mr-2 h-5 w-5" />
              New Post
              </Button>
          </Link>
        </motion.div>

        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <Card className="shadow-lg bg-white/70 backdrop-blur-md border border-pink-100">
              <CardContent className="p-12">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">No Blog Posts Found</h2>
                <p className="text-gray-500 mb-6">It looks like you haven't created any blog posts yet.</p>
                <Link href="/admin/blogs/new">
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-md">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Post
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/70 backdrop-blur-md border border-pink-100">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-${post.color}-500/10 backdrop-blur-[1px]`}></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`px-3 py-1 bg-${post.color}-100/70 backdrop-blur-sm text-${post.color}-500 rounded-full text-sm`}>
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3 font-poppins">{post.title}</h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-400" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <Link href={`/admin/blogs/edit/${post.id}`}>
                      <Button variant="outline" size="sm" className="rounded-full px-3 py-1 text-sm bg-white/80 hover:bg-pink-50 border-pink-200 text-pink-500">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      className="rounded-full px-3 py-1 text-sm"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
