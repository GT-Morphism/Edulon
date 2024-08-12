import type { H3Event, EventHandlerRequest } from "h3";

async function checkSession(event: H3Event<EventHandlerRequest>) {
  const access_token = getCookie(event, "access_token");
  const expires_at = getCookie(event, "expires_at");

  if (!access_token || !expires_at) {
    console.log("no access_token or expires_at found");
    return {
      session: false,
      expiresAt: 0,
    };
  }

  // The expires_at cookie has the format `<EXPIRES_AT>.<SIGNATURE>`
  if (Number(expires_at.split(".")[0]) <= new Date(Date.now()).getTime()) {
    console.log("expires_at is in the past");
    deleteCookie(event, "access_token");
    deleteCookie(event, "expires_at");
    return {
      session: false,
      expiresAt: 0,
    };
  }

  console.log("All fine in session.get.ts");
  return {
    session: true,
    expiresAt: Number(expires_at.split(".")[0]),
  };
}

export default checkSession;
