<script setup lang="ts">
  const people = [
    {
      title: "adZubi - Self Learning 1",
      lehrjahr: "1 Lehrjahr",
      zeit: "1 Woche",
      tag: "Onboarding",
      fachrichtung: "designer",
      status: "offen",
    },
    {
      title: "adZubi - Self Learning 2",
      lehrjahr: "1 Lehrjahr",
      zeit: "1 Woche",
      tag: "Onboarding",
      fachrichtung: "fachinformatiker",
      status: "abgeschlossen",
    },
    {
      title: "adZubi - Self Learning 3",
      lehrjahr: "1 Lehrjahr",
      zeit: "1 Woche",
      tag: "Onboarding",
      fachrichtung: "designer",
      status: "abgeschlossen",
    },
    {
      title: "adZubi - Self Learning 4",
      lehrjahr: "1 Lehrjahr",
      zeit: "1 Woche",
      tag: "Onboarding",
      fachrichtung: "fachinformatiker",
      status: "offen",
    },
  ];
  const subjects = [
    {
      key: "fachinformatiker",
      label: "Fachinformatiker",
      value: "fachinformatiker",
    },
    {
      key: "designer",
      label: "Designer",
      value: "designer",
    },
  ];
  const status = [
    {
      key: "abgeschlossen",
      label: "Abgeschlossen",
      value: true,
    },
    {
      key: "offen",
      label: "Offen",
      value: false,
    },
  ];
  const days = [
    {
      key: "onboarding",
      label: "Onboarding",
      value: "onboarding",
    },
    {
      key: "farbelehre",
      label: "Farbelehre",
      value: "farbelehre",
    },
  ];
  const time = [
    {
      key: 1,
      label: "1 Woche",
      value: 1,
    },
    {
      key: 2,
      label: "2 Wochen",
      value: 2,
    },
  ];
  const levels = [
    {
      key: 1,
      label: "1 Lehrjahr",
      value: 1,
    },
    {
      key: 2,
      label: "2 Lehrjahr",
      value: 2,
    },
  ];
  const columns = [
    {
      key: "title",
      label: "Title",
      sortable: true,
    },
    {
      key: "lehrjahr",
      label: "Lehrjahr",
      sortable: true,
    },
    {
      key: "zeit",
      label: "Zeit",
      sortable: true,
    },
    {
      key: "tag",
      label: "Tag",
      sortable: true,
    },
    {
      key: "fachrichtung",
      label: "Fachrichtung",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
    },
  ];

  const selectedSubject = ref([]);
  const selectedStatus = ref([]);
  const selectedDay = ref([]);
  const selectedTime = ref([]);
  const selectedLevel = ref([]);
  const selected = ref([people[0]]);
  const q = ref("");
  const filteredRows = computed(() => {
    if (!q.value) {
      return people;
    }

    return people.filter((person) => {
      return Object.values(person).some((value) => {
        return String(value).toLowerCase().includes(q.value.toLowerCase());
      });
    });
  });
</script>

<template>
  <section>
    <div
      class="flex gap-4 border-b border-gray-200 px-3 py-3.5 dark:border-gray-700"
    >
      <UInput
        v-model="q"
        placeholder="Search..."
        icon="i-heroicons-magnifying-glass-20-solid"
        class="w-80"
        color="green"
      />
      <USelectMenu
        v-model="selectedSubject"
        :options="subjects"
        multiple
        placeholder="Fachrichtung"
      />
      <USelectMenu
        v-model="selectedStatus"
        :options="status"
        multiple
        placeholder="Status"
      />
      <USelectMenu
        v-model="selectedDay"
        :options="days"
        multiple
        placeholder="Tag"
      />
      <USelectMenu
        v-model="selectedTime"
        :options="time"
        multiple
        placeholder="Zeit"
      />
      <USelectMenu
        v-model="selectedLevel"
        :options="levels"
        multiple
        placeholder="Lehrjahr"
      />
    </div>

    <UTable v-model="selected" :rows="filteredRows" :columns="columns">
    </UTable>
  </section>
</template>
