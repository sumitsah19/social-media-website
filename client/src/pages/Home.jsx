import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { articlesAPI } from '../lib/api';
import ArticleCard from '../components/ui/ArticleCard';
import { ArticleListSkeleton } from '../components/ui/Skeleton';
import Sidebar from '../components/layout/Sidebar';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [categoryArticles, setCategoryArticles] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch featured articles
        const featuredData = await articlesAPI.getAll({ featured: true, pageSize: 6 });
        setFeatured(featuredData.articles);

        // Fetch latest articles
        const latestData = await articlesAPI.getAll({ pageSize: 12 });
        setLatest(latestData.articles);

        // Fetch articles by category
        const categories = ['bollywood', 'ott', 'tv', 'music'];
        const categoryData = {};
        
        for (const category of categories) {
          const data = await articlesAPI.getAll({ category, pageSize: 4 });
          categoryData[category] = data.articles;
        }
        
        setCategoryArticles(categoryData);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>EntertainIndia - Latest Bollywood, Hollywood & OTT News</title>
        <meta name="description" content="Your source for latest entertainment news from Bollywood, Hollywood, OTT platforms, TV shows, music, and celebrity updates." />
      </Helmet>

      <div className="container-custom py-8">
        {/* Hero Section - Featured Articles */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-heading font-bold">⭐ Featured Stories</h2>
          </div>
          
          {loading ? (
            <ArticleListSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((article) => (
                <ArticleCard key={article.id} article={article} featured />
              ))}
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            {/* Latest Articles */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold">📰 Latest News</h2>
              </div>
              
              {loading ? (
                <ArticleListSkeleton count={6} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {latest.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </section>

            {/* Bollywood */}
            {categoryArticles.bollywood && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold">🎬 Bollywood</h2>
                  <Link to="/bollywood" className="text-primary-600 hover:text-primary-700 font-medium">
                    View All →
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryArticles.bollywood.slice(0, 4).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}

            {/* OTT */}
            {categoryArticles.ott && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold">📺 OTT</h2>
                  <Link to="/ott" className="text-primary-600 hover:text-primary-700 font-medium">
                    View All →
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryArticles.ott.slice(0, 4).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}

            {/* TV */}
            {categoryArticles.tv && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold">📻 TV Shows</h2>
                  <Link to="/tv" className="text-primary-600 hover:text-primary-700 font-medium">
                    View All →
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryArticles.tv.slice(0, 4).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}

            {/* Music */}
            {categoryArticles.music && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold">🎵 Music</h2>
                  <Link to="/music" className="text-primary-600 hover:text-primary-700 font-medium">
                    View All →
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryArticles.music.slice(0, 4).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
