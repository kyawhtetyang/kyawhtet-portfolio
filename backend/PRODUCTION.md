# Production Readiness

## Required before public exposure

- Provider API keys are stored only in server-side environment/secrets.
- No private LLM provider key is shipped to the browser.
- `CORS_ORIGINS` contains only deployed frontend origins when the backend is exposed directly.
- Development reload mode is disabled.
- Production dependencies are reproducible and reviewed.
- Public AI traffic is rate-limited at the production edge.
- Request/error logging is available without logging secrets.
- Provider failures have a safe fallback.
- `/health` is monitored.
- Deployment uses the production Docker contract rather than the development Compose file.

## Production container contract

Use `docker-compose.production.yml` for the reference single-host deployment:

```text
Internet
   ↓
Nginx frontend container
   ├── static SPA
   └── /api/* → backend:8000
                 ↓
              LLM provider
```

The Nginx edge applies a baseline limit of 10 API requests/minute per client IP with a burst of 5. This is a baseline protection for the reference deployment, not a substitute for a managed WAF/API gateway at larger scale.

The frontend production image is built with `npm ci` and `npm run build`, then served by Nginx. The backend image runs Uvicorn without development reload. The backend health check is used by Compose before starting the frontend dependency.

## Development vs production

`docker-compose.yml` is a development environment. It mounts source directories and runs the Vite development server; it is not the production deployment contract.
