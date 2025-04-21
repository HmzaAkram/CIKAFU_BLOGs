import { Suspense } from "react"
import ArticleList from "@/components/article/article-list"
import SearchBar from "@/components/search/search-bar"
import CategoryFilter from "@/components/search/category-filter"
import { Skeleton } from "@/components/ui/skeleton"
import HeroSection from "@/components/home/hero-section"
import TestApi from '../components/TestApi'; // yeh theek hai

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      {/* API Test Output */}
      <TestApi />

      <div className="my-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold">Latest Articles</h2>
        <div className="flex flex-col gap-4 md:flex-row">
          <SearchBar />
          <CategoryFilter />
        </div>
      </div>

      <Suspense fallback={<ArticleListSkeleton />}>
        <ArticleList />
      </Suspense>
    </div>
  )
}

function ArticleListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-col gap-4 rounded-lg border p-4">
            <Skeleton className="h-48 w-full rounded-md" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
    </div>
  )
}
