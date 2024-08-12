<script setup lang="ts">
  const { data: courses } = await useFetch("/api/content/courses", {
    key: "courses",
    // For client-side caching
    getCachedData(key, nuxt) {
      return nuxt.payload.data[key];
    },
  });
</script>

<template>
  <section class="text-balance">
    <h1 class="text-primary mb-12 text-6xl/tight font-bold">
      Unsere Kurse: Eine Klasse für sich
    </h1>
    <ul class="flex gap-x-4">
      <li
        v-for="course in courses"
        :key="course.course_slug"
        class="flex-[1_1_calc(theme(maxWidth.screen-lg)/3-1rem)]"
      >
        <article
          class="before:from-success-900 before:via-surface-900 before:to-primary-900 after:from-success-500 after:via-surface-500 after:to-primary-500 relative flex h-full flex-col items-start justify-between gap-y-8 p-8 before:absolute before:inset-0 before:-z-10 before:m-1 before:bg-gradient-to-tr before:content-[''] after:absolute after:inset-0 after:-z-20 after:bg-gradient-to-tr"
        >
          <header>
            <h2 class="text-xl/tight">{{ course.course_title }}</h2>
            <span class="text-xs text-yellow-400"
              >Aktualisiert am:
              <time :datetime="course.updated_at">{{
                course.updated_at
              }}</time></span
            >
          </header>
          <p class="line-clamp-4">{{ course.course_summary }}</p>
          <UButton
            icon="i-heroicons-sparkles"
            size="md"
            variant="soft"
            :to="`kurse/${course.course_slug}`"
            >Zum Kurs</UButton
          >
        </article>
      </li>
    </ul>
  </section>
</template>
