from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_root_reports_application_status() -> None:
    response = client.get("/")

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["app"]
    assert body["version"]


def test_health_endpoint_is_available() -> None:
    response = client.get("/health")

    assert response.status_code == 200
