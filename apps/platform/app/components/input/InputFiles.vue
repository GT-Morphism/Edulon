<script lang="ts" setup>
  type valueFiles = {
    name: string;
    buffer?: string | ArrayBuffer | null;
  }[];

  export interface Props {
    modelValue?: valueFiles;
    readonly?: boolean;
    multiple?: boolean;
    accept?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
    readonly: false,
    multiple: false,
    accept: "",
  });

  const emit = defineEmits(["update:modelValue"]);

  const isDragging: globalThis.Ref<boolean> = ref(false);
  const input = ref(null);
  const files: globalThis.Ref<valueFiles> = ref(props.modelValue);

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer!.dropEffect = "copy";
    isDragging.value = true;
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    isDragging.value = false;
    const inputFiles = event.dataTransfer?.files;
    readFiles(inputFiles);
  };

  const triggerFileInput = () => {
    if (input.value) (input.value as HTMLInputElement)?.click();
  };

  const onChange = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    const inputFiles = inputElement.files;
    readFiles(inputFiles);
  };

  const readFiles = (inputFiles: FileList | null | undefined) => {
    if (!inputFiles) return;
    const formData = new FormData();

    for (const file of inputFiles) {
      console.log(formData, file);
      formData.append("files", file, file.name);
      console.log(formData);
    }

    
    
    for (const file of inputFiles) {
      const reader = new FileReader();
      reader.onload = () => {
        if (!props.multiple) files.value = [];
        files.value.push({
          name: file.name,
          buffer: reader.result,
        });
        if (input.value) (input.value as HTMLInputElement).value = "";
        console.log(files.value);

        emit("update:modelValue", files.value);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const removeFile = (i: number) => {
    files.value.splice(i, 1);
  };

  watch(
    () => props.modelValue,
    (newValue) => {
      files.value = newValue;
    },
  );

  onNuxtReady(() => {
    files.value = props.modelValue;
  });
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center">
    <label
      v-if="!readonly"
      @dragover="onDragOver"
      @dragleave="isDragging = false"
      @drop="onDrop"
      for="dropzone-file"
      :class="
        isDragging
          ? 'border-edulon-500 bg-edulon-100 dark:bg-edulon-900 border-solid'
          : 'dark:bg-surface-500 dark:hover:bg-surface-600 border-dashed border-gray-400 bg-gray-200 hover:bg-gray-100'
      "
      class="flex min-h-36 w-full cursor-pointer flex-col items-center justify-center rounded border bg-[repeating-linear-gradient(315deg,transparent_0,transparent_1px,white_0,white_50%)] bg-[size:12px_12px] px-14 py-7 transition-colors duration-75 dark:bg-[repeating-linear-gradient(315deg,transparent_0,transparent_1px,black_0,black_50%)]"
    >
      <div
        class="light:text-black flex flex-col items-center justify-center gap-y-2"
      >
        <UIcon
          name="i-heroicons-document-arrow-down-20-solid"
          class="h-8 w-8"
        />
        <p class="align-center flex flex-col text-center text-sm">
          <span>Ziehe deine Lösung hier hin </span>
          oder
        </p>
        <UButton color="gray" variant="solid" @click="triggerFileInput()">
          Dateien auswählen
        </UButton>
      </div>

      <input
        ref="input"
        @change="onChange($event)"
        :multiple="multiple"
        :accept="accept"
        id="dropzone-file"
        type="file"
        class="hidden"
      />
    </label>

    <template v-if="files?.length">
      <UDivider class="py-6" />

      <div class="flex w-full flex-col gap-4">
        <p class="font-bold">Ausgewählte Dokumente</p>

        <div
          v-for="(file, i) in files"
          :key="i"
          class="dark:bg-surface-500 box-border grid w-full grid-cols-[max-content_auto_max-content] items-center gap-x-3 overflow-hidden rounded bg-slate-50 p-2 shadow-sm"
        >
          <UIcon
            name="i-heroicons-document-arrow-down-20-solid"
            class="h-5 w-5"
          />

          <p class="truncate">{{ file.name }}</p>

          <div class="flex pe-2">
            <UButton
              v-if="!readonly"
              @click="removeFile(i)"
              icon="i-heroicons-trash"
              size="md"
              :padded="false"
              color="gray"
              variant="link"
              square
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
