import { createDirectus, rest, readSingleton } from "@directus/sdk";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  contentLandingPageResponseSchema,
  type ContentLandingPageResponse,
} from "@schemas/content.js";
import type { FastifyInstance } from "fastify";

export default async function auth(fastify: FastifyInstance) {
  const client = createDirectus(fastify.config.DIRECTUS_URL).with(
    rest({ credentials: "include" }),
  );

  const contentRoutes: FastifyPluginAsyncTypebox = async (fastify, _opts) => {
    // ROUTE FOR LANDING PAGE CONTENT (api/content/landing-page)
    fastify.get(
      "/landing-page",
      {
        schema: {
          tags: ["Content"],
          summary: "Get content for landing page",
          response: {
            200: contentLandingPageResponseSchema,
          },
        },
      },
      async (request, reply) => {
        const data = await client.request<ContentLandingPageResponse>(
          readSingleton("startseite"),
        );

        console.log("Logging data from startseite singleton", data);
        return data;
      },
    );
  };

  await fastify.register(contentRoutes);
}
