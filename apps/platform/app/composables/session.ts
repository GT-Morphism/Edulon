import type { paths } from "~~/swagger";

export const useSession = () =>
  useState("session", () => {
    return checkSession();
  });

function checkSession() {
  console.log("Running checkSession inside composable session.ts");
  const access_token = useCookie("access_token");
  const expires_at = useCookie("expires_at");

  console.log(
    "logging access_token inside composable session.ts",
    access_token,
  );

  if (!access_token || !expires_at) {
    console.log("no access_token or expires_at found");
    return false;
  }

  if (Number(expires_at) <= new Date(Date.now()).getTime()) {
    console.log("expires_at is in the past");
    // deleteCookie(event, "access_token");
    // deleteCookie(event, "expires_at");
    return false;
  }

  console.log("all fine, returning true");
  return true;
}

export async function login(email: string, password: string) {
  const response = await $fetch<
    paths["/api/auth/login/"]["post"]["responses"]["200"]["content"]["application/json"]
  >("http://localhost:5555/api/auth/login", {
    method: "POST",
    body: {
      email: email,
      password: password,
    },
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  console.log(
    "logging in; changing useSession().value to",
    response.authenticated,
  );

  useSession().value = response.authenticated;
}
