const PROTECTED_ROUTES = ["/profil", "/kurse/", "/challenges/"];

export default defineEventHandler(async (event) => {
  const { session } = await checkSession(event);

  const isProtected = PROTECTED_ROUTES.some(
    (route) => event.path === route || event.path.startsWith(route),
  );

  if (isProtected && !session) {
    return sendRedirect(event, `/login?redirectTo=${event.path.slice(1)}`);
  }
});
