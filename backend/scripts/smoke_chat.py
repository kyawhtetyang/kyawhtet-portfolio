from __future__ import annotations

import json
from urllib.request import Request, urlopen


def main() -> None:
    payload = {"message": "What does ResearchFlow AI prove about Kyaw Htet as an AI engineer?"}
    request = Request(
        url="http://127.0.0.1:8000/api/chat",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    with urlopen(request, timeout=20) as response:
        data = json.loads(response.read().decode("utf-8"))

    print(json.dumps(data, indent=2))


if __name__ == "__main__":
    main()
