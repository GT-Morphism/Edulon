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
  loginResponseSchema,
  loginPostSchema,
  registerResponseSchema,
  registerPostSchema,
  verifyEmailPostSchema,
  verifyEmailResponseSchema,
  requestPasswordResetResponseSchema,
  requestPasswordResetPostSchema,
  passwordResetResponseSchema,
  passwordResetPostSchema,
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
          tags: ["Authentication"],
          summary: "Authenticate as a user",
          description:
            "Login to the application using the email and password provided. (More information: <a href='https://docs.directus.io/reference/authentication.html#login' target='_blank'>Directus Login</a>)",
          response: {
            200: loginResponseSchema,
          },
          body: loginPostSchema,
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
              maxAge: (data.expires || 90000) / 1000,
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
              maxAge: (data.expires || 90000) / 1000,
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
          tags: ["Authentication"],
          summary: "Register a new user",
          description:
            "Upon registration, an email is sent to the user with a link to verify their email address. The link within that email points to the URL provided by `verification_url` and appends to this URL a token as a query parameter. (More information: <a href='https://docs.directus.io/reference/authentication.html#register' target='_blank'>Directus Register</a>)",
          response: {
            200: registerResponseSchema,
          },
          body: registerPostSchema,
        },
      },
      async (request, reply) => {
        const result = await client.request<{ ok: boolean }>(
          registerUser(request.body.email, request.body.password, {
            first_name: request.body.name,
            verification_url: `${fastify.config.FRONTEND_URL}/login`,
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

    // VERIFY EMAIL ROUTE (/api/auth/register/verify-email)
    fastify.post(
      "/register/verify-email",
      {
        schema: {
          tags: ["Authentication"],
          summary: "Verify a registration",
          description:
            "If enabled in project settings, registering a user sends a verification email with a link to the URL provided by `verification_url` in the register API endpoint to allow the user to finish their registration. The token given by that link is used to verify the user's email address using this API endpoint. (More information: <a href='https://docs.directus.io/reference/authentication.html#verify-a-registration' target='_blank'>Directus Verify a Registration</a>)",
          response: {
            200: verifyEmailResponseSchema,
          },
          body: verifyEmailPostSchema,
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
          tags: ["Authentication"],
          summary: "Request password reset",
          description:
            "Request a password reset email to be sent to the given user. The `reset_url` dictates where the link in the email will lead to. The reset token will be passed as a query parameter to that URL. (More information: <a href='https://docs.directus.io/reference/authentication.html#request-password-reset' target='_blank'>Directus Request Password Reset</a>)",
          response: {
            200: requestPasswordResetResponseSchema,
          },
          body: requestPasswordResetPostSchema,
        },
      },
      async (request, reply) => {
        try {
          const result = await client.request(
            passwordRequest(
              request.body.email,
              `${fastify.config.FRONTEND_URL}/password/reset`,
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
          tags: ["Authentication"],
          summary: "Reset a password",
          description:
            "The request a password reset endpoint sends an email with a link given by `reset_url` which in turn uses this endpoint to allow the user to reset their password. (More information: <a href='https://docs.directus.io/reference/authentication.html#reset-a-password' target='_blank'>Directus Reset a Password</a>)",
          response: {
            200: passwordResetResponseSchema,
          },
          body: passwordResetPostSchema,
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
