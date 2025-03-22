"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getArticle, getArticles } from "@/services/articleService"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import MarkdownRenderer from "@/components/markdown-renderer"
import ParticleButton  from "@/components/kokonutui/particle-button"

// Define the article type
type Article = {
  id: number
  title: string
  content: string
  generated_content?: string
  generated_at: string
  tags?: string[]
  category: string
  imageUrl?: string
  excerpt?: string
}

export default function ArticlePage() {
  const params = useParams()
  const id = params.id
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticleData() {
      if (!id) return

      try {
        setLoading(true)

        // First, get all articles to find the one with matching ID
        const allArticles = await getArticles()
        const articleMetadata = allArticles.find((a: any) => a.id === Number(id))

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
      } catch (err: any) {
        console.error("Error fetching article:", err)
        setError(err?.message || "Failed to load article")
        setLoading(false)
      }
    }

    fetchArticleData()
  }, [id])

  if (loading) {
    return (
      <div className="newsletter-container py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-pulse text-xl">Loading article...</div>
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
            <ArrowLeft className="mr-2 h-4 w-4" />
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
            <ArrowLeft className="mr-2 h-4 w-4" />
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

  // Use generated_content if available, otherwise fall back to content
  const articleContent = article.generated_content || article.content

  return (
    <div className="newsletter-container py-8 fade-in">
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

        <div className="mb-8">
          {article.imageUrl ? (
            <Image
              src={article.imageUrl || "/placeholder.svg"}
              alt={article.title}
              className="article-image rounded-lg shadow-md"
              width={800}
              height={400}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          ) : (
            <Image
              src="/placeholder.svg"
              alt="Placeholder image"
              className="article-image rounded-lg shadow-md"
              width={800}
              height={400}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          )}
        </div>

        <div className="article-content slide-in">
          <MarkdownRenderer content={articleContent} />
        </div>

        <div className="mt-8">
            <ParticleButton
                className="cta-button"
                color-brand-primary="true"
                onClick={() => window.history.back()}
            >
                <span>Go Back</span>
                            <ArrowLeft className="h-4 w-4 ml-2" />

            </ParticleButton>


        </div>
      </article>
    </div>
  )
}

