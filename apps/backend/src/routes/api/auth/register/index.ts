import { type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  directusRegisterResponseSchema,
  directusRegisterPostSchema,
} from "@schemas/auth.js";
import {
  createDirectus,
  authentication,
  rest,
  registerUser,
} from "@directus/sdk";

const route: FastifyPluginAsyncTypebox = async (fastify, _opts) => {
  const client = createDirectus(fastify.config.DIRECTUS_URL)
    .with(authentication("cookie", { credentials: "include" }))
    .with(rest());
  fastify.post(
    "/",
    {
      schema: {
        tags: ["Auth"],
        summary: "Register a new user",
        description:
          "Fastify endpoint to register a new user using the Directus SDK",
        response: {
          200: directusRegisterResponseSchema,
        },
        body: directusRegisterPostSchema,
      },
    },
    async (request, reply) => {
      const result = await client.request<{ ok: boolean }>(
        registerUser(request.body.email, request.body.password, {
          first_name: request.body.name,
          verification_url: "http://localhost:3000/login",
        }),
      );

      if (!result.ok) {
        console.log(
          "Something with the registration went wrong; logging result object",
          result,
        );
        reply.code(400);
        return {
          ok: false,
        };
      }

      return {
        ok: true,
      };
    },
  );
};

export default route;
