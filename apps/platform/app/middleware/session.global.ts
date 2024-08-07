export default defineNuxtRouteMiddleware(async (to, from) => {
  const { session, sessionExpiresAt, logout } = useUserSession();
  const toast = useToast();
  console.log("running global session middleware");
  if (to.path === "/login" && session.value) {
    console.log("user has running session; redirecting to landing page");
    return navigateTo("/");
  }

  if (
    (to.path === "/profile" ||
      to.path.startsWith("/profile/") ||
      to.path.startsWith("/courses/") ||
      to.path.startsWith("/challenges/")) &&
    !session.value &&
    import.meta.client
  ) {
    toast.add({
      title: "Netter Versuch, mein Freund. Dafür musst Du Dich schon anmelden.",
    });
    return abortNavigation();
  }

  if (to.path === "/password/reset" && session.value) {
    console.log("user has running session; redirecting to landing page");
    return navigateTo("/");
  }

  if (to.path === "/password/reset" && !Object.hasOwn(to.query, "token")) {
    console.log("no token found in query; redirecting to landing page");
    return navigateTo("/");
  }

  if (
    import.meta.client &&
    sessionExpiresAt.value <= new Date(Date.now()).getTime() &&
    session.value
  ) {
    console.log("Sorry bro, your session has expired");
    await logout();
  }
});
