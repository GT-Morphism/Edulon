import { Type } from "@sinclair/typebox";

// LOGIN SCHEMAS
export const loginResponseSchema = Type.Object({
  ok: Type.Boolean(),
});

export const loginPostSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});

// REGISTER SCHEMAS
export const registerResponseSchema = Type.Object({
  ok: Type.Boolean(),
});

export const registerPostSchema = Type.Object({
  name: Type.String({ minLength: 1 }),
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});

// VERIFY EMAIL SCHEMA
export const verifyEmailResponseSchema = Type.Object({
  ok: Type.Boolean(),
});

export const verifyEmailPostSchema = Type.Object({
  token: Type.String({ minLength: 1 }),
});

// REQUEST PASSWORD RESET SCHEMA
export const requestPasswordResetResponseSchema = Type.Object({
  ok: Type.Boolean(),
});

export const requestPasswordResetPostSchema = Type.Object({
  email: Type.String({ format: "email" }),
});

// PASSWORD RESET SCHEMA
export const passwordResetResponseSchema = Type.Object({
  ok: Type.Boolean(),
});

export const passwordResetPostSchema = Type.Object({
  token: Type.String({ minLength: 1 }),
  password: Type.String({ minLength: 8 }),
});
