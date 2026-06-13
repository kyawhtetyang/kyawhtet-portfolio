from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    session_id: str | None = None


class SourceSnippet(BaseModel):
    title: str
    category: str
    excerpt: str
    path: str


class ChatResponse(BaseModel):
    answer: str
    provider: str
    used_sources: list[SourceSnippet]
