# Backend

This backend powers the `Ask` experience for the portfolio.

Current responsibilities:

- expose chat endpoints for the frontend
- read curated portfolio source documents
- retrieve matching source docs for each question
- call Gemini when `GEMINI_API_KEY` is configured
- fall back to a grounded local formatter when Gemini is unavailable
- allow local frontend development across common Vite ports on `localhost` and `127.0.0.1`

## Run Locally

1. Create a backend env file:

```bash
cp .env.example .env
```

2. Add your `GEMINI_API_KEY` in `.env`.

3. Start the backend:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

4. Optional smoke test:

```bash
python scripts/smoke_chat.py
```

## Current API

- `GET /health`
- `POST /api/chat`
