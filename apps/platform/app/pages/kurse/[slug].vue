<script setup lang="ts">
  const routeParam = useRoute().params;
  const { data: course } = await useFetch(
    `/api/content/courses/${routeParam.slug}`,
    {
      key: `course-${routeParam.slug}`,
    },
  );

  const breadcrumbLinks = [
    {
      label: "Kurse",
      icon: "i-heroicons-academic-cap-solid",
      to: "/kurse",
    },
    {
      label: course.value?.course_title || "Kurs Details",
      icon: "i-heroicons-sparkles",
    },
  ];

  const chapters = course.value?.course_chapters?.map((chapter) => {
    return {
      headline: chapter.chapter_headline,
      summary: chapter.chapter_summary,
      body: chapter.chapter_body,
      documents: chapter.chapter_documents,
    };
  });

  const tableOfContentsLinks = [
    {
      label: "Einführung",
      to: "#einfuerung",
      exactHash: true,
    },
  ];

  const courseHasChapters = computed(() => {
    return chapters && chapters.length > 0;
  });

  if (chapters && chapters.length > 0) {
    for (const chapter of chapters) {
      tableOfContentsLinks.push({
        label: chapter.headline,
        to: `#${chapter.headline.toLowerCase().split(" ").join("-")}`,
        exactHash: true,
      });
    }
  }

  function mapMimeTypeToFileExtension(mimeType: string) {
    switch (mimeType) {
      case "application/pdf":
        return "pdf";
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return "pptx";
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return "xlsx";
      default:
        return "yolo";
    }
  }
</script>

<template>
  <div class="flex gap-x-24">
    <article class="flex flex-col gap-y-24">
      <aside><UBreadcrumb :links="breadcrumbLinks" /></aside>

      <!-- COURSE INTRODUCTION -->
      <section id="einfuerung" class="max-w-prose">
        <h1 class="mb-4 text-balance text-5xl/tight">
          {{ course?.course_title }}
        </h1>
        <UAlert
          class="mb-8"
          icon="i-heroicons-rocket-launch"
          color="primary"
          variant="subtle"
          title="TLDR"
          :description="course?.course_summary"
        />
        <p class="text-xl leading-relaxed">{{ course?.course_introduction }}</p>
      </section>

      <!-- COURSE CHAPTERS (OPTIONAL) -->
      <template v-if="courseHasChapters">
        <section
          v-for="chapter in chapters"
          :id="chapter.headline.toLowerCase().split(' ').join('-')"
          :key="chapter.headline"
          class="max-w-prose"
        >
          <!-- CHAPTER HEADLINE -->
          <h2 class="mb-4 text-4xl/tight text-yellow-400">
            {{ chapter.headline }}
          </h2>
          <!-- CHAPTER TLDR -->
          <UAlert
            class="mb-8"
            icon="i-heroicons-rocket-launch"
            color="primary"
            variant="subtle"
            title="TLDR"
            :description="chapter.summary"
          />

          <!-- CHAPTER BODY -->
          <div
            v-if="chapter.body"
            class="[&>p_strong]:text-primary [&>h3:not(:first-of-type)]:mt-12 [&>h3]:mb-4 [&>h3]:text-2xl/tight [&>h3]:after:block [&>h3]:after:h-1 [&>h3]:after:w-10 [&>h3]:after:bg-yellow-400 [&>h3]:after:content-[''] [&>p:not(:last-child):not(:has(+_h3))]:mb-4 [&>p]:leading-relaxed"
            v-html="chapter.body"
          />

          <!-- CHAPTER DOWNLOADABLE DOCUMENTS -->
          <h3
            v-if="chapter.documents.length > 0"
            class="mb-4 mt-12 after:block after:h-1 after:w-10 after:bg-yellow-400 after:content-['']"
          >
            Weitere Ressourcen zum Herunterladen
          </h3>
          <div
            v-if="chapter.documents.length > 0"
            class="flex flex-wrap gap-x-4 gap-y-4"
          >
            <a
              v-for="document in chapter.documents"
              :key="document.id"
              class="bg-surface-300/20 hover:text-primary focus-visible:bg-primary/20 focus-visible:border-primary focus-visible:text-primary border-surface-300 hover:bg-primary/20 hover:border-primary relative flex flex-1 flex-col items-center gap-y-4 rounded-lg border p-4 text-center hover:scale-95 focus-visible:scale-95 motion-safe:transition-transform"
              :href="`http://0.0.0.0:8055/assets/${document.id}?download`"
              :download="document.title"
            >
              <UIcon name="i-heroicons-document-arrow-down" class="h-8 w-8" />
              <span class="text-sm"> {{ document.title }} </span>
              <UBadge
                class="absolute right-2 top-2"
                size="xs"
                variant="subtle"
                color="yellow"
                :label="mapMimeTypeToFileExtension(document.type)"
              />
            </a>
          </div>
        </section>
      </template>
    </article>

    <!-- SIDEBAR -->
    <aside class="sticky top-16 h-fit">
      <nav>
        <h2 class="mb-2 uppercase tracking-widest">Inhaltsverzeichnis</h2>
        <UVerticalNavigation
          :links="tableOfContentsLinks"
          :ui="{
            wrapper: 'dark:border-primary-800 border-s border-gray-200',
            base: 'group -ms-px block border-s leading-6 before:hidden',
            padding: 'p-0 ps-4',
            rounded: '',
            font: '',
            ring: '',
            active: 'text-primary-500 dark:text-primary-500 border-current',
            inactive:
              'dark:hover:border-primary border-transparent text-gray-700 hover:border-gray-400 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
          }"
        />
      </nav>
    </aside>
  </div>
</template>
