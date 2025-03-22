"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getArticle, getArticles } from "@/services/articleService"
import Link from "next/link"
import ReactMarkdown from "react-markdown"

// Define the article type
type Article = {
  id: number
  title: string
  content: string
  generated_at: string
  tags?: string[]
  category: string
}

const ArticlePage = () => {
  const params = useParams()
  const id = params.id
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchArticleData() {
      if (!id) return

      try {
        setLoading(true)

        // First, get all articles to find the one with matching ID
        const allArticles = await getArticles()
        const articleMetadata = allArticles.find((a) => a.id === Number(id))

        if (!articleMetadata) {
          setError("Article not found")
          setLoading(false)
          return
        }

        // Then get the content for this specific article
        const content = await getArticle(Number(id))

        // Create a complete article object by combining metadata and content
        const fullArticle = {
          ...articleMetadata,
          content: typeof content === "string" ? content : content[0],
        }

        setArticle(fullArticle)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching article:", err)
        setError("Failed to load article")
        setLoading(false)
      }
    }

    fetchArticleData()
  }, [id])

  if (loading) {
    return (
      <div className="newsletter-container py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-pulse text-xl">Loading...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="newsletter-container py-8">
        <div className="flex flex-col justify-center items-center min-h-[50vh]">
          <div className="text-red-500 mb-4">{error}</div>
          <Link href="/" className="cta-button">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="newsletter-container py-8">
        <div className="flex flex-col justify-center items-center min-h-[50vh]">
          <div className="mb-4">Article not found</div>
          <Link href="/" className="cta-button">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  // Safely format the date
  const formattedDate = article.generated_at
    ? new Date(article.generated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date available"

  return (
    <div className="newsletter-container py-8">
      <article className="article-page">
        <h1 className="article-title text-4xl font-bold mb-6">{article.title}</h1>
        <div className="article-meta mb-6">
          <span className="article-date block mb-2">{formattedDate}</span>
          <span className="article-category block mb-2">Category: {article.category || "Uncategorized"}</span>
          {article.tags && Array.isArray(article.tags) && article.tags.length > 0 && (
            <div className="article-tags">
              Tags:{" "}
              {article.tags.map((tag, index) => (
                <span key={index} className="article-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="article-content prose prose-lg max-w-none">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
        <div className="mt-8">
          <Link href="/" className="cta-button">
            Back to Home
          </Link>
        </div>
      </article>
    </div>
  )
}

export default ArticlePage