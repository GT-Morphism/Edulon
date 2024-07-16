import type { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    return { status: "ok", message: "All fine over here" };
  });
};

export default root;
