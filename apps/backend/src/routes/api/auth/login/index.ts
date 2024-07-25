import { type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  directusLoginResponseSchema,
  directusLoginPostSchema,
} from "@schemas/auth.js";
import { createDirectus, authentication } from "@directus/sdk";

const route: FastifyPluginAsyncTypebox = async (fastify, _opts) => {
  const client = createDirectus(fastify.config.DIRECTUS_URL).with(
    authentication("cookie", { credentials: "include" }),
  );
  fastify.post(
    "/",
    {
      schema: {
        tags: ["Auth"],
        response: {
          200: directusLoginResponseSchema,
        },
        body: directusLoginPostSchema,
      },
    },
    async (request, reply) => {
      const data = await client.login(
        request.body.email,
        request.body.password,
      );
      return data;
    },
  );
};

export default route;
