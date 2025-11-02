import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { articlesAPI, commentsAPI } from '../lib/api';
import { formatDate } from '../lib/helpers';
import ShareBar from '../components/ui/ShareBar';
import ArticleCard from '../components/ui/ArticleCard';
import Sidebar from '../components/layout/Sidebar';
import Badge from '../components/ui/Badge';

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({ user_name: '', message: '' });
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const articleData = await articlesAPI.getBySlug(slug);
        setArticle(articleData);

        if (articleData) {
          // Fetch related articles
          const relatedData = await articlesAPI.getRelated(
            articleData.category?.slug,
            articleData.tags.map(t => t.slug),
            slug,
            4
          );
          setRelated(relatedData);

          // Fetch comments
          const commentsData = await commentsAPI.getByArticle(articleData.id);
          setComments(commentsData);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentSubmitting(true);

    try {
      await commentsAPI.create({
        article: article.id,
        user_name: commentForm.user_name,
        message: commentForm.message,
      });

      alert('Comment submitted successfully! It will appear after moderation.');
      setCommentForm({ user_name: '', message: '' });
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setCommentSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-700">Article not found</h1>
        <Link to="/" className="text-primary-600 hover:underline mt-4 inline-block">
          Return to home
        </Link>
      </div>
    );
  }

  const currentUrl = window.location.href;

  return (
    <>
      <Helmet>
        <title>{article.seoTitle || article.title} - EntertainIndia</title>
        <meta name="description" content={article.metaDescription || article.summary} />
        <link rel="canonical" href={article.canonicalUrl || currentUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:image" content={article.heroImage?.url} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.summary} />
        <meta name="twitter:image" content={article.heroImage?.url} />
      </Helmet>

      <article className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Category & Sponsored Badge */}
            <div className="flex items-center gap-3 mb-4">
              {article.category && (
                <Badge variant={article.category.slug}>
                  {article.category.name}
                </Badge>
              )}
              {article.featured && (
                <Badge variant="primary">⭐ Featured</Badge>
              )}
              {article.sponsored && (
                <Badge variant="warning">Sponsored</Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-balance">
              {article.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
              {article.authors && article.authors.length > 0 && (
                <div className="flex items-center gap-2">
                  <span>By</span>
                  <span className="font-medium text-gray-900">
                    {article.authors.map(a => a.name).join(', ')}
                  </span>
                </div>
              )}
              <span>•</span>
              <time dateTime={article.publishDate}>
                {formatDate(article.publishDate, 'MMMM DD, YYYY')}
              </time>
              {article.readingTime && (
                <>
                  <span>•</span>
                  <span>{article.readingTime} min read</span>
                </>
              )}
              <span>•</span>
              <span>{article.views} views</span>
            </div>

            {/* Hero Image */}
            {article.heroImage && (
              <figure className="mb-8">
                <img
                  src={article.heroImage.url}
                  alt={article.heroImage.alternativeText || article.title}
                  className="w-full h-auto rounded-2xl"
                />
                {article.heroImage.caption && (
                  <figcaption className="text-sm text-gray-600 mt-2 text-center">
                    {article.heroImage.caption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Summary */}
            <div className="text-lg text-gray-700 font-medium mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-primary-600">
              {article.summary}
            </div>

            {/* Sponsor Disclosure */}
            {article.sponsored && article.sponsorMeta && (
              <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Sponsored Content:</strong> This article is sponsored. 
                  {article.sponsorMeta.note && ` ${article.sponsorMeta.note}`}
                </p>
              </div>
            )}

            {/* Article Body */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-8 pb-8 border-b">
                <h3 className="font-semibold mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      to={`/tag/${tag.slug}`}
                      className="badge bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700 transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share Bar */}
            <div className="mb-8 pb-8 border-b">
              <ShareBar url={currentUrl} title={article.title} />
            </div>

            {/* Author Info */}
            {article.authors && article.authors.length > 0 && (
              <div className="mb-8 p-6 bg-gray-50 rounded-2xl">
                {article.authors.map((author) => (
                  <div key={author.id} className="flex gap-4">
                    {author.avatar && (
                      <img
                        src={author.avatar.url}
                        alt={author.name}
                        className="w-16 h-16 rounded-full"
                      />
                    )}
                    <div>
                      <h4 className="font-semibold text-lg">{author.name}</h4>
                      {author.bio && (
                        <div 
                          className="text-sm text-gray-600 mt-1"
                          dangerouslySetInnerHTML={{ __html: author.bio }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Related Articles */}
            {related.length > 0 && (
              <section className="mb-8">
                <h3 className="text-2xl font-heading font-bold mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {related.map((relatedArticle) => (
                    <ArticleCard key={relatedArticle.id} article={relatedArticle} />
                  ))}
                </div>
              </section>
            )}

            {/* Comments Section */}
            <section className="mb-8">
              <h3 className="text-2xl font-heading font-bold mb-6">
                Comments ({comments.length})
              </h3>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="card p-6 mb-6">
                <h4 className="font-semibold mb-4">Leave a Comment</h4>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={commentForm.user_name}
                    onChange={(e) => setCommentForm({ ...commentForm, user_name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <textarea
                    placeholder="Your comment"
                    value={commentForm.message}
                    onChange={(e) => setCommentForm({ ...commentForm, message: e.target.value })}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="submit"
                    disabled={commentSubmitting}
                    className="btn-primary disabled:opacity-50"
                  >
                    {commentSubmitting ? 'Submitting...' : 'Submit Comment'}
                  </button>
                  <p className="text-sm text-gray-500">
                    Your comment will be reviewed before publishing.
                  </p>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="card p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                        {comment.userName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{comment.userName}</span>
                          <span className="text-sm text-gray-500">
                            {formatDate(comment.createdAt, 'relative')}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
