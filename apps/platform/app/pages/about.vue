<script setup lang="ts">
  const session = useSession();
</script>

<template>
  <div>
    <h1>About</h1>
    <p v-if="session">Welcome, dear user</p>
  </div>
</template>
