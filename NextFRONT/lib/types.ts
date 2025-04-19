export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "superadmin"
  isActive: boolean
  avatar: string | null
}

export interface Category {
  id: string
  name: string
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  publishedAt: string
  author: User
  category: Category
  categoryId: string
  isNew: boolean
  views: number
}
