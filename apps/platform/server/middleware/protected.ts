export default defineEventHandler(async (event) => {
  const { session } = await checkSession(event);

  if (event.path === "/profile" && !session) {
    return sendRedirect(event, `/login?redirectTo=${event.path.split("/")[1]}`);
  }
});
