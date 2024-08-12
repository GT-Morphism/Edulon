import { type paths } from "~~/swagger";

export default defineCachedEventHandler(
  async (_event) => {
    const { hero_title, hero_subtitle, hero_notice_about_shortcuts } =
      await $fetch<
        paths["/api/content/landing-page"]["get"]["responses"]["200"]["content"]["application/json"]
      >("http://localhost:5555/api/content/landing-page");

    console.log("Inside landing-page.get.ts cached event handler");

    return { hero_title, hero_subtitle, hero_notice_about_shortcuts };
  },
  {
    name: "getLandingPageContent",
    base: "devCache",
    getKey: () => "landing-page",
    swr: false,
    maxAge: 24 * 60 * 60,
    shouldInvalidateCache: (event) => {
      // When »hard reloading« browsers, they will add `cache-control: no-cache` as a header to the request
      return getHeader(event, "cache-control") === "no-cache";
    },
  },
);
