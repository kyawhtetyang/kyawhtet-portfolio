from __future__ import annotations

import json
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from app.config import settings
from app.services.retrieval_service import RetrievedDocument


class GeminiProvider:
    def generate_answer(
        self,
        question: str,
        context_docs: list[RetrievedDocument],
        system_instruction: str,
        prompt: str,
    ) -> str:
        if not context_docs:
            return (
                "I do not have enough portfolio context yet to answer that confidently. "
                "Add curated source docs under backend/data/source_docs so I can answer like a recruiter-facing assistant."
            )

        if settings.gemini_api_key:
            live_answer = self._call_gemini(system_instruction=system_instruction, prompt=prompt)
            if live_answer:
                return live_answer

        intro = "Based on the portfolio context I have, here is the clearest answer:\n\n"
        body = context_docs[0].content.strip()
        source_list = ", ".join(f"{doc.category}/{doc.title}" for doc in context_docs)
        return f"{intro}{body}\n\nCurrent supporting sources: {source_list}."

    def _call_gemini(self, system_instruction: str, prompt: str) -> str | None:
        url = (
            "https://generativelanguage.googleapis.com/v1beta/models/"
            f"{settings.gemini_model}:generateContent"
        )
        payload = {
            "system_instruction": {
                "parts": [{"text": system_instruction}],
            },
            "contents": [
                {
                    "parts": [{"text": prompt}],
                }
            ],
        }
        request = Request(
            url=url,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "x-goog-api-key": settings.gemini_api_key,
            },
            method="POST",
        )

        try:
            with urlopen(request, timeout=20) as response:
                parsed = json.loads(response.read().decode("utf-8"))
        except (HTTPError, URLError, TimeoutError, json.JSONDecodeError):
            return None

        candidates = parsed.get("candidates", [])
        if not candidates:
            return None

        parts = candidates[0].get("content", {}).get("parts", [])
        text_parts = [part.get("text", "").strip() for part in parts if part.get("text")]
        return "\n".join(text_parts).strip() or None
