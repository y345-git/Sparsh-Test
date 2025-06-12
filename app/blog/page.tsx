"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, Tag } from "lucide-react"
import { motion } from "framer-motion"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  category: string
  readTime: string
  color: string
}

interface Category {
  name: string
  count: number
  color: string
}

// Define color mappings for Tailwind classes
const categoryColorClasses: Record<string, {
  selected: string;
  outline: string;
}> = {
  pink: {
    selected: "bg-pink-500 text-white",
    outline: "border-pink-200 text-pink-500 hover:bg-pink-50",
  },
  rose: {
    selected: "bg-rose-500 text-white",
    outline: "border-rose-200 text-rose-500 hover:bg-rose-50",
  },
  fuchsia: {
    selected: "bg-fuchsia-500 text-white",
    outline: "border-fuchsia-200 text-fuchsia-500 hover:bg-fuchsia-50",
  },
  purple: {
    selected: "bg-purple-500 text-white",
    outline: "border-purple-200 text-purple-500 hover:bg-purple-50",
  },
  gray: { // For "All" category
    selected: "bg-gray-500 text-white",
    outline: "border-gray-200 text-gray-500 hover:bg-gray-50",
  },
};

const getCategoryButtonClasses = (selectedCategory: string, categoryName: string, categoryColor: string) => {
  const classes = categoryColorClasses[categoryColor];
  if (selectedCategory === categoryName) {
    return classes?.selected || "bg-gray-500 text-white";
  } else {
    return `bg-white/70 backdrop-blur-md ${classes?.outline || "border-gray-200 text-gray-500 hover:bg-gray-50"}`;
  }
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
    fetchCategories()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blogs?status=Published')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blogs?type=categories')
      const data = await response.json()
      
      // Add "All" category
      const allCategories = [
        { name: "All", count: data.reduce((sum: number, category: { count: number }) => sum + category.count, 0), color: "gray" },
        ...data
      ]
      setCategories(allCategories)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter(post => post.category === selectedCategory)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-fuchsia-100"></div>
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-36 h-36 bg-pink-200/25 rounded-full blur-xl"></div>
        <div className="absolute bottom-16 right-12 w-44 h-44 bg-rose-200/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-fuchsia-200/30 rounded-full blur-lg transform -translate-x-1/2 -translate-y-1/2"></div>

        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-lg text-pink-500 rounded-full text-sm shadow-lg border border-pink-200/50">
              <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 animate-pulse"></div>
              Health Blog
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight font-poppins">
              Women's Health{" "}
              <span className="bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                Insights
              </span>
            </h1>
            <div className="bg-white/50 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-pink-100/50 max-w-3xl mx-auto">
              <p className="text-gray-600 text-lg leading-relaxed">
                Stay informed with the latest insights, tips, and expert advice on women's health from our medical
                professionals.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50 to-pink-50"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  className={`${getCategoryButtonClasses(selectedCategory, category.name, category.color)} shadow-md`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <Tag size={16} className="mr-2" />
                  {category.name} ({category.count})
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-rose-50"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-block px-6 py-3 bg-white/70 backdrop-blur-md text-rose-500 rounded-full text-sm mb-4 shadow-md border border-rose-100">
              Featured Article
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="overflow-hidden shadow-xl bg-white/70 backdrop-blur-md border border-pink-100">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <Image
                      src={filteredPosts[0].image}
                      alt={filteredPosts[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-pink-500/10 backdrop-blur-[1px]"></div>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 mb-4">
                      <span className={`px-3 py-1 bg-${filteredPosts[0].color}-100/70 backdrop-blur-sm text-${filteredPosts[0].color}-500 rounded-full text-sm`}>
                        {filteredPosts[0].category}
                    </span>
                      <span className="text-gray-500 text-sm">{filteredPosts[0].readTime}</span>
                  </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 font-poppins">{filteredPosts[0].title}</h2>
                    <p className="text-gray-600 mb-6">{filteredPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-400" />
                        <span className="text-gray-600 text-sm">{filteredPosts[0].author}</span>
                      <Calendar size={16} className="text-gray-400 ml-4" />
                        <span className="text-gray-600 text-sm">{new Date(filteredPosts[0].date).toLocaleDateString()}</span>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-md">
                        Read More <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-50 to-purple-50"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-poppins">Latest Articles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover more insights and expert advice on women's health topics
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.slice(1).map((post) => (
              <motion.div key={post.id} variants={item}>
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
                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-poppins">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User size={16} className="text-gray-400" />
                        <span className="text-gray-600 text-sm">{post.author}</span>
                        <Calendar size={16} className="text-gray-400 ml-4" />
                        <span className="text-gray-600 text-sm">{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-md">
                          Read More <ArrowRight size={16} className="ml-2" />
                          </Button>
                        </motion.div>
                    </div>
                    </CardContent>
                  </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <Card className="shadow-lg bg-white/70 backdrop-blur-md border border-pink-100">
                <CardContent className="p-12">
                  <div className="text-pink-300 mb-4">
                    <Tag size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2 font-poppins">No blog posts found</h3>
                  <p className="text-gray-500">Try selecting a different category</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/80 to-fuchsia-600/80"></div>
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/30 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-4 font-poppins">Stay Updated</h2>
            <p className="text-pink-100 mb-8">
              Subscribe to our newsletter to receive the latest health tips and updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-white bg-white/80 backdrop-blur-sm"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-pink-500 hover:bg-gray-100 px-8 py-3 rounded-full shadow-md">
                  Subscribe
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
