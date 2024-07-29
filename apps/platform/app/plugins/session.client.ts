export default defineNuxtPlugin({
  name: "auth-client",
  enforce: "pre",
  async setup(_nuxtApp) {
    console.log("running auth.client.ts");
  },
  hooks: {
    async "app:mounted"() {
      const { data } = await useFetch("/api/user");
    },
  },
});
