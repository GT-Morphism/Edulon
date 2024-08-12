<script setup lang="ts">
  const { data: coursesOfCurrentUser } = await useFetch(
    "/api/users/current/courses",
    {
      key: "current-user-courses",
    },
  );
</script>

<template>
  <article>
    <h1 class="text-primary text-6xl/tight font-bold">Meine Kurse</h1>
    <p class="mb-12 text-xs text-gray-400">
      Natürlich schließe ich sie gewissenhaft ab.
    </p>
    <ul
      v-if="coursesOfCurrentUser"
      class="flex max-w-md flex-col gap-y-4 text-balance"
    >
      <li
        v-for="course in coursesOfCurrentUser"
        :key="course.course_title"
        class="[&:not(:last-child)]:border-primary-800 flex items-center justify-between gap-x-4 [&:not(:last-child)]:border-b [&:not(:last-child)]:pb-4"
      >
        <h2>{{ course.course_title }}</h2>
        <UButton
          icon="i-heroicons-sparkles"
          size="xs"
          variant="soft"
          :to="`/kurse/${course.course_slug}`"
          >Zum Kurs</UButton
        >
      </li>
    </ul>
    <template v-else>
      <h2>Jetzt Kurse speichern</h2>
    </template>
  </article>
</template>
