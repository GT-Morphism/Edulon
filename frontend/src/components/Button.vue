<script setup lang="ts">
import { ref } from "vue";
const count = ref(0);
</script>

<template>
  <button
    class="bg-blue-500 text-white pe-2 ps-2 py-1 rounded-md text-xl"
    @click="count++"
  >
    Count is: {{ count }}
  </button>
</template>
