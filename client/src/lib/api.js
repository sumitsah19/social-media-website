import axios from 'axios';
import { API_URL, MEDIA_URL } from './constants';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const normalizeArticle = (article) => {
  if (!article) return null;

  const data = article.attributes || article;

  // 👇 NEW: accept both {data:{...}} and flat {...}
  const heroRaw =
    (data.hero_image && (data.hero_image.data || data.hero_image)) || null;

  return {
    id: article.id,
    title: data.title,
    slug: data.slug,
    summary: data.summary,
    body: data.body,
    publishDate: data.publish_datetime || data.createdAt,
    updatedDate: data.updated_datetime || data.updatedAt,
    readingTime: data.reading_time,
    views: data.views || 0,
    featured: data.featured,
    sponsored: data.sponsored,
    sponsorMeta: data.sponsor_meta,
    seoTitle: data.seo_title,
    metaDescription: data.meta_description,
    canonicalUrl: data.canonical_url,

    // 👇 use heroRaw (works for both shapes)
    heroImage: heroRaw ? normalizeMedia(heroRaw) : null,

    category: data.category?.data ? normalizeCategory(data.category.data) : null,
    tags: data.tags?.data ? data.tags.data.map(normalizeTag) : [],
    authors: data.authors?.data ? data.authors.data.map(normalizeAuthor) : [],
    gallery: data.gallery?.data ? data.gallery.data.map(normalizeGallery) : [],
  };
};


export const normalizeCategory = (category) => {
  if (!category) return null;
  const data = category.attributes || category;
  return {
    id: category.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
  };
};

export const normalizeTag = (tag) => {
  if (!tag) return null;
  const data = tag.attributes || tag;
  return {
    id: tag.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
  };
};

export const normalizeAuthor = (author) => {
  if (!author) return null;
  const data = author.attributes || author;

  const avatarRaw =
    (data.avatar && (data.avatar.data || data.avatar)) || null;

  return {
    id: author.id,
    name: data.name,
    bio: data.bio,
    avatar: avatarRaw ? normalizeMedia(avatarRaw) : null,
    socialLinks: data.social_links,
  };
};


export const normalizeMedia = (media) => {
  if (!media) return null;
  const data = media.attributes || media;
  return {
    id: media.id,
    url: data.url?.startsWith('http') ? data.url : `${MEDIA_URL}${data.url}`,
    alternativeText: data.alternativeText || '',
    caption: data.caption || '',
    width: data.width,
    height: data.height,
    formats: data.formats,
  };
};

export const normalizeGallery = (gallery) => {
  if (!gallery) return null;
  const data = gallery.attributes || gallery;
  return {
    id: gallery.id,
    title: data.title,
    images: data.images || [],
  };
};

export const normalizeVideo = (video) => {
  if (!video) return null;
  const data = video.attributes || video;

  const posterRaw =
    (data.poster_image && (data.poster_image.data || data.poster_image)) || null;

  return {
    id: video.id,
    title: data.title,
    embedUrl: data.embed_url,
    duration: data.duration,
    posterImage: posterRaw ? normalizeMedia(posterRaw) : null,
    category: data.category,
    description: data.description,
  };
};

export const normalizeComment = (comment) => {
  if (!comment) return null;
  const data = comment.attributes || comment;
  return {
    id: comment.id,
    userName: data.user_name,
    message: data.message,
    moderationStatus: data.moderation_status,
    createdAt: data.createdAt,
  };
};


export const articlesAPI = {
  
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams();

    
    queryParams.append('pagination[page]', params.page || 1);
    queryParams.append('pagination[pageSize]', params.pageSize || 12);

    
    queryParams.append('populate', '*');

    
    if (params.category) {
      queryParams.append('filters[category][slug][$eq]', params.category);
    }
    if (params.featured) {
      queryParams.append('filters[featured][$eq]', true);
    }
    if (params.tag) {
      queryParams.append('filters[tags][slug][$eq]', params.tag);
    }
    if (params.search) {
      queryParams.append('filters[$or][0][title][$containsi]', params.search);
      queryParams.append('filters[$or][1][summary][$containsi]', params.search);
      queryParams.append('filters[$or][2][body][$containsi]', params.search);
    }

    
    queryParams.append('sort', params.sort || 'publish_datetime:desc');

    return apiClient.get(`/articles?${queryParams.toString()}`).then((res) => ({
      articles: res.data.data.map(normalizeArticle),
      pagination: res.data.meta.pagination,
    }));
  },

  
  getBySlug: async (slug) => {
    const res = await apiClient.get(
      `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    );
    const item = res?.data?.data?.[0];
    return item ? normalizeArticle(item) : null;
  },

  
  getTrending: (limit = 10) => {
    return apiClient
      .get(`/articles?sort=views:desc&pagination[pageSize]=${limit}&populate=*`)
      .then((res) => res.data.data.map(normalizeArticle));
  },

  
  getPopular: (limit = 5) => {
    return apiClient
      .get(`/articles?sort=views:desc&pagination[pageSize]=${limit}&populate=*`)
      .then((res) => res.data.data.map(normalizeArticle));
  },

  // Get related articles
  getRelated: (categorySlug, tags, excludeSlug, limit = 4) => {
    const queryParams = new URLSearchParams();
    queryParams.append('filters[category][slug][$eq]', categorySlug);
    queryParams.append('filters[slug][$ne]', excludeSlug);
    queryParams.append('pagination[pageSize]', limit);
    queryParams.append('populate', '*');
    queryParams.append('sort', 'publish_datetime:desc');

    return apiClient
      .get(`/articles?${queryParams.toString()}`)
      .then((res) => res.data.data.map(normalizeArticle));
  },
};

export const categoriesAPI = {
  getAll: () => {
    return apiClient.get('/categories').then((res) => res.data.data.map(normalizeCategory));
  },

  getBySlug: (slug) => {
    return apiClient
      .get(`/categories?filters[slug][$eq]=${encodeURIComponent(slug)}`)
      .then((res) => normalizeCategory(res.data.data[0]));
  },
};

export const tagsAPI = {
  getAll: () => {
    return apiClient.get('/tags').then((res) => res.data.data.map(normalizeTag));
  },

  getBySlug: (slug) => {
    return apiClient
      .get(`/tags?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[articles][populate]=*`)
      .then((res) => normalizeTag(res.data.data[0]));
  },
};

export const videosAPI = {
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams();
    queryParams.append('pagination[page]', params.page || 1);
    queryParams.append('pagination[pageSize]', params.pageSize || 12);
    queryParams.append('populate', '*');

    return apiClient.get(`/videos?${queryParams.toString()}`).then((res) => ({
      videos: res.data.data.map(normalizeVideo),
      pagination: res.data.meta.pagination,
    }));
  },
};

export const galleriesAPI = {
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams();
    queryParams.append('pagination[page]', params.page || 1);
    queryParams.append('pagination[pageSize]', params.pageSize || 12);
    queryParams.append('populate', '*');

    return apiClient.get(`/galleries?${queryParams.toString()}`).then((res) => ({
      galleries: res.data.data.map(normalizeGallery),
      pagination: res.data.meta.pagination,
    }));
  },
};

export const commentsAPI = {
  getByArticle: (articleId) => {
    return apiClient
      .get(
        `/comments?filters[article][id][$eq]=${articleId}&filters[moderation_status][$eq]=approved&sort=createdAt:desc`
      )
      .then((res) => res.data.data.map(normalizeComment));
  },

  create: (commentData) => {
    return apiClient.post('/comments', { data: commentData }).then((res) => normalizeComment(res.data.data));
  },
};

export const authAPI = {
  login: (credentials) => {
    return apiClient.post('/auth/local', credentials).then((res) => {
      localStorage.setItem('authToken', res.data.jwt);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res.data;
    });
  },

  register: (userData) => {
    return apiClient.post('/auth/local/register', userData).then((res) => {
      localStorage.setItem('authToken', res.data.jwt);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res.data;
    });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

export default apiClient;
