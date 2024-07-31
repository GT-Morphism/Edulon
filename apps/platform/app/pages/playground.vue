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
  <div class="grid grid-cols-3 gap-4 py-4">
    <div v-for="card in cards">
      <Card :title="card.title" :description="card.description" />
    </div>
  </div>
</template>
