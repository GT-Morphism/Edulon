<script setup lang="ts">
  import "~/assets/app.css";
</script>
<template>
  <MainHeader />
  <NuxtRouteAnnouncer />
  <main class="py-24"><NuxtPage /></main>
  <UModals />
  <UNotifications />
</template>
