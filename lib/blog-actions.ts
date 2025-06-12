"use server"

import { revalidatePath } from "next/cache"
import { BlogModel, BlogPost } from "@/lib/models/blog"

// No longer a mock database - now interacts with Prisma

export async function createBlogPost(formData: FormData) {
  const newPostData = {
    title: formData.get("title") as string,
    excerpt: formData.get("excerpt") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as string,
    status: formData.get("status") as "Draft" | "Published",
    author: formData.get("author") as string,
    image: formData.get("image") as string,
    date: new Date().toISOString(),
    readTime: formData.get("readTime") as string,
    color: formData.get("color") as string,
    views: 0,
  }

  try {
    const newPost = await BlogModel.create(newPostData)
  revalidatePath("/admin/blogs")
  revalidatePath("/blog")
  return { success: true, id: newPost.id }
  } catch (error) {
    console.error("Error creating blog post:", error)
    return { success: false, error: "Failed to create blog post" }
  }
}

export async function updateBlogPost(id: number, formData: FormData) {
  const updatedData: Partial<BlogPost> = {
    title: formData.get("title") as string,
    excerpt: formData.get("excerpt") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as string,
    status: formData.get("status") as "Draft" | "Published",
    author: formData.get("author") as string,
    image: formData.get("image") as string,
    readTime: formData.get("readTime") as string,
    color: formData.get("color") as string,
  }

  try {
    await BlogModel.update(id, updatedData)
  revalidatePath("/admin/blogs")
  revalidatePath("/blog")
  return { success: true }
  } catch (error) {
    console.error(`Error updating blog post with ID ${id}:`, error)
    return { success: false, error: "Failed to update blog post" }
  }
}

export async function deleteBlogPost(id: number) {
  try {
    await BlogModel.delete(id)
  revalidatePath("/admin/blogs")
  revalidatePath("/blog")
  return { success: true }
  } catch (error) {
    console.error(`Error deleting blog post with ID ${id}:`, error)
    return { success: false, error: "Failed to delete blog post" }
  }
}

export async function getBlogPosts() {
  try {
    return await BlogModel.findAll()
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function getBlogPost(id: number) {
  try {
    return await BlogModel.findById(id)
  } catch (error) {
    console.error(`Error fetching blog post with ID ${id}:`, error)
    return null
  }
}
