"use client"

import { useEffect, useRef } from "react"
import Prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-python"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-json"

interface ArticleContentProps {
  content: string
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      Prism.highlightAllUnder(contentRef.current)
    }
  }, [content])

  return (
    <div
      ref={contentRef}
      className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-code:rounded-md prose-code:bg-muted prose-code:p-1 prose-pre:bg-muted"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
