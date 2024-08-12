import { type FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import Swagger from "@fastify/swagger";
import SwaggerUI from "@fastify/swagger-ui";

const swaggerGenerator: FastifyPluginAsync = async (fastify, opts) => {
  await fastify.register(Swagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "Edulon API Layer",
        description:
          "The Fastify backend exposes APIs to be consumed by the Nuxt frontend.",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development frontend server",
        },
        {
          url: "http://localhost:5555",
          description: "Development backend server",
        },
        {
          url: "http://0.0.0.0:8055",
          description: "Development directus server",
        },
      ],
      tags: [
        {
          name: "Authentication",
          description: "API endpoints for authentication",
          externalDocs: {
            url: "https://docs.directus.io/reference/authentication.html",
            description: "Directus Authentication API Reference",
          },
        },
        {
          name: "Content",
          description: "API endpoints for content",
          externalDocs: {
            url: "https://docs.directus.io/reference/items.html",
            description: "Directus Items API Reference",
          },
        },
      ],
      externalDocs: {
        url: "https://github.com/GT-Morphism/edulon",
        description: "Repo to the entire project",
      },
    },
  });

  await fastify.register(SwaggerUI);
};

export default fp(swaggerGenerator, {
  name: "swaggerGenerator",
});
