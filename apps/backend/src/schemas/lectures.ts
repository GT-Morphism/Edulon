import { Type, type Static } from "@sinclair/typebox";

// export type Lecture = Static<typeof Lecture>;
export const Lecture = Type.Object({
  title: Type.String(),
  author: Type.String(),
  description: Type.String(),
});

export type LecturesType = Static<typeof Lectures>;
export const Lectures = Type.Array(Lecture);
