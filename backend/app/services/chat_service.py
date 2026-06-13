from app.config import settings
from app.providers.gemini_provider import GeminiProvider
from app.schemas.chat import ChatRequest, ChatResponse, SourceSnippet
from app.services.prompt_service import PromptService
from app.services.retrieval_service import RetrievalService


class ChatService:
    def __init__(
        self,
        retrieval_service: RetrievalService | None = None,
        provider: GeminiProvider | None = None,
        prompt_service: PromptService | None = None,
    ) -> None:
        self.retrieval_service = retrieval_service or RetrievalService()
        self.provider = provider or GeminiProvider()
        self.prompt_service = prompt_service or PromptService()

    def generate_reply(self, payload: ChatRequest) -> ChatResponse:
        retrieved_docs = self.retrieval_service.retrieve(payload.message)
        system_instruction = self.prompt_service.build_system_instruction()
        prompt = self.prompt_service.build_user_prompt(payload.message, retrieved_docs)
        answer = self.provider.generate_answer(
            question=payload.message,
            context_docs=retrieved_docs,
            system_instruction=system_instruction,
            prompt=prompt,
        )
        used_sources = [
            SourceSnippet(
                title=doc.title,
                category=doc.category,
                excerpt=doc.content[:220].strip(),
                path=doc.path,
            )
            for doc in retrieved_docs
        ]
        return ChatResponse(
            answer=answer,
            provider=settings.model_provider,
            used_sources=used_sources,
        )
