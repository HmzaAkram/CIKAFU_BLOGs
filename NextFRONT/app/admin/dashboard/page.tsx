"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ArticleForm from "@/components/admin/article-form"
import AdminArticleList from "@/components/admin/admin-article-list"
import DashboardStats from "@/components/admin/dashboard-stats"

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    } else {
      setIsLoading(false)
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-8">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, <span className="font-medium">{user?.name}</span>
        </p>
      </div>

      <DashboardStats />

      <Tabs defaultValue="articles" className="mt-8">
        <TabsList className="mb-4">
          <TabsTrigger value="articles">My Articles</TabsTrigger>
          <TabsTrigger value="create">Create New Article</TabsTrigger>
        </TabsList>

        <TabsContent value="articles">
          <AdminArticleList />
        </TabsContent>

        <TabsContent value="create">
          <ArticleForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
