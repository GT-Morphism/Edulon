<script setup lang="ts">
  const courses = [
    {
      title: "HTML",
      lehrjahr: "1 Lehrjahr",
      zeit: "1 Woche",
      tag: "onboarding",
      fachrichtung: "designer",
      status: "offen",
    },
    {
      title: "CSS",
      lehrjahr: "1 Lehrjahr",
      zeit: "1 Woche",
      tag: "onboarding",
      fachrichtung: "fachinformatiker",
      status: "abgeschlossen",
    },
    {
      title: "Javascript",
      lehrjahr: "1 Lehrjahr",
      zeit: "2 Wochen",
      tag: "farbelehre",
      fachrichtung: "designer",
      status: "abgeschlossen",
    },
    {
      title: "Vue Js",
      lehrjahr: "2 Lehrjahr",
      zeit: "1 Woche",
      tag: "Onboarding",
      fachrichtung: "fachinformatiker",
      status: "offen",
    },
  ];
  const subjects = ["fachinformatiker", "designer"];
  const status = ["abgeschlossen", "offen"];
  const days = ["onboarding", "farbelehre"];
  const time = ["1 Woche", "2 Wochen"];
  const levels = ["1 Lehrjahr", "2 Lehrjahr"];
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
    {
      key: "action",
      label: "Action",
    },
  ];

  const selectedSubject = ref<string[]>([]);
  const selectedStatus = ref<string[]>([]);
  const selectedDay = ref<string[]>([]);
  const selectedTime = ref<string[]>([]);
  const selectedLevel = ref<string[]>([]);
  const selected = ref([courses[0]]);
  const searchQuery = ref("");
  const selectedColumns = ref(columns);

  const columnsTable = computed(() =>
    columns.filter((column) => selectedColumns.value.includes(column)),
  );

  const filteredRows = computed(() => {
    if (
      !searchQuery.value &&
      selectedStatus.value.length === 0 &&
      selectedSubject.value.length === 0 &&
      selectedDay.value.length === 0 &&
      selectedTime.value.length === 0 &&
      selectedLevel.value.length === 0
    ) {
      return courses;
    } else {
      return courses
        .filter((course) => {
          return Object.values(course).some((value) => {
            return String(value)
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase());
          });
        })
        .filter((course) => {
          if (selectedStatus.value.length === 0) {
            return course;
          }
          return selectedStatus.value.includes(course.status);
        })
        .filter((course) => {
          if (selectedSubject.value.length === 0) {
            return course;
          }
          return selectedSubject.value.includes(course.fachrichtung);
        })
        .filter((course) => {
          if (selectedDay.value.length === 0) {
            return course;
          }
          return selectedDay.value.includes(course.tag);
        })
        .filter((course) => {
          if (selectedTime.value.length === 0) {
            return course;
          }
          return selectedTime.value.includes(course.zeit);
        })
        .filter((course) => {
          if (selectedLevel.value.length === 0) {
            return course;
          }
          return selectedLevel.value.includes(course.lehrjahr);
        });
    }
  });
</script>

<template>
  <section>
    <header>
      <p class="mb-9">Kurse Liste</p>
    </header>
    <div
      class="flex gap-4 border-b border-gray-200 px-3 py-3.5 dark:border-gray-700"
    >
      <UInput
        v-model="searchQuery"
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
      >
      </USelectMenu>

      <USelectMenu
        v-model="selectedStatus"
        :options="status"
        multiple
        placeholder="Status"
        class="w-32"
      />
      <USelectMenu
        v-model="selectedDay"
        :options="days"
        multiple
        placeholder="Tag"
        class="w-32"
      />
      <USelectMenu
        v-model="selectedTime"
        :options="time"
        multiple
        placeholder="Zeit"
        class="w-32"
      />
      <USelectMenu
        v-model="selectedLevel"
        :options="levels"
        multiple
        placeholder="Lehrjahr"
        class="w-32"
      />

      <USelectMenu
        v-model="selectedColumns"
        :options="columns"
        multiple
        class="ml-auto"
      >
        <UButton icon="i-heroicons-view-columns" color="gray" size="sm">
          Listansicht
        </UButton>
      </USelectMenu>
    </div>

    <UTable v-model="selected" :rows="filteredRows" :columns="columnsTable">
      <template #status-data="{ row }">
        <UBadge
          size="xs"
          :label="row.status === 'abgeschlossen' ? 'abgeschlossen' : 'offen'"
          :color="row.status === 'abgeschlossen' ? 'emerald' : 'white'"
          variant="subtle"
        />
      </template>
      <template #fachrichtung-data="{ row }">
        <UBadge
          size="xs"
          :label="row.fachrichtung"
          :color="'white'"
          variant="subtle"
        />
      </template>
      <template #tag-data="{ row }">
        <UBadge size="xs" :label="row.tag" :color="'white'" variant="subtle" />
      </template>

      <template #action-data="{ row }">
        <UButton>Ansehen</UButton>
      </template>
    </UTable>
  </section>
</template>
