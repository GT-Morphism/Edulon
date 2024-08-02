<script setup lang="ts">
  import * as v from "valibot";
  import type { FormSubmitEvent, FormErrorEvent } from "#ui/types";

  const schema = v.object({
    link: v.optional(
      v.pipe(v.string(), v.url("Die URL ist fehlerhaft formatiert.")),
    ),
    files: v.optional(v.array(v.file())),
  });

  type Schema = v.InferOutput<typeof schema>;

  const state = reactive<Schema>({
    link: undefined,
    files: [],
  });

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (event.data.files?.length) uploadFiles(event.data.files);
  }

  async function onError(event: FormErrorEvent) {
    console.log("error upon submission; loggin error event", event);
  }
</script>

<template>
  <UForm
    :schema="v.safeParser(schema)"
    :state="state"
    @submit="onSubmit"
    @error="onError"
    class="flex flex-col gap-y-6"
  >
    <UFormGroup name="link" label="Dokumentenlink (z.B. Sharepoint)">
      <UInput v-model="state.link" color="gray" variant="outline" />
    </UFormGroup>

    <InputFiles v-model="state.files" multiple />

    <UButton type="submit" class="ms-auto block"> Speichern </UButton>
  </UForm>
</template>
