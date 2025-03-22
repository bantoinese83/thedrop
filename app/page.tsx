import { getArticles } from "../services/articleService"
import { LineShadowText } from "../components/magicui/line-shadow-text"
import ScrollToTopButton from "../components/ScrollToTopButton"

import Image from "next/image"
import Link from "next/link"

type Article = {
  id: number
  title: string
  content: string
  generated_at: string
  tags?: string[]
  category: string
  imageUrl?: string;
}

const Home = async () => {
  const articles: Article[] | undefined = await getArticles()

  return (
    <div>
      {/* Root div (needed for layout) */}
      <div className="newsletter-container">
        {/* Newsletter Container */}
        {/* Newsletter Header */}
        <header className="newsletter-header">
          <h1 className="newsletter-title">
            <span className="newsletter-title-prefix">The </span>
            <LineShadowText text="Drop" />
          </h1>
          <p className="newsletter-tagline">Your Daily Dose of Hip-Hop Culture</p>
          {/* You could add a logo here if you have one */}
          {/* <img src="/logo.png" alt="TheDrop Logo" className="newsletter-logo" /> */}
        </header>
        {/* Hero Image Section */}
        <section className="hero-image-section">
          <Image
            src="/images/hero-image.jpg" // Replace with your actual image URL
            alt="TheDrop - Hip Hop Newsletter"
            className="hero-image"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto" }}
          />
        </section>
        {articles && articles.length > 0 ? (
          <div className="articles-wrapper">
            {/* Wrapper for articles for potential layout adjustments */}
            {articles.map((article) => (
              <article key={article.id} className="article-section">
                {/* Use <article> for semantic correctness */}
                <h2 className="article-title">{article.title}</h2>
                {/* Future enhancement: Article Image */}
                <Image
                  src={article.imageUrl || "/placeholder.svg"}
                  alt={article.title}
                  className="article-image"
                  width={400}
                  height={200}
                  style={{ width: "100%", height: "auto" }}
                />
                <p className="article-excerpt">{article.generated_content.substring(0, 800)}...</p>
                <div className="article-meta">
                  {/* Meta information container */}
                  <span className="article-date">
                    {new Date(article.generated_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="article-category">Category: {article.category}</span>
                  {article.tags && Array.isArray(article.tags) && (
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
                <Link href={`/article/${article.id}`} className="cta-button">
                  Read More
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p>No articles available yet. Check back soon!</p>
        )}
        <footer className="newsletter-footer">
          <p> {new Date().getFullYear()} TheDrop. All rights reserved.</p>
          <a href="/unsubscribe">Unsubscribe</a> | <a href="/privacy">Privacy Policy</a>
        </footer>
      </div>
      <ScrollToTopButton />
    </div>
  )
}

export default Home
