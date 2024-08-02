<script setup lang="ts">
  // dummy data
  const cards = [
    {
      title: "Kurse 1",
      description:
        "Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donecsodal",
    },
    {
      title: "Kurse 2",
      description: "Maecenas nec odio et ante tincidunt tempus.",
    },
    {
      title: "Kurse 3",
      description:
        "Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. ",
    },
  ];
</script>

<template>
  <section>
    <h2>Card Component</h2>
    <div class="grid grid-cols-3 gap-4 py-4">
      <div v-for="card in cards">
        <Card :title="card.title" :description="card.description" />
      </div>
    </div>
  </section>
  <section>
    <h2>Table Component</h2>
    <Table />
  </section>
</template>

<style>
  section {
    @apply mb-24;
  }
  h2 {
    @apply text-primary mb-4 text-2xl/tight;
  }
</style>
