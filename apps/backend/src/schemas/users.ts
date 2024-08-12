import { Type, type Static } from "@sinclair/typebox";

// CURRENT USER SCHEMA
export const currentUserResponseSchema = Type.Object({
  first_name: Type.String(),
  email: Type.String({ format: "email" }),
});

export type CurrentUserResponse = Static<typeof currentUserResponseSchema>;

const currentUserWithCoursesResponseSchema = Type.Object({
  courses: Type.Array(
    Type.Object({
      courses_id: Type.String(),
    }),
  ),
});

export type CurrentUserWithCoursesResponse = Static<
  typeof currentUserWithCoursesResponseSchema
>;

// COURSES OF CURRENT USER SCHEMA
export const coursesOfCurrentUserResponseSchema = Type.Array(
  Type.Object({
    course_title: Type.String(),
    course_slug: Type.String(),
  }),
);

export type CoursesOfCurrentUserResponse = Static<
  typeof coursesOfCurrentUserResponseSchema
>;

// POST
export const coursesOfCurrentUserPostBodySchema = Type.Object({
  courses_id: Type.String({ format: "uuid" }),
});

export const coursesOfCurrentUserPostResponseSchema = Type.Object({
  id: Type.Number(),
});

export type CoursesOfCurrentUserPostResponse = Static<
  typeof coursesOfCurrentUserPostResponseSchema
>;

// DELETE
export const coursesOfCurrentUserDeleteBodySchema = Type.Object({
  id_of_association: Type.Number(),
});

export const coursesOfCurrentUserDeleteResponseSchema = Type.Object({
  ok: Type.Boolean(),
});
