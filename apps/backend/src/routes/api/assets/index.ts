import { createDirectus, readAssetRaw, rest } from "@directus/sdk";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { fileAssetParamsSchema } from "@schemas/files.js";

import type { FastifyInstance } from "fastify";

export default async function assets(fastify: FastifyInstance) {
  const client = createDirectus(fastify.config.DIRECTUS_URL).with(
    rest({ credentials: "include" }),
  );

  const assetRoutes: FastifyPluginAsyncTypebox = async (fastify, _opts) => {
    fastify.get(
      "/:id",
      {
        schema: {
          tags: ["Files"],
          summary: "Get a single asset.",
          params: fileAssetParamsSchema,
        },
      },
      async (request, reply) => {
        console.log(123, request.params.id);

        const result = await client.request(readAssetRaw(request.params.id));
        console.log(result);

        reply.send(result);
      },
    );
  };

  await fastify.register(assetRoutes);
}
