import type { Article, User } from "@/lib/types"

// Mock data for frontend-only implementation
const mockCategories = [
  { id: "ai", name: "Artificial Intelligence" },
  { id: "ml", name: "Machine Learning" },
  { id: "robotics", name: "Robotics" },
  { id: "nlp", name: "Natural Language Processing" },
  { id: "cv", name: "Computer Vision" },
]

const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "ha8028377@gmail.com",
    role: "superadmin",
    isActive: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    isActive: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    isActive: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Generate mock articles
const mockArticles: Article[] = Array.from({ length: 20 }).map((_, index) => {
  const categoryIndex = index % mockCategories.length
  const userIndex = index % mockUsers.length
  const isNew = index < 5
  const date = new Date()
  date.setDate(date.getDate() - index)

  return {
    id: `article-${index + 1}`,
    title: `The Future of ${mockCategories[categoryIndex].name} in ${2023 + index}`,
    slug: `the-future-of-${mockCategories[categoryIndex].id}-in-${2023 + index}`,
    excerpt: `Discover the latest advancements and trends in ${mockCategories[categoryIndex].name} that are shaping the future of technology.`,
    content: `
      <h2>Introduction to ${mockCategories[categoryIndex].name}</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
      
      <h2>Current Trends</h2>
      <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <pre><code class="language-javascript">
      // Example code
      function analyzeData(data) {
        return data.map(item => {
          return {
            ...item,
            score: calculateScore(item)
          };
        });
      }
      </code></pre>
      
      <h2>Future Implications</h2>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h2>Conclusion</h2>
      <p>As we've seen, the field of ${mockCategories[categoryIndex].name} is rapidly evolving and will continue to transform various industries in the coming years.</p>
    `,
    image: `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(mockCategories[categoryIndex].name)}`,
    publishedAt: date.toISOString(),
    author: mockUsers[userIndex],
    category: mockCategories[categoryIndex],
    categoryId: mockCategories[categoryIndex].id,
    isNew,
    views: Math.floor(Math.random() * 1000) + 100,
  }
})

// API functions
export async function getArticles({ page = 1, search = "", category = "" }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const pageSize = 9
  let filteredArticles = [...mockArticles]

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase()
    filteredArticles = filteredArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchLower) || article.excerpt.toLowerCase().includes(searchLower),
    )
  }

  // Apply category filter
  if (category) {
    filteredArticles = filteredArticles.filter((article) => article.categoryId === category)
  }

  // Paginate results
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

  return {
    articles: paginatedArticles,
    hasMore: endIndex < filteredArticles.length,
    total: filteredArticles.length,
  }
}

export async function getArticleBySlug(slug: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return mockArticles.find((article) => article.slug === slug) || null
}

export async function getNewArticles() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return mockArticles
    .filter((article) => article.isNew)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export async function getRelatedArticles(currentSlug: string, categoryId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  return mockArticles.filter((article) => article.slug !== currentSlug && article.categoryId === categoryId).slice(0, 3)
}

export async function getAdminArticles(showAllArticles = false) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  // Get current user from localStorage
  const storedUser = localStorage.getItem("user")
  let currentUser: User | null = null

  if (storedUser) {
    try {
      currentUser = JSON.parse(storedUser)
    } catch (error) {
      console.error("Failed to parse stored user:", error)
    }
  }

  if (!currentUser) {
    return []
  }

  // If superadmin and showAllArticles is true, return all articles
  if (currentUser.role === "superadmin" && showAllArticles) {
    return mockArticles
  }

  // Otherwise, return only articles by the current user
  return mockArticles.filter((article) => article.author.id === currentUser?.id)
}

export async function createArticle({ title, excerpt, content, categoryId, image }: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Get current user from localStorage
  const storedUser = localStorage.getItem("user")
  let currentUser: User | null = null

  if (storedUser) {
    try {
      currentUser = JSON.parse(storedUser)
    } catch (error) {
      console.error("Failed to parse stored user:", error)
    }
  }

  if (!currentUser) {
    throw new Error("User not authenticated")
  }

  // Create a new article
  const category = mockCategories.find((cat) => cat.id === categoryId)

  if (!category) {
    throw new Error("Invalid category")
  }

  const newArticle: Article = {
    id: `article-${mockArticles.length + 1}`,
    title,
    slug: title.toLowerCase().replace(/\s+/g, "-"),
    excerpt,
    content,
    image: URL.createObjectURL(image), // In a real app, this would be an uploaded image URL
    publishedAt: new Date().toISOString(),
    author: currentUser,
    category,
    categoryId,
    isNew: true,
    views: 0,
  }

  // In a real app, this would be an API call to create the article
  mockArticles.unshift(newArticle)

  return newArticle
}

export async function deleteArticle(articleId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In a real app, this would be an API call to delete the article
  const index = mockArticles.findIndex((article) => article.id === articleId)

  if (index === -1) {
    throw new Error("Article not found")
  }

  mockArticles.splice(index, 1)

  return { success: true }
}

export async function getDashboardStats(isSuperAdmin = false) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  // Get current user from localStorage
  const storedUser = localStorage.getItem("user")
  let currentUser: User | null = null

  if (storedUser) {
    try {
      currentUser = JSON.parse(storedUser)
    } catch (error) {
      console.error("Failed to parse stored user:", error)
    }
  }

  if (!currentUser) {
    throw new Error("User not authenticated")
  }

  // Calculate stats
  let userArticles = mockArticles

  if (!isSuperAdmin) {
    userArticles = mockArticles.filter((article) => article.author.id === currentUser?.id)
  }

  const totalArticles = userArticles.length
  const totalViews = userArticles.reduce((sum, article) => sum + article.views, 0)
  const recentArticles = userArticles.filter(
    (article) => new Date(article.publishedAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000,
  ).length

  return {
    totalArticles,
    totalViews,
    totalUsers: mockUsers.length,
    recentArticles,
  }
}

export async function getAdminUsers() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  return mockUsers
}

export async function updateUserStatus(userId: string, isActive: boolean) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const userIndex = mockUsers.findIndex((user) => user.id === userId)

  if (userIndex === -1) {
    throw new Error("User not found")
  }

  mockUsers[userIndex].isActive = isActive

  return { success: true }
}

export async function createUser({ name, email, password }: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newUser: User = {
    id: `user-${mockUsers.length + 1}`,
    name,
    email,
    role: "admin",
    isActive: true,
    avatar: "/placeholder.svg?height=40&width=40",
  }

  mockUsers.push(newUser)

  return newUser
}
