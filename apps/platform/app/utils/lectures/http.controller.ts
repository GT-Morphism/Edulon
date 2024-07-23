import type { paths } from "~~/swagger";

async function getLectures() {
  const lectures = await $fetch<
    paths["/api/collections/lectures/records"]["get"]["responses"]["200"]["content"]["application/json"]
  >("http://localhost:5555/api/collections/lectures/records");

  return lectures;
}

export { getLectures };
