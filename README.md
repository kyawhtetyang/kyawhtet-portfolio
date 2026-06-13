# kyawhtet-portfolio

This repository contains the `kyawhtet-portfolio` project, the full-stack codebase behind the public `Kyaw Htet` portfolio site.

## Structure

```text
v0/
├── frontend/         # React + Vite portfolio UI
├── backend/          # FastAPI + retrieval + LLM integration
├── docker-compose.yml
├── .env.example
└── README.md
```

## Current Status

- `frontend/` contains the existing portfolio app and Ask UI.
- `backend/` is scaffolded for the upcoming chat, chunk retrieval, and LLM connection work.

## Frontend

Run the public portfolio app from `frontend/`.

```bash
cd frontend
npm install
npm run dev
npm run check
```

## Backend Direction

Planned backend responsibilities:

- load and chunk portfolio source documents
- retrieve relevant context for recruiter questions
- call Gemini or another LLM provider
- return chat-style answers to the Ask UI
