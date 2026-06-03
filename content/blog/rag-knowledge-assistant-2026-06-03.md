2026-06-03
RAG Knowledge Assistant - Learning Retrieval End to End
Project Diary

RAG Knowledge Assistant became one of my most important AI projects because it forced me to understand how retrieval actually works step by step instead of only calling a framework and hoping for the best.

I built it as a production-style FastAPI and PostgreSQL `pgvector` system with async ingestion, chunking, embeddings, retrieval, citations, eval runs, Docker healthchecks, and a minimal web UI. The goal was not only to make a demo that answers questions, but to understand the full architecture behind a real RAG service.

This project helped me learn the core pipeline clearly:

raw document
-> chunking
-> embedding generation
-> vector and text indexing
-> retrieval
-> prompt assembly
-> answer generation
-> citation return
-> evaluation and deployment checks

The most useful part was comparing retrieval strategies instead of treating RAG as one black box. I implemented `vector`, `fts`, and `hybrid` retrieval modes so I could see how semantic search and PostgreSQL full-text search can support each other. That made the system much easier to reason about.

I also designed the embeddings layer so the project can run in different modes depending on the environment:
- `hash` for lightweight VPS-friendly fallback
- `sentence_transformers` for stronger local semantic embeddings
- `openai` for hosted embeddings

That separation taught me an important engineering lesson: a good AI project is not only about model quality, but about choosing the right operating mode for local development, deployment constraints, and cost.

Another big lesson came from building the backend directly instead of hiding everything inside a higher-level framework. I had to think about chunk storage, ingestion jobs, retrieval scoring, healthchecks, and verification scripts. That gave me a much stronger understanding of how a RAG product should be structured if I want to debug it, extend it, or deploy it safely.

The current version already proves the full loop:
- upload a file
- process ingestion asynchronously
- store chunks
- retrieve relevant context
- answer with citations
- evaluate behavior through stored eval runs
- deploy and verify the system on a VPS

This project also changed how I think about learning AI engineering. Before this, I understood RAG more as a concept. After building this, I understand it more as an architecture: retrieval choices, chunking tradeoffs, embedding providers, database design, verification flow, and deployment discipline all matter together.

The likely next direction is a `v2` that explores a more framework-assisted workflow such as LangChain only after the fundamentals are already clear. I wanted `v1` to teach me the mechanics first, not hide them.

Skills gained: RAG architecture, retrieval design, chunking strategy, embeddings provider design, hybrid search with `pgvector` + FTS, async ingestion, FastAPI system design, Docker deployment, VPS verification, and production-oriented AI backend thinking.
