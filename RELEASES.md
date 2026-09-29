# Release Process

## Versioning

Use Semantic Versioning (`MAJOR.MINOR.PATCH`) for portfolio releases.

- `PATCH` → fixes, copy/content corrections, and non-breaking polish
- `MINOR` → backward-compatible features or meaningful product improvements
- `MAJOR` → breaking API, architecture, or deployment-contract changes

## Release checklist

1. Work on a feature/fix branch.
2. Run frontend `npm run check`.
3. Run backend `pytest -q`.
4. Review environment and security changes.
5. Open a pull request into `main`.
6. Merge only after CI passes.
7. Update the application/package version when releasing.
8. Tag the exact release commit as `vX.Y.Z`.
9. Verify the deployed application and `/health` endpoint.

## Current target

The current release candidate is `v0.1.1`, focused on recruiter-facing project presentation, release metadata consistency, and verified production/runtime contracts.
