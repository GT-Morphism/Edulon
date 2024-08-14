<script setup lang="ts">
  const { metaSymbol } = useShortcuts();
  const { data } = await useFetch("/api/content/landing-page", {
    key: "landing-page",
    // For client-side caching
    getCachedData(key, nuxt) {
      return nuxt.payload.data[key];
    },
  });
</script>

<template>
  <section class="text-balance text-center">
    <img
      src="http://localhost:5555/api/assets/5d7b851e-f25d-4859-8b82-6f37687e8463"
    />
    <h1 class="text-primary mb-12 text-6xl/tight font-bold">
      {{ data?.hero_title }}
    </h1>
    <p class="mb-14 text-3xl/tight">{{ data?.hero_subtitle }}</p>
    <div class="mb-2 flex items-center justify-center gap-x-2 text-8xl">
      <kbd
        class="rounded-lg bg-yellow-400/20 pe-4 ps-4 ring-2 ring-inset ring-yellow-400"
        >{{ metaSymbol }}</kbd
      >
      <kbd
        class="rounded-lg bg-yellow-400/20 pe-4 ps-4 ring-2 ring-inset ring-yellow-400"
        >K</kbd
      >
    </div>
    <p class="me-auto ms-auto max-w-prose text-xs text-gray-400">
      {{ data?.hero_notice_about_shortcuts }}
    </p>
  </section>
</template>
