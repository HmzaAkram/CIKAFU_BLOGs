"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Edit, Trash2, Eye } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { getAdminArticles, deleteArticle } from "@/lib/api"
import type { Article } from "@/lib/types"

interface AdminArticleListProps {
  showAllArticles?: boolean
}

export default function AdminArticleList({ showAllArticles = false }: AdminArticleListProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadArticles()
  }, [showAllArticles])

  async function loadArticles() {
    setIsLoading(true)

    try {
      const result = await getAdminArticles(showAllArticles)
      setArticles(result)
    } catch (error) {
      console.error("Failed to load articles:", error)
      toast({
        variant: "destructive",
        title: "Failed to load articles",
        description: "An error occurred while loading articles",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDeleteArticle() {
    if (!articleToDelete) return

    try {
      await deleteArticle(articleToDelete)

      toast({
        title: "Article deleted",
        description: "The article has been successfully deleted",
      })

      // Remove the deleted article from the list
      setArticles((prev) => prev.filter((article) => article.id !== articleToDelete))
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete article",
        description: "An error occurred while deleting the article",
      })
    } finally {
      setArticleToDelete(null)
    }
  }

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4">Loading articles...</p>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No articles found</p>
      </div>
    )
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell>
                <div className="relative h-12 w-16 overflow-hidden rounded-md">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                </div>
              </TableCell>
              <TableCell className="font-medium">{article.title}</TableCell>
              <TableCell>{article.category.name}</TableCell>
              <TableCell>{formatDate(article.publishedAt)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/article/${article.slug}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/admin/articles/edit/${article.id}`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => setArticleToDelete(article.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the article.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setArticleToDelete(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteArticle}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
