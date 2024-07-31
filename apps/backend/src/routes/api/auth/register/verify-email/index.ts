import { type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  directusVerifyEmailResponseSchema,
  directusVerifyEmailPostSchema,
} from "@schemas/auth.js";
import {
  createDirectus,
  rest,
  registerUserVerify,
  authentication,
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
        summary: "Verify E-mail of user",
        description:
          "Fastify endpoint to verify the E-mail of a user using the Directus SDK",
        response: {
          200: directusVerifyEmailResponseSchema,
        },
        body: directusVerifyEmailPostSchema,
      },
    },
    async (request, reply) => {
      try {
        const result = await client.request(
          registerUserVerify(request.body.token),
        );

        console.log("Verification of email successful; logging result", result);

        return {
          ok: true,
        };
      } catch (error) {
        console.error(
          "Something went wrong while trying to verify the email; logging error",
          error,
        );
        return {
          ok: false,
        };
      }
    },
  );
};

export default route;
