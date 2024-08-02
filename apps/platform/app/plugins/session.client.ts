import { log } from "@edulon/logger";

export default defineNuxtPlugin({
  name: "auth-client",
  enforce: "pre",
  async setup(_nuxtApp) {
    log.blue("running auth.client.ts");
  },
  hooks: {
    async "app:mounted"() {
      const { data } = await useFetch("/api/user");
    },
  },
});
