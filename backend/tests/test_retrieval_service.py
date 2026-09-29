from pathlib import Path

from app.services.retrieval_service import RetrievalService


def test_retrieval_ranks_matching_documents(tmp_path: Path) -> None:
    source_dir = tmp_path / "source_docs"
    source_dir.mkdir()
    (source_dir / "profile.md").write_text(
        "Kyaw Htet is a Python engineer with applied AI experience.",
        encoding="utf-8",
    )
    (source_dir / "projects.md").write_text(
        "ResearchFlow AI uses FastAPI and retrieval workflows.",
        encoding="utf-8",
    )

    service = RetrievalService(source_docs_dir=source_dir)

    results = service.retrieve("Python engineer AI")

    assert results
    assert results[0].title == "Profile"
    assert results[0].score >= 2


def test_retrieval_ignores_empty_documents(tmp_path: Path) -> None:
    source_dir = tmp_path / "source_docs"
    source_dir.mkdir()
    (source_dir / "empty.md").write_text("   ", encoding="utf-8")

    service = RetrievalService(source_docs_dir=source_dir)

    assert service.retrieve("anything") == []
