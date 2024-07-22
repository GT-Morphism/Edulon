import { type FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import Swagger from "@fastify/swagger";
import SwaggerUI from "@fastify/swagger-ui";

const swaggerGenerator: FastifyPluginAsync = async (fastify, opts) => {
  await fastify.register(Swagger, {
    swagger: {
      info: {
        title: "Edulon API Layer",
        description:
          "The Fastify backend exposes APIs to be consumed by the Nuxt frontend.",
        version: "1.0.0",
      },
      externalDocs: {
        url: "https://github.com/GT-Morphism/edulon",
        description: "Repo to the entire project",
      },
      host: "localhost",
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json", "text/html"],
    },
  });

  await fastify.register(SwaggerUI);
};

export default fp(swaggerGenerator, {
  name: "swaggerGenerator",
});
