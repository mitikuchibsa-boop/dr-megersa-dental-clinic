# Dr Megersa Dental Clinic — Premium Mobile-First Website & Simple CRM

A custom, mobile-first web experience and lightweight CRM designed specifically for **Dr Megersa Dental Clinic** in Adama, Ethiopia. Built with a warm editorial aesthetic, responsive performance, local clinic photography, and real persistent patient inquiry management.

---

## 1. Key Highlights & Features

- **Visual Identity:** Warm ivory background (`#FCFAF6`), deep charcoal typography, deep burgundy accents (`#6F1C30`), and refined editorial layouts. No generic blue medical templates.
- **Mobile-First Priority:** Built and verified for 360px phones up to 4K desktop screens with zero horizontal overflow, comfortable 44–48px touch targets, and sticky direct call & WhatsApp action bar.
- **Authentic Local Photography:** Integrates the three original clinic photos:
  - Reception area (`public/images/clinic-reception.jpg`)
  - Dr Megersa portrait (`public/images/dr-megersa.jpg`)
  - Patient treatment in dental chair (`public/images/clinic-treatment.jpg`)
  *(Original root files preserved untouched).*
- **Central Clinic Configuration (`src/config/clinic.ts`):** All editable clinic data (phone numbers, address, social links, services, confirmation flags) are isolated in a single configuration file.
- **Real Lead Persistence:** 4-field inquiry form (+ optional Telegram & preferred date) that saves leads directly to a durable SQL database. Includes client & server validation, Ethiopian mobile format normalization (`09...`, `07...`, `+251...`), and abuse rate-limiting.
- **Simple & Secure CRM (`/admin`):**
  - Authenticated admin area with HttpOnly secure session cookies.
  - View all inquiries in real-time with instant call & WhatsApp actions.
  - Detailed view of requested service and requested visit date.
  - In-app admin password management with bcrypt hashing.
  - Initial password configurable via `ADMIN_INITIAL_PASSWORD`.

---

## 2. Project Architecture

```
Dr Megersa Dental Clinic/
├── .env.example              # Environment variables template
├── .env.local                # Local environment secrets (not in git)
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── test-suite.js             # Automated API & security integration tests
├── scripts/
│   └── verify-ui.js          # Puppeteer viewport & UI automated validation
├── public/
│   └── images/               # Optimized web-safe clinic images
│       ├── clinic-reception.jpg
│       ├── clinic-treatment.jpg
│       └── dr-megersa.jpg
└── src/
    ├── app/
    │   ├── admin/
    │   │   └── page.tsx      # Protected CRM dashboard & login
    │   ├── api/
    │   │   ├── admin/
    │   │   │   ├── change-password/route.ts
    │   │   │   ├── check-auth/route.ts
    │   │   │   ├── login/route.ts
    │   │   │   └── logout/route.ts
    │   │   └── leads/route.ts
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx          # Main public clinic homepage
    ├── components/
    │   ├── ClinicIntro.tsx
    │   ├── ContactSection.tsx
    │   ├── DoctorIntro.tsx
    │   ├── FaqSection.tsx
    │   ├── Footer.tsx
    │   ├── GallerySection.tsx
    │   ├── Header.tsx
    │   ├── Hero.tsx
    │   ├── MobileBottomBar.tsx
    │   ├── PatientExperience.tsx
    │   └── ServicesSection.tsx
    ├── config/
    │   └── clinic.ts         # Single source of truth for business data
    └── lib/
        ├── auth.ts           # JWT session signing & rate-limiting
        ├── db.ts             # Database layer (SQLite local / Turso cloud)
        └── validation.ts     # Phone normalization & input sanitation
```

---

## 3. Database Schema

Managed automatically by `src/lib/db.ts`:

### `leads` Table
| Column | Type | Description |
|---|---|---|
| `id` | `TEXT PRIMARY KEY` | Unique lead ID (`lead_<timestamp>_<rand>`) |
| `full_name` | `TEXT NOT NULL` | Patient's full name |
| `phone` | `TEXT NOT NULL` | Normalized phone number (e.g. `+251921489071`) |
| `telegram_username` | `TEXT` | Optional Telegram handle (without `@`) |
| `service` | `TEXT NOT NULL` | Selected service or custom inquiry reason |
| `preferred_date` | `TEXT` | Optional requested appointment date |
| `created_at` | `TEXT NOT NULL` | ISO 8601 UTC timestamp |
| `status` | `TEXT DEFAULT 'new'` | Lead status |

### `admin_settings` Table
| Column | Type | Description |
|---|---|---|
| `key` | `TEXT PRIMARY KEY` | Setting identifier (`admin_password_hash`) |
| `value` | `TEXT NOT NULL` | Bcrypt password hash |
| `updated_at` | `TEXT NOT NULL` | ISO 8601 UTC timestamp |

---

## 4. Run Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Set your desired `ADMIN_INITIAL_PASSWORD` and `JWT_SECRET`.

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site, or [http://localhost:3000/admin](http://localhost:3000/admin) to view the CRM.

### 4. Run Production Build & Serve
```bash
npm run build
npm run start
```

### 5. Run Verification & Test Suites
```bash
# Automated API, Auth, Security & Lead Persistence Tests (28 test assertions):
node test-suite.js

# Automated Mobile-First Browser Viewport & Screenshot Tests (360px, 390px, 768px, 1280px):
node scripts/verify-ui.js
```

---

## 5. Deployment Guide (Vercel)

### Option A: Standard Vercel Deploy with Turso Database (Recommended for Serverless)
1. Push repository to GitHub using `gh repo create` or GitHub web.
2. In Vercel, import the repository.
3. In Vercel Project Settings > Environment Variables, configure:
   - `JWT_SECRET`: Random 32+ character string
   - `ADMIN_INITIAL_PASSWORD`: Initial secure password for `/admin`
   - `TURSO_DATABASE_URL`: `libsql://your-db-name.turso.io`
   - `TURSO_AUTH_TOKEN`: Your Turso authorization token
4. Click **Deploy**. The website and CRM will have permanent durable storage across all serverless instances.

### Option B: Dedicated VM / Docker / Node Server
When deployed on any persistent server (DigitalOcean, Railway, VPS, Render), the application uses local SQLite file storage out of the box with zero external database setup required.

---

## 6. Clinic Verification Status

- **Confirmed:**
  - Business Name: Dr Megersa Dental Clinic
  - Doctor: Dr Megersa (Doctor of Dental Surgery)
  - Public Phone Numbers: 0921489071 (Primary WhatsApp & Call), 0922650000, 0922120000, 0922640000
  - Email: `babila875@gmail.com`
  - TikTok: `@dr_megersadentalclinic`
  - Facebook: `profile.php?id=100063796840993`
  - Google Maps: Pin in Adama verified

- **Marked for Clinic Confirmation:**
  - Address: *Nafran Mall, 3rd floor, near the post office and Karamara Hotel, Adama, Ethiopia* (flagged with verification badge).
  - Listed Services: *Dental Check-up, Teeth Cleaning, Tooth Filling, Root Canal Treatment, Tooth Replacement, Braces & Teeth Alignment* (all flagged as inquiry options pending direct clinical consultation).
