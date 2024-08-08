import { type Static, Type } from "@sinclair/typebox";

// LANDING PAGE SCHEMA
export const contentLandingPageResponseSchema = Type.Object({
  hero_title: Type.String(),
  hero_subtitle: Type.String(),
  hero_notice_about_shortcuts: Type.String(),
});

export type ContentLandingPageResponse = Static<
  typeof contentLandingPageResponseSchema
>;

// COURSES SCHEMA
export const contentCoursesResponseSchema = Type.Array(
  Type.Object({
    course_title: Type.String(),
    course_summary: Type.String(),
    course_slug: Type.String(),
  }),
);

export type ContentCoursesResponse = Static<
  typeof contentCoursesResponseSchema
>;

// SINGLE COURSE SCHEMA
export const contentSingleCourseResponseSchema = Type.Object({
  course_title: Type.String(),
  course_summary: Type.String(),
  course_introduction: Type.String(),
});

export type ContentSingleCourseResponse = Static<
  typeof contentSingleCourseResponseSchema
>;

export const contentSingleCourseParamsSchema = Type.Object({
  slug: Type.String(),
});
