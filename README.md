# Tony Kwok — Portfolio

Personal site of Tony Kwok. ML Engineer at Spotify by day, building products by night.

Live: https://id-preview--b99d9c95-b72e-47b0-9511-8ef6464bc2e7.lovable.app

## Stack

- TanStack Start (React 19 + Vite 7)
- Tailwind CSS v4
- TypeScript
- Deployed on Cloudflare Workers

## Develop

```bash
bun install
bun run dev
```

Open http://localhost:3000.

## Build

```bash
bun run build
```

## Structure

- `src/routes/` — file-based routes (TanStack Router)
- `src/components/portfolio/` — portfolio sections (Nav, Section, NeuralBackground)
- `src/components/ui/` — shadcn/ui primitives
- `src/styles.css` — design tokens and Tailwind setup

## Edit

Built with [Lovable](https://lovable.dev). Changes made in Lovable sync to this repo automatically; pushes to GitHub sync back to Lovable.