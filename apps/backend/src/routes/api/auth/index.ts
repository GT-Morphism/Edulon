import {
  createDirectus,
  authentication,
  registerUser,
  rest,
  registerUserVerify,
  passwordRequest,
  passwordReset,
} from "@directus/sdk";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  directusLoginResponseSchema,
  directusLoginPostSchema,
  directusRegisterResponseSchema,
  directusRegisterPostSchema,
  directusVerifyEmailPostSchema,
  directusVerifyEmailResponseSchema,
  directusRequestPasswordResetResponseSchema,
  directusRequestPasswordResetPostSchema,
  directusPasswordResetResponseSchema,
  directusPasswordResetPostSchema,
} from "@schemas/auth.js";
import type { FastifyInstance } from "fastify";

export default async function auth(fastify: FastifyInstance) {
  const client = createDirectus(fastify.config.DIRECTUS_URL)
    .with(authentication("cookie", { credentials: "include" }))
    .with(rest({ credentials: "include" }));

  const authRoutes: FastifyPluginAsyncTypebox = async (fastify, _opts) => {
    // LOGIN ROUTE (api/auth/login)
    fastify.post(
      "/login",
      {
        schema: {
          tags: ["Auth"],
          response: {
            200: directusLoginResponseSchema,
          },
          body: directusLoginPostSchema,
        },
      },
      async (request, reply) => {
        try {
          const data = await client.login(
            request.body.email,
            request.body.password,
            {
              mode: "cookie",
            },
          );

          reply.setCookie(
            "access_token",
            data.access_token || "no-access-token",
            {
              httpOnly: true,
              sameSite: true,
              signed: true,
              path: "/",
              maxAge: 7 * 24 * 60 * 60,
              expires: new Date(Date.now() + (data.expires || 90000)),
            },
          );

          reply.setCookie(
            "expires_at",
            String(
              data.expires_at ||
                new Date(Date.now() + (data.expires || 90000)).getTime(),
            ),
            {
              httpOnly: true,
              sameSite: true,
              signed: true,
              path: "/",
              maxAge: 7 * 24 * 60 * 60,
              expires: new Date(Date.now() + (data.expires || 90000)),
            },
          );

          return {
            ok: true,
          };
        } catch (error) {
          reply.code(400);
          console.error(
            "Error while trying to login user; logging error",
            error,
          );
          return {
            ok: false,
          };
        }
      },
    );

    // REGISTER ROUTE (/api/auth/register)
    fastify.post(
      "/register",
      {
        schema: {
          tags: ["Auth"],
          summary: "Register a new user",
          description:
            "Fastify endpoint to register a new user using the Directus SDK",
          response: {
            200: directusRegisterResponseSchema,
          },
          body: directusRegisterPostSchema,
        },
      },
      async (request, reply) => {
        const result = await client.request<{ ok: boolean }>(
          registerUser(request.body.email, request.body.password, {
            first_name: request.body.name,
            verification_url: "http://localhost:3000/login",
          }),
        );

        if (!result.ok) {
          console.log(
            "Something with the registration went wrong; logging result object",
            result,
          );
          reply.code(400);
          return {
            ok: false,
          };
        }

        return {
          ok: true,
        };
      },
    );

    // VERIFY EMAIL ROUTE (/api/auth/regi)
    fastify.post(
      "/register/verify-email",
      {
        schema: {
          tags: ["Auth"],
          summary: "Verify E-mail of user",
          description:
            "Fastify endpoint to verify the E-mail of a user using the Directus SDK",
          response: {
            200: directusVerifyEmailResponseSchema,
          },
          body: directusVerifyEmailPostSchema,
        },
      },
      async (request, reply) => {
        try {
          const result = await client.request(
            registerUserVerify(request.body.token),
          );

          console.log(
            "Verification of email successful; logging result",
            result,
          );

          return {
            ok: true,
          };
        } catch (error) {
          console.error(
            "Something went wrong while trying to verify the email; logging error",
            error,
          );
          return {
            ok: false,
          };
        }
      },
    );

    // REQUEST PASSWORD RESET ROUTE (/api/auth/password/request)
    fastify.post(
      "/password/request",
      {
        schema: {
          tags: ["Auth"],
          summary:
            "Request a password reset email to be sent to the given user",
          description:
            "Fastify endpoint to request a password reset using the Directus SDK",
          response: {
            200: directusRequestPasswordResetResponseSchema,
          },
          body: directusRequestPasswordResetPostSchema,
        },
      },
      async (request, reply) => {
        try {
          const result = await client.request(
            passwordRequest(
              request.body.email,
              "http://localhost:3000/password/reset",
            ),
          );

          console.log(
            "Request of password reset successful; logging result",
            result,
          );

          return {
            ok: true,
          };
        } catch (error) {
          console.error(
            "Something went wrong while trying to request a password reset; logging error",
            error,
          );
          return {
            ok: false,
          };
        }
      },
    );

    // RESET PASSWORD ROUTE (/api/auth/password/reset)
    fastify.post(
      "/password/reset",
      {
        schema: {
          tags: ["Auth"],
          summary: "Reset a password",
          description:
            "The request a password reset endpoint sends an email with a link to http://lcalhost:3000/password/reset which in turn uses this endpoint to allow the user to reset their password.",
          response: {
            200: directusPasswordResetResponseSchema,
          },
          body: directusPasswordResetPostSchema,
        },
      },
      async (request, reply) => {
        try {
          const result = await client.request(
            passwordReset(request.body.token, request.body.password),
          );

          console.log("Password reset successful; logging result", result);

          return {
            ok: true,
          };
        } catch (error) {
          console.error(
            "Something went wrong while trying to reset the password; logging error",
            error,
          );
          return {
            ok: false,
          };
        }
      },
    );
  };

  await fastify.register(authRoutes);
}
