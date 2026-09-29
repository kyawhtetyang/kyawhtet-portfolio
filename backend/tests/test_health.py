import logging

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_root_reports_application_status() -> None:
    response = client.get("/")

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["app"]
    assert body["version"] == "0.1.1"


def test_health_endpoint_is_available() -> None:
    response = client.get("/health")

    assert response.status_code == 200


def test_request_logging_is_safe_and_returns_request_id(caplog) -> None:
    with caplog.at_level(logging.INFO, logger="portfolio.requests"):
        response = client.get("/health?secret=do-not-log")

    assert response.status_code == 200
    assert response.headers["x-request-id"]
    messages = [record.getMessage() for record in caplog.records]
    assert any("path=/health" in message for message in messages)
    assert all("do-not-log" not in message for message in messages)
