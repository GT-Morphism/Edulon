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

// SINGLE COURSE SCHEMA (ORIGINAL SCHEMA FROM DIRECTUS)
const contentSingleCourseChapterOriginal = Type.Object({
  item: Type.Object({
    chapter_headline: Type.String(),
    chapter_summary: Type.String(),
    chapter_body: Type.String(),
    chapter_documents: Type.Array(
      Type.Object({
        directus_files_id: Type.Object({
          id: Type.String(),
          title: Type.String(),
          type: Type.String(),
        }),
      }),
    ),
  }),
});

const contentSingleCourseResponseOriginalSchema = Type.Object({
  course_title: Type.String(),
  course_summary: Type.String(),
  course_introduction: Type.String(),
  course_chapters: Type.Array(contentSingleCourseChapterOriginal),
});

export type ContentSingleCourseResponseOriginal = Static<
  typeof contentSingleCourseResponseOriginalSchema
>;

// SINGLE COURSE SCHEMA (USED BY THE FRONTEND)
const contentSingleCourseChapter = Type.Object({
  chapter_headline: Type.String(),
  chapter_summary: Type.String(),
  chapter_body: Type.String(),
  chapter_documents: Type.Array(
    Type.Object({
      id: Type.String(),
      title: Type.String(),
      type: Type.String(),
    }),
  ),
});

export const contentSingleCourseResponseSchema = Type.Object({
  course_title: Type.String(),
  course_summary: Type.String(),
  course_introduction: Type.String(),
  course_chapters: Type.Array(contentSingleCourseChapter),
});

export type ContentSingleCourseResponse = Static<
  typeof contentSingleCourseResponseSchema
>;

export const contentSingleCourseParamsSchema = Type.Object({
  slug: Type.String(),
});
