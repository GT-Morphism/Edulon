import { type paths } from "~~/swagger";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  const headers = new Headers();

  for (const [key, value] of Object.entries(getRequestHeaders(event))) {
    headers.append(key, value || "");
  }

  const data = await $fetch<
    paths["/api/content/courses/{slug}"]["get"]["responses"]["200"]["content"]["application/json"]
  >(`http://localhost:5555/api/content/courses/${slug}`, {
    headers,
  });

  return data;
});
