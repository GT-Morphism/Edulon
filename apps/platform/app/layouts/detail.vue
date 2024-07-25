<script setup lang="ts">
  const links = [
    {
      icon: "i-heroicons-home",
      label: "Home",
      to: "/",
    },
    {
      icon: "i-heroicons-square-3-stack-3d",
      label: "Kurse",
    },
    {
      icon: "i-heroicons-link",
      label: "Farblehre",
    },
  ];
</script>

<template>
  <div>
    <MainHeader />
    <NuxtRouteAnnouncer />
    <div class="flex items-center justify-between bg-neutral-100 px-4 py-2">
      <UBreadcrumb :links="links" />
      <div class="flex gap-x-2">
        <UButton color="white" size="md">Ausbilder anrufen</UButton>
        <UButton size="md">Kurs starten</UButton>
      </div>
    </div>
    <UContainer class="bg-primary-600 flex flex-col gap-y-4 py-6 text-white">
      <p class="text-5xl">
        <slot name="title">Farblehre</slot>
      </p>
      <p class="max-w-screen-md">
        <slot name="description">
          Einleitungstext. Aenean imperdiet. Etiam ultricies nisi vel augue.
          Curabitur ullamcorper ultricies nisi. Ethiam rhoncus. Meacenas tempus,
          tellus eget condimentum rhoncus, se.
        </slot>
      </p>
    </UContainer>
    <UContainer class="grid grid-cols-3 gap-x-10 pb-16 pt-10">
      <div class="col-span-2">
        <slot />
      </div>
      <div class="col-span-1 pe-10">
        <slot name="sidebar" />
      </div>
    </UContainer>
  </div>
</template>
