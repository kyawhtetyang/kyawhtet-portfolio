# Frontend

React + Vite portfolio UI, including the `Ask` chat surface.

Env guidance:

- `.env.local` is the private/local setup on this machine. It can keep `Library` and `Settings` enabled.
- `.env.local.example` is the public-safe template for GitHub/deploy setup. It keeps `Blog` and `Ask` enabled, and disables `Library` and `Settings` by default.
- Feature flags now use the uniform pattern `VITE_<FEATURE>_ENABLE` plus `VITE_<FEATURE>_BETA`.
- Beta flags only control whether a visible section is marked and gated as beta. The local browser setting `Show beta features` is now off by default.

Common commands:

```bash
npm install
npm run dev
npm run check
```
