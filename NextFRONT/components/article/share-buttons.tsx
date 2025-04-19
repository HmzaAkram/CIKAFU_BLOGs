"use client"

import { Facebook, Linkedin, Twitter, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface ShareButtonsProps {
  slug: string
  title: string
}

export default function ShareButtons({ slug, title }: ShareButtonsProps) {
  const { toast } = useToast()
  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
  const articleUrl = `${baseUrl}/article/${slug}`

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(articleUrl)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl)
      toast({
        title: "Link copied!",
        description: "Article link copied to clipboard",
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description: "Could not copy the link to clipboard",
      })
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <p className="text-sm font-medium">Share this article</p>
      <div className="flex space-x-2">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            size="icon"
            onClick={() => window.open(link.url, "_blank")}
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="h-4 w-4" />
          </Button>
        ))}
        <Button variant="outline" size="icon" onClick={copyToClipboard} aria-label="Copy link">
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
