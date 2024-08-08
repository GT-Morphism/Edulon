import {
  createDirectus,
  rest,
  readSingleton,
  readItems,
  withToken,
} from "@directus/sdk";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  contentCoursesResponseSchema,
  contentLandingPageResponseSchema,
  contentSingleCourseParamsSchema,
  contentSingleCourseResponseSchema,
  type ContentCoursesResponse,
  type ContentLandingPageResponse,
  type ContentSingleCourseResponse,
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

    // ROUTE FOR GETTING ALL COURSES (api/content/courses)
    fastify.get(
      "/courses",
      {
        schema: {
          tags: ["Content"],
          summary: "Get all published courses",
          response: {
            200: contentCoursesResponseSchema,
          },
        },
      },
      async (request, reply) => {
        const data = await client.request<ContentCoursesResponse>(
          readItems("courses"),
        );

        console.log("Logging data from courses collection", data);
        return data;
      },
    );

    // ROUTE FOR GETTING A SINGLE COURSE BY SLUG (api/content/courses/:slug)
    fastify.get(
      "/courses/:slug",
      {
        schema: {
          tags: ["Content"],
          summary: "Get a single course by slug (needs authentication)",
          params: contentSingleCourseParamsSchema,
          response: {
            200: contentSingleCourseResponseSchema,
          },
        },
      },
      async (request, reply) => {
        if (!request.cookies.access_token) {
          console.log("No access token in cookie found");
          reply.code(401);
          return;
        }
        const tokenFromRequest = request.unsignCookie(
          request.cookies.access_token,
        );

        if (!tokenFromRequest.valid) {
          console.log("Access token in cookie found, but it is not valid");
          reply.code(401);
          return;
        }

        try {
          const data = await client.request<ContentSingleCourseResponse[]>(
            withToken(
              tokenFromRequest.value as string,
              readItems("courses", {
                filter: {
                  course_slug: {
                    _eq: request.params.slug,
                  },
                },
              }),
            ),
          );
          return data[0];
        } catch (error) {
          console.error("Something went wrong", error);
          reply.code(500);
          return;
        }
      },
    );
  };

  await fastify.register(contentRoutes);
}
