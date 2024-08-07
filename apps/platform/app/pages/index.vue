<script setup lang="ts">
  const { metaSymbol } = useShortcuts();
</script>

<template>
  <section class="me-auto ms-auto max-w-screen-lg text-balance text-center">
    <h1 class="text-primary mb-12 text-6xl/tight font-bold">
      Dein treuer Begleiter während Deiner gesamten Aubsildung.
    </h1>
    <p class="mb-14 text-3xl/tight">Worauf wartest Du noch, Bruder?</p>
    <div class="mb-2 flex items-center justify-center gap-x-2 text-8xl">
      <kbd
        class="bg-surface-500 ring-surface-300 rounded-lg pe-4 ps-4 ring-2 ring-inset"
        >{{ metaSymbol }}</kbd
      >
      <kbd
        class="bg-surface-500 ring-surface-300 rounded-lg pe-4 ps-4 ring-2 ring-inset"
        >K</kbd
      >
    </div>
    <p class="me-auto ms-auto max-w-prose text-xs text-gray-400">
      Du kannst natürlich die Plattform auch mit Deiner Maus bedienen; das macht
      Dich nur weniger cool.
    </p>
  </section>
</template>
