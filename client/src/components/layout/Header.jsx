import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { CATEGORIES } from '../../lib/constants';
import { debounce } from '../../lib/helpers';
import TrendingTicker from './TrendingTicker';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery, trending } = useStore();
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debounced search
  useEffect(() => {
    const debouncedSearch = debounce((query) => {
      if (query.trim()) {
        setSearchQuery(query);
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    }, 500);

    if (localSearch) {
      debouncedSearch(localSearch);
    }
  }, [localSearch, navigate, setSearchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch);
      navigate(`/search?q=${encodeURIComponent(localSearch)}`);
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
      isScrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      {/* Top Bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container-custom flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span>📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary-100">About</a>
            <a href="#" className="hover:text-primary-100">Contact</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary-600">
              🎬 EntertainIndia
            </h1>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4">
            <input
              type="search"
              placeholder="Search news, celebrities, movies..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition-colors"
            >
              🔍
            </button>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`border-t border-b border-gray-200 ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
        <div className="container-custom">
          <ul className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-1 py-2">
            {CATEGORIES.map((category) => {
              const isActive = location.pathname === category.path;
              return (
                <li key={category.slug}>
                  <Link
                    to={category.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 md:py-2 font-medium transition-colors ${
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Trending Ticker */}
      {trending.length > 0 && <TrendingTicker articles={trending.slice(0, 10)} />}

      {/* Mobile Search */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 p-4">
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="search"
              placeholder="Search..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-r-lg"
            >
              🔍
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
