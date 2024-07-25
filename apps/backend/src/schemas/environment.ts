import { Type } from "@sinclair/typebox";

export const environmentSchema = Type.Object({
  FASTIFY_PORT: Type.Number({ default: 3000 }),
  DIRECTUS_URL: Type.String(),
});
