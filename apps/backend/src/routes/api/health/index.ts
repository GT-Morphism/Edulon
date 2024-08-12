import type { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    console.log(
      "checking for signed request cookies in health endpoint",
      request.cookies,
    );

    return { status: "ok", message: "All fine over here" };
  });
};

export default root;
