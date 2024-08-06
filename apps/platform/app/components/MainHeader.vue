<script setup lang="ts">
  const { session, logout } = useUserSession();
  const { metaSymbol } = useShortcuts();
  const showCommands = ref(false);

  defineShortcuts({
    meta_k: {
      usingInput: true,
      handler: () => {
        showCommands.value = !showCommands.value;
      },
    },
    ctrl_l: {
      usingInput: true,
      whenever: [() => !session.value],
      handler: () => {
        showCommands.value = false;
      },
    },
    ctrl_r: {
      usingInput: true,
      whenever: [() => !session.value],
      handler: () => {
        showCommands.value = false;
      },
    },
    ctrl_a: {
      usingInput: true,
      whenever: [() => session.value],
      handler: async () => {
        showCommands.value = false;
        await logout();
      },
    },
  });
</script>

<template>
  <header class="flex justify-around">
    <span> Logo </span>
    <nav class="bg-blue-500 py-2 text-white">
      <ul class="flex justify-center gap-x-4">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/profile">Profil</NuxtLink></li>
        <li><NuxtLink to="/login">Login</NuxtLink></li>
        <li><NuxtLink to="/playground">Playground</NuxtLink></li>
      </ul>
    </nav>

    <div class="flex gap-x-2">
      <LoginFormModalTrigger v-if="!session" />
      <RegisterFormModalTrigger v-if="!session" />

      <UTooltip
        v-if="session"
        text="Abmelden"
        :shortcuts="['Ctrl', 'A']"
        :popper="{ strategy: 'absolute' }"
      >
        <UButton
          icon="i-heroicons-arrow-right-start-on-rectangle"
          variant="ghost"
          color="white"
          square
          :padding="false"
          @click="logout"
        >
          <span class="sr-only">Abmelden</span>
        </UButton>
      </UTooltip>

      <UTooltip
        v-if="session"
        text="Meine Kurse"
        :shortcuts="['Ctrl', 'K']"
        :popper="{ strategy: 'absolute' }"
      >
        <UButton
          icon="i-heroicons-bookmark"
          variant="ghost"
          color="white"
          square
          :padding="false"
          @click="() => {}"
        >
          <span class="sr-only">Meine Kurse</span>
        </UButton>
      </UTooltip>

      <UTooltip
        v-if="session"
        text="Mein Profil"
        :shortcuts="['Ctrl', 'P']"
        :popper="{ strategy: 'absolute' }"
      >
        <UButton
          icon="i-heroicons-user-circle"
          variant="ghost"
          color="white"
          square
          :padding="false"
          @click="() => {}"
        >
          <span class="sr-only">Mein Profil</span>
        </UButton>
      </UTooltip>

      <UTooltip
        text="Plattformbefehle anzeigen"
        :shortcuts="[metaSymbol, 'K']"
        :popper="{ strategy: 'absolute' }"
      >
        <UButton
          type="button"
          icon="i-heroicons-command-line"
          variant="ghost"
          color="white"
          square
          :padding="false"
          @click="showCommands = true"
        >
          <span class="sr-only">Modal mit Plattform-Befehlen öffnen</span>
        </UButton>
      </UTooltip>
    </div>
  </header>

  <UModal v-model="showCommands">
    <div class="flex flex-col gap-y-2 p-8">
      <UBadge
        class="self-start"
        size="xs"
        label="#shortcuts4thewin"
        variant="soft"
      />
      <p class="mb-4 text-xs text-gray-400">
        Mit Shortcuts lässt es sich einfach besser leben. (Facts)
      </p>
      <div v-if="!session" class="flex items-center justify-between">
        <span class="flex items-center gap-x-2">
          <UIcon name="i-heroicons-arrow-left-on-rectangle" class="h-5 w-5" />
          Anmelden
        </span>
        <span class="flex gap-x-1">
          <UKbd>Ctrl</UKbd>
          <UKbd>L</UKbd>
        </span>
      </div>

      <div v-else class="flex items-center justify-between">
        <span class="flex items-center gap-x-2">
          <UIcon
            name="i-heroicons-arrow-right-start-on-rectangle"
            class="h-5 w-5"
          />
          Abmelden
        </span>
        <span class="flex gap-x-1">
          <UKbd>Ctrl</UKbd>
          <UKbd>A</UKbd>
        </span>
      </div>

      <UDivider />

      <div v-if="!session" class="flex items-center justify-between">
        <span class="flex items-center gap-x-2">
          <UIcon name="i-heroicons-user-plus" class="h-5 w-5" />
          Account erstellen
        </span>
        <span class="flex gap-x-1">
          <UKbd>Ctrl</UKbd>
          <UKbd>R</UKbd>
        </span>
      </div>

      <div v-else class="flex items-center justify-between">
        <span class="flex items-center gap-x-2">
          <UIcon name="i-heroicons-bookmark" class="h-5 w-5" />
          Meine Kurse
        </span>
        <span class="flex gap-x-1">
          <UKbd>Ctrl</UKbd>
          <UKbd>K</UKbd>
        </span>
      </div>

      <UDivider />

      <div v-if="session" class="flex items-center justify-between">
        <span class="flex items-center gap-x-2">
          <UIcon name="i-heroicons-user-circle" class="h-5 w-5" />
          Mein Profil
        </span>
        <span class="flex gap-x-1">
          <UKbd>Ctrl</UKbd>
          <UKbd>P</UKbd>
        </span>
      </div>

      <UDivider v-if="session" />

      <div class="flex items-center justify-between">
        <span class="flex items-center gap-x-2">
          <UIcon name="i-heroicons-command-line" class="h-5 w-5" />
          Plattformbefehle anzeigen
        </span>
        <span class="flex gap-x-1">
          <UKbd>{{ metaSymbol }}</UKbd>
          <UKbd>K</UKbd>
        </span>
      </div>
    </div>
  </UModal>
</template>
