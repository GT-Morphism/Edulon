import { type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Lectures } from "@schemas/lectures.js";

const route: FastifyPluginAsyncTypebox = async (fastify, _opts) => {
  fastify.get(
    "/records",
    {
      schema: {
        tags: ["Lectures"],
        response: {
          200: Lectures,
        },
      },
    },
    async (request, reply) => {
      return [
        {
          title: "The Art of Art",
          author: "Some artist, for sure",
          description: "When you talk about art, you talk about art.",
        },
      ];
    },
  );
};

export default route;
