import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { articlesAPI } from '../lib/api';
import ArticleCard from '../components/ui/ArticleCard';
import { ArticleListSkeleton } from '../components/ui/Skeleton';

export default function TagPage() {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await articlesAPI.getAll({ tag: slug, pageSize: 24 });
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching tag articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [slug]);

  return (
    <>
      <Helmet>
        <title>#{slug} - EntertainIndia</title>
      </Helmet>

      <div className="bg-primary-600 text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-heading font-bold">
            #{slug.replace(/-/g, ' ')}
          </h1>
          <p className="text-primary-100 mt-2">All articles tagged with this topic</p>
        </div>
      </div>

      <div className="container-custom py-8">
        {loading ? (
          <ArticleListSkeleton count={12} />
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found with this tag.</p>
          </div>
        )}
      </div>
    </>
  );
}
