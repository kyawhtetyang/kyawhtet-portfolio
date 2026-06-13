from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from app.config import settings


@dataclass
class RetrievedDocument:
    title: str
    category: str
    path: str
    content: str
    score: int


class RetrievalService:
    def __init__(self, source_docs_dir: Path | None = None) -> None:
        self.source_docs_dir = source_docs_dir or settings.source_docs_dir

    def retrieve(self, query: str, limit: int | None = None) -> list[RetrievedDocument]:
        docs = self._load_documents()
        query_terms = self._tokenize(query)
        ranked: list[RetrievedDocument] = []

        for doc in docs:
            content_terms = self._tokenize(doc.content)
            score = sum(content_terms.count(term) for term in query_terms)
            if score > 0:
                doc.score = score
                ranked.append(doc)

        ranked.sort(key=lambda doc: doc.score, reverse=True)
        max_docs = limit or settings.max_context_docs
        return ranked[:max_docs]

    def _load_documents(self) -> list[RetrievedDocument]:
        if not self.source_docs_dir.exists():
            return []

        docs: list[RetrievedDocument] = []
        for path in sorted(self.source_docs_dir.rglob("*.md")):
            text = path.read_text(encoding="utf-8").strip()
            if not text:
                continue

            relative_path = path.relative_to(self.source_docs_dir)
            parts = relative_path.parts
            category = parts[0] if parts else "general"
            title = path.stem.replace("_", " ").replace("-", " ").title()
            docs.append(
                RetrievedDocument(
                    title=title,
                    category=category,
                    path=str(relative_path),
                    content=text,
                    score=0,
                )
            )
        return docs

    @staticmethod
    def _tokenize(text: str) -> list[str]:
        return [token for token in "".join(ch.lower() if ch.isalnum() else " " for ch in text).split() if token]
