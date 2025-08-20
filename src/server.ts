/** @format */

// src/server.ts
import { app } from "./app";
import { env } from "@/config/env";
import { logger } from "./lib/logger";

const PORT = env.PORT ?? 4000;

app.listen(PORT, () => {
  logger.info(`API listening on http://localhost:${PORT}`);
});
