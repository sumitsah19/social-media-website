import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { formatDate } from '../../lib/helpers';

export default function Sidebar() {
  const { popular } = useStore();

  return (
    <aside className="space-y-8">
      {/* Popular News */}
      <div className="card p-6">
        <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
          <span>🔥</span> Popular News
        </h3>
        <div className="space-y-4">
          {popular.slice(0, 5).map((article, index) => (
            <Link
              key={article.id}
              to={`/article/${article.slug}`}
              className="flex gap-3 group"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm">
                {index + 1}
              </span>
              <div className="flex-1">
                <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {article.title}
                </h4>
                <span className="text-xs text-gray-500 mt-1 block">
                  {formatDate(article.publishDate, 'relative')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Ad Placeholder */}
      <div className="card p-6 bg-gray-100 text-center">
        <p className="text-sm text-gray-500 mb-2">Advertisement</p>
        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">300 x 250</span>
        </div>
      </div>

      {/* Social Links */}
      <div className="card p-6">
        <h3 className="font-heading font-bold text-lg mb-4">
          Follow Us
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <a
            href="#"
            className="flex items-center justify-center gap-2 p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <span>📘</span>
            <span className="text-sm font-medium">Facebook</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-center gap-2 p-3 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-colors"
          >
            <span>🐦</span>
            <span className="text-sm font-medium">Twitter</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-center gap-2 p-3 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition-colors"
          >
            <span>📷</span>
            <span className="text-sm font-medium">Instagram</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <span>📺</span>
            <span className="text-sm font-medium">YouTube</span>
          </a>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="card p-6 bg-gradient-to-br from-primary-50 to-primary-100">
        <h3 className="font-heading font-bold text-lg mb-2">
          📬 Newsletter
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Get the latest entertainment news in your inbox
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            className="w-full btn-primary"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Tags Cloud */}
      <div className="card p-6">
        <h3 className="font-heading font-bold text-lg mb-4">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Bollywood', 'Netflix', 'Reviews', 'Box Office', 'Trailer', 'Interview', 'Awards', 'OTT'].map((tag) => (
            <Link
              key={tag}
              to={`/tag/${tag.toLowerCase().replace(' ', '-')}`}
              className="badge bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
