import { redirect } from "next/navigation"
import AdminDashboard from "@/components/admin/admin-dashboard"

// In a real app, you'd check authentication here
async function checkAuth() {
  // Simulate auth check
  return true
}

export default async function AdminPage() {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return <AdminDashboard />
}
