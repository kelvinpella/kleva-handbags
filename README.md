# Kleva Handbags

Internal catalog for a local business that tracks brand-new (`Mpya`) and second-hand (`Mtumba`) handbags. The project runs on the Next.js App Router stack and is deployed to https://kleva-handbags.vercel.app/ for easy access by the team.

## Features
- Structured database of handbag metadata (condition, imagery, pricing).
- Quick filters for new vs. second-hand inventory views.
- Social links to TikTok and Instagram for cross-checking marketing content.
- **Automatic pricing calculation** with intelligent profit margin computation.
- Real-time selling price computation rounded to the nearest thousand.
- Price validation to prevent invalid entries.

## Tech Stack
- Next.js 15 / React 18
- TypeScript & Tailwind CSS
- Vercel hosting and deployment

## Local Development
Install dependencies and start the dev server:

```bash
npm install
npm run dev
# or: yarn dev / pnpm dev / bun dev
```

Visit http://localhost:3000 to preview changes. Edit `app/page.tsx` (and related components) to adjust catalog views; the page hot-reloads as you edit.

## Pricing System
The application includes an automatic pricing calculator that determines selling prices based on buying prices. When adding or editing products, simply enter the buying price and the system will automatically calculate the selling price using configured profit margins. The selling price is automatically rounded to the nearest thousand for cleaner pricing.

The pricing logic is implemented in `lib/pricing.ts` and can be adjusted as needed.

## Deployment
The project is automatically deployed to Vercel on every push to `main`. Manual deployments can be triggered via:

```bash
npm run build
vercel deploy --prod
```

## Contributing
1. Fork and clone the repo.
2. Create a feature branch: `git checkout -b feature/my-change`.
3. Run tests/lints (if available), open a PR, and describe your change clearly.
