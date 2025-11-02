# 🚀 Deployment Guide - EntertainIndia

Complete guide for deploying EntertainIndia to production.

## 📋 Pre-Deployment Checklist

- [ ] Test all features locally
- [ ] Create production environment variables
- [ ] Set up production database (PostgreSQL)
- [ ] Configure CORS for production URLs
- [ ] Test API endpoints
- [ ] Optimize images in Media Library
- [ ] Review SEO meta tags
- [ ] Test on mobile devices

## 🗄️ Database Setup (PostgreSQL)

### Option 1: Render PostgreSQL (Free)

1. Go to https://render.com
2. Click **New** → **PostgreSQL**
3. Name: `entertainindia-db`
4. Database: `entertainindia`
5. User: `entertainindia_user`
6. Click **Create Database**
7. Save connection details:
   - Internal Database URL
   - External Database URL
   - PSQL Command

### Option 2: Railway PostgreSQL

1. Go to https://railway.app
2. Click **New Project** → **Provision PostgreSQL**
3. Copy connection string from Variables tab

### Option 3: Heroku PostgreSQL

```bash
heroku addons:create heroku-postgresql:hobby-dev -a your-app-name
```

## 🎯 Deploy Strapi Backend

### Deploy to Render (Recommended)

**1. Prepare Strapi for Production**

Update `cms/config/database.ts`:
```javascript
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME'),
      user: env('DATABASE_USERNAME'),
      password: env('DATABASE_PASSWORD'),
      ssl: {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
      },
    },
    debug: false,
  },
});
```

**2. Install PostgreSQL client**
```bash
cd cms
npm install pg
```

**3. Create Render Web Service**

1. Go to https://render.com → **New** → **Web Service**
2. Connect your Git repository
3. Configure:
   - **Name**: `entertainindia-cms`
   - **Root Directory**: `cms`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

**4. Environment Variables (on Render)**
```env
NODE_ENV=production
APP_KEYS=generate-random-key-1,generate-random-key-2
API_TOKEN_SALT=generate-random-salt
ADMIN_JWT_SECRET=generate-random-secret
JWT_SECRET=generate-random-jwt-secret
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=your-db-name
DATABASE_USERNAME=your-db-username
DATABASE_PASSWORD=your-db-password
DATABASE_SSL=false
```

**Generate Random Keys:**
```bash
# Run this to generate keys
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**5. Deploy**
- Click **Create Web Service**
- Wait for deployment (5-10 minutes)
- Your Strapi will be at `https://entertainindia-cms.onrender.com`

**6. Set Up Admin Account**
- Visit `https://entertainindia-cms.onrender.com/admin`
- Create admin account
- Configure Public role permissions

### Deploy to Railway

1. Go to https://railway.app
2. **New Project** → **Deploy from GitHub repo**
3. Select your repository
4. Add service: Select `cms` directory
5. Add environment variables (same as above)
6. Deploy

### Deploy to Heroku

```bash
cd cms

# Login to Heroku
heroku login

# Create app
heroku create entertainindia-cms

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set APP_KEYS="your-generated-keys"
heroku config:set API_TOKEN_SALT="your-salt"
heroku config:set ADMIN_JWT_SECRET="your-secret"
heroku config:set JWT_SECRET="your-jwt-secret"

# Deploy
git push heroku main
```

## 🎨 Deploy React Frontend

### Deploy to Vercel (Recommended)

**1. Prepare Client for Production**

Update `client/.env.production`:
```env
VITE_API_URL=https://your-strapi-domain.onrender.com/api
```

**2. Deploy with Vercel**

```bash
cd client

# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts, then deploy to production
vercel --prod
```

**OR via Vercel Dashboard:**

1. Go to https://vercel.com
2. **Add New** → **Project**
3. Import your Git repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Environment Variables:
   ```
   VITE_API_URL=https://your-strapi-domain.onrender.com/api
   ```
6. Click **Deploy**

Your site will be live at `https://your-project.vercel.app`

### Deploy to Netlify

**1. Build Locally**
```bash
cd client
npm run build
```

**2. Deploy via Netlify CLI**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod --dir=dist
```

**OR via Netlify Dashboard:**

1. Go to https://netlify.com
2. **Add new site** → **Import from Git**
3. Configure:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
4. Environment Variables:
   ```
   VITE_API_URL=https://your-strapi-domain.onrender.com/api
   ```
5. Click **Deploy**

### Deploy to AWS S3 + CloudFront

```bash
cd client

# Build
npm run build

# Install AWS CLI
# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## 🔧 Post-Deployment Configuration

### 1. Update CORS in Strapi

Edit `cms/config/middlewares.ts`:
```javascript
{
  name: 'strapi::cors',
  config: {
    enabled: true,
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://your-frontend-domain.vercel.app',
      'https://your-custom-domain.com'
    ],
    headers: '*',
  },
}
```

Redeploy Strapi after this change.

### 2. Configure Public Permissions

In Strapi admin (production):
- Settings → Users & Permissions Plugin → Roles → Public
- Enable same permissions as development

### 3. Upload Content

- Upload images to Media Library
- Create articles, galleries, videos
- Test all features

### 4. Set Up Custom Domain

**Vercel:**
1. Project Settings → Domains
2. Add your custom domain
3. Configure DNS records

**Netlify:**
1. Domain Settings → Add custom domain
2. Configure DNS records

**Render:**
1. Settings → Custom Domains
2. Add domain and configure DNS

### 5. Enable HTTPS

All platforms (Vercel, Netlify, Render) provide free SSL certificates automatically.

## 🔍 SEO Configuration

### Add robots.txt

Create `client/public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml
```

### Add sitemap.xml

Create `client/public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://your-domain.com/bollywood</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Add more URLs -->
</urlset>
```

### Google Analytics

Add to `client/index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 📊 Monitoring & Maintenance

### Monitor Strapi

- Check logs on Render/Railway/Heroku dashboard
- Set up alerts for downtime
- Monitor database usage

### Monitor Frontend

- Use Vercel Analytics
- Set up error tracking (Sentry)
- Monitor Core Web Vitals

### Regular Maintenance

- [ ] Update Strapi regularly: `npm update`
- [ ] Update React dependencies: `npm update`
- [ ] Back up database weekly
- [ ] Review and moderate comments
- [ ] Optimize images regularly
- [ ] Check broken links
- [ ] Update SEO meta tags

## 🚨 Troubleshooting Production Issues

### Issue: 500 Internal Server Error (Strapi)
**Solution:**
- Check environment variables are set correctly
- Check database connection
- Review Strapi logs
- Ensure `NODE_ENV=production`

### Issue: API Calls Failing (CORS)
**Solution:**
- Add frontend URL to CORS config
- Redeploy Strapi
- Clear browser cache

### Issue: Images Not Loading
**Solution:**
- Check Strapi Media Library URL
- Ensure images are uploaded to production Strapi
- Check `VITE_API_URL` environment variable

### Issue: Build Failing
**Solution:**
- Check Node.js version matches (18+)
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall
- Check build logs for specific errors

## 💰 Cost Estimate

### Free Tier (Hobby Projects)

- **Strapi (Render)**: Free tier (512MB RAM)
- **PostgreSQL (Render)**: Free tier (1GB storage)
- **Frontend (Vercel)**: Free tier (100GB bandwidth)
- **Total**: $0/month

### Paid Tier (Production)

- **Strapi (Render)**: $7/month (512MB RAM)
- **PostgreSQL (Render)**: $7/month (1GB storage)
- **Frontend (Vercel Pro)**: $20/month
- **Domain**: $10-15/year
- **Total**: ~$14-34/month

## ✅ Deployment Checklist

Before going live:

- [ ] Test all pages and features
- [ ] Verify SEO meta tags
- [ ] Check mobile responsiveness
- [ ] Test forms (comments, newsletter, contact)
- [ ] Verify all images load
- [ ] Test search functionality
- [ ] Check social share buttons
- [ ] Verify HTTPS is working
- [ ] Test on different browsers
- [ ] Set up analytics
- [ ] Configure error monitoring
- [ ] Back up database
- [ ] Document admin credentials securely

## 🎉 You're Live!

Congratulations! Your EntertainIndia site is now live in production.

**Next Steps:**
- Share your site on social media
- Submit to Google Search Console
- Set up Google Analytics
- Start creating amazing content!

---

**Need Help?** Check the main README.md or open an issue on GitHub.
