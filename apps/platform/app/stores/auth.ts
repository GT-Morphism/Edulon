import { type paths } from "~~/swagger";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return { authenticated: false };
  },

  actions: {
    async authenticateUser(email: string, password: string) {
      const response = await $fetch<
        paths["/api/auth/login/"]["post"]["responses"]["200"]["content"]["application/json"]
      >("http://localhost:5555/api/auth/login", {
        method: "POST",
        body: {
          email: email,
          password: password,
        },
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      this.authenticated = response.authenticated;
    },
  },
});
