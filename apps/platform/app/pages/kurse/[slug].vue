<script setup lang="ts">
  definePageMeta({
    layout: false,
  });

  const links = [
    {
      label: "Übersicht",
      active: true,
    },
    {
      label: "Lernressourcen",
    },
    {
      label: "Ausbildungsrahmenplan & -verordnung",
    },
  ];

  const chapters = [
    {
      label: "Vortrag",
      defaultOpen: true,
      content: {
        stages: [
          {
            label: "Farblehre Part 01",
            defaultOpen: true,
            content: {},
          },
          {
            label: "Farblehre Part 02",
            content: {},
          },
        ],
      },
    },
    {
      label: "Praxisaufgaben",
      content: {
        stages: [
          {
            label: "Briefing / Aufgabe",
            content: {},
          },
          {
            label: "Template",
            content: {},
          },
          {
            label: "Wissen Quellen",
            content: {},
          },
        ],
      },
    },
    {
      label: "Präsentation",
      content: {
        description:
          "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
      },
    },
    {
      label: "Lernkontrolle",
      content: {
        description:
          "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
        quiz: [],
      },
    },
    {
      label: "Eigenbewertung",
      content: {
        description:
          "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
      },
    },
    {
      label: "Ausbildungsnachweise gepflegt",
      content: {
        title: "Beschreibung",
        description:
          "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
      },
    },
  ];

  const DATA: globalThis.Ref<{
    id: string;
    slug?: string;
    name: string;
    thumbnail: string;
    created: string;
    updated: string;
  }> = ref({
    id: "",
    name: "",
    thumbnail: "",
    created: "24.07.2024T09:30:15.000Z",
    updated: "24.07.2024T09:30:15.000Z",
  });

  onMounted(() => {
    console.log(useRoute().params.slug);
    DATA.value = {
      ...DATA.value,
      slug: useRoute().params.slug?.toString(),
    };
  });
</script>

<template>
  <NuxtLayout name="detail">
    <template #sidebar>
      <div
        class="flex flex-col divide-y rounded-lg border border-gray-200 px-4"
      >
        <div class="flex flex-col gap-y-2 py-6">
          <p class="font-bold">Verantwortlicher Dozent</p>
          <div
            class="flex items-center justify-between rounded bg-slate-100 p-2"
          >
            <div class="flex items-center gap-x-3">
              <UAvatar
                src="https://avatars.githubusercontent.com/u/72008643?v=4"
                alt="Avatar"
                size="md"
              />
              <div>
                <p>Hubertus X.</p>
                <p class="text-xs text-neutral-600">Lead XX Designer</p>
              </div>
            </div>

            <div class="flex items-center gap-x-2">
              <UIcon
                name="i-heroicons-chat-bubble-left-ellipsis-solid"
                class="h-5 w-5"
              />
              <UIcon name="i-heroicons-envelope-solid" class="h-5 w-5" />
              <UIcon
                name="i-heroicons-ellipsis-horizontal-circle"
                class="h-6 w-6"
              />
            </div>
          </div>
          <div
            class="flex items-center justify-between rounded bg-slate-100 p-2"
          >
            <div class="flex items-center gap-x-3">
              <UAvatar
                src="https://avatars.githubusercontent.com/u/72008643?v=4"
                alt="Avatar"
                size="md"
              />
              <div>
                <p>Sven X.</p>
                <p class="text-xs text-neutral-600">Lead XX Designer</p>
              </div>
            </div>

            <div class="flex items-center gap-x-2">
              <UIcon
                name="i-heroicons-chat-bubble-left-ellipsis-solid"
                class="h-5 w-5"
              />
              <UIcon name="i-heroicons-envelope-solid" class="h-5 w-5" />
              <UIcon
                name="i-heroicons-ellipsis-horizontal-circle"
                class="h-6 w-6"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-y-2 py-6">
          <p class="font-bold">Zeitfenster</p>
          <div class="flex gap-x-1">
            <UIcon name="i-heroicons-academic-cap" class="h-6 w-6" />
            <p class="text-neutral-600">1 Woche</p>
          </div>
        </div>

        <div class="flex flex-col gap-y-2 py-6">
          <p class="font-bold">Punkte Badge</p>
          <p>500LP</p>
          <div class="flex gap-x-2">
            <UAvatar
              src="https://avatars.githubusercontent.com/u/72008643?v=4"
              alt="Avatar"
            />
            <UAvatar
              src="https://avatars.githubusercontent.com/u/72008643?v=4"
              alt="Avatar"
            />
            <UAvatar
              src="https://avatars.githubusercontent.com/u/72008643?v=4"
              alt="Avatar"
            />
            <UAvatar
              src="https://avatars.githubusercontent.com/u/72008643?v=4"
              alt="Avatar"
            />
          </div>
        </div>
      </div>

      <div
        class="mt-6 flex flex-col gap-4 rounded-lg border border-gray-200 px-4 py-6"
      >
        <p class="text-lg font-bold">Ressourcen</p>
        <div>
          <p class="mb-2">Praxisaufgabe</p>
          <UButton variant="outline">
            <UIcon name="i-heroicons-arrow-down-tray" class="h-5 w-5" />
            Dateien herunterladen
          </UButton>
        </div>
        <div>
          <p class="mb-2">Theorie zum Thema</p>
          <UButton variant="outline">
            <UIcon name="i-heroicons-arrow-down-tray" class="h-5 w-5" />
            Dateien herunterladen
          </UButton>
        </div>
      </div>
    </template>

    <div class="flex flex-col gap-y-8">
      <div>
        <p class="text-2xl">Was lernst du hier?</p>
        <p class="mt-2">
          Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
          ullamcorper ultricies nisi. Ethiam rhoncus. Meacenas tempus, tellus
          eget condimentum rhoncus, se. Aenean imperdiet. Etiam ultricies nisi
          vel augue. Curabitur ullamcorper ultricies nisi. Ethiam rhoncus.
          Meacenas tempus, tellus eget condimentum rhoncus, se. Aenean
          imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
          ultricies nisi. Ethiam rhoncus. Meacenas tempus, tellus eget
          condimentum rhoncus, se.
        </p>
      </div>

      <UHorizontalNavigation :links="links" />

      <p class="text-2xl">Inhalt</p>

      <UAccordion :items="chapters">
        <template #default="{ item, index, open }">
          <UButton color="gray" variant="solid" size="md" class="mb-1.5">
            <span class="truncate">
              Kapitel {{ String(index + 1).padStart(2, "0") }}: {{ item.label }}
            </span>

            <template #trailing>
              <UIcon
                name="i-heroicons-chevron-right-20-solid"
                class="ms-auto h-5 w-5 transform transition-transform duration-200"
                :class="[open && 'rotate-90']"
              />
            </template>
          </UButton>
        </template>
        <template #item="{ item: chapter }">
          <template v-if="chapter">
            <p
              v-if="chapter.content?.title"
              class="font-bold text-gray-900 dark:text-white"
            >
              {{ chapter.content.title }}
            </p>

            <p
              v-if="chapter.content?.description"
              class="text-gray-900 dark:text-white"
            >
              {{ chapter.content.description }}
            </p>

            <div
              v-if="chapter.content?.quiz"
              class="text-gray-900 dark:text-white"
            >
              <p class="font-bold">[TODO] QUIZ</p>
            </div>

            <UAccordion
              v-if="chapter.content?.stages"
              color="gray"
              variant="solid"
              size="md"
              :items="chapter.content.stages"
            >
              <template #item="{ item: stage }">
                <p
                  v-if="stage.content?.title"
                  class="font-bold text-gray-900 dark:text-white"
                >
                  {{ stage.content.title }}
                </p>

                <p
                  v-if="stage.content?.description"
                  class="text-gray-900 dark:text-white"
                >
                  {{ stage.content.description }}
                </p>

                <div
                  v-if="chapter.content?.quiz"
                  class="text-gray-900 dark:text-white"
                >
                  <p class="font-bold">[TODO] QUIZ</p>
                </div>
              </template>
            </UAccordion>
          </template>
        </template>
      </UAccordion>
    </div>
  </NuxtLayout>
</template>
