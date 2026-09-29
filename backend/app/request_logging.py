from __future__ import annotations

import logging
from time import perf_counter
from uuid import uuid4

from fastapi import Request
from starlette.responses import Response


logger = logging.getLogger("portfolio.requests")


async def log_request(request: Request, call_next) -> Response:
    """Log request outcomes without recording query strings, bodies, or headers."""
    request_id = uuid4().hex
    started = perf_counter()

    try:
        response = await call_next(request)
    except Exception as exc:
        duration_ms = (perf_counter() - started) * 1000
        logger.error(
            "request_failed request_id=%s method=%s path=%s error_type=%s duration_ms=%.1f",
            request_id,
            request.method,
            request.url.path,
            type(exc).__name__,
            duration_ms,
        )
        raise

    duration_ms = (perf_counter() - started) * 1000
    logger.info(
        "request_completed request_id=%s method=%s path=%s status=%s duration_ms=%.1f",
        request_id,
        request.method,
        request.url.path,
        response.status_code,
        duration_ms,
    )
    response.headers["X-Request-ID"] = request_id
    return response
