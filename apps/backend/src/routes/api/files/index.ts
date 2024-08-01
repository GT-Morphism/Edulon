import { type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { createDirectus, authentication, rest, readFiles } from "@directus/sdk";

const route: FastifyPluginAsyncTypebox = async (fastify, _opts) => {
  const client = createDirectus(fastify.config.DIRECTUS_URL)
    .with(authentication("cookie", { credentials: "include" }))
    .with(rest());
  fastify.post(
    "/",
    {
      schema: {
        tags: ["Files"],
        summary: "Upload new files",
        description:
          "Fastify endpoint to upload a single or multiple files using the Directus SDK.",
      },
    },
    async (request, reply) => {
      await client.request(readFiles(request.body as any));

      return {
        message: "success",
      };
    },
  );
};

export default route;
