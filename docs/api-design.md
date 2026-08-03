# API Design

## Overview

QuillMind follows RESTful API design principles. All endpoints are prefixed with `/api`.

Base URL

```
http://localhost:5000/api
```

---

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login user |
| GET | /auth/me | Get current user |

---

## Blogs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /blogs | Create blog |
| GET | /blogs | Get all blogs |
| GET | /blogs/:slug | Get blog by slug |
| PUT | /blogs/:id | Update blog |
| DELETE | /blogs/:id | Delete blog |
| GET | /blogs/my | Get current user's blogs |

---

## AI

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /ai/generate | Generate article |
| POST | /ai/rewrite | Rewrite article |
| POST | /ai/summarize | Summarize content |

---

## Response Format

### Success

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "..."
}
```

---

## Authentication

Protected endpoints require:

```
Authorization: Bearer YOUR_JWT_TOKEN
```


# next topic


authentication related
