export default defineNuxtPlugin({
  name: "auth-server",
  enforce: "pre",
  async setup(_nuxtApp) {
    const { session, sessionExpiresAt } = useUserSession();
    console.log("running session.server.ts plugin");
    const { data } = await useFetch("/api/session");

    session.value = data.value?.session || false;

    sessionExpiresAt.value = data.value?.expiresAt || 0;
  },
});
