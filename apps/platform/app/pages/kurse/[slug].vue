<script setup lang="ts">
  const routeParam = useRoute().params;
  const { data: course } = await useFetch(
    `/api/content/courses/${routeParam.slug}`,
    {
      key: `course-${routeParam.slug}`,
    },
  );
</script>

<template>
  <div>
    <h1>{{ routeParam.slug }}</h1>
    {{ course }}
  </div>
</template>
