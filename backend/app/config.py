from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[1]
SOURCE_DOCS_DIR = BASE_DIR / "data" / "source_docs"
ENV_FILE = BASE_DIR / ".env"


def _load_env_file(path: Path) -> None:
    if not path.exists():
        return

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip())


def _read_env_list(value: str | None, default: list[str]) -> list[str]:
    if not value or not value.strip():
        return default
    return [item.strip() for item in value.split(",") if item.strip()]


_load_env_file(ENV_FILE)


@dataclass(frozen=True)
class Settings:
    app_name: str = "Kyaw Htet Portfolio Backend"
    app_version: str = "0.1.1"
    model_provider: str = os.getenv("MODEL_PROVIDER", "gemini")
    gemini_model: str = os.getenv("GEMINI_MODEL", "gemini-3.5-flash")
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    openai_compatible_base_url: str = os.getenv("OPENAI_COMPATIBLE_BASE_URL", "")
    openai_compatible_model: str = os.getenv("OPENAI_COMPATIBLE_MODEL", "")
    openai_compatible_api_key: str = os.getenv("OPENAI_COMPATIBLE_API_KEY", "")
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
