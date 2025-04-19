"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import ArticleCard from "@/components/article/article-card"
import { Button } from "@/components/ui/button"
import { getArticles } from "@/lib/api"
import type { Article } from "@/lib/types"

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()

  const search = searchParams.get("search") || ""
  const category = searchParams.get("category") || ""

  useEffect(() => {
    // Reset pagination when search or category changes
    setPage(1)
    setArticles([])
    setHasMore(true)
    loadArticles(1)
  }, [search, category])

  async function loadArticles(pageNum: number) {
    if (isLoading) return

    setIsLoading(true)

    try {
      const result = await getArticles({
        page: pageNum,
        search,
        category,
      })

      if (pageNum === 1) {
        setArticles(result.articles)
      } else {
        setArticles((prev) => [...prev, ...result.articles])
      }

      setHasMore(result.hasMore)
    } catch (error) {
      console.error("Failed to load articles:", error)
    } finally {
      setIsLoading(false)
    }
  }

  function loadMore() {
    const nextPage = page + 1
    setPage(nextPage)
    loadArticles(nextPage)
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {articles.length === 0 && !isLoading && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No articles found</p>
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={loadMore} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  )
}
