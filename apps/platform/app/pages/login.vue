<script setup lang="ts">
  const routeQuery = useRoute().query;
  const toast = useToast();

  definePageMeta({
    middleware: ["verify"],
  });

  const routeQueryHasToken = routeQuery.token !== undefined;
  const routeQueryHasRedirectTo = routeQuery.redirectTo !== undefined;

  onMounted(() => {
    if (routeQueryHasRedirectTo) {
      toast.add({ title: "Bro, dafür musst Du angemeldet sein." });
    }
  });
</script>
<template>
  <section v-if="!routeQueryHasToken">
    <h1 class="mb-12 text-center text-2xl/tight">
      Anmelden, und heute ein Stückchen cooler werden 💪 (Trust me).
    </h1>
    <LoginForm
      class="bg-surface-900 before:from-primary before:via-primary-900 after:from-primary after:to-primary relative pe-8 ps-8 before:absolute before:-inset-1 before:-z-10 before:bg-gradient-to-b before:to-transparent after:absolute after:-inset-1 after:-z-10 after:bg-gradient-to-b after:opacity-0 focus-within:after:opacity-100 hover:after:opacity-100 after:motion-safe:transition-opacity"
      :redirect-to="
        routeQuery.redirectTo ? (routeQuery.redirectTo as string) : undefined
      "
    />
  </section>
  <section v-else>
    <h1 class="mb-4 text-center text-2xl/tight">
      Willkommen, Bro 💪. Wir haben wirklich Bock auf Dich (no joke).
    </h1>
    <p class="mb-12 text-center">
      Jetzt kannst Du Dich anmelden; und endlich mit dem Spaß beginnen.
    </p>
    <LoginForm
      class="bg-surface-900 before:from-primary before:via-primary-900 after:from-primary after:to-primary relative pe-8 ps-8 before:absolute before:-inset-1 before:-z-10 before:bg-gradient-to-b before:to-transparent after:absolute after:-inset-1 after:-z-10 after:bg-gradient-to-b after:opacity-0 focus-within:after:opacity-100 hover:after:opacity-100 after:motion-safe:transition-opacity"
      :show-hint-if-no-account-is-available="false"
      headline="Go, go, go."
    />
  </section>
</template>
