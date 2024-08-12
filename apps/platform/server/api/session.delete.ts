export default defineEventHandler(async (event) => {
  console.log("Nitro endpoint /api/session was hit; deleting session cookies");
  deleteCookie(event, "access_token");
  deleteCookie(event, "expires_at");
});
