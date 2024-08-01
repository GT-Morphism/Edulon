<script setup lang="ts">
  defineProps<{
    title: string;
    description?: string;
    button: {
      buttonText: string;
      buttonTarget: string;
      buttonUrl: string;
    };
  }>();
</script>
<template>
  <div
    class="flex h-[560px] items-center justify-center overflow-auto bg-[url('/assets/hero.png')] md:block"
  >
    <div
      class="mx-7 bg-white p-8 md:mx-0 md:ml-12 md:mt-14 md:max-w-[40%] dark:text-black"
    >
      <p class="mb-4 text-4xl/10 font-medium">
        {{ title }}
      </p>
      <p class="pb-7 leading-7" v-if="description">
        {{ description }}
      </p>
      <UButton :to="button.buttonUrl" size="lg" :target="button.buttonTarget">{{
        button.buttonText
      }}</UButton>
    </div>
  </div>
</template>
