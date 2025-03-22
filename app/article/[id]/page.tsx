import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/articles/${id}`)
        .then(response => {
          setArticle(response.data);
        })
        .catch(error => {
          console.error('Error fetching article:', error);
        });
    }
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article-page">
      <h1 className="article-title">{article.title}</h1>
      <p className="article-content">{article.content}</p>
      <div className="article-meta">
        <span className="article-date">
          {new Date(article.generated_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <span className="article-category">
          Category: {article.category}
        </span>
        <div className="article-tags">
          Tags: {article.tags.map((tag, index) => (
            <span key={index} className="article-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
