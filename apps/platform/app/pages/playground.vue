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
  const heroes = [
    {
      title: " 1 Hero consequat massa quis enim.",
      description:
        "Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donecsodal",
      button: {
        buttonText: "Ansehen",
        buttonUrl: "#",
      },
    },
    {
      title: "2 Hero consequat massa quis enim.",
      description: "Maecenas nec odio et ante tincidunt tempus.",
      button: {
        buttonText: "Ansehen",
        buttonUrl: "#",
      },
    },
    {
      title: "3 Hero consequat massa quis enim.",
      description:
        "Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. ",
      button: {
        buttonText: "Ansehen",
        buttonUrl: "#",
      },
    },
  ];
</script>

<template>
  <div>
    <section>
      <h2>Card Component</h2>
      <div class="grid grid-cols-3 gap-4">
        <div v-for="card in cards" :key="card.title + card.description">
          <Card :title="card.title" :description="card.description" />
        </div>
      </div>
    </section>
    <section>
      <h2>Hero Component</h2>
      <div class="flex flex-col gap-4">
        <div v-for="hero in heroes" :key="hero.title + hero.description">
          <Hero
            :title="hero.title"
            :description="hero.description"
            :button="hero.button"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style>
  section {
    @apply mb-24;
  }

  h2 {
    @apply text-primary mb-4 text-2xl/tight;
  }
</style>
