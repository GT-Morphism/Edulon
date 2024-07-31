<script setup lang="ts">
  defineProps({
    title: String,
    description: String,
  });
</script>

<template>
  <article
    class="grid h-full max-w-80 grid-rows-[auto_1fr_auto] rounded-lg bg-white"
  >
    <div class="h-28 bg-gray-600"></div>
    <div class="flex flex-col gap-4 p-6 dark:text-black">
      <header v-if="title" class="text-xl/8 font-medium md:text-2xl">
        {{ title }}
      </header>
      <p class="text-sm/6 md:text-base">
        {{ description }}
      </p>
    </div>
    <div class="flex justify-end border-t px-6 py-8">
      <UButton to="#" size="lg"> Kurs Ansehen </UButton>
    </div>
  </article>
</template>
