<script setup lang="ts">
  defineProps<{
    title: string;
    description?: string;
    button: {
      buttonText: string;
      buttonUrl: string;
    };
  }>();
</script>

<template>
  <section
    class="flex min-h-[560px] items-center justify-center bg-[url('/assets/hero.png')] px-7 md:block md:px-0 md:pl-12 md:pt-14"
  >
    <div class="bg-white p-8 md:max-w-xl dark:text-black">
      <h1 class="pb-4 text-4xl">
        {{ title }}
      </h1>
      <p class="pb-7" v-if="description">
        {{ description }}
      </p>
      <UButton :to="button.buttonUrl" size="lg">{{
        button.buttonText
      }}</UButton>
    </div>
  </section>
</template>
