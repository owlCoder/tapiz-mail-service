import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { bodyLimit } from "hono/body-limit";
import { errorHandler } from "./middleware/errorHandler";
import { mailRateLimiter } from "./middleware/rateLimiter";
import { send2faRouter } from "./routes/send2faRoute";
import { sendResetPasswordRouter } from "./routes/sendResetPasswordRoute";
import { sendSessionSummaryRouter } from "./routes/sendSessionSummaryRoute";
import { docsHtml } from "./core/docs";
import { apiKeyAuth } from "./middleware/authMiddleware";

const app = new Hono();

// ── CORS ──────────────────────────────────────────────────────────
const allowedOrigins =
  process.env.CLIENT_URL?.split(",").map((u) => u.trim()) ?? ["*"];
app.use("*", cors({ origin: allowedOrigins }));

// ── Body limit (1 MB — mail payloads are tiny) ────────────────────
app.use("/api/mail/*", bodyLimit({ maxSize: 1 * 1024 * 1024 }));

// Auth middleware
app.use("/api/mail/*", apiKeyAuth); 

// ── Rate limiter (10 req / 15 min per IP) ─────────────────────────
app.use("/api/mail/*", mailRateLimiter);

// ── Mail routes ───────────────────────────────────────────────────
app.route("/api/mail/send-2fa", send2faRouter);
app.route("/api/mail/send-reset-password", sendResetPasswordRouter);
app.route("/api/mail/send-session-summary", sendSessionSummaryRouter);

// ── Health check ──────────────────────────────────────────────────
app.get("/api/mail/health", (c) =>
  c.json({ status: "ok", ts: new Date().toISOString() }),
);

// ── API docs (root + /api/docs) ───────────────────────────────────
app.get("/",         (c) => c.html(docsHtml));
app.get("/api/docs", (c) => c.html(docsHtml));

// ── Global error handler ──────────────────────────────────────────
app.onError(errorHandler);

export { app };