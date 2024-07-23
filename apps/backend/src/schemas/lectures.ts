import { Type } from "@sinclair/typebox";

export const Lecture = Type.Object({
  title: Type.String(),
  author: Type.String(),
  description: Type.String(),
});

export const Lectures = Type.Array(Lecture);
