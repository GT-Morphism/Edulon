<script setup lang="ts">
  const { authenticated } = useAuthStore();
  const { data: healthCheck } = await useFetch(
    "http://localhost:5555/api/health",
    {
      credentials: "include",
      headers: useRequestHeaders(["cookie"]),
    },
  );
  console.log(healthCheck);
</script>

<template>
  <div>
    <h1>About</h1>
    <p v-if="authenticated">Welcome, dear user</p>
  </div>
</template>
