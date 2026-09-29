from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_root_reports_backend_version() -> None:
    response = client.get("/")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert response.json()["version"] == "0.1.1"


def test_health_reports_provider() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["provider"]
