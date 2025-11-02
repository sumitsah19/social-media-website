import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from './store/useStore';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import PhotosPage from './pages/PhotosPage';
import VideosPage from './pages/VideosPage';
import SearchPage from './pages/SearchPage';
import TagPage from './pages/TagPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { fetchCategories, fetchTrending, fetchPopular } = useStore();

  useEffect(() => {
    // Fetch global data on app mount
    fetchCategories();
    fetchTrending();
    fetchPopular();
  }, [fetchCategories, fetchTrending, fetchPopular]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="bollywood" element={<CategoryPage category="bollywood" />} />
        <Route path="hollywood" element={<CategoryPage category="hollywood" />} />
        <Route path="ott" element={<CategoryPage category="ott" />} />
        <Route path="tv" element={<CategoryPage category="tv" />} />
        <Route path="music" element={<CategoryPage category="music" />} />
        <Route path="reviews" element={<CategoryPage category="reviews" />} />
        <Route path="photos" element={<PhotosPage />} />
        <Route path="videos" element={<VideosPage />} />
        <Route path="article/:slug" element={<ArticlePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="tag/:slug" element={<TagPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
