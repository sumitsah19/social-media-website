import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/helpers';
import { getStrapiMedia } from '../../lib/constants';

export default function ArticleCard({ article, featured = false }) {
  if (!article) return null;

  const categoryColors = {
    bollywood: 'bg-pink-100 text-pink-700',
    hollywood: 'bg-purple-100 text-purple-700',
    ott: 'bg-blue-100 text-blue-700',
    tv: 'bg-green-100 text-green-700',
    music: 'bg-yellow-100 text-yellow-700',
    reviews: 'bg-red-100 text-red-700',
  };

  const cardClass = featured
    ? 'card overflow-hidden h-full group'
    : 'card overflow-hidden group';

  // Build the best image URL (medium → small → original)
  const imgUrl = getStrapiMedia(
    article?.heroImage?.formats?.medium?.url ||
    article?.heroImage?.formats?.small?.url ||
    article?.heroImage?.url
  );

  return (
    <article className={cardClass}>
      <Link to={`/article/${article.slug}`} className="block">
        {/* Image */}
        <div className={`relative overflow-hidden ${featured ? 'h-64' : 'h-48'}`}>
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={article?.heroImage?.alternativeText || article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-400 text-4xl">📰</span>
            </div>
          )}

          {/* Category badge */}
          {article.category && (
            <span className={`absolute top-3 left-3 badge ${categoryColors[article.category.slug] || 'bg-gray-100 text-gray-700'}`}>
              {article.category.name}
            </span>
          )}

          {/* Featured ribbon */}
          {article.featured && (
            <span className="absolute top-3 right-3 badge bg-primary-600 text-white">
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className={`font-heading font-bold mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors ${featured ? 'text-xl' : 'text-lg'}`}>
            {article.title}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-3 mb-3">
            {article.summary}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{formatDate(article.publishDate, 'relative')}</span>
            {article.readingTime && <span>{article.readingTime} min read</span>}
          </div>
        </div>
      </Link>
    </article>
  );
}
