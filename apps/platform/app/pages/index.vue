<script setup lang="ts">
  const { metaSymbol } = useShortcuts();
  const { data } = await useFetch("/api/content/landing-page", {
    key: "landing-page",
    // For client-side caching
    getCachedData(key, nuxt) {
      console.log("inside getCachedData; logging nuxt app", { nuxt });
      return nuxt.payload.data[key];
    },
  });
</script>

<template>
  <section class="me-auto ms-auto max-w-screen-lg text-balance text-center">
    <h1 class="text-primary mb-12 text-6xl/tight font-bold">
      {{ data?.hero_title }}
    </h1>
    <p class="mb-14 text-3xl/tight">{{ data?.hero_subtitle }}</p>
    <div class="mb-2 flex items-center justify-center gap-x-2 text-8xl">
      <kbd
        class="bg-surface-500 ring-surface-300 rounded-lg pe-4 ps-4 ring-2 ring-inset"
        >{{ metaSymbol }}</kbd
      >
      <kbd
        class="bg-surface-500 ring-surface-300 rounded-lg pe-4 ps-4 ring-2 ring-inset"
        >K</kbd
      >
    </div>
    <p class="me-auto ms-auto max-w-prose text-xs text-gray-400">
      {{ data?.hero_notice_about_shortcuts }}
    </p>
  </section>
</template>
