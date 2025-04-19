"use client"

import { useState, useEffect } from "react"
import ArticleCard from "@/components/article/article-card"
import { getNewArticles } from "@/lib/api"
import type { Article } from "@/lib/types"

export default function NewArticlesList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadNewArticles() {
      try {
        const result = await getNewArticles()
        setArticles(result)
      } catch (error) {
        console.error("Failed to load new articles:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadNewArticles()
  }, [])

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4">Loading new articles...</p>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No new articles found</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}
