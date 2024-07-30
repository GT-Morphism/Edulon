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
      const result = await client.request(
        registerUser(request.body.email, request.body.password, {
          first_name: request.body.name,
        }),
      );

      console.log("Result upon registration", result);

      // const data = await client.login(
      //   request.body.email,
      //   request.body.password,
      // );
      //
      // reply.setCookie("access_token", data.access_token || "no-access-token", {
      //   httpOnly: true,
      //   sameSite: true,
      //   signed: true,
      //   path: "/",
      //   maxAge: 7 * 24 * 60 * 60,
      //   expires: new Date(Date.now() + (data.expires || 90000)),
      // });
      //
      // reply.setCookie("expires", String(data.expires || 90000), {
      //   httpOnly: true,
      //   sameSite: true,
      //   signed: true,
      //   path: "/",
      //   maxAge: 7 * 24 * 60 * 60,
      //   expires: new Date(Date.now() + (data.expires || 90000)),
      // });

      return {
        message: "success",
        authenticated: true,
      };
    },
  );
};

export default route;
