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
      try {
        const data = await client.login(
          request.body.email,
          request.body.password,
        );

        reply.setCookie(
          "access_token",
          data.access_token || "no-access-token",
          {
            httpOnly: true,
            sameSite: true,
            signed: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
            expires: new Date(Date.now() + (data.expires || 90000)),
          },
        );

        reply.setCookie(
          "expires_at",
          String(
            data.expires_at ||
              new Date(Date.now() + (data.expires || 90000)).getTime(),
          ),
          {
            httpOnly: true,
            sameSite: true,
            signed: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
            expires: new Date(Date.now() + (data.expires || 90000)),
          },
        );

        return {
          ok: true,
        };
      } catch (error) {
        reply.code(400);
        console.error("Error while trying to login user; logging error", error);
        return {
          ok: false,
        };
      }
    },
  );
};

export default route;
