<script setup lang="ts">
  import * as v from "valibot";
  import type { FormSubmitEvent, FormErrorEvent, Form } from "#ui/types";
  import { RegisterFormModal, PasswordResetRequestModal } from "#components";

  const { login } = useUserSession();

  const props = withDefaults(
    defineProps<{
      usedInModal?: boolean;
      headline?: string;
      showHintIfNoAccountIsAvailable?: boolean;
      redirectTo?: string | undefined;
    }>(),
    {
      usedInModal: false,
      headline: "Login",
      showHintIfNoAccountIsAvailable: true,
      redirectTo: undefined,
    },
  );

  const modal = useModal();
  const toast = useToast();

  const schema = v.object({
    email: v.pipe(
      v.string(),
      v.trim(),
      v.email("Keine gültige E-Mail-Adresse"),
      v.endsWith("@adesso.de", "Die E-Mail muss mit @test.de enden"),
    ),
    password: v.pipe(
      v.string(),
      v.minLength(8, "Must be at least 8 characters"),
    ),
  });

  type Schema = v.InferOutput<typeof schema>;

  const state = reactive({
    email: "",
    password: "",
  });

  const form = ref<Form<Schema>>();
  const showPassword = ref<boolean>(false);

  async function onSubmit(_event: FormSubmitEvent<Schema>) {
    form.value.clear();
    await login(state.email, state.password);

    modal.close();
    toast.add({ title: "Willkommen" });

    if (props.redirectTo) {
      return navigateTo(`/${props.redirectTo}`);
    }
  }

  async function onError(event: FormErrorEvent) {
    if (!event.errors[0]) {
      return;
    }
    const elementToFocus = document.getElementById(event.errors[0].id);
    elementToFocus?.focus();
    elementToFocus?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function onClickAccountHint() {
    if (props.usedInModal) {
      modal.close();
      // When triggered while the LoginFormModal is open, we need to wait first that
      // the LoginFormModal is closed.
      setTimeout(() => modal.open(RegisterFormModal), 250);
      return;
    }

    modal.open(RegisterFormModal);
  }

  function onClickPasswordReset() {
    if (props.usedInModal) {
      modal.close();

      setTimeout(() => modal.open(PasswordResetRequestModal), 250);
      return;
    }

    modal.open(PasswordResetRequestModal);
  }
</script>

<template>
  <UForm
    ref="form"
    :schema="v.safeParser(schema)"
    :state="state"
    class="me-auto ms-auto flex w-full max-w-md flex-col gap-y-8 py-8"
    :validate-on="['submit', 'input', 'change']"
    @submit="onSubmit"
    @error="onError"
  >
    <!-- INTRO HEADLINE -->
    <h2 class="text-primary text-2xl/tight">
      {{ props.headline }}
    </h2>

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
    <UFormGroup label="Dein Passwort" name="password" required>
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
      <button
        type="button"
        class="mt-2 inline-block text-xs text-gray-500 underline dark:text-gray-400"
        @click="onClickPasswordReset"
      >
        Passwort vergessen?
      </button>
    </UFormGroup>

    <!-- CTAS -->
    <div
      class="flex items-center"
      :class="
        props.showHintIfNoAccountIsAvailable ? 'justify-between' : 'justify-end'
      "
    >
      <!-- NO ACCOUNT HINT -->
      <button
        v-if="props.showHintIfNoAccountIsAvailable"
        type="button"
        class="text-xs text-gray-500 underline dark:text-gray-400"
        @click="onClickAccountHint"
      >
        Noch kein Account? (Shame on you 🧐)
      </button>

      <div class="flex gap-x-4">
        <!-- CLOSE MODAL BUTTON (ONLY INSIDE MODAL) -->
        <UButton
          v-if="props.usedInModal"
          type="button"
          variant="outline"
          @click="modal.close()"
        >
          Doch nicht
        </UButton>

        <!-- SUBMIT LOGIN FORM -->
        <UButton type="submit"> Let's Go </UButton>
      </div>
    </div>
  </UForm>
</template>
