import { type FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import Multipart from "@fastify/multipart";

const multipart: FastifyPluginAsync = async (fastify) => {
  fastify.register(Multipart, {
    limits: {
      fileSize: 100000000, // 100 MB
    },
  });
};

export default fp(multipart, {
  name: "multipart",
});
