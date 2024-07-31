import type { paths } from "~~/swagger";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (Object.hasOwn(to.query, "token") && import.meta.server) {
    console.log("inside verify middleware; found token", to.query.token);
    const response = await $fetch<
      paths["/api/auth/register/verify-email/"]["post"]["responses"]["200"]["content"]["application/json"]
    >(`${useRuntimeConfig().backend.authUrl}/register/verify-email`, {
      method: "POST",
      body: {
        token: to.query.token,
      },
    });
    console.log(
      "hitting verify endpoint; logging response from backend",
      response,
    );
  }
});
