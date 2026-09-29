# kyawhtet-portfolio

This repository contains the `kyawhtet-portfolio` project, the full-stack codebase behind the public `Kyaw Htet` portfolio site.

## Structure

```text
v0/
├── frontend/         # React + Vite portfolio UI
├── backend/          # FastAPI + retrieval + LLM integration
├── docker-compose.yml
├── docker-compose.production.yml
├── .env.example
├── RELEASES.md
├── VERSION
└── README.md
```

## Current Status

- `frontend/` contains the existing portfolio app and Ask UI.
- `backend/` contains the FastAPI Ask/chat API, local source-doc retrieval, health endpoint, and provider fallback.
- Current release-prep version is `0.1.1`.

## Frontend

Run the public portfolio app from `frontend/`.

```bash
cd frontend
npm install
npm run dev
npm run check
```

## Backend Direction

Current backend responsibilities:

- load curated portfolio source documents
- retrieve relevant context for recruiter questions
- call Gemini or another LLM provider
- return chat-style answers to the Ask UI
- report deployment health at `/health`

## Verification

```bash
cd frontend
npm run check

cd ../backend
pip install -r requirements-dev.txt
pytest -q
```
