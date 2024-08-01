<script setup lang="ts">
  import * as v from "valibot";
  import type { FormSubmitEvent, FormErrorEvent, Form } from "#ui/types";
  const { register } = useUserSession();

  const { usedInModal } = defineProps<{
    usedInModal?: boolean;
  }>();

  const modal = useModal();
  const toast = useToast();

  const schema = v.object({
    name: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(1, "Bitte gebe einen Namen ein"),
    ),
    email: v.pipe(
      v.string(),
      v.trim(),
      v.email("Keine gültige E-Mail-Adresse"),
      v.endsWith("@adesso.de", "Die E-Mail muss mit @test.de enden"),
    ),
    password: v.pipe(
      v.string(),
      v.minLength(8, "Dein Passwort sollte mindestens 8 Zeichen enthalten."),
    ),
  });

  type Schema = v.InferOutput<typeof schema>;

  const state = reactive({
    name: "",
    email: "",
    password: "",
  });

  const form = ref<Form<Schema>>();
  const showPassword = ref<boolean>(false);

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    form.value.clear();
    await register(state.name, state.email, state.password);

    modal.close();
    toast.add({
      title:
        "Stark, Bruder 💪 Verifiziere Deine E-Mail, um Dich anmelden zu können (sorry, aber das ist notwendig).",
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
  <UForm
    ref="form"
    :schema="v.safeParser(schema)"
    :state="state"
    class="me-auto ms-auto flex w-full max-w-md flex-col gap-y-8 py-8"
    @submit="onSubmit"
    @error="onError"
  >
    <h2 class="text-primary text-2xl/tight">Account erstellen</h2>
    <!-- NAME INPUT -->
    <UFormGroup
      label="Wie dürfen wir Dich nennen?"
      name="name"
      description="Damit die Ausbilder dann leichter über Dich lästern können."
      required
      :ui="{ description: 'text-xs' }"
    >
      <UInput
        v-model="state.name"
        icon="i-heroicons-user-circle"
        placeholder="Madara"
        required
      />
    </UFormGroup>

    <!-- E-MAIL INPUT -->
    <UFormGroup
      label="Deine E-Mail-Adresse"
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

    <!-- PASSWORD INPUT -->
    <UFormGroup
      label="Ein sicheres Passwort (Du weißt schon, nicht »passwort«)"
      description="Dein wirklich sicheres Passwort sollte aus mindestens 8 Zeichen bestehen."
      name="password"
      required
      :ui="{ description: 'text-xs' }"
    >
      <UInput
        v-model="state.password"
        :type="showPassword ? 'text' : 'password'"
        :icon="
          showPassword ? 'i-heroicons-lock-open' : 'i-heroicons-lock-closed'
        "
        placeholder="*****"
        :ui="{ icon: { trailing: { pointer: '' } } }"
        required
      >
        <!-- BUTTON TO TOGGLE PASSWORD VISIBILITY -->
        <template #trailing>
          <UButton
            v-show="state.password !== ''"
            :icon="showPassword ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'"
            variant="ghost"
            :color="showPassword ? 'warning' : 'primary'"
            :padded="false"
            @click="showPassword = !showPassword"
          />
        </template>
      </UInput>
    </UFormGroup>

    <!-- CTAS -->
    <div class="flex items-center justify-between">
      <span class="text-xs text-gray-500 underline dark:text-gray-400"
        >Bereits ein Account? (Stark 💪)</span
      >
      <div class="flex gap-x-4">
        <UButton
          v-if="usedInModal"
          type="button"
          variant="outline"
          @click="modal.close()"
        >
          Doch nicht
        </UButton>
        <UButton type="submit"> Let's Go </UButton>
      </div>
    </div>
  </UForm>
</template>
