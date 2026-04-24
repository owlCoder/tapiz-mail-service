import type { MiddlewareHandler } from "hono";

export const apiKeyAuth: MiddlewareHandler = async (c, next) => {
  const secret = process.env.API_SECRET;
  const provided = c.req.header("x-api-secret");

  if (!secret || provided !== secret) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  await next();
};