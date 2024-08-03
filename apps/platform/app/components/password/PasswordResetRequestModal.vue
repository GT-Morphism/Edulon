<script setup lang="ts">
  import * as v from "valibot";
  import type { FormSubmitEvent, FormErrorEvent, Form } from "#ui/types";
  import type { paths } from "~~/swagger";

  const toast = useToast();
  const modal = useModal();

  const schema = v.object({
    email: v.pipe(
      v.string(),
      v.trim(),
      v.email("Keine gültige E-Mail-Addresse"),
      v.endsWith("@adesso.de", "Die E-Mail-Addresse muss mit @adesso.de enden"),
    ),
  });

  type Schema = v.InferOutput<typeof schema>;

  const state = reactive({
    email: "",
  });
  const form = ref<Form<Schema>>();

  async function onSubmit(_event: FormSubmitEvent<Schema>) {
    form.value.clear();

    const response = await $fetch<
      paths["/api/auth/password/request"]["post"]["responses"]["200"]["content"]["application/json"], // response type
      string, // type of url
      {
        method: "POST";
        body: paths["/api/auth/password/request"]["post"]["requestBody"]["content"]["application/json"];
        headers: { "Content-Type": string };
      } // options type with body type
    >("http://localhost:5555/api/auth/password/request", {
      method: "POST",
      body: {
        email: state.email,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log(
        "Something went wrong while trying to request a password reset",
      );
    }

    modal.close();
    toast.add({
      title:
        "Wir haben Dir eine E-Mail geschickt; hoffentlich vergisst Du das Passwort nicht noch einmal 🧐.",
    });
  }

  async function onError(event: FormErrorEvent) {
    if (!event.errors[0]) {
      return;
    }
    const elementToFocus = document.getElementById(event.errors[0].id);
    elementToFocus?.focus();
    elementToFocus?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
</script>

<template>
  <UModal :ui="{ ring: 'border-primary-700 border' }">
    <UForm
      ref="form"
      :schema="v.safeParser(schema)"
      :state="state"
      class="me-auto ms-auto flex w-full max-w-md flex-col gap-y-8 py-8"
      @submit="onSubmit"
      @error="onError"
    >
      <!-- INTRO TEXT -->
      <div>
        <h2 class="text-primary text-2xl/tight">
          Passwort zurücksetzen lassen
        </h2>
        <aside class="text-xs text-gray-500 dark:text-gray-400">
          Ihr wolltet ein sicheres Passwort, also habe ich eins erstellt – und
          prompt vergessen. (Passwort-Manager… hust)
        </aside>
      </div>

      <!-- E-MAIL INPUT -->
      <UFormGroup
        label="An welche E-Mail-Addresse sollen wir die Anfrage schicken?"
        name="email"
        description="Verwende Deine test E-Mail-Adresse"
        required
        :ui="{ description: 'text-xs' }"
      >
        <UInput
          v-model="state.email"
          icon="i-heroicons-envelope"
          placeholder="vorname.nachname@test.de"
          required
        />
      </UFormGroup>

      <div class="flex gap-x-4 self-end">
        <!-- CLOSE MODAL BUTTON -->
        <UButton type="button" variant="outline" @click="modal.close()">
          Doch nicht
        </UButton>

        <!-- SUBMIT FORM -->
        <UButton type="submit"> Ab die Post </UButton>
      </div>
    </UForm>
  </UModal>
</template>
