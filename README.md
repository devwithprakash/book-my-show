# 🎟️ Book My Ticket

## Overview

Backend-driven ticket booking system with authentication and seat reservation.

---

## Setup

### 1. Clone

```bash
git clone <repo-url>
cd book-my-ticket
```

### 2. Install

```bash
npm install
```

### 3. Environment

Create `.env`:

```
DATABASE_URL=your_neon_db_url
JWT_SECRET=your_secret
PORT=5000
```

### 4. Run

```bash
npm run dev
```

---

## Flow

### 1. Register/Login

* User registers or logs in
* Password hashed using bcrypt
* Server returns:

  * Access Token (short-lived)
  * Refresh Token (stored hashed in DB)

---

### 2. Authentication

* Client sends access token in:

```
Authorization: Bearer <token>
```

* Middleware verifies token → attaches `req.user.id`

---

### 3. Booking

* Authenticated user calls `/:id/:name`
* Server:

  * Validates user
  * Inserts booking with `user_id` + `seat_id`

---

### 4. Database

* PostgreSQL (Neon)
* SSL enabled (`verify-full`)
* Tables:

  * `users`
  * `bookings`

---

## Endpoints

* `POST /register`
* `POST /login`
* `POST /:id/:name` (protected)
* `POST /seats` (protected)

---

## Deployment

* Backend → Render
* Database → Neon

---

## Notes

* Refresh tokens are hashed before storing
* Unauthorized requests are blocked via middleware
