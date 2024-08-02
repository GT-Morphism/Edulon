<script setup lang="ts"></script>

<template>
  <div>
    <h1>Home</h1>
    <p>All about you</p>
    <ul>
      <li v-for="lecture in lectures" :key="lecture.title">
        {{ lecture.title }}
        <span>{{ lecture.author }}</span>
      </li>
    </ul>

    <div class="p-16">
      <InputFilesDropdown />
    </div>
  </div>
</template>
