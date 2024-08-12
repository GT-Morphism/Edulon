<script lang="ts" setup>
  interface Props {
    modelValue?: File[];
    /** Makes the component not mutable; the user can not edit the value.  */
    readonly?: boolean;
    /** If set, the input accepts one or more files. */
    multiple?: boolean;
    /** A comma-seperated list of one or more filetypes, describing which file type to allow */
    accept?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
    readonly: false,
    multiple: false,
    accept: "",
  });

  const emit = defineEmits(["update:modelValue"]);

  const isDragging = ref(false);
  const input = ref<HTMLInputElement | null>(null);
  const files = ref(props.modelValue);

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer!.dropEffect = "copy";
    isDragging.value = true;
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    isDragging.value = false;
    const inputFiles = event.dataTransfer?.files;
    saveFilesToLocalState(inputFiles);
  };

  const onChange = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    const inputFiles = inputElement.files;
    saveFilesToLocalState(inputFiles);
  };

  const saveFilesToLocalState = (inputFiles: FileList | null | undefined) => {
    if (!inputFiles) return;

    for (const file of inputFiles) {
      if (!props.multiple) files.value = [];
      files.value.push(file);
    }

    if (input.value) input.value.value = "";
    emit("update:modelValue", files.value);
  };

  // Updates the local state when the component value is updated
  watch(
    () => props.modelValue,
    (newValue) => {
      files.value = newValue;
    },
  );

  // Initially sets the local state to the value of the component value
  onNuxtReady(() => {
    files.value = props.modelValue;
  });
</script>

<template>
  <div class="flex flex-col">
    <label
      v-if="!readonly"
      for="dropzone-file"
      :class="
        isDragging
          ? 'border-edulon-500 bg-edulon-100 dark:bg-edulon-900 border-solid'
          : 'dark:bg-surface-500 dark:hover:bg-surface-600 border-dashed border-gray-400 bg-gray-200 hover:bg-gray-100'
      "
      class="flex min-h-36 w-full cursor-pointer flex-col items-center justify-center rounded border bg-[repeating-linear-gradient(315deg,transparent_0,transparent_1px,white_0,white_50%)] bg-[size:12px_12px] px-14 py-7 motion-safe:transition-colors dark:bg-[repeating-linear-gradient(315deg,transparent_0,transparent_1px,black_0,black_50%)]"
      @dragover="onDragOver"
      @dragleave="isDragging = false"
      @drop="onDrop"
    >
      <div
        class="flex flex-col items-center gap-y-2 text-black dark:text-white"
      >
        <UIcon
          name="i-heroicons-document-arrow-down-20-solid"
          class="h-8 w-8"
        />
        <p class="flex flex-col items-center text-center text-sm">
          <span>Ziehe deine Lösung hier hin </span>
          oder
        </p>
        <UButton color="gray" variant="solid" @click="input?.click()">
          Dateien auswählen
        </UButton>
      </div>

      <input
        ref="input"
        id="dropzone-file"
        type="file"
        class="hidden"
        :multiple="multiple"
        :accept="accept"
        @change="onChange($event)"
      />
    </label>

    <template v-if="files?.length">
      <UDivider class="py-6" />

      <div class="flex flex-col gap-y-4">
        <p class="font-bold">Ausgewählte Dokumente</p>

        <div
          v-for="(file, i) in files"
          :key="i"
          class="dark:bg-surface-500 grid grid-cols-[max-content_auto_max-content] items-center gap-x-3 rounded bg-slate-50 p-2 shadow-sm"
        >
          {{ console.log(file) }}
          <UIcon
            name="i-heroicons-document-arrow-down-20-solid"
            class="h-5 w-5"
          />

          <p class="truncate">{{ file.name }}</p>

          <div class="flex pe-2">
            <UButton
              v-if="!readonly"
              @click="files.splice(i, 1)"
              icon="i-heroicons-trash"
              size="md"
              :padded="false"
              color="gray"
              variant="link"
              square
            >
              <span class="sr-only">Ausgewählte Datei entfernen.</span>
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
