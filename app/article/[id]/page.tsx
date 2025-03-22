import { getArticle } from "../../../services/articleService";
import Image from "next/image";

type Article = {
  id: number;
  title: string;
  content: string;
  generated_at: string;
  tags?: string[];
  category: string;
  imageUrl?: string;
};

const ArticlePage = async ({ params }: { params: { id: string } }) => {
  const article: Article | undefined = await getArticle(Number(params.id));

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <div className="article-page">
      <h1 className="article-title">{article.title}</h1>
      <Image
        src={article.imageUrl || "/placeholder.svg"}
        alt={article.title}
        className="article-image"
        width={800}
        height={400}
        style={{ width: "100%", height: "auto" }}
      />
      <p className="article-content">{article.content}</p>
      <div className="article-meta">
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
    </div>
  );
};

export default ArticlePage;
