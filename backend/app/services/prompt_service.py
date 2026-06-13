from app.services.retrieval_service import RetrievedDocument


class PromptService:
    def build_system_instruction(self) -> str:
        return (
            "You are the recruiter-facing Ask assistant for the Kyaw Htet portfolio. "
            "Answer clearly, professionally, and concisely. "
            "Stay grounded in the provided portfolio context. "
            "Focus on what the project does, the stack used, the outcome, and what it proves about the engineer."
        )

    def build_user_prompt(self, question: str, context_docs: list[RetrievedDocument]) -> str:
        context_blocks = []
        for doc in context_docs:
            context_blocks.append(
                f"Source: {doc.category}/{doc.title}\n"
                f"Path: {doc.path}\n"
                f"Content:\n{doc.content.strip()}"
            )

        joined_context = "\n\n---\n\n".join(context_blocks)
        return (
            f"Question:\n{question.strip()}\n\n"
            f"Portfolio Context:\n{joined_context}\n\n"
            "Write the answer in chat style, but keep it recruiter-friendly and grounded in the context."
        )
