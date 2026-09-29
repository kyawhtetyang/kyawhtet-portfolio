from app.config import Settings


def test_production_cors_can_be_configured() -> None:
    settings = Settings()

    assert settings.cors_origins is not None
    assert isinstance(settings.cors_origins, list)
