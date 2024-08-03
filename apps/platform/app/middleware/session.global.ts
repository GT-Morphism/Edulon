export default defineNuxtRouteMiddleware(async (to, from) => {
  const { session, sessionExpiresAt, logout } = useUserSession();
  if (to.name === "login" && session.value) {
    console.log("user has running session; redirecting to landing page");
    return navigateTo("/");
  }

  if (to.name === "profile" && !session.value) {
    return navigateTo("/login");
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
