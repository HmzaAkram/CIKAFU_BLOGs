"use client"

import { useState, useEffect } from "react"
import { BarChart, Users, FileText, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardStats } from "@/lib/api"

interface DashboardStatsProps {
  isSuperAdmin?: boolean
}

export default function DashboardStats({ isSuperAdmin = false }: DashboardStatsProps) {
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalViews: 0,
    totalUsers: 0,
    recentArticles: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const result = await getDashboardStats(isSuperAdmin)
        setStats(result)
      } catch (error) {
        console.error("Failed to load dashboard stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [isSuperAdmin])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
          ) : (
            <div className="text-2xl font-bold">{stats.totalArticles}</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
          ) : (
            <div className="text-2xl font-bold">{stats.totalViews}</div>
          )}
        </CardContent>
      </Card>

      {isSuperAdmin && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
            ) : (
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Articles</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
          ) : (
            <div className="text-2xl font-bold">{stats.recentArticles}</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
