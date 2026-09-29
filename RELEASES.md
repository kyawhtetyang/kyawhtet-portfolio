# Releases

## 0.1.1 - Recruiter Featured Projects

Status: in preparation

Scope:
- Refine recruiter-facing featured project presentation.
- Normalize release version truth across the runtime.
- Restore release, production, and verification documentation expected by the Personal OS project record.
- Add backend test coverage and CI release gates.

Release gates:
- Frontend: `npm run check`
- Backend: `pip install -r requirements-dev.txt && pytest -q`
- Production review: `backend/PRODUCTION.md`
- Deployment verification: public frontend and backend `/health`

## 0.1.0 - Portfolio Ask Hardening

Status: historical baseline

Scope:
- Establish the public full-stack portfolio runtime.
- Add the Ask experience with local source-doc retrieval and provider fallback.
- Document production responsibilities for the public portfolio.
