# Homespot

Lokalna strona Homespot Nieruchomości (Next.js + TypeScript + SCSS/BEM).

## Start

```bash
cd ~/Projects/homespot
npm run dev
```

- Strona: http://localhost:3000
- CMS: http://localhost:3000/admin/login

Dane logowania CMS są w `.env.local` (`ADMIN_USER` / `ADMIN_PASSWORD`).

## Architektura

- Atomic design: `atoms` / `molecules` / `organisms` / `templates`
- Style: `src/styles` (tokeny, mixiny, BEM)
- Treści: `data/site-content.json` (edycja przez panel admina)

## Brand

- Cyan `#31B8C5`
- Oxford Blue `#002147`
- Rich black `#090400`
