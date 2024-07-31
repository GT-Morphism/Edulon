export default defineNuxtRouteMiddleware((to, from) => {
  const session = useSession();
  if (to.name === "login" && session.value) {
    console.log("user has running session; redirecting to landing page");
    return navigateTo("/");
  }

  if (to.name === "profile" && !session.value) {
    return navigateTo("/login");
  }
});
