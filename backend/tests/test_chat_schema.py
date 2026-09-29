import pytest
from pydantic import ValidationError

from app.schemas.chat import ChatRequest


def test_chat_request_defaults_to_chat_mode() -> None:
    request = ChatRequest(message="Hello")

    assert request.mode == "chat"
    assert request.message == "Hello"


def test_chat_request_rejects_empty_message() -> None:
    with pytest.raises(ValidationError):
        ChatRequest(message="")


def test_chat_request_rejects_oversized_message() -> None:
    with pytest.raises(ValidationError):
        ChatRequest(message="x" * 4001)
