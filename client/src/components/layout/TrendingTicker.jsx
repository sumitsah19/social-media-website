import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function TrendingTicker({ articles }) {
  const [isPaused, setIsPaused] = useState(false);
  const tickerRef = useRef(null);

  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden">
      <div className="container-custom flex items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="bg-primary-600 px-3 py-1 rounded text-xs font-bold">
            🔥 TRENDING
          </span>
        </div>
        
        <div 
          className="flex-1 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            ref={tickerRef}
            className={`flex gap-8 ${isPaused ? '' : 'animate-scroll'}`}
            style={{
              animation: isPaused ? 'none' : 'scroll 30s linear infinite',
            }}
          >
            {[...articles, ...articles].map((article, index) => (
              <Link
                key={`${article.id}-${index}`}
                to={`/article/${article.slug}`}
                className="flex-shrink-0 hover:text-primary-400 transition-colors"
              >
                <span className="text-sm">
                  {article.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx="true">{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
