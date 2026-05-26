# Rakesh Koraganji — Dynamic Developer Portfolio Platform

A premium full-stack portfolio platform with a dynamic admin dashboard. Manage projects, skills, certifications, achievements, resume, about content, and social links **without modifying frontend source code**.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React, Vite, Tailwind CSS, Framer Motion, React Icons, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT + bcrypt |
| Deploy | Vercel (client) · Render (server) · MongoDB Atlas |

---

## Folder Structure

```
portfilo/
├── client/                    # React frontend
│   ├── public/
│   └── src/
│       ├── components/        # Hero, About, Skills, Projects, etc.
│       ├── pages/             # Home, admin pages
│       ├── admin/             # (pages under pages/admin/)
│       ├── layouts/           # PublicLayout, AdminLayout
│       ├── services/          # API (axios)
│       ├── hooks/             # useAuth
│       └── assets/
├── server/                    # Express API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
└── README.md
```

---

## Installation

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- npm or yarn

### 1. Clone & install dependencies

```bash
cd portfilo

# Backend
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and secrets

# Frontend
cd ../client
npm install
cp .env.example .env
```

### 2. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
2. Create a database user (username + password).
3. **Network Access** → Add IP Address → `0.0.0.0/0` (for development) or your server IP.
4. **Database** → Connect → Drivers → copy connection string.
5. Replace `<password>` and database name in `MONGODB_URI`:

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/rakesh-portfolio?retryWrites=true&w=majority
```

### 3. Environment Variables

**server/.env**

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_long_random_secret_key
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@rakeshkoraganji.com
ADMIN_PASSWORD=YourSecurePassword123!
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**client/.env**

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed Database

```bash
cd server
npm run seed
```

This creates:
- Admin user (from `ADMIN_EMAIL` / `ADMIN_PASSWORD`)
- About content for **Rakesh Koraganji**
- 4 featured projects (Quantum RNG, Kavi AI, Eye Mouse, PolicySet AI)
- Skills, certifications, achievements, social links

### 5. Run Locally

**Terminal 1 — Backend**

```bash
cd server
npm run dev
```

**Terminal 2 — Frontend**

```bash
cd client
npm run dev
```

- Portfolio: http://localhost:5173
- Admin login: http://localhost:5173/admin/login

---

## Deployment

### Backend → Render

1. Push code to GitHub.
2. [Render](https://render.com) → New **Web Service** → connect repo.
3. **Root Directory:** `server`
4. **Build Command:** `npm install`
5. **Start Command:** `npm start`
6. Add environment variables from `server/.env.example`.
7. Set `CLIENT_URL` to your Vercel URL (e.g. `https://your-app.vercel.app`).
8. After deploy, run seed once via Render shell: `npm run seed`

### Frontend → Vercel

1. Import repo on [Vercel](https://vercel.com).
2. **Root Directory:** `client`
3. **Framework:** Vite
4. **Environment Variable:**
   - `VITE_API_URL` = `https://your-render-app.onrender.com/api`
5. Deploy. `vercel.json` handles SPA routing.

### MongoDB Atlas (Production)

- Use a dedicated database user with strong password.
- Restrict IP to Render’s outbound IPs if possible.
- Enable backup on paid tiers for production.

---

## Admin Dashboard Guide

1. Open `/admin/login`.
2. Sign in with credentials from seed (`ADMIN_EMAIL` / `ADMIN_PASSWORD`).
3. Use sidebar modules:

| Module | Actions |
|--------|---------|
| **Dashboard** | Overview stats, unread messages |
| **Projects** | CRUD — title, description, tech stack, URLs, image, featured |
| **Skills** | CRUD — name, category, proficiency % |
| **Certifications** | CRUD — title, issuer, date, credential URL |
| **Achievements** | CRUD — title, description, date, icon |
| **About & Resume** | Edit hero, about text, profile image, resume PDF URL, social links |
| **Messages** | View contact form submissions, mark read, delete |

Changes appear on the public site immediately (refresh the portfolio page).

---

## API Documentation

Base URL: `http://localhost:5000/api` (or your Render URL)

### Public (no auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/about` | About & hero content |
| GET | `/social` | Social links |
| GET | `/projects` | All projects |
| GET | `/projects/:id` | Single project |
| GET | `/skills` | All skills |
| GET | `/certifications` | All certifications |
| GET | `/achievements` | All achievements |
| POST | `/contact` | Submit contact form |

**Contact body:** `{ "name", "email", "subject?", "message" }`

### Auth

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/auth/login` | `{ email, password }` | Returns JWT token |
| GET | `/auth/me` | Header: `Authorization: Bearer <token>` | Current admin |

### Protected (Bearer token required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard/stats` | Dashboard counts |
| POST | `/projects` | Create project |
| PUT | `/projects/:id` | Update project |
| DELETE | `/projects/:id` | Delete project |
| POST/PUT/DELETE | `/skills`, `/skills/:id` | Skills CRUD |
| POST/PUT/DELETE | `/certifications`, `/certifications/:id` | Certifications CRUD |
| POST/PUT/DELETE | `/achievements`, `/achievements/:id` | Achievements CRUD |
| PUT | `/about` | Update about content |
| PUT | `/social` | Update social links |
| GET | `/contact` | List messages |
| PATCH | `/contact/:id/read` | Mark message read |
| DELETE | `/contact/:id` | Delete message |

---

## JWT Setup

- Token issued on `POST /api/auth/login`.
- Stored in `localStorage` as `token` on the client.
- Sent as `Authorization: Bearer <token>` on admin requests.
- Configure expiry via `JWT_EXPIRES_IN` (default `7d`).
- Use a long random `JWT_SECRET` in production.

---

## Future Scalability Suggestions

1. **Image uploads** — Integrate Cloudinary or AWS S3 instead of image URLs.
2. **Rate limiting** — `express-rate-limit` on `/contact` and `/auth/login`.
3. **Email notifications** — Nodemailer/Resend when contact form is submitted.
4. **Blog module** — Add `Post` model and public `/blog` section.
5. **Analytics** — Admin dashboard views via Plausible or GA4.
6. **Caching** — Redis for frequently read public endpoints.
7. **CI/CD** — GitHub Actions for lint, test, and auto-deploy.
8. **Refresh tokens** — Short-lived access token + refresh token rotation.
9. **Multi-admin** — Role-based access (editor vs super-admin).
10. **i18n** — Locale files for multilingual portfolio.

---

## Default Projects (Seeded)

1. **Quantum RNG Laboratory** — Qiskit, entropy, cryptography
2. **Kavi AI Assistant** — NLP conversational AI
3. **Eye Controlled Mouse System** — Computer vision accessibility
4. **PolicySet AI Recommendation Engine** — ML policy recommendations

---

## License

MIT — Built for **Rakesh Koraganji**.
