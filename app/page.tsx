"use client"

import { getArticles, searchArticles } from "@/services/articleService"
import { LineShadowText } from "@/components/magicui/line-shadow-text"
import ScrollToTopButton from "@/components/ScrollToTopButton"
import SearchInput  from "@/components/SearchInput"
import ParticleButton  from "@/components/kokonutui/particle-button"
import MarkdownRenderer from "@/components/markdown-renderer"
import { MousePointerClick } from "lucide-react"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

type Article = {
  id: number
  title: string
  content: string
  generated_at: string
  tags?: string[]
  category: string
  imageUrl?: string;
}

const Home = () => {
  const [articles, setArticles] = useState<Article[] | null>(null); // Initialize as null to indicate loading state
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialArticles = async () => {
      setLoading(true); //Start loading
      try {
        const initialArticles = await getArticles();
        setArticles(initialArticles || []);
        setFilteredArticles(initialArticles || []);
      } catch (error) {
        console.error("Error fetching initial articles:", error);
        setArticles([]); // Set to empty array on error for safe rendering
        setFilteredArticles([]);
      } finally {
        setLoading(false); //End loading regardless of success or failure
      }
    };

    loadInitialArticles();
  }, []);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setFilteredArticles(articles || []); // Default to empty array if articles is null
      } else {
        try {
          const searchResults = await searchArticles(searchQuery)
          setFilteredArticles(searchResults);
        } catch (error) {
          console.error("Error searching articles with new endpoint:", error);
          setFilteredArticles([]); // Set to empty array on error
        }
      }
    }

    fetchSearchResults();
  }, [searchQuery, articles]);

  const handleReadMoreClick = async (e: React.MouseEvent<HTMLButtonElement>, articleId: number) => {
      // Add any specific logic you want to perform on click before navigating
      console.log(`Read More clicked for article ID: ${articleId}`);
  };


  if (loading) {
      return (
        <div className="newsletter-container py-8">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-pulse text-xl">Loading articles... Please wait</div>
          </div>
        </div>
      )
    }

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
        {/* Search Input Field */}
        <div className="search-container">
          <SearchInput
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search articles..."
          />
        </div>
        {/* Hero Image Section */}
        <section className="hero-image-section">
          <Image
            src="/images/hero-image.jpg"
            alt="TheDrop - Hip Hop Newsletter"
            className="hero-image"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </section>
        {articles && articles.length > 0 ? (
          <div className="articles-wrapper">
            {filteredArticles.map((article) => (
              <article key={article.id} className="article-section slide-in">
                {/* Use <article> for semantic correctness */}
                <h2 className="article-title fade-in">{article.title}</h2>
                <Image
                  src={article.imageUrl || "/placeholder.svg"}
                  alt={article.title}
                  className="article-image fade-in"
                  width={400}
                  height={200}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="article-content fade-in">
                  <MarkdownRenderer content={article.excerpt} />
                </div>
            <div className="article-meta fade-in">

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
              <ParticleButton
                className="cta-button"
                color-brand-primary="true"
                onClick={(e) => handleReadMoreClick(e, article.id)} // Pass article id
              >
                <Link href={`/article/${article.id}`} className="flex items-center">
                  <span>Read More</span>
                  <MousePointerClick className="h-4 w-4 ml-2" />
                </Link>
              </ParticleButton>
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
