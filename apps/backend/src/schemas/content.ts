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
