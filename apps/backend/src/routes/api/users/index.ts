import { type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { createDirectus, rest, readUsers, withToken } from "@directus/sdk";

const route: FastifyPluginAsyncTypebox = async (fastify, _opts) => {
  const client = createDirectus(fastify.config.DIRECTUS_URL).with(rest());
  fastify.get("/", async (request, reply) => {
    console.log("request.cookies", request.cookies);
    const tokenFromRequest = request.unsignCookie(
      request.cookies.access_token || "",
    );
    console.log("tokenFromRequest", tokenFromRequest);
    const result = await client.request(
      withToken(tokenFromRequest.value || "", readUsers()),
    );
    return result;
  });
};

export default route;
