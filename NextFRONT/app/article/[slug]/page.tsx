import { Suspense } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/utils"
import { getArticleBySlug } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import RelatedArticles from "@/components/article/related-articles"
import AuthorInfo from "@/components/article/author-info"
import ArticleContent from "@/components/article/article-content"
import ShareButtons from "@/components/article/share-buttons"

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold">{article.title}</h1>

        <div className="mb-6 flex items-center justify-between">
          <AuthorInfo author={article.author} />
          <time className="text-sm text-muted-foreground">{formatDate(article.publishedAt)}</time>
        </div>

        <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" priority />
        </div>

        <ArticleContent content={article.content} />

        <div className="my-8 border-t border-b py-4">
          <ShareButtons slug={params.slug} title={article.title} />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <RelatedArticles currentSlug={params.slug} categoryId={article.categoryId} />
        </Suspense>
      </div>
    </article>
  )
}
