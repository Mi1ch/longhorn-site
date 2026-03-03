# Longhorn Associates Website Template

A modern, fully responsive React website template for Longhorn Associates Investment Management.

## Pages Included

- **Home** — Hero, stats counters, service cards, why-us section, testimonials, CTA
- **Services** — Detailed product pages for all 6 investment products
- **About** — Company story, mission/vision, leadership team
- **Insights** — Filterable articles & market updates
- **Contact** — Enquiry form with service selector
- **Client Portal** — 3-step investor registration + login UI

## Tech Stack

- React 18 + React Router v6
- Pure CSS (no Tailwind dependency, lightweight)
- Google Fonts (Playfair Display + Inter)
- Lucide React icons

## Deploy to Vercel (3 steps)

### Option A: Vercel CLI
```bash
npm install -g vercel
cd longhorn-site
npm install
vercel
```

### Option B: GitHub + Vercel Dashboard
1. Push this folder to a GitHub repository
2. Go to https://vercel.com/new
3. Import the repository
4. Vercel auto-detects Create React App — click **Deploy**

### Option C: Vercel Dashboard (Drag & Drop)
1. Run `npm install && npm run build` locally
2. Drag the `build/` folder into https://vercel.com/new

## Local Development

```bash
cd longhorn-site
npm install
npm start
```

Opens at http://localhost:3000

## Customisation Notes for Production

- Replace placeholder team names/photos in `OtherPages.jsx`
- Connect the contact form to a backend endpoint or EmailJS
- Connect the registration form to Django backend
- Replace mock portfolio chart data with real API calls
- Update phone/email/address in Footer.jsx and ContactPage
- Add real articles to the Insights page (or connect to CMS)

## Brand Colours
- Dark Green: `#0f2419`
- Mid Green: `#1a3a2a`
- Accent Green: `#2d6a4f`
- Gold: `#c9a84c`
