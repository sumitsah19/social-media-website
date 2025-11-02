# 🚀 Quick Start Guide - EntertainIndia

## ⚡ Get Started in 5 Minutes

### Prerequisites Check
```powershell
# Check Node.js version (should be 18+)
node --version

# Check npm
npm --version
```

### Step 1: Install Dependencies (2 minutes)

**Terminal 1 - Strapi Backend:**
```powershell
cd c:\Entertainment\cms
npm install
```

**Terminal 2 - React Client:**
```powershell
cd c:\Entertainment\client
npm install
```

### Step 2: Start Development Servers (1 minute)

**Terminal 1 - Start Strapi:**
```powershell
cd c:\Entertainment\cms
npm run develop
```
✅ Strapi will start at http://localhost:1337

**Terminal 2 - Start React:**
```powershell
cd c:\Entertainment\client
npm run dev
```
✅ Client will start at http://localhost:5173

### Step 3: Initial Setup (2 minutes)

1. **Create Strapi Admin Account**
   - Open http://localhost:1337/admin
   - Fill in admin registration form
   - Click "Let's start"

2. **Configure Public Permissions** (Important!)
   - In Strapi admin, go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
   - Enable these permissions:
     - ✅ **Article**: `find`, `findOne`
     - ✅ **Category**: `find`, `findOne`
     - ✅ **Tag**: `find`, `findOne`
     - ✅ **Author**: `find`, `findOne`
     - ✅ **Gallery**: `find`, `findOne`
     - ✅ **Video**: `find`, `findOne`
     - ✅ **Comment**: `find`, `create`
   - Click **Save**

3. **View Your Site**
   - Open http://localhost:5173
   - You'll see the homepage with seeded categories!

### Step 4: Add Content (Optional)

**Create Your First Article:**

1. In Strapi admin, click **Content Manager** → **Article**
2. Click **Create new entry**
3. Fill in:
   - **Title**: "Welcome to EntertainIndia"
   - **Summary**: "Your source for entertainment news"
   - **Body**: Add some content using the rich text editor
   - **Category**: Select "Bollywood"
   - **Featured**: Check this box
4. Upload a **Hero Image** from Media Library
5. Click **Save** then **Publish**
6. Refresh http://localhost:5173 to see your article!

## 📋 What's Included Out of the Box

The bootstrap script automatically creates:

✅ **8 Categories:**
- Bollywood, Hollywood, OTT, TV, Music, Photos, Videos, Reviews

✅ **10 Tags:**
- Salman Khan, Shah Rukh Khan, Alia Bhatt, Deepika Padukone, Netflix, Amazon Prime, Box Office, Trailer, Interview, Awards

✅ **3 Authors:**
- Rajesh Kumar, Priya Sharma, Amit Verma

## 🎯 Next Steps

### Add More Content

**Articles:**
- Go to Content Manager → Article → Create new entry
- Add at least 5-10 articles to populate the homepage

**Videos:**
- Content Manager → Video → Create new entry
- Add YouTube or Vimeo URLs

**Galleries:**
- Content Manager → Gallery → Create new entry
- Upload multiple images with captions

### Customize

**Logo & Branding:**
- Edit `client/src/components/layout/Header.jsx`
- Replace the emoji logo with your own

**Colors:**
- Edit `client/tailwind.config.js`
- Modify the `primary` color values

**Homepage Hero:**
- Mark articles as "Featured" to show in hero section

## 🔧 Common Commands

### Development

```powershell
# Start Strapi (Terminal 1)
cd c:\Entertainment\cms
npm run develop

# Start React (Terminal 2)
cd c:\Entertainment\client
npm run dev
```

### Production Build

```powershell
# Build Strapi
cd c:\Entertainment\cms
npm run build

# Build Client
cd c:\Entertainment\client
npm run build
# Output: client/dist/
```

### Useful Strapi Commands

```powershell
# Create new content type
cd c:\Entertainment\cms
npm run strapi generate

# Clear cache
npm run strapi cache:clear

# List all commands
npm run strapi help
```

## ❓ Troubleshooting

### Issue: "Cannot GET /api/articles"
**Solution:** Enable Public role permissions for Article (see Step 3 above)

### Issue: Client shows "Network Error"
**Solution:** 
1. Make sure Strapi is running at http://localhost:1337
2. Check `client/.env` has: `VITE_API_URL=http://localhost:1337/api`

### Issue: No articles showing on homepage
**Solution:** 
1. Create articles in Strapi admin
2. Make sure they're **Published** (not draft)
3. Mark some as **Featured** for hero section

### Issue: Images not displaying
**Solution:** 
1. Upload images through Strapi Media Library
2. Assign them to articles in the hero_image field

### Issue: CORS errors in browser console
**Solution:** Check `cms/config/middlewares.ts` includes `http://localhost:5173`

## 📚 Learn More

- **Strapi Documentation:** https://docs.strapi.io
- **React Documentation:** https://react.dev
- **Vite Documentation:** https://vitejs.dev
- **Tailwind CSS:** https://tailwindcss.com

## 🎉 You're All Set!

Your EntertainIndia site is now running locally. Start creating amazing entertainment content!

### Demo Data Script (Optional)

Want to add 20+ sample articles automatically? Create a file `cms/scripts/seed-articles.js` and run:

```javascript
// Coming soon - full article seeding script
```

For now, manually create 5-10 articles through the Strapi admin to test all features.

---

**Need Help?** Check the main README.md for detailed documentation or open an issue on GitHub.
