<script setup lang="ts">
  import * as v from "valibot";
  import type { FormSubmitEvent, FormErrorEvent, Form } from "#ui/types";
  import type { paths } from "~~/swagger";

  const toast = useToast();
  const routeQuery = useRoute().query;

  const schema = v.pipe(
    v.object({
      password: v.pipe(
        v.string(),
        v.nonEmpty("Ein Passwort musst Du schon angeben 🤌"),
        v.minLength(8, "Weniger als 8 Zeichen, ernsthaft?"),
      ),
      passwordConfirm: v.string(),
    }),
    v.forward(
      v.partialCheck(
        [["password"], ["passwordConfirm"]],
        (input) => input.password === input.passwordConfirm,
        "Hmm… scheinbar stimmen die Passwörter nicht überein 🤔",
      ),
      ["passwordConfirm"],
    ),
  );

  type Schema = v.InferOutput<typeof schema>;

  const state = reactive({
    password: "",
    passwordConfirm: "",
  });
  const form = ref<Form<Schema>>();
  const showPassword = ref(false);
  const showPasswordConfirm = ref(false);

  async function onSubmit(_event: FormSubmitEvent<Schema>) {
    console.log("submitting");
    form.value.clear();

    const response = await $fetch<
      paths["/api/auth/password/reset"]["post"]["responses"]["200"]["content"]["application/json"], // response type
      string, // type of url
      {
        method: "POST";
        body: paths["/api/auth/password/reset"]["post"]["requestBody"]["content"]["application/json"];
        headers: { "Content-Type": string };
      } // options type with body type
    >("http://localhost:5555/api/auth/password/reset", {
      method: "POST",
      body: {
        token: routeQuery.token as string,
        password: state.password,
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
        Bereit, ein neues, sicheres Passwort zu erstellen?
      </h2>
      <aside class="text-xs text-gray-500 dark:text-gray-400">
        Und hoffentlich auch nicht wieder zu vergessen. (Haben wir eigentlich
        schon Passwort-Manager erwähnt? 🤔)
      </aside>
    </div>

    <!-- PASSWORD -->
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
    </UFormGroup>

    <!-- PASSWORD CONFIRM -->
    <UFormGroup label="Passwort wiederholen" name="passwordConfirm" required>
      <UInput
        v-model="state.passwordConfirm"
        :type="showPasswordConfirm ? 'text' : 'password'"
        :icon="
          showPasswordConfirm
            ? 'i-heroicons-lock-open'
            : 'i-heroicons-lock-closed'
        "
        placeholder="*****"
        :ui="{ icon: { trailing: { pointer: '' } } }"
        required
      >
        <!-- BUTTON TO TOGGLE PASSWORD CONFIRM VISIBILITY -->
        <template #trailing>
          <UButton
            v-show="state.passwordConfirm !== ''"
            :icon="
              showPasswordConfirm ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'
            "
            variant="ghost"
            :color="showPasswordConfirm ? 'warning' : 'primary'"
            :padded="false"
            @click="showPasswordConfirm = !showPasswordConfirm"
          />
        </template>
      </UInput>
    </UFormGroup>

    <UButton type="submit"> Let's Go </UButton>
  </UForm>
</template>
