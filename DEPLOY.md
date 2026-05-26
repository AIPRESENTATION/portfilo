# Deploy Portfolio + Admin (Production)

Your **public portfolio** and **admin dashboard** are one app (React). Deploy it once on Vercel.  
The **API + database** go on Render + MongoDB Atlas.

After deploy:

| What | URL |
|------|-----|
| Portfolio | `https://your-app.vercel.app` |
| Admin login | `https://your-app.vercel.app/admin/login` |

---

## Step 1 — MongoDB Atlas (database)

1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. **Database Access** → add user (username + password).
3. **Network Access** → **Add IP Address** → `0.0.0.0/0` (allow from anywhere).
4. **Connect** → Drivers → copy connection string.
5. Replace `<password>` and set database name, e.g.:

```
mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/rakesh-portfolio?retryWrites=true&w=majority
```

Save this as `MONGODB_URI` for Render.

---

## Step 2 — Push code to GitHub

```bash
cd c:\portfilo
git init
git add .
git commit -m "Portfolio platform ready for deploy"
```

Create a repo on GitHub and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/rakesh-portfolio.git
git branch -M main
git push -u origin main
```

---

## Step 3 — Deploy backend (Render)

1. Go to [render.com](https://render.com) → **New** → **Web Service**.
2. Connect your GitHub repo.
3. Settings:

| Setting | Value |
|---------|--------|
| **Root Directory** | `server` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance type** | Free |

4. **Environment variables** (Environment tab):

| Key | Value |
|-----|--------|
| `NODE_ENV` | `production` |
| `USE_MEMORY_DB` | `false` |
| `MONGODB_URI` | your Atlas connection string |
| `JWT_SECRET` | long random string (32+ chars) |
| `JWT_EXPIRES_IN` | `7d` |
| `ADMIN_EMAIL` | `admin@rakeshkoraganji.com` |
| `ADMIN_PASSWORD` | strong password (not ChangeMe123!) |
| `CLIENT_URL` | `https://YOUR-APP.vercel.app` (set after Vercel deploy, then update) |

5. Click **Deploy**. Copy your API URL, e.g. `https://rakesh-portfolio-api.onrender.com`.

6. **Seed database (once)** — Render dashboard → your service → **Shell**:

```bash
npm run seed
```

Or locally with production URI:

```bash
cd server
# set MONGODB_URI in .env to Atlas URI, USE_MEMORY_DB=false
npm run seed
```

7. Test: open `https://YOUR-API.onrender.com/api/health` → should return JSON success.

---

## Step 4 — Deploy frontend (Vercel) — portfolio + admin

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → import GitHub repo.
2. Settings:

| Setting | Value |
|---------|--------|
| **Framework Preset** | Vite |
| **Root Directory** | `client` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

3. **Environment variable**:

| Key | Value |
|-----|--------|
| `VITE_API_URL` | `https://YOUR-API.onrender.com/api` |

4. **Deploy**. Copy your site URL, e.g. `https://rakesh-portfolio.vercel.app`.

5. Go back to **Render** → update `CLIENT_URL` to your Vercel URL → **Save** (service will redeploy).

---

## Step 5 — Use admin in production

1. Open `https://YOUR-APP.vercel.app/admin/login`
2. Log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from Render env vars.
3. Update projects, links, about, resume — same as local.

---

## Checklist

- [ ] Atlas cluster running, `MONGODB_URI` in Render
- [ ] `USE_MEMORY_DB=false` on Render
- [ ] `JWT_SECRET` set (not default)
- [ ] `npm run seed` run once on production DB
- [ ] `VITE_API_URL` points to Render `/api`
- [ ] `CLIENT_URL` on Render matches Vercel URL exactly (no trailing slash)
- [ ] Admin password changed from default

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| White page on Vercel | Check `VITE_API_URL` in Vercel env, redeploy |
| Admin login fails | Run `npm run seed` on Render shell; check `ADMIN_EMAIL` / password |
| CORS error | `CLIENT_URL` on Render must match Vercel URL exactly |
| API sleeps (free tier) | First request after idle may take ~30s — normal on Render free |
| Old dummy links | Log into admin and edit Projects / About & Resume |

---

## What you deploy

| Part | Host | Includes |
|------|------|----------|
| Frontend | Vercel | Home, all sections, `/admin/*` |
| Backend | Render | REST API, JWT, CMS data |
| Database | MongoDB Atlas | All your content |

You do **not** deploy admin separately — it is part of the same Vercel app.
