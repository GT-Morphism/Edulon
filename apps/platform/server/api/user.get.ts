export default defineEventHandler((event) => {
  console.log("Requesting nitro api endpoint GET /api/user");
  const access_token = getCookie(event, "access_token");
  const expires_at = getCookie(event, "expires_at");

  console.log("logging access_token inside user.get.ts", access_token);

  if (!access_token || !expires_at) {
    console.log("no access_token or expires_at found");
    return false;
  }

  if (Number(expires_at) <= new Date(Date.now()).getTime()) {
    console.log("expires_at is in the past");
    deleteCookie(event, "access_token");
    deleteCookie(event, "expires_at");
    return false;
  }

  console.log("all fine, returning true");
  return true;
});
