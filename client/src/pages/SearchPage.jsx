import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { articlesAPI } from '../lib/api';
import ArticleCard from '../components/ui/ArticleCard';
import Pagination from '../components/ui/Pagination';
import { ArticleListSkeleton } from '../components/ui/Skeleton';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      try {
        const data = await articlesAPI.getAll({ search: query, page: currentPage, pageSize: 12 });
        setArticles(data.articles);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, currentPage]);

  return (
    <>
      <Helmet>
        <title>Search Results for "{query}" - EntertainIndia</title>
      </Helmet>

      <div className="bg-gray-100 py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-heading font-bold">
            Search Results for: <span className="text-primary-600">"{query}"</span>
          </h1>
          {pagination && (
            <p className="text-gray-600 mt-2">
              Found {pagination.total} article{pagination.total !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <div className="container-custom py-8">
        {loading ? (
          <ArticleListSkeleton count={12} />
        ) : articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {pagination && pagination.pageCount > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.pageCount}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found for your search.</p>
          </div>
        )}
      </div>
    </>
  );
}
