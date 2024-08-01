export default defineNuxtPlugin({
  name: "auth-server",
  enforce: "pre",
  async setup(_nuxtApp) {
    const { session } = useUserSession();
    console.log("running auth.server.ts");
    const { data } = await useFetch("/api/user");

    console.log("logging fetched data inside auth.server.ts", data);
    session.value = data.value;
  },
});
