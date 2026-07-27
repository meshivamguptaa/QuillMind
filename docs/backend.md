# Backend Setup

## Overview

The backend of **QuillMind** is built using the **MERN** stack with **Node.js**, **Express.js**, and **MongoDB Atlas**. It provides REST APIs for authentication, blog management, AI integration, and other application features.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- cors
- helmet
- morgan

---

## Project Structure

```text
backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │
│   ├── routes/
│   │
│   ├── utils/
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## Installation

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

---

## Database Connection

The database connection is handled inside:

```text
src/config/db.js
```

Responsibilities:

- Connect to MongoDB Atlas
- Handle connection errors
- Stop the server if the database connection fails

This ensures the application never starts without an active database connection.

---

## app.js

`app.js` is responsible for configuring the Express application.

Configured middleware:

- express.json()
- cors()
- helmet()
- morgan()

It also registers all API routes.

---

## server.js

`server.js` is the application's entry point.

Responsibilities:

- Load environment variables
- Connect to MongoDB
- Start the Express server

Separating `app.js` from `server.js` keeps the project modular and easier to maintain.

---

## API Structure

All API endpoints are grouped under `/api`.

Example:

```text
/api/auth
/api/blogs
/api/ai
```

This keeps the backend organized and scalable.

---

## Current Status

Completed:

- Express Server
- MongoDB Atlas Connection
- Environment Variables
- Project Structure
- Middleware Configuration