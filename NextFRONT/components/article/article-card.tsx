import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { Article } from "@/lib/types"

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border transition-all hover:shadow-md">
      <Link href={`/article/${article.slug}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {article.isNew && <Badge className="absolute right-2 top-2">New</Badge>}
        </div>

        <div className="p-4">
          <h3 className="mb-2 line-clamp-2 text-xl font-semibold group-hover:text-primary">{article.title}</h3>

          <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{article.excerpt}</p>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{article.author.name}</span>
            <time>{formatDate(article.publishedAt)}</time>
          </div>
        </div>
      </Link>
    </div>
  )
}
