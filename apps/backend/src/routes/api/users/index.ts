import {
  createDirectus,
  rest,
  withToken,
  readMe,
  readItems,
  createItem,
  deleteItem,
} from "@directus/sdk";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import {
  currentUserResponseSchema,
  coursesOfCurrentUserResponseSchema,
  type CurrentUserResponse,
  type CurrentUserWithCoursesResponse,
  type CoursesOfCurrentUserResponse,
  coursesOfCurrentUserPostBodySchema,
  coursesOfCurrentUserPostResponseSchema,
  type CoursesOfCurrentUserPostResponse,
  coursesOfCurrentUserDeleteBodySchema,
  coursesOfCurrentUserDeleteResponseSchema,
} from "@schemas/users.js";

export default async function auth(fastify: FastifyInstance) {
  const client = createDirectus(fastify.config.DIRECTUS_URL).with(
    rest({ credentials: "include" }),
  );

  const usersRoutes: FastifyPluginAsyncTypebox = async (fastify, _opts) => {
    // ROUTE FOR GETTING CURRENT USER (GET api/users/me)
    fastify.get(
      "/me",
      {
        schema: {
          tags: ["Users"],
          summary: "Get current user (needs authentication)",
          response: {
            200: currentUserResponseSchema,
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

        const currentUser = await client.request<CurrentUserResponse>(
          withToken(
            tokenFromRequest.value as string,
            readMe({
              fields: ["first_name", "email"],
            }),
          ),
        );

        return currentUser;
      },
    );

    // ROUTE FOR GETTING COURSES OF CURRENT USER (GET api/users/me/courses)
    fastify.get(
      "/me/courses",
      {
        schema: {
          tags: ["Users"],
          summary: "Get courses of current user (needs authentication)",
          response: {
            200: coursesOfCurrentUserResponseSchema,
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

        const currentUserCoursesIds =
          await client.request<CurrentUserWithCoursesResponse>(
            withToken(
              tokenFromRequest.value as string,
              readMe({
                fields: ["courses.id", "courses.courses_id"],
              }),
            ),
          );

        console.log("Logging courses of current user", currentUserCoursesIds);

        if (currentUserCoursesIds.courses.length === 0) {
          return;
        }

        const coursesOfUser =
          await client.request<CoursesOfCurrentUserResponse>(
            withToken(
              tokenFromRequest.value as string,
              readItems("courses", {
                filter: {
                  id: {
                    // Needs to be an array of strings (in this case, the UUIDs of courses attached to the current user)
                    _in: currentUserCoursesIds.courses.map((e) => e.courses_id),
                  },
                },
                fields: ["course_title", "course_slug"],
              }),
            ),
          );

        return coursesOfUser;
      },
    );

    // ROUTE FOR ADDING COURSE TO CURRENT USER (POST api/users/me/courses)
    fastify.post(
      "/me/courses",
      {
        schema: {
          tags: ["Users"],
          summary: "Add course to current user (needs authentication)",
          body: coursesOfCurrentUserPostBodySchema,
          response: {
            200: coursesOfCurrentUserPostResponseSchema,
          },
        },
      },

      async (request, reply) => {
        console.log("Logging body of request", request.body);
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
          const currentUser = await client.request(
            withToken(
              tokenFromRequest.value as string,
              readMe({
                fields: ["id"],
              }),
            ),
          );

          const itemCreated =
            await client.request<CoursesOfCurrentUserPostResponse>(
              withToken(
                tokenFromRequest.value as string,
                createItem(
                  "courses_directus_users",
                  {
                    directus_users_id: currentUser.id,
                    courses_id: request.body.courses_id,
                  },
                  {
                    fields: ["id"],
                  },
                ),
              ),
            );

          console.log("Logging item created", itemCreated);
          return itemCreated;
        } catch (error) {
          console.error("Something went wrong", error);
          return;
        }
      },
    );

    // ROUTE FOR REMOVING COURSE OF CURRENT USER (DELETE api/users/me/courses)
    fastify.delete(
      "/me/courses",
      {
        schema: {
          tags: ["Users"],
          summary: "Remove course from current user (needs authentication)",
          body: coursesOfCurrentUserDeleteBodySchema,
          response: {
            200: coursesOfCurrentUserDeleteResponseSchema,
          },
        },
      },

      async (request, reply) => {
        console.log("Logging body of request", request.body);
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
          const result = await client.request(
            withToken(
              tokenFromRequest.value as string,
              deleteItem(
                "courses_directus_users",
                request.body.id_of_association,
              ),
            ),
          );

          console.log("Logging result after deletion", result);
          return {
            ok: true,
          };
        } catch (error) {
          console.error("Something went wrong", error);
          return {
            ok: false,
          };
        }
      },
    );
  };

  await fastify.register(usersRoutes);
}
