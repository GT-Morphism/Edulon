<script setup lang="ts">
  const { data: currentUser } = await useFetch("/api/users/current", {
    key: "current-user",
    // For client-side caching
    getCachedData(key, nuxt) {
      return nuxt.payload.data[key];
    },
  });
</script>

<template>
  <h1>Willkommen {{ currentUser?.first_name }}</h1>
</template>
