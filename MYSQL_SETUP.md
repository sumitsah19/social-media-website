# 🗄️ MySQL Database Setup for EntertainIndia

## ✅ What I've Done:

1. ✅ Installed `mysql2` package in cms folder
2. ✅ Updated `cms/.env` to use MySQL instead of SQLite
3. ✅ Configured connection: localhost:3306, database: `entertainindia`, user: `root`

## 🚀 What You Need to Do:

### Step 1: Start XAMPP MySQL

**Option A: Using XAMPP Control Panel (Easiest)**
1. Open **XAMPP Control Panel** (search in Start menu)
2. Click **Start** next to **MySQL**
3. Wait for it to turn green

**Option B: Using Command Line**
```powershell
# Start MySQL service
net start MySQL80
```

### Step 2: Create Database

Once MySQL is running, run this command:

```powershell
cd c:\Entertainment\cms
& "C:\xampp\mysql\bin\mysql.exe" -u root -e "CREATE DATABASE IF NOT EXISTS entertainindia CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

**OR use phpMyAdmin:**
1. Open http://localhost/phpmyadmin
2. Click **New** in left sidebar
3. Database name: `entertainindia`
4. Collation: `utf8mb4_unicode_ci`
5. Click **Create**

### Step 3: Start Strapi

```powershell
cd c:\Entertainment\cms
npm run develop
```

Strapi will automatically:
- ✅ Connect to MySQL database
- ✅ Create all tables (articles, categories, tags, etc.)
- ✅ Run bootstrap seeding (8 categories, 10 tags, 3 authors)
- ✅ Migrate everything from SQLite structure

### Step 4: Access Admin Panel

Visit: http://localhost:1337/admin
- Create your admin account (first time only)
- All content types will be there!

## 🔍 Verify Database Connection

After starting Strapi, check in phpMyAdmin:
- You should see 20+ tables created
- Tables like: `articles`, `categories`, `tags`, `authors`, `upload_files`, etc.

## 🎯 Current Configuration

**File:** `cms/.env`
```env
DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=entertainindia
DATABASE_USERNAME=root
DATABASE_PASSWORD=
DATABASE_SSL=false
```

## ⚙️ XAMPP MySQL Default Settings

- **Host:** localhost
- **Port:** 3306
- **Username:** root
- **Password:** (empty by default)
- **phpMyAdmin:** http://localhost/phpmyadmin

## ❓ Troubleshooting

### Error: "Can't connect to MySQL server"
**Solution:** Start XAMPP MySQL first!
```powershell
# Check if running
Get-Service MySQL80

# If stopped, start it
net start MySQL80
```

### Error: "Access denied for user 'root'"
**Solution:** Check if XAMPP MySQL has a password set
- Open phpMyAdmin
- Try with empty password first
- If that fails, check XAMPP MySQL password in config

### Error: "Database 'entertainindia' doesn't exist"
**Solution:** Create it using phpMyAdmin or the SQL command above

### Want to Reset Everything?
```sql
-- Drop and recreate database
DROP DATABASE IF EXISTS entertainindia;
CREATE DATABASE entertainindia CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 📊 What's Different from SQLite?

| Feature | SQLite (Before) | MySQL (Now) |
|---------|-----------------|-------------|
| **Database File** | `.tmp/data.db` | MySQL Server |
| **Concurrent Users** | 1 writer | Unlimited |
| **Production Ready** | ❌ No | ✅ Yes |
| **phpMyAdmin** | ❌ No | ✅ Yes |
| **Backup** | Copy file | SQL export |
| **Server Required** | ❌ No | ✅ Yes (XAMPP) |

## 🎉 Benefits

- ✅ **Production-ready** database
- ✅ **Multiple users** can write simultaneously
- ✅ **phpMyAdmin** for easy management
- ✅ **Better performance** with large datasets
- ✅ **Easy backup** with SQL exports
- ✅ **Same as production** setup

## 🚀 Next Steps

1. Start XAMPP MySQL
2. Create `entertainindia` database
3. Run `npm run develop` in cms folder
4. Create admin account
5. Start adding content!

---

**Your project is now MySQL-ready!** 🎯
