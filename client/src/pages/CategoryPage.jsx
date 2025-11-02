import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { articlesAPI } from '../lib/api';
import ArticleCard from '../components/ui/ArticleCard';
import Pagination from '../components/ui/Pagination';
import { ArticleListSkeleton } from '../components/ui/Skeleton';
import Sidebar from '../components/layout/Sidebar';

export default function CategoryPage({ category }) {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await articlesAPI.getAll({ category, page: currentPage, pageSize: 12 });
        setArticles(data.articles);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryNames = {
    bollywood: 'Bollywood',
    hollywood: 'Hollywood',
    ott: 'OTT',
    tv: 'TV Shows',
    music: 'Music',
    reviews: 'Reviews',
  };

  const categoryEmojis = {
    bollywood: '🎬',
    hollywood: '🎥',
    ott: '📺',
    tv: '📻',
    music: '🎵',
    reviews: '⭐',
  };

  return (
    <>
      <Helmet>
        <title>{categoryNames[category]} News - EntertainIndia</title>
        <meta name="description" content={`Latest ${categoryNames[category]} news, updates, and entertainment stories.`} />
      </Helmet>

      <div className="bg-primary-600 text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-heading font-bold flex items-center gap-3">
            <span>{categoryEmojis[category]}</span>
            {categoryNames[category]}
          </h1>
          <p className="text-primary-100 mt-2">
            Latest news and updates from {categoryNames[category]}
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {loading ? (
              <ArticleListSkeleton count={12} />
            ) : articles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>

                {pagination && pagination.pageCount > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={pagination.pageCount}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No articles found in this category.</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
