"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
      }
    }

    setIsLoading(false)
  }, [])

  async function login(email: string, password: string) {
    // This is a mock login function for frontend-only implementation
    // In a real app, this would make an API call to authenticate

    // Mock credentials for testing
    if (email === "ha8028377@gmail.com" && password === "1525228") {
      const mockUser: User = {
        id: "1",
        name: "Admin User",
        email: "ha8028377@gmail.com",
        role: "superadmin",
        isActive: true,
        avatar: "/placeholder.svg?height=40&width=40",
      }

      // Store user and token in localStorage
      localStorage.setItem("user", JSON.stringify(mockUser))
      localStorage.setItem("token", "mock-jwt-token")

      setUser(mockUser)
      setIsAuthenticated(true)

      return { success: true, user: mockUser }
    }

    return { success: false, error: "Invalid credentials" }
  }

  function logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
