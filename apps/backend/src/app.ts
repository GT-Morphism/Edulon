import * as path from "path";
import AutoLoad, { type AutoloadPluginOptions } from "@fastify/autoload";
import Env from "@fastify/env";
import Cors from "@fastify/cors";
import type { FastifyPluginAsync } from "fastify";
import { environmentSchema } from "@schemas/environment.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Declaration merging to enhance the `FastifyInstance` with custom properties
declare module "fastify" {
  interface FastifyInstance {
    config: {
      FASTIFY_PORT: number;
      DIRECTUS_URL: string;
      COOKIE_SECRET: string;
    };
  }
}

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {
  // Place here your custom code!
  await fastify.register(Env, {
    schema: environmentSchema,
  });

  await fastify.register(Cors, {
    origin: "http://localhost:3000",
    credentials: true,
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: opts,
    forceESM: true,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: opts,
    forceESM: true,
  });
};

export default app;
export { app, options };
