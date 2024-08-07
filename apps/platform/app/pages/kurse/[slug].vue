<script setup lang="ts">
  const routeParam = useRoute().params;
</script>

<template>
  <h1>{{ routeParam.slug }}</h1>
</template>
