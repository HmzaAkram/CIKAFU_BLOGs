"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ImagePlus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { createArticle } from "@/lib/api"

const categories = [
  { id: "ai", name: "Artificial Intelligence" },
  { id: "ml", name: "Machine Learning" },
  { id: "robotics", name: "Robotics" },
  { id: "nlp", name: "Natural Language Processing" },
  { id: "cv", name: "Computer Vision" },
]

const articleSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  excerpt: z.string().min(10, { message: "Excerpt must be at least 10 characters" }),
  content: z.string().min(50, { message: "Content must be at least 50 characters" }),
  categoryId: z.string().min(1, { message: "Please select a category" }),
})

type ArticleFormValues = z.infer<typeof articleSchema>

export default function ArticleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { toast } = useToast()

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      categoryId: "",
    },
  })

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function onSubmit(data: ArticleFormValues) {
    if (!imageFile) {
      toast({
        variant: "destructive",
        title: "Image required",
        description: "Please upload an image for the article",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await createArticle({
        ...data,
        image: imageFile,
      })

      toast({
        title: "Article created",
        description: "Your article has been successfully created",
      })

      // Reset form
      form.reset()
      setImageFile(null)
      setImagePreview(null)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create article",
        description: "An error occurred while creating the article",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Create New Article</h2>
        <p className="text-sm text-muted-foreground">Fill in the details below to create a new article</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter article title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea placeholder="Brief description of the article" className="resize-none" {...field} />
                </FormControl>
                <FormDescription>This will be displayed on the article card</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write your article content here..." className="min-h-[300px]" {...field} />
                </FormControl>
                <FormDescription>You can use HTML tags for formatting</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel htmlFor="image">Featured Image</FormLabel>
            <div className="mt-2 grid gap-6 md:grid-cols-2">
              <div>
                <div className="flex h-32 w-full cursor-pointer items-center justify-center rounded-md border border-dashed">
                  <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  <label
                    htmlFor="image"
                    className="flex cursor-pointer flex-col items-center justify-center p-4 text-center"
                  >
                    <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
                    <span className="text-sm font-medium">Click to upload image</span>
                    <span className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 2MB)</span>
                  </label>
                </div>
              </div>

              {imagePreview && (
                <div className="relative h-32 overflow-hidden rounded-md border">
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
            {!imageFile && <p className="mt-2 text-sm text-destructive">Please upload an image for the article</p>}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Article"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
