<script setup lang="ts">
  const { session, logout } = useUserSession();
</script>

<template>
  <header class="flex justify-around">
    <span> Logo </span>
    <nav class="bg-blue-500 py-2 text-white">
      <ul class="flex justify-center gap-x-4">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/profile">Profil</NuxtLink></li>
        <li><NuxtLink to="/login">Login</NuxtLink></li>
        <li><NuxtLink to="/playground">Playground</NuxtLink></li>
      </ul>
    </nav>

    <LoginFormModalTrigger v-if="!session" />
    <RegisterFormModalTrigger v-if="!session" />
    <UButton v-if="session" type="button" @click="logout">Logout</UButton>
  </header>
</template>
