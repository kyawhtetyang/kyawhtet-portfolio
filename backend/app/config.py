from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[1]
SOURCE_DOCS_DIR = BASE_DIR / "data" / "source_docs"


def _read_env_list(value: str | None, default: list[str]) -> list[str]:
    if not value or not value.strip():
        return default
    return [item.strip() for item in value.split(",") if item.strip()]


@dataclass(frozen=True)
class Settings:
    app_name: str = "AI/ML Portfolio Backend"
    app_version: str = "0.1.0"
    model_provider: str = os.getenv("MODEL_PROVIDER", "gemini")
    gemini_model: str = os.getenv("GEMINI_MODEL", "gemini-3.5-flash")
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    source_docs_dir: Path = SOURCE_DOCS_DIR
    max_context_docs: int = int(os.getenv("MAX_CONTEXT_DOCS", "3"))
    cors_origins: list[str] = None  # type: ignore[assignment]
    cors_origin_regex: str = os.getenv("CORS_ORIGIN_REGEX", r"https?://(localhost|127\.0\.0\.1)(:\d+)?$")

    def __post_init__(self) -> None:
        object.__setattr__(
            self,
            "cors_origins",
            _read_env_list(
                os.getenv("CORS_ORIGINS"),
                ["http://127.0.0.1:5173", "http://localhost:5173"],
            ),
        )


settings = Settings()
