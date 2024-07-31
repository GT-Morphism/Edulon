import { Type } from "@sinclair/typebox";

// LOGIN SCHEMAS
export const directusLoginResponseSchema = Type.Object({
  message: Type.String(),
  authenticated: Type.Boolean(),
});

export const directusLoginPostSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});

// REGISTER SCHEMAS
export const directusRegisterResponseSchema = directusLoginResponseSchema;

export const directusRegisterPostSchema = Type.Object({
  name: Type.String({ minLength: 1 }),
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});

// VERIFY EMAIL SCHEMA
export const directusVerifyEmailResponseSchema = Type.Object({
  ok: Type.Boolean(),
});

export const directusVerifyEmailPostSchema = Type.Object({
  token: Type.String({ minLength: 1 }),
});
