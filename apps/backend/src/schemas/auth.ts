import { Type } from "@sinclair/typebox";

export const directusLoginResponseSchema = Type.Object({
  access_token: Type.Union([Type.String(), Type.Null()]),
  expires: Type.Union([Type.Number(), Type.Null()]),
});

export const directusLoginPostSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});
