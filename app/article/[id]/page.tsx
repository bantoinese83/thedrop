"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getArticle } from "@/services/articleService"
import Link from "next/link"

const ArticlePage = () => {
  const params = useParams()
  const id = params.id
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      setLoading(true)
      getArticle(Number(id))
        .then((data) => {
          setArticle(data)
          setLoading(false)
        })
        .catch((err) => {
          console.error("Error fetching article:", err)
          setError("Failed to load article")
          setLoading(false)
        })
    }
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

  return (
    <div className="newsletter-container py-8">
      <article className="article-page">
        <h1 className="article-title text-4xl font-bold mb-6">{article.title}</h1>
        <div className="article-meta mb-6">
          <span className="article-date block mb-2">
            {new Date(article.generated_at).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="article-category block mb-2">Category: {article.category}</span>
          <div className="article-tags">
            Tags:{" "}
            {article.tags.map((tag, index) => (
              <span key={index} className="article-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="article-content prose prose-lg max-w-none">
          <p>{article.content}</p>
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

