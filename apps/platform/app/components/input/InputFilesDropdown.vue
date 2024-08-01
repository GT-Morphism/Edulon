<script setup lang="ts">
  import * as v from "valibot";
  import type { FormSubmitEvent, FormErrorEvent } from "#ui/types";

  const schema = v.object({
    link: v.optional(
      v.pipe(v.string(), v.url("Die URL ist fehlerhaft formatiert.")),
    ),
    files: v.optional(
      v.array(
        v.object({
          name: v.string(),
          buffer: v.any(),
        }),
      ),
    ),
  });

  type Schema = v.InferOutput<typeof schema>;

  const state = reactive<Schema>({
    link: undefined,
    files: [],
  });

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const formData = new FormData();

    if (event.data.files) {
      for (let file of event.data.files) {
        formData.append("files", file, file.name);
      }
    }
    uploadFiles(formData);
  }

  async function onError(event: FormErrorEvent) {
    console.log("error upon submission; loggin error event", event);
  }
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit" @error="onError">
    <UFormGroup
      class="mb-6"
      name="link"
      label="Dokumentenlink (z.B. Sharepoint)"
    >
      <UInput v-model="state.link" color="gray" variant="outline" />
    </UFormGroup>

    <InputFiles v-model="state.files" multiple />

    <UButton type="submit" class="ms-auto mt-6 block"> Speichern </UButton>
  </UForm>
</template>
