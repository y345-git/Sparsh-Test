"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Settings, Plus, Edit, Trash2, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  author: string
  date: Date
  category: string
  image: string
  color: string
  readTime: string
  status: string
  views: number
}

export default function AdminDashboard() {
  const [totalPosts, setTotalPosts] = useState<number | null>(null)
  const [publishedPosts, setPublishedPosts] = useState<number | null>(null)
  const [draftPosts, setDraftPosts] = useState<number | null>(null)
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blogs?type=stats')
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard stats")
        }
        const data = await response.json()
        setTotalPosts(data.totalPosts)
        setPublishedPosts(data.publishedPosts)
        setDraftPosts(data.draftPosts)
        setRecentBlogs(data.recentBlogs)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

const dashboardStats = [
    { title: "Total Blog Posts", value: totalPosts !== null ? totalPosts.toString() : "-", icon: <FileText className="h-6 w-6" />, color: "pink" },
    { title: "Published Posts", value: publishedPosts !== null ? publishedPosts.toString() : "-", icon: <Eye className="h-6 w-6" />, color: "rose" },
    { title: "Draft Posts", value: draftPosts !== null ? draftPosts.toString() : "-", icon: <Edit className="h-6 w-6" />, color: "fuchsia" },
  { title: "System Status", value: "Active", icon: <Settings className="h-6 w-6" />, color: "purple" },
]

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/blogs?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setRecentBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        // Also re-fetch stats to update total/published/draft counts
        const responseStats = await fetch('/api/blogs?type=stats');
        if (responseStats.ok) {
          const dataStats = await responseStats.json();
          setTotalPosts(dataStats.totalPosts);
          setPublishedPosts(dataStats.publishedPosts);
          setDraftPosts(dataStats.draftPosts);
        }
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
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
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-poppins">Blog Management Dashboard</h1>
          <p className="text-gray-600">Manage your hospital's blog content</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
        >
          {dashboardStats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-md border border-pink-100">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-xs md:text-sm mb-1">{stat.title}</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-800">{stat.value}</p>
                      </div>
                      <motion.div
                        className={`p-2 md:p-3 rounded-lg bg-${stat.color}-100 text-${stat.color}-500`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        {stat.icon}
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Blog Management */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="shadow-lg bg-white/70 backdrop-blur-md border border-pink-100">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                <CardTitle className="text-lg md:text-xl font-semibold">Recent Blog Posts</CardTitle>
                <Link href="/admin/blogs/new">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 text-sm">
                      <Plus size={16} className="mr-2" /> New Post
                    </Button>
                  </motion.div>
                </Link>
              </CardHeader>
              <CardContent>
                {recentBlogs.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No recent blog posts to display.</p>
                ) : (
                  <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
                  {recentBlogs.map((blog, index) => (
                    <motion.div
                      key={blog.id}
                        variants={itemVariants}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.01, y: -1 }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-colors border border-pink-50 space-y-3 sm:space-y-0"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-800 text-sm md:text-base truncate">{blog.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-1 text-xs md:text-sm text-gray-600">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              blog.status === "Published"
                                ? "bg-rose-100 text-rose-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {blog.status}
                          </span>
                            <span className="hidden sm:inline">{new Date(blog.date).toLocaleDateString()}</span>
                          <span className="flex items-center">
                            <Eye size={12} className="mr-1" /> {blog.views}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2 flex-shrink-0">
                        <Link href={`/admin/blogs/edit/${blog.id}`}>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-fuchsia-50 border-fuchsia-200 text-fuchsia-500 text-xs"
                            >
                              <Edit size={12} className="mr-1" /> Edit
                            </Button>
                          </motion.div>
                        </Link>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 text-xs"
                              onClick={() => handleDelete(blog.id)}
                          >
                            <Trash2 size={12} className="mr-1" /> Delete
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                )}
                <div className="mt-4">
                  <Link href="/admin/blogs">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Button variant="outline" className="w-full border-pink-200 text-pink-500 hover:bg-pink-50">
                        View All Posts
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="shadow-lg bg-white/70 backdrop-blur-md border border-pink-100">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  <Link href="/admin/blogs/new">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full h-16 md:h-20 flex flex-col items-center justify-center hover:bg-pink-50 hover:border-pink-300 transition-all border-pink-200 text-pink-500"
                      >
                        <motion.div
                          whileHover={{ rotate: 2, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          <Plus size={20} className="mb-2 text-pink-500" />
                        </motion.div>
                        <span className="text-sm">Create New Post</span>
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/admin/blogs">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full h-16 md:h-20 flex flex-col items-center justify-center hover:bg-fuchsia-50 hover:border-fuchsia-300 transition-all border-fuchsia-200 text-fuchsia-500"
                      >
                        <motion.div
                          whileHover={{ rotate: 2, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          <FileText size={20} className="mb-2 text-fuchsia-500" />
                        </motion.div>
                        <span className="text-sm">Manage All Posts</span>
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/blog">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full h-16 md:h-20 flex flex-col items-center justify-center hover:bg-rose-50 hover:border-rose-300 transition-all border-rose-200 text-rose-500"
                      >
                        <motion.div
                          whileHover={{ rotate: 2, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          <Eye size={20} className="mb-2 text-rose-500" />
                        </motion.div>
                        <span className="text-sm">View Published</span>
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
