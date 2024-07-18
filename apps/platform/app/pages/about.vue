<script setup lang="ts">
  const { data } = await useFetch("http://localhost:5555/api/user");
  console.log(data.value.name);
</script>

<template>
  <h1>About {{ data }}</h1>
</template>
