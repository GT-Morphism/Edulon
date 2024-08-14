import {
  createDirectus,
  readAssetArrayBuffer,
  readFile,
  rest,
} from "@directus/sdk";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { fileAssetParamsSchema } from "@schemas/files.js";

import type { FastifyInstance } from "fastify";

export default async function assets(fastify: FastifyInstance) {
  const client = createDirectus(fastify.config.DIRECTUS_URL).with(
    rest({ credentials: "include" }),
  );

  const assetRoutes: FastifyPluginAsyncTypebox = async (fastify, _opts) => {
    fastify.get(
      "/:id/:fileName",
      {
        schema: {
          tags: ["Files"],
          summary: "Get a single asset.",
          params: fileAssetParamsSchema,
        },
      },
      async (request, reply) => {
        const file = await client.request(readFile(request.params.id));
        const result = await client.request(
          readAssetArrayBuffer(request.params.id),
        );
        const buffer = Buffer.from(result);

        reply.header(
          "Content-Disposition",
          `attachment; filename="${file.name}"`,
        );

        reply.header("content-type", file.type);

        reply.send(buffer);
      },
    );
  };

  await fastify.register(assetRoutes);
}
