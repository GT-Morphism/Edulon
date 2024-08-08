import { type paths } from "~~/swagger";

export default defineCachedEventHandler(
  async (_event) => {
    const data = await $fetch<
      paths["/api/content/courses"]["get"]["responses"]["200"]["content"]["application/json"]
    >("http://localhost:5555/api/content/courses");

    console.log("Inside courses.get.ts cached event handler");

    return data;
  },
  {
    name: "getCoursesContent",
    base: "devCache",
    getKey: () => "courses",
    swr: false,
    maxAge: 24 * 60 * 60,
    shouldInvalidateCache: (event) => {
      // When »hard reloading« browsers, they will add `cache-control: no-cache` as a header to the request
      return getHeader(event, "cache-control") === "no-cache";
    },
  },
);
