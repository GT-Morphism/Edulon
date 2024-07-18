<script setup lang="ts">
  const data = await $fetch("http://localhost:5555/api/lecture");
  console.log(data[0]);
</script>

<template>
  <div>
    <h1>Home</h1>
    <p>All about you</p>
    <h2>{{ data[0].Name }}</h2>
    <span>{{ data[0].Year }}</span>
  </div>
</template>
