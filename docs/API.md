# BrainBit Backend API Reference

Base URL: `http://localhost:5000/api` (development)

## Health Check

### GET `/health`

Simple endpoint to verify backend is running.

```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## Authentication Routes

*Endpoints: `/api/auth/*` (to be implemented)*

### POST `/auth/register`
Register a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "token": "jwt-token"
}
```

### POST `/auth/login`
Login with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (200):**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### POST `/auth/verify`
Verify JWT token (used for auto-login).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "valid": true,
  "user": { /* user object */ }
}
```

---

## Progress Routes

*Endpoints: `/api/progress/*` (to be implemented)*

### GET `/progress`
Get all progress data for current user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "categories": {
    "vernetztes-denken": {
      "mastered": ["E1", "E3"],
      "stats": { /* stats */ }
    },
    "mathematik": {
      "stats": { /* stats */ }
    }
    // ... other categories
  }
}
```

### POST `/progress/save`
Save/update progress for a category.

**Request:**
```json
{
  "category": "mathematik",
  "type": "percent",
  "result": "correct",
  "metadata": { /* additional data */ }
}
```

**Response (200):**
```json
{
  "success": true,
  "progress": { /* updated progress */ }
}
```

### POST `/progress/import-legacy`
Import progress from 6 existing HTML apps (localStorage).

**Request:**
```json
{
  "legacyData": {
    "vernetztes-denken-progress": { /* ... */ },
    "mathematik-progress": { /* ... */ }
  }
}
```

**Response (200):**
```json
{
  "imported": 6,
  "merged": true,
  "progress": { /* complete progress */ }
}
```

---

## AI Routes

*Endpoints: `/api/ai/*` (to be implemented)*

### POST `/ai/chat`
Send a message to the AI tutor.

**Request:**
```json
{
  "message": "How do I calculate percentage in Mathematik?",
  "category": "mathematik",
  "context": { /* optional */ }
}
```

**Response (200):**
```json
{
  "reply": "To calculate a percentage...",
  "sources": [
    { "title": "...", "url": "..." }
  ]
}
```

### GET `/ai/analysis`
Get AI-generated weakness analysis.

**Query params:**
- `limit` (default: 3) — number of weak categories to return

**Response (200):**
```json
{
  "weaknesses": [
    {
      "category": "zahlenreihen",
      "accuracy": 65,
      "recommendation": "Practice series patterns for 30 min"
    },
    // ...
  ]
}
```

### POST `/ai/generate-exercise`
Generate a new AI exercise for a category.

**Request:**
```json
{
  "category": "konzentration",
  "type": "vector",
  "difficulty": "advanced"
}
```

**Response (200):**
```json
{
  "id": "exercise-uuid",
  "type": "vector",
  "text": "...",
  "options": [...],
  "correct": "...",
  "explain": "...",
  "verified": true,
  "generatedBy": "ai"
}
```

---

## Search Routes

*Endpoints: `/api/search/*` (to be implemented)*

### GET `/search?q=query`
Search the internet for a topic.

**Response (200):**
```json
{
  "query": "binary conversion",
  "results": [
    {
      "title": "...",
      "url": "...",
      "snippet": "...",
      "source": "wikipedia|google"
    }
  ]
}
```

---

## Error Handling

All errors return a consistent format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "status": 400
}
```

Common status codes:
- `400` — Bad request
- `401` — Unauthorized (missing/invalid token)
- `403` — Forbidden
- `404` — Not found
- `500` — Server error

---

## Authentication

Most routes require JWT authentication via the `Authorization` header:

```
Authorization: Bearer <jwt-token>
```

The JWT includes:
```json
{
  "userId": "user-uuid",
  "email": "user@example.com",
  "iat": 1234567890,
  "exp": 1234671490
}
```

---

## Rate Limits

- **Search:** 5 queries/day (SerpAPI free tier)
- **Claude API:** Based on API credits
- **Hugging Face:** 30,000 requests/month (free tier)

---

## Status: Development

These endpoints are being implemented. Current status (Phase 1 - Scaffolding):
- ✅ Health check working
- ⏳ Auth endpoints (Phase 3)
- ⏳ Progress routes (Phase 3)
- ⏳ AI routes (Phase 4)
- ⏳ Search routes (Phase 6)
