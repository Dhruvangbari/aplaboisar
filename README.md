# आपलं Boisar — आपली माणसं, आपली ओळख (AaplaBoisar)
### The Complete Hyperlocal Digital Ecosystem for Boisar & Tarapur MIDC, Maharashtra

A responsive Web Application and installable Progressive Web App (PWA) built specifically for Boisar, designed with shared API and database architecture to power upcoming Android and iOS mobile applications.

---

## 🌟 Core Modules Implemented

### 1. Public Ecosystem
- **Homepage (`/`)**:
  - Brand identity with bilingual typography (मराठी, हिंदी, English)
  - Hero visual featuring the iconic **बोईसर BOISAR** railway signboard & Western Railway train
  - Large smart search bar with voice recognition & popular tags
  - Quick Category row with rounded pastel cards
  - **Iconic Places in Boisar** (Chinchani Beach, Kelve Beach, Shirgaon Fort, Tarapur Fort & Lighthouse, Dahanu Beach & Orchards)
  - **Loans & Finance Hub in Boisar** (Home Loan, Personal Loan, Business Loan for MIDC, Gold Loan)
  - **Grow Your Business in Boisar** banner with ad packages (7 Days ₹299, 15 Days ₹599, 30 Days ₹999)
  - **Trending in Boisar 🔥** and **Smart Local Offers 🏷️**
- **Business Directory (`/businesses`, `/business/:slug`)**:
  - Filter by Category, Area, Open Now, Verified status, Rating, Distance
  - Business Detail with photo gallery, about, opening hours, verified customer reviews, owner response, WhatsApp chat, direct phone dial, Google Maps directions, active coupons, and lead inquiry form.
- **Smart Local Offers (`/offers`)**:
  - Categorized deals, validity countdown, instant coupon code copy, claim offer with coin rewards.
- **Boisar–Tarapur Jobs (`/jobs`)**:
  - Factory jobs, ITI Electrician, QC Chemist, Accounts, Machine Operator, Fresher jobs in Tarapur MIDC.
- **Boisar Real Estate (`/properties`)**:
  - Buy, Rent, Sell for 1 & 2 BHK flats in Ostwal Empire, Tata Housing, commercial shops on Station Road, and NA plots. Schedule site visits with 1-click.
- **Home Services (`/services`)**:
  - Need ↔ Available local skilled workers (Electrician, Plumber, AC Repair, RO Purifier, Appliance).
- **Emergency Hub (`/emergency`)**:
  - 1-tap direct emergency dials (Ambulance 108, Police 112, Fire 101, Boisar Police MIDC 02525-272100).
  - Boisar Rural Hospital, Apex Trauma & Cardiac Care, Rotary Blood Bank.
- **Transport & Local Travel (`/transport`)**:
  - Boisar Station Auto Stand, Boisar-Palghar Shared Eeco Cabs, Mumbai Airport/Borivali AC Shuttle Cabs, School Vans.
- **Boisar Today Community Feed (`/boisar-today`)**:
  - Real-time social feed with photo sharing, local announcements, Western railway track alerts, likes, and comments.
- **Student Zone (`/students`)**:
  - Vartak College solved question papers, second-hand engineering books, local tuitions, industrial internships.
- **Lost & Found Board (`/lost-found`)**:
  - Report lost and found items (Wallet, Keys, Pets, Documents) with location and contact phone.
- **AaplaBoisar Coins & Rewards (`/rewards`)**:
  - Loyalty point wallet, daily check-in coins, and voucher redemption with celebratory confetti.
- **Smart Boisar Interactive Map (`/map`)**:
  - Layer-based point of interest explorer with GPS coordinates and distance from Boisar Station.
- **Ask AaplaBoisar AI (`Modal / Floating Trigger`)**:
  - Conversational AI understanding Marathi, Hindi, English & Hinglish returning rich interactive cards.

---

### 2. Business Owner SaaS Portal
- **13-Step Business Onboarding (`/business/register`)**:
  - Business Name, Category, Contact, Address, Map Coordinates, Photos, AI Bio Generator, Opening Hours, Services, Pricing, Payment Methods, Review, and Instant Live Publishing.
- **Business Dashboard (`/business/dashboard`)**:
  - KPIs: Profile views, Phone calls, WhatsApp clicks, Directions requested.
  - AI Lead Assistant with priority classification (🔴 High Priority, 🟡 Medium Priority) and conversion reason.
- **AI Growth & Marketing Suite (`/business/ai-tools`)**:
  - **AI Advertisement Creator**: Generates ad headlines, promotional body, WhatsApp templates, and social media captions.
  - **AI Local Offer Generator**: Recommends strategic weekday discount campaigns.
  - **AI Review Reply Assistant**: Generates polite replies in Marathi, Hindi & English.
- **Business Subscriptions (`/business/subscription`)**:
  - Free (₹0/mo), Premium (₹199/mo), Gold Partner (₹399/mo).
- **Ad & Reel Promotion Marketplace (`/business/ads`)**:
  - Banner campaigns (7 days ₹399, 15 days ₹899, 30 days ₹1,799) & Reel campaigns (1 reel ₹499 to 10 reels ₹2,499).

---

### 3. Admin Panel (`/admin`)
- Matches the secure administrative layout with dark sidebar:
  - **Manage Iconic Places**: Full table with reordering, cover photo editor, status toggle (Published/Draft), coordinates and tags editor.
  - **Business Verification Manager**: Control verification badges (🟢 Listed, 🔵 Verified, 🟡 Trusted).
  - **System Analytics & KPIs**: Revenue tracking, active ads, active local users.

---

## 🛠️ Technology Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Vanilla CSS tokens
- **Icons**: Lucide React
- **Routing**: React Router DOM (v7)
- **Effects**: Canvas Confetti (Loyalty rewards celebration)
- **Fonts**: Google Fonts (Noto Sans Devanagari for Marathi/Hindi, Plus Jakarta Sans, Inter)
- **State & Storage**: React Context + LocalStorage persistence for all listings and user state
- **PWA**: `manifest.json`, theme colors, and responsive bottom bar

---

## 🚀 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```
>>>>>>> 746238b (Initial commit: Complete AaplaBoisar platform)
