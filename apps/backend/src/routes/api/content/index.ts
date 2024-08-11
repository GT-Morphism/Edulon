import {
  createDirectus,
  rest,
  readSingleton,
  readItems,
  withToken,
  readMe,
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
  type ContentSingleCourseResponseOriginal,
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
        const courses = await client.request<ContentCoursesResponse>(
          readItems("courses"),
        );

        if (courses.length === 0) {
          console.log("data is empty; returning dummy data");
          return [
            {
              course_title: "Dummy Title",
              course_summary: "Dummy Summary",
              course_slug: "dummy-slug",
              updated_at: "01.01.1851",
            },
          ];
        }

        const coursesWithFormattedDate = courses.map((course) => {
          return {
            ...course,
            updated_at: new Date(course.updated_at).toLocaleDateString("de-DE"),
          };
        });

        console.log(
          "Request for courses successful; logging courses with formatted date",
          coursesWithFormattedDate,
        );

        return coursesWithFormattedDate;
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
          const originalCourseData = await client.request<
            ContentSingleCourseResponseOriginal[]
          >(
            withToken(
              tokenFromRequest.value as string,
              readItems("courses", {
                filter: {
                  course_slug: {
                    _eq: request.params.slug,
                  },
                },
                fields: [
                  "id",
                  "course_title",
                  "course_summary",
                  "course_introduction",
                  {
                    course_chapters: [
                      {
                        item: [
                          "chapter_headline",
                          "chapter_summary",
                          "chapter_body",
                          "chapter_documents.directus_files_id.*",
                        ],
                      },
                    ],
                  },
                ],
              }),
            ),
          );

          const currentUser = await client.request(
            withToken(
              tokenFromRequest.value as string,
              readMe({
                fields: ["id"],
              }),
            ),
          );

          const idOfAssociationBetweenCourseAndCurrentUser =
            await client.request<{ id: number }[] | []>(
              withToken(
                tokenFromRequest.value as string,
                readItems("courses_directus_users", {
                  filter: {
                    courses_id: {
                      _eq: originalCourseData[0]?.id,
                    },
                    directus_users_id: {
                      _eq: currentUser.id,
                    },
                  },
                  fields: ["id"],
                }),
              ),
            );

          console.log(
            "Logging idOfAssociationBetweenCourseAndCurrentUser",
            idOfAssociationBetweenCourseAndCurrentUser,
          );

          console.log("Logging original course data", originalCourseData);

          const transformedCourseData: Omit<
            ContentSingleCourseResponse,
            "id_of_association_between_course_and_current_user"
          > = originalCourseData.map((data) => {
            return {
              course_id: data.id,
              course_title: data.course_title,
              course_summary: data.course_summary,
              course_introduction: data.course_introduction,
              course_chapters: data.course_chapters?.map((chapter) => {
                return {
                  chapter_headline: chapter.item.chapter_headline,
                  chapter_summary: chapter.item.chapter_summary,
                  chapter_body: chapter.item.chapter_body,
                  chapter_documents: chapter.item.chapter_documents?.map(
                    (doc) => {
                      return {
                        id: doc.directus_files_id.id,
                        title: doc.directus_files_id.title,
                        type: doc.directus_files_id.type,
                      };
                    },
                  ),
                };
              }),
            };
            // TODO: Fix `!` non-null assertion
          })[0]!;

          const singleCourseData: ContentSingleCourseResponse = {
            ...transformedCourseData,
            id_of_association_between_course_and_current_user:
              idOfAssociationBetweenCourseAndCurrentUser[0]?.id || -1,
          };

          return singleCourseData;
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
