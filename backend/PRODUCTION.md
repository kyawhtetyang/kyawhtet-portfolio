# Production

This backend powers the public Kyaw Htet portfolio Ask experience.

## Required Environment

- `GEMINI_API_KEY` must stay server-side.
- `OPENAI_COMPATIBLE_API_KEY` must stay server-side when fallback is enabled.
- `CORS_ORIGINS` must be set to the production frontend origin, for example `https://kyawhtet.com`.
- `CORS_ORIGIN_REGEX` should not allow arbitrary public origins.
- `MODEL_PROVIDER` should be set explicitly in production.

## Runtime Requirements

- Serve with `uvicorn app.main:app --host 0.0.0.0 --port 8000` or the platform equivalent.
- Expose `GET /health` for deployment and uptime checks.
- Do not use `--reload` in production.
- Keep provider keys out of frontend environment files and browser bundles.
- Restrict CORS to the deployed frontend domain.

## Release Verification

Before a production deploy:

```bash
pip install -r requirements-dev.txt
pytest -q
```

After deployment:

```bash
curl -fsS https://<backend-host>/health
```

## Known Follow-Up

The current backend does not yet include persistent request logging or rate limiting middleware. Add those before treating this as a hardened production API.
