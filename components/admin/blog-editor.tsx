"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Eye, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface BlogEditorProps {
  blogId?: string
}

export default function BlogEditor({ blogId }: BlogEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    status: "Draft",
    author: "", // Initialize author as empty string
    image: "/placeholder.svg?height=300&width=400", // Default placeholder
    readTime: "",
    color: "pink",
  })
  const [categories, setCategories] = useState<{ name: string; count: number; color: string }[]>([])
  const [authors, setAuthors] = useState<string[]>([])

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true)
      try {
    if (blogId) {
          const response = await fetch(`/api/blogs?id=${blogId}`)
          if (!response.ok) {
            throw new Error("Failed to fetch blog post")
          }
          const post = await response.json()
      setFormData({
            title: post.title || "",
            excerpt: post.excerpt || "",
            content: post.content || "",
            category: post.category || "",
            status: post.status || "Draft",
            author: post.author || "",
            image: post.image || "/placeholder.svg?height=300&width=400",
            readTime: post.readTime || "",
            color: post.color || "pink",
          })
        }

        // Fetch categories dynamically
        const categoriesResponse = await fetch('/api/blogs?type=categories');
        if (categoriesResponse.ok) {
          const fetchedCategories = await categoriesResponse.json();
          setCategories(fetchedCategories);
        }

        // Fetch authors dynamically (assuming you have an API endpoint for authors or extract from existing blogs)
        // For now, let's hardcode some common authors or extract from fetched posts
        setAuthors(["Dr. Sarah Johnson", "Dr. Emily Chen", "Dr. Lisa Patel"]);

      } catch (error) {
        console.error("Error fetching initial data:", error)
        alert("Failed to load blog post or categories.")
      } finally {
        setIsLoading(false)
    }
    }
    fetchInitialData()
  }, [blogId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const method = blogId ? "PUT" : "POST"
      const url = blogId ? `/api/blogs?id=${blogId}` : "/api/blogs"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString(), // Ensure date is always set/updated
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${blogId ? "update" : "create"} blog post`)
      }

      router.push("/admin/blogs")
      router.refresh()
    } catch (error) {
      console.error(`Error ${blogId ? "updating" : "creating"} blog post:`, error)
      alert(`Failed to ${blogId ? "update" : "create"} blog post`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const data = await response.json()
      setFormData((prev) => ({ ...prev, image: data.url }))
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isLoading && blogId) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-8"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="hover:bg-pink-50 transition-colors border-pink-200 text-pink-500 rounded-full"
            >
              <ArrowLeft size={16} className="mr-2" /> Back
            </Button>
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 font-poppins">
              {blogId ? "Edit Blog Post" : "Create New Blog Post"}
            </h1>
            <p className="text-gray-600">
              {blogId ? "Update your existing blog post" : "Write and publish a new blog post"}
            </p>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="shadow-lg bg-white/70 backdrop-blur-md border border-pink-100">
              <CardHeader>
                <CardTitle className="font-poppins">Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Enter blog post title"
                    className="text-lg bg-white/80 backdrop-blur-sm border-pink-100 focus:border-pink-300 focus:ring-pink-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleChange("excerpt", e.target.value)}
                    placeholder="Brief description of the blog post"
                    rows={3}
                    className="bg-white/80 backdrop-blur-sm border-pink-100 focus:border-pink-300 focus:ring-pink-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleChange("content", e.target.value)}
                    placeholder="Write your blog post content here..."
                    rows={15}
                    className="font-mono bg-white/80 backdrop-blur-sm border-pink-100 focus:border-pink-300 focus:ring-pink-200"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="shadow-lg bg-white/70 backdrop-blur-md border border-pink-100">
              <CardHeader>
                <CardTitle className="font-poppins">Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                    <SelectTrigger className="bg-white/80 backdrop-blur-sm border-pink-100 focus:border-pink-300 focus:ring-pink-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                    <SelectTrigger className="bg-white/80 backdrop-blur-sm border-pink-100 focus:border-pink-300 focus:ring-pink-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Select value={formData.author} onValueChange={(value) => handleChange("author", value)}>
                    <SelectTrigger className="bg-white/80 backdrop-blur-sm border-pink-100 focus:border-pink-300 focus:ring-pink-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((authorName) => (
                        <SelectItem key={authorName} value={authorName}>{authorName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    value={formData.readTime}
                    onChange={(e) => handleChange("readTime", e.target.value)}
                    placeholder="e.g., 5 min read"
                    className="bg-white/80 backdrop-blur-sm border-pink-100 focus:border-pink-300 focus:ring-pink-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color Theme</Label>
                  <Select value={formData.color} onValueChange={(value) => handleChange("color", value)}>
                    <SelectTrigger className="bg-white/80 backdrop-blur-sm border-pink-100 focus:border-pink-300 focus:ring-pink-200">
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pink">Pink</SelectItem>
                      <SelectItem value="rose">Rose</SelectItem>
                      <SelectItem value="fuchsia">Fuchsia</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Featured Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="bg-white/80 backdrop-blur-sm border-pink-100 focus:border-pink-300 focus:ring-pink-200"
                  />
                  {formData.image && (
                    <div className="mt-2 relative w-32 h-32">
                      <Image
                        src={formData.image}
                        alt="Featured image preview"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  {isUploading && (
                    <p className="text-sm text-gray-500">Uploading image...</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-white/70 backdrop-blur-md border border-pink-100">
              <CardContent className="p-6">
                <div className="flex flex-col gap-3">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      type="submit"
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white transition-all duration-300 rounded-full shadow-md hover:shadow-lg"
                      disabled={isLoading || isUploading}
                    >
                      <Save size={16} className="mr-2" />
                      {isLoading ? "Saving..." : "Save Post"}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full hover:bg-rose-50 hover:border-rose-300 transition-all duration-200 border-rose-200 text-rose-500 rounded-full"
                    >
                      <Eye size={16} className="mr-2" />
                      Preview
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </form>
      </div>
    </div>
  )
}
