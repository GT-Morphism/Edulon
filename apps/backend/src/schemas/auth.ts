import { Type } from "@sinclair/typebox";

export const directusLoginResponseSchema = Type.Object({
  message: Type.String(),
  authenticated: Type.Boolean(),
});

export const directusLoginPostSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});
