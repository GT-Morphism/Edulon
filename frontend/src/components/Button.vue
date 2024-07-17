<script setup lang="ts">
import { ref } from "vue";
const count = ref(0);
</script>

<template>
  <button
    class="rounded-md bg-blue-500 py-1 pe-2 ps-2 text-xl text-white"
    @click="count++"
  >
    Count is: {{ count }}
  </button>
</template>
