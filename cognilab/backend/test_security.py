"""Tests de las protecciones del backend.

Cubren los tres bugs que se corrigieron juntos, porque los tres fallaban en
silencio: la app seguía "funcionando" mientras filtraba archivos o dejaba
entrar con la contraseña que no era.

    pip install -r requirements-dev.txt
    python -m pytest backend/test_security.py -q
"""
import importlib
import time
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

PASSWORD = "contraseña2026"  # con ñ a propósito: es el caso que rompía el login


@pytest.fixture
def client(monkeypatch, tmp_path):
    """App recargada con un static/ de prueba y una contraseña con acentos."""
    static = tmp_path / "static"
    (static / "assets").mkdir(parents=True)
    (static / "index.html").write_text("<html>spa</html>", encoding="utf-8")
    # Un archivo fuera de static/ que ninguna petición debería poder leer.
    (tmp_path / "secreto.txt").write_text("SECRETO", encoding="utf-8")

    monkeypatch.setenv("APP_PASSWORD", PASSWORD)
    monkeypatch.setenv("STATIC_DIR", str(static))
    import main
    importlib.reload(main)  # la ruta SPA se registra al importar
    with TestClient(main.app) as c:
        c.main = main
        c.static = static
        yield c


def spa_handler(main):
    """El handler de la ruta catch-all, para invocarlo con el path crudo.

    Hace falta llamarlo directo porque TestClient (httpx) normaliza la URL y
    colapsa los ".." antes de mandarla: con peticiones normales el ataque nunca
    llega al servidor y el test pasa aunque la protección esté rota. uvicorn en
    cambio entrega el path tal cual, que es lo que se simula aquí.
    """
    for route in main.app.routes:
        if getattr(route, "path", None) == "/{path:path}":
            return route.endpoint
    raise AssertionError("no se registró la ruta SPA")


def auth_token(client) -> str:
    res = client.post("/api/auth", json={"password": PASSWORD})
    assert res.status_code == 200
    return res.json()["token"]


# ───────── contraseña ─────────

def test_password_con_enie_es_aceptada(client):
    """compare_digest sobre str tiraba TypeError -> 500 con la contraseña correcta."""
    res = client.post("/api/auth", json={"password": PASSWORD})
    assert res.status_code == 200
    assert res.json()["token"]


def test_password_incorrecta_es_401_no_500(client):
    """Un 500 aquí hacía que el frontend cayera a su contraseña por defecto."""
    res = client.post("/api/auth", json={"password": "cognilab2026"})
    assert res.status_code == 401


# ───────── tokens ─────────

def test_endpoint_de_ia_exige_token(client):
    assert client.post("/api/ai/chat", json={"messages": []}).status_code == 401
    res = client.post(
        "/api/ai/chat",
        json={"messages": []},
        headers={"Authorization": "Bearer inventado"},
    )
    assert res.status_code == 401


def test_token_valido_pasa_la_autenticacion(client):
    """503 = autenticó bien y solo falta HF_TOKEN (degradación elegante)."""
    res = client.post(
        "/api/ai/chat",
        json={"messages": [{"role": "user", "content": "hola"}]},
        headers={"Authorization": f"Bearer {auth_token(client)}"},
    )
    assert res.status_code == 503


def test_token_caducado_es_rechazado(client):
    token = auth_token(client)
    # Vencerlo a mano en vez de esperar 12 h reales.
    client.main._tokens[token] = time.monotonic() - 1
    res = client.post(
        "/api/ai/chat",
        json={"messages": []},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert res.status_code == 401


def test_los_tokens_vencidos_no_se_acumulan(client):
    """Sin poda, el dict crecía sin techo en un Space que no se reinicia."""
    viejo = auth_token(client)
    client.main._tokens[viejo] = time.monotonic() - 1
    auth_token(client)  # un login nuevo dispara la poda
    assert viejo not in client.main._tokens


# ───────── path traversal ─────────

@pytest.mark.parametrize("path", [
    "../secreto.txt",                    # vecino de static/
    "assets/../../secreto.txt",          # el ".." escondido tras un subdirectorio
    "../../../../../../etc/passwd",      # escape hasta la raíz del contenedor
])
def test_no_se_puede_salir_de_static(client, path):
    """Sin resolve()+is_relative_to() esto servía el archivo real, y sin pedir
    contraseña: la ruta SPA no pasa por require_token."""
    servido = Path(spa_handler(client.main)(path).path)
    assert servido == client.static / "index.html", f"{path} escapó de static/"


def test_la_spa_sigue_sirviendose(client):
    """La corrección no puede romper el caso normal: un archivo real del build
    se sirve, y una ruta del router de React cae en index.html."""
    (client.static / "logo.svg").write_text("<svg/>", encoding="utf-8")
    assert Path(spa_handler(client.main)("logo.svg").path) == client.static / "logo.svg"
    assert Path(spa_handler(client.main)("progreso").path) == client.static / "index.html"
    assert client.get("/index.html").text == "<html>spa</html>"
