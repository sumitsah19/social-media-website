# 🎬 EntertainIndia

A production-ready entertainment news website built with React, Vite, Tailwind CSS, and Strapi v4. Features Bollywood, Hollywood, OTT, TV, Music, Photos, Videos, Reviews, and celebrity news.

![EntertainIndia](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.1-purple)
![Strapi](https://img.shields.io/badge/Strapi-v4-blueviolet)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.13-cyan)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Content Management](#content-management)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Screenshots](#screenshots)

## ✨ Features

### Core Features
- ✅ **Homepage** with featured stories, trending ticker, latest articles, and category blocks
- ✅ **Category Pages** (Bollywood, Hollywood, OTT, TV, Music, Reviews) with filtering and pagination
- ✅ **Article Detail Page** with rich content, author info, share buttons, related articles, tags, and comments
- ✅ **Photos Gallery** with lightbox functionality
- ✅ **Videos Page** with embedded YouTube/Vimeo player
- ✅ **Search** with keyword filtering across title, summary, and content
- ✅ **Tag Pages** for topic-based article listings
- ✅ **Comments System** with moderation (pending/approved/rejected)
- ✅ **Trending Ticker** with auto-scroll and pause on hover
- ✅ **Popular & Trending Articles** based on views
- ✅ **Responsive Design** - mobile-first approach
- ✅ **SEO Optimized** with React Helmet, meta tags, Open Graph, and canonical URLs

### Admin/CMS Features (Strapi)
- ✅ **Content Types**: Articles, Categories, Tags, Authors, Galleries, Videos, Comments
- ✅ **Rich Text Editor** for article content
- ✅ **Media Library** with image upload and management
- ✅ **Role-Based Access Control** (Admin, Editor, Author)
- ✅ **Draft/Publish Workflow**
- ✅ **SEO Fields** per article (meta title, description, canonical URL)
- ✅ **Featured & Sponsored Content** flags
- ✅ **Auto Reading Time Calculation**
- ✅ **View Counter** for trending/popular articles
- ✅ **Comment Moderation** dashboard

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Zustand** - Lightweight state management
- **dayjs** - Date formatting
- **React Helmet Async** - SEO and meta tags

### Backend
- **Strapi v4** - Headless CMS
- **SQLite** (dev) / **PostgreSQL** (prod) - Database
- **Node.js 18+** - Runtime environment

## 📁 Project Structure

```
Entertainment/
├── cms/                        # Strapi backend
│   ├── config/                 # Configuration files
│   ├── database/               # SQLite database (dev)
│   ├── public/                 # Public assets
│   ├── src/
│   │   ├── api/                # API endpoints
│   │   │   ├── article/        # Article content type
│   │   │   ├── author/         # Author content type
│   │   │   ├── category/       # Category content type
│   │   │   ├── comment/        # Comment content type
│   │   │   ├── gallery/        # Gallery content type
│   │   │   ├── tag/            # Tag content type
│   │   │   └── video/          # Video content type
│   │   ├── components/         # Reusable components
│   │   │   └── media/          # Media components
│   │   ├── extensions/         # Strapi extensions
│   │   └── index.ts            # Bootstrap file with seed data
│   └── package.json
│
└── client/                     # React frontend
    ├── public/                 # Static files
    ├── src/
    │   ├── components/         # React components
    │   │   ├── layout/         # Layout components
    │   │   │   ├── Layout.jsx
    │   │   │   ├── Header.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   ├── Sidebar.jsx
    │   │   │   └── TrendingTicker.jsx
    │   │   └── ui/             # UI components
    │   │       ├── ArticleCard.jsx
    │   │       ├── Badge.jsx
    │   │       ├── Pagination.jsx
    │   │       ├── ShareBar.jsx
    │   │       └── Skeleton.jsx
    │   ├── lib/                # Utilities
    │   │   ├── api.js          # API client & methods
    │   │   ├── constants.js    # App constants
    │   │   └── helpers.js      # Helper functions
    │   ├── pages/              # Page components
    │   │   ├── Home.jsx
    │   │   ├── CategoryPage.jsx
    │   │   ├── ArticlePage.jsx
    │   │   ├── PhotosPage.jsx
    │   │   ├── VideosPage.jsx
    │   │   ├── SearchPage.jsx
    │   │   ├── TagPage.jsx
    │   │   ├── AboutPage.jsx
    │   │   ├── ContactPage.jsx
    │   │   ├── PrivacyPage.jsx
    │   │   ├── TermsPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   └── NotFoundPage.jsx
    │   ├── store/              # State management
    │   │   └── useStore.js     # Zustand store
    │   ├── App.jsx             # Main app component
    │   ├── main.jsx            # App entry point
    │   └── index.css           # Global styles
    ├── .env                    # Environment variables
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

## 🚀 Installation

### Prerequisites
- **Node.js 18+** and **npm**
- **Git**

### Step 1: Clone the Repository
```bash
cd c:\Entertainment
# Or if cloning:
# git clone <repository-url>
# cd Entertainment
```

### Step 2: Install Strapi Dependencies
```bash
cd cms
npm install
```

### Step 3: Install Client Dependencies
```bash
cd ../client
npm install
```

## ⚙️ Configuration

### Strapi Configuration

The Strapi backend is already configured with:
- **CORS** enabled for `http://localhost:5173`
- **SQLite** database (for development)
- **Content types** with all required fields
- **Bootstrap script** that auto-seeds categories, tags, and authors on first run

To customize:

**1. Database** - Edit `cms/config/database.ts` to use PostgreSQL for production:
```javascript
{
  connection: {
    client: 'postgres',
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      ssl: { rejectUnauthorized: false }
    }
  }
}
```

**2. CORS** - Edit `cms/config/middlewares.ts` to add production URLs

### Client Configuration

**1. Environment Variables**

Create `client/.env`:
```env
VITE_API_URL=http://localhost:1337/api
```

For production:
```env
VITE_API_URL=https://your-strapi-domain.com/api
```

**2. Tailwind Configuration**

Customize colors, fonts, and theme in `client/tailwind.config.js`

## 🏃 Running the Project

### Development Mode

**Terminal 1 - Start Strapi (Backend):**
```bash
cd cms
npm run develop
```
- Strapi admin: http://localhost:1337/admin
- API: http://localhost:1337/api

**Terminal 2 - Start React (Frontend):**
```bash
cd client
npm run dev
```
- Client: http://localhost:5173

### First Time Setup

1. **Create Strapi Admin Account**
   - Visit http://localhost:1337/admin
   - Create your admin user account

2. **Auto-Seeded Data**
   - Categories (Bollywood, Hollywood, OTT, TV, Music, Photos, Videos, Reviews)
   - Tags (Salman Khan, Shah Rukh Khan, Netflix, etc.)
   - Authors (3 sample authors)

3. **Configure Permissions** (Important!)
   - Go to Settings → Users & Permissions Plugin → Roles → Public
   - Enable these permissions:
     - **Article**: find, findOne
     - **Category**: find, findOne
     - **Tag**: find, findOne
     - **Author**: find, findOne
     - **Gallery**: find, findOne
     - **Video**: find, findOne
     - **Comment**: find, create (create allows public comments)
   - Save

4. **Create Sample Content**
   - Add articles through the Strapi admin
   - Upload images to the Media Library
   - Create galleries and videos

### Production Build

**Build Client:**
```bash
cd client
npm run build
# Output in client/dist/
```

**Build Strapi:**
```bash
cd cms
npm run build
NODE_ENV=production npm start
```

## 📝 Content Management

### Creating Articles

1. Go to http://localhost:1337/admin
2. Click **Content Manager** → **Article** → **Create new entry**
3. Fill in:
   - Title (required)
   - Slug (auto-generated from title)
   - Summary (required)
   - Body (rich text with images/embeds)
   - Hero Image (upload from media library)
   - Category (select one)
   - Tags (select multiple)
   - Authors (select multiple)
   - SEO fields (optional but recommended)
   - Featured checkbox
   - Sponsored checkbox
4. Click **Save** (draft) or **Publish**

### Managing Comments

- View all comments in **Content Manager** → **Comment**
- Filter by moderation status (pending/approved/rejected)
- Change `moderation_status` to approve/reject comments

### User Roles

**Admin** (full access):
- Create, edit, delete all content
- Manage users and settings
- Access to all features

**Editor** (content approval):
- Approve/reject comments
- Publish articles
- Edit all content

**Author** (content creation):
- Create articles (drafts)
- Edit own articles
- Submit for review

Configure roles in Settings → Users & Permissions Plugin → Roles

## 🔌 API Endpoints

### Articles
```
GET  /api/articles                                    # List all articles
GET  /api/articles/:id                                # Get single article
GET  /api/articles?filters[slug][$eq]=article-slug    # Get by slug
GET  /api/articles?filters[featured][$eq]=true        # Featured articles
GET  /api/articles?filters[category][slug][$eq]=bollywood # By category
GET  /api/articles?filters[tags][slug][$eq]=tag       # By tag
GET  /api/articles?filters[$or][0][title][$containsi]=query # Search
POST /api/articles                                    # Create (auth required)
PUT  /api/articles/:id                                # Update (auth required)
DELETE /api/articles/:id                              # Delete (auth required)
```

### Categories, Tags, Authors
```
GET /api/categories
GET /api/tags
GET /api/authors
```

### Media
```
GET /api/galleries
GET /api/videos
```

### Comments
```
GET  /api/comments                                    # List comments
GET  /api/comments?filters[article][id][$eq]=1        # By article
GET  /api/comments?filters[moderation_status][$eq]=approved # Approved only
POST /api/comments                                    # Create comment (public)
```

### Authentication
```
POST /api/auth/local/register    # Register user
POST /api/auth/local             # Login
GET  /api/users/me               # Get current user (auth required)
```

### Query Parameters

**Pagination:**
```
?pagination[page]=1&pagination[pageSize]=12
```

**Sorting:**
```
?sort=publish_datetime:desc
```

**Population (relations):**
```
?populate=*                      # All first-level relations
?populate=deep,2                 # Deep populate (2 levels)
```

## 🚢 Deployment

### Deploy Strapi (Backend)

**Option 1: Render / Railway / DigitalOcean**

1. Create a PostgreSQL database
2. Set environment variables:
```env
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=your-db-name
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_SSL=true
NODE_ENV=production
APP_KEYS=generate-random-keys
API_TOKEN_SALT=generate-salt
ADMIN_JWT_SECRET=generate-secret
JWT_SECRET=generate-secret
```
3. Deploy from Git repository
4. Run build command: `npm run build`
5. Start command: `npm start`

**Option 2: Heroku**

1. Install Heroku CLI
2. Create app: `heroku create your-app-name`
3. Add PostgreSQL: `heroku addons:create heroku-postgresql:hobby-dev`
4. Set environment variables
5. Deploy: `git push heroku main`

### Deploy React Client (Frontend)

**Option 1: Vercel** (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. In `client/` directory: `vercel`
3. Set environment variable: `VITE_API_URL=https://your-strapi-domain.com/api`
4. Deploy: `vercel --prod`

**Option 2: Netlify**

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Build: `npm run build`
3. Deploy: `netlify deploy --prod --dir=dist`
4. Set environment variable in Netlify dashboard

**Option 3: Manual (Any Static Host)**

1. Build: `npm run build`
2. Upload `dist/` folder to any static host (AWS S3, GitHub Pages, etc.)
3. Configure environment variables before build

### Post-Deployment

1. Update CORS in Strapi to include production URLs
2. Configure Strapi permissions for Public role
3. Test all API endpoints
4. Upload content and images
5. Test SEO meta tags and Open Graph

## 📸 Screenshots

*Add screenshots here after deployment*

## 🎯 Key Features Summary

### Homepage
- ✅ Hero carousel with 4-6 featured articles
- ✅ Trending news ticker
- ✅ Latest articles grid
- ✅ Category blocks (Bollywood, OTT, TV, Music)
- ✅ Sidebar (Popular, Ads, Social, Newsletter)

### Category Pages
- ✅ Filtered article listings by category
- ✅ Pagination with page numbers
- ✅ Responsive grid layout

### Article Page
- ✅ Full rich-text content with images
- ✅ Hero image and gallery support
- ✅ Author information with bio
- ✅ Publish date and reading time
- ✅ Social share buttons (Facebook, Twitter, WhatsApp, LinkedIn)
- ✅ Related articles carousel
- ✅ Tags navigation
- ✅ Comments section with moderation
- ✅ SEO meta tags and Open Graph

### Media Pages
- ✅ Photos gallery with lightbox
- ✅ Videos with YouTube/Vimeo embed
- ✅ Captions and credits

### Search & Tags
- ✅ Keyword search across title/summary/content
- ✅ Tag-based filtering
- ✅ Search results with pagination

### Admin/CMS
- ✅ Role-based access (Admin, Editor, Author)
- ✅ Draft/publish workflow
- ✅ Comment moderation
- ✅ Media library
- ✅ SEO fields per article
- ✅ Auto reading time calculation
- ✅ View counter for analytics

## 🔧 Troubleshooting

**Issue: CORS errors**
- Solution: Check `cms/config/middlewares.ts` includes your client URL

**Issue: 403 Forbidden on API calls**
- Solution: Enable permissions for Public role in Strapi admin

**Issue: Images not loading**
- Solution: Check `VITE_API_URL` in `.env` is correct

**Issue: Articles not showing**
- Solution: Make sure articles are published (not draft)

**Issue: Comments not working**
- Solution: Enable `create` permission for Comment in Public role

## 📄 License

This project is built for demonstration purposes. Modify as needed for your use case.

## 🤝 Contributing

Feel free to fork, modify, and submit pull requests!

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using React, Vite, Tailwind CSS, and Strapi v4**
