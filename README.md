# Kyaw Htet Portfolio (v1)

Personal portfolio web app showcasing AI/ML, Python, desktop, and web projects.

## Tech Stack

- React + TypeScript
- Vite
- Utility-first styling

## Run Locally

Prerequisite: Node.js 18+

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Quality Checks

```bash
npm run lint
npm run test
npm run check
```

## Contact Form (Formspree)

The `Send Message` button posts directly to Formspree.

1. Create a form in Formspree and copy your endpoint URL.
2. Set the endpoint in `.env.local`:

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

3. Restart dev server after editing env vars.

## Deployment

Recommended: deploy with Vercel from `main`.

For production on Vercel, also set:

- `VITE_FORMSPREE_ENDPOINT`

## Notes

- Projects include filters: `Featured`, `All`, `AI/ML`, `Python`, `Web App`, `Desktop App`.
- Project cards open a modal with: `Overview`, `Tech Stack`, `Outcome`.
- Modal buttons:
  - `Open` for live demo/website (when available)
  - `GitHub` for source code
  - `Download` for direct installer (when available)
- Contact is handled via a modal from the Discover page (no separate Contact tab).
