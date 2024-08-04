import type { paths } from "~~/swagger";

const useSessionState = () => useState<boolean>("session", () => false);
const useSessionExpiresAt = () =>
  useState<number>("session-expires-at", () => 0);

async function login(email: string, password: string) {
  const response = await $fetch<
    paths["/api/auth/login"]["post"]["responses"]["200"]["content"]["application/json"]
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
    useSessionExpiresAt().value = 0;
    useSessionState().value = false;
    return;
  }

  console.log("User login successful");
  const result = await $fetch("/api/session");
  useSessionState().value = result?.session || false;
  useSessionExpiresAt().value = result?.expiresAt || 0;
}

async function register(name: string, email: string, password: string) {
  const response = await $fetch<
    paths["/api/auth/register"]["post"]["responses"]["200"]["content"]["application/json"], // response type
    string, // type of url
    {
      method: "POST";
      body: paths["/api/auth/register"]["post"]["requestBody"]["content"]["application/json"];
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

async function logout() {
  console.log(
    "%crunning logout method in session composable; fetching nitro /api/session endpoint",
    "color: red",
  );
  await $fetch("/api/session", { method: "DELETE", credentials: "include" });
  useSessionExpiresAt().value = 0;
  useSessionState().value = false;
  return navigateTo("/login");
}

export function useUserSession() {
  const session = useSessionState();
  const sessionExpiresAt = useSessionExpiresAt();

  return {
    session,
    sessionExpiresAt,
    login,
    register,
    logout,
  };
}
