import Image from "next/image"
import type { User } from "@/lib/types"

interface AuthorInfoProps {
  author: User
}

export default function AuthorInfo({ author }: AuthorInfoProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative h-10 w-10 overflow-hidden rounded-full">
        <Image
          src={author.avatar || "/placeholder.svg?height=40&width=40"}
          alt={author.name}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <p className="text-sm font-medium">{author.name}</p>
        <p className="text-xs text-muted-foreground">{author.role}</p>
      </div>
    </div>
  )
}
