import { type paths } from "~~/swagger";

export default defineEventHandler(async (event) => {
  const headers = new Headers();

  for (const [key, value] of Object.entries(getRequestHeaders(event))) {
    headers.append(key, value || "");
  }

  const coursesOfCurrentUser = await $fetch<
    paths["/api/users/me/courses"]["get"]["responses"]["200"]["content"]["application/json"]
  >("http://localhost:5555/api/users/me/courses", {
    headers,
  });

  return coursesOfCurrentUser;
});
