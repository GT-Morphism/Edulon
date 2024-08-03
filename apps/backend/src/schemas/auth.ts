import { Type } from "@sinclair/typebox";

// LOGIN SCHEMAS
export const directusLoginResponseSchema = Type.Object({
  ok: Type.Boolean(),
});

export const directusLoginPostSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});

// REGISTER SCHEMAS
export const directusRegisterResponseSchema = Type.Object({
  ok: Type.Boolean(),
});

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

// REQUEST PASSWORD RESET SCHEMA
export const directusRequestPasswordResetResponseSchema = Type.Object({
  ok: Type.Boolean(),
});

export const directusRequestPasswordResetPostSchema = Type.Object({
  email: Type.String({ format: "email" }),
});

// PASSWORD RESET SCHEMA
export const directusPasswordResetResponseSchema = Type.Object({
  ok: Type.Boolean(),
});

export const directusPasswordResetPostSchema = Type.Object({
  token: Type.String({ minLength: 1 }),
  password: Type.String({ minLength: 8 }),
});
