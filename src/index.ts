import "dotenv/config";
import { serve } from "@hono/node-server";
import { app } from "./app";

const PORT = parseInt(process.env.PORT ?? "3004", 10);

serve({ fetch: app.fetch, port: PORT }, () => {
  console.log(`[Tapiz Mail Service] Running at http://localhost:${PORT}`);
  console.log(`[Tapiz Mail Service] Docs at      http://localhost:${PORT}/`);
});
