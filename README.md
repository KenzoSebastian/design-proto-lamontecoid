# LAMONTE — Global Fashion Commerce Platform

Global multi-market kids fashion storefront. One global brand, many markets:
`/{country}/{lang}/` localized stores (13 markets, 6 languages, full RTL for
Arabic), market-specific price lists, localized campaigns, per-market shipping
and payment methods, geo-aware market suggestion, store locator, and a
corporate /globalnetwork page.

## Stack

- Next.js 16.3.5 (App Router, static export via `output: "export"`)
- React 19, TypeScript, Tailwind CSS 3.4
- All dynamic routes prerendered with generateStaticParams (~685 pages)

## Commands

- `npm run dev` — local dev server
- `npm run build` — static export to `out/`, copied to `dist/`

## Structure

- `src/app/` — App Router routes (gateway, globalnetwork, [country]/[lang]/*)
- `src/views/` — page-level client components
- `src/components/` — chrome (header, footer, drawers, market gate, geo banner)
- `src/store/` — market + shop providers (root-level, survive market switches)
- `src/data/` — catalog, markets, per-market price lists
- `src/i18n/` — structured dictionaries (en/id/ar/ja/zh/vi)
