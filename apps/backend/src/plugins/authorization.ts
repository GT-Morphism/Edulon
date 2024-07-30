import { type FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import Cookie from "@fastify/cookie";
import Csrf from "@fastify/csrf-protection";

const authorization: FastifyPluginAsync = async (fastify) => {
  // @fastify/cookie provides all functionality needed to work with cookies
  await fastify.register(Cookie, {
    secret: fastify.config.COOKIE_SECRET,
  });

  await fastify.register(Csrf, {
    sessionPlugin: "@fastify/cookie",
    cookieOpts: { signed: true },
  });
};

export default fp(authorization, {
  name: "authorization",
});
