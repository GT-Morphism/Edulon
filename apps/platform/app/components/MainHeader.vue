<script setup lang="ts">
  const session = useSession();
</script>

<template>
  <header class="flex justify-around">
    <span> Logo </span>
    <nav class="bg-blue-500 py-2 text-white">
      <ul class="flex justify-center gap-x-4">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
      </ul>
    </nav>

    <LoginFormModalTrigger v-if="!session" />
  </header>
</template>
