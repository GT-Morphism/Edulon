import type { paths } from "~~/swagger";

const useSessionState = () =>
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

async function login(email: string, password: string) {
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

  if (!response.ok) {
    console.log("Somehting went wrong while trying to login user");
    useSessionState().value = false;
    return;
  }

  console.log("User login successful");
  useSessionState().value = true;
  return navigateTo("/profile");
}

async function register(name: string, email: string, password: string) {
  const response = await $fetch<
    paths["/api/auth/register/"]["post"]["responses"]["200"]["content"]["application/json"], // response type
    string, // type of url
    {
      method: "POST";
      body: paths["/api/auth/register/"]["post"]["requestBody"]["content"]["application/json"];
      headers: { "Content-Type": string };
      credentials: "include";
    } // options type with body type
  >("http://localhost:5555/api/auth/register", {
    method: "POST",
    body: {
      name: name,
      email: email,
      password: password,
    },
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    console.log("Something went wrong while trying to register a new user");
  }

  console.log("User registration successful");
}
export function useUserSession() {
  const session = useSessionState();
  return {
    session,
    login,
    register,
  };
}
