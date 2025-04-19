import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import NewArticlesList from "@/components/article/new-articles-list"

export default function NewArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">New Articles</h1>

      <Suspense
        fallback={
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
        }
      >
        <NewArticlesList />
      </Suspense>
    </div>
  )
}
