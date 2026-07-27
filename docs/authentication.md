# Authentication

## Overview

QuillMind uses **JWT (JSON Web Token)** based authentication.

Passwords are securely hashed before being stored in the database, ensuring that raw passwords are never saved.

---

## Authentication Flow

```text
Client
   │
   ▼
Register/Login Request
   │
   ▼
Express API
   │
   ▼
Validate Data
   │
   ▼
Hash Password / Verify Password
   │
   ▼
Generate JWT
   │
   ▼
Return Token
```

---

## User Schema

The User model contains:

- Name
- Email
- Password (hashed)
- Avatar
- Timestamps

The password field is hidden by default using:

```javascript
select: false
```

This prevents passwords from being returned in normal database queries.

---

## Password Hashing

Passwords are hashed using **bcryptjs**.

Example:

```javascript
const hashedPassword = await bcrypt.hash(password, 10);
```

During login:

```javascript
const isMatch = await bcrypt.compare(password, user.password);
```

---

## JWT Authentication

After successful login or registration:

1. A JWT token is generated.
2. The token contains the user's ID.
3. The client stores the token.
4. Protected routes require the token.

Example Authorization header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Protected Routes

Protected routes use custom authentication middleware.

Responsibilities:

- Read Authorization header
- Verify JWT
- Find user
- Attach user to the request
- Continue to the controller

If the token is missing or invalid:

```text
401 Unauthorized
```

is returned.

---

## API Endpoints

### Register

```http
POST /api/auth/register
```

Creates a new user account.

---

### Login

```http
POST /api/auth/login
```

Authenticates an existing user.

---

### Get Current User

```http
GET /api/auth/me
```

Returns the currently authenticated user's information.

---

## Authentication Workflow

```text
Register
    │
    ▼
Password Hashing
    │
    ▼
Store User
    │
    ▼
Generate JWT
    │
    ▼
Client Stores Token
    │
    ▼
Protected Requests
```

---

## Current Status

Completed:

- User Model
- Password Hashing
- JWT Generation
- Register API
- Login API
- Authentication Middleware
- Protected Routes
- Get Current User API