"use client"

import { useState, useEffect } from "react"
import ArticleCard from "@/components/article/article-card"
import { getRelatedArticles } from "@/lib/api"
import type { Article } from "@/lib/types"

interface RelatedArticlesProps {
  currentSlug: string
  categoryId: string
}

export default function RelatedArticles({ currentSlug, categoryId }: RelatedArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadRelatedArticles() {
      try {
        const result = await getRelatedArticles(currentSlug, categoryId)
        setArticles(result)
      } catch (error) {
        console.error("Failed to load related articles:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRelatedArticles()
  }, [currentSlug, categoryId])

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No related articles found</p>
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
