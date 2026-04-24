# Tapiz Mail Service

Serverless transactional email microservice for the Tapiz academic management platform. Handles sending 2FA authentication codes via SMTP.

Built with **Hono** + **TypeScript** on Node.js, deployed as a Vercel serverless function.

---

## Tech Stack

| | |
|---|---|
| HTTP framework | [Hono](https://hono.dev/) |
| Email transport | Nodemailer |
| Rate limiting | hono-rate-limiter (Valkey-backed) |
| Cache / ephemeral | Valkey (Redis-compatible, via ioredis) |
| Runtime | Node.js ≥ 18 |
| Deployment | Vercel Serverless |

---

## Project Structure

```
src/
├── app.ts                      # Hono app — route mounting, middleware, docs
├── index.ts                    # Local dev entry point
├── core/
│   ├── colors.ts               # Warm brown HEX palette (matches frontend CSS vars)
│   ├── docs.ts                 # OpenAPI-style HTML docs page
│   ├── mailer.ts               # Nodemailer transporter singleton + SMTP_FROM
│   ├── emailTemplates.ts       # Styled HTML email templates
│   ├── Result.ts               # Ok / Err result type
│   └── valkeyClient.ts         # ioredis singleton
├── middleware/
│   ├── errorHandler.ts         # Global Hono error handler
│   └── rateLimiter.ts          # 10 req / 15 min per IP, Valkey-backed
└── routes/
    └── send2faRoute.ts         # POST /api/mail/send-2fa
api/
└── index.ts                    # Vercel serverless handler (Node → Web Request bridge)
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- A running Valkey / Redis instance (optional — rate limiter falls back to in-memory if unavailable)
- SMTP credentials (default host: `smtp.uns.ac.rs`)

### Install

```bash
npm install
```

### Environment Variables

Copy the example and fill in your values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `PORT` | | Local dev port (default: `3004`) |
| `CLIENT_URL` | | CORS allowed origin(s), comma-separated (default: `*`) |
| `VALKEY_URL` | | Redis-compatible URL, e.g. `redis://localhost:6379` or `rediss://...` for TLS |
| `SMTP_HOST` | | SMTP server hostname (default: `smtp.uns.ac.rs`) |
| `SMTP_PORT` | | SMTP port (default: `587`) |
| `SMTP_USER` | ✓ | SMTP username / sender address |
| `SMTP_PASS` | ✓ | SMTP password |
| `SMTP_FROM` | | Override sender address (falls back to `SMTP_USER`) |

### Development

```bash
npm run dev
```

Server starts at `http://localhost:3004`.  
Interactive API docs are available at `http://localhost:3004/`.

### Type Check

```bash
npm run typecheck
```

### Production Build

This project is designed for Vercel serverless deployment — no build step is needed locally. For a standalone Node.js build, `tsc` output goes to `dist/`.

---

## API Reference

All endpoints are prefixed with `/api/mail`. A health check is available at:

```
GET /api/mail/health  →  { "status": "ok", "ts": "..." }
```

Interactive docs with full request/response schemas are served at the root URL:

```
GET /         →  HTML docs page
GET /api/docs →  HTML docs page
```

### Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/mail/send-2fa` | Send a 2FA authentication code via email |

All endpoints:
- Accept `Content-Type: application/json` with a 1 MB body limit
- Return `Content-Type: application/json`
- Return `429` when the rate limit is exceeded

### Rate Limiting

**10 requests per IP per 15 minutes**, applied across all `/api/mail/*` routes.  
Backed by Valkey for consistency across serverless instances. Degrades gracefully to in-memory if Valkey is unavailable.

---

### POST `/api/mail/send-2fa`

Sends a styled HTML email containing a 6-digit 2FA code. The email includes an app-branded header, a large code display, a 15-minute validity notice, and a security warning.

```json
{
  "to":      "korisnik@uns.ac.rs",
  "code":    "847291",
  "appName": "Tapiz"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `to` | string | ✓ | Recipient email address |
| `code` | string | ✓ | Exactly 6 digits |
| `appName` | string | | Application name shown in the email header and subject (default: `"Tapiz"`) |

**Success response (200)**

```json
{
  "success":   true,
  "messageId": "<abc123@smtp.uns.ac.rs>",
  "message":   "2FA code sent successfully"
}
```

**Validation rules**

| Field | Rule |
|---|---|
| `to` | Must be a valid email address |
| `code` | Must match `/^\d{6}$/` |

**SMTP error codes**

| Code | Meaning |
|---|---|
| `EAUTH` | SMTP authentication failed — check `SMTP_USER` / `SMTP_PASS` |
| `ECONNECTION` | Cannot connect to SMTP server — check `SMTP_HOST` / `SMTP_PORT` |
| `ESOCKET` | SMTP connection timeout |

Error details are included in the response body only when `NODE_ENV=development`.

---

## Email Design

The 2FA email uses the Tapiz brand palette:

- **Header**: Dark primary background (`#38280c`) with a warm brown bottom accent (`#a08040`) and white text
- **Code block**: Large letter-spaced digits on a light primary background (`#faf7f2`) with a subtle border
- **Warning notice**: Orange left-border callout for the "do not share" message
- **Footer**: Auto-generated year and app name

---

## Deployment

The project is configured for Vercel via `vercel.json`. The `api/index.ts` file acts as the serverless handler — it bridges Node.js `IncomingMessage` / `ServerResponse` to the Hono Web Request API, matching the same pattern used across Tapiz microservices.

```bash
vercel deploy
```

Set `SMTP_USER`, `SMTP_PASS`, and `CLIENT_URL` in the Vercel dashboard before deploying.
