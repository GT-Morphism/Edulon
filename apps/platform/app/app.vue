<script setup lang="ts">
  import "~/assets/app.css";
</script>

<template>
  <NuxtRouteAnnouncer />
  <MainHeader />
  <main class="me-auto ms-auto max-w-screen-lg py-24"><NuxtPage /></main>
  <MainFooter />
  <UModals />
  <UNotifications />
</template>
