import checkSession from "../utils/checkSession";

export default defineEventHandler(async (event) => {
  console.log("Requesting nitro api endpoint GET /api/session");
  return await checkSession(event);
});
