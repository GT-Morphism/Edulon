<script setup lang="ts">
  const { metaSymbol } = useShortcuts();
  const route = useRoute();
  const { session, logout } = useUserSession();
  const showCommands = ref(false);

  defineShortcuts({
    meta_k: {
      usingInput: true,
      handler: () => {
        showCommands.value = !showCommands.value;
      },
    },
    "g-c": {
      handler: () => {
        showCommands.value = false;
        return navigateTo("/challenges");
      },
    },
    "g-k": {
      handler: () => {
        showCommands.value = false;
        return navigateTo("/kurse");
      },
    },
    "g-d": {
      handler: () => {
        showCommands.value = false;
        return navigateTo("/dozenten");
      },
    },
    "g-p": {
      whenever: [() => session.value],
      handler: () => {
        showCommands.value = false;
        return navigateTo("/profil");
      },
    },
    "g-m": {
      whenever: [() => session.value],
      handler: () => {
        showCommands.value = false;
        return navigateTo("/profil/meine-kurse");
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
  <header class="bg-surface-900/80 sticky top-0 z-10 py-4 backdrop-blur">
    <div
      class="me-auto ms-auto flex max-w-screen-xl items-center justify-between"
    >
      <NuxtLink to="/">
        <AnimatedLogo class="max-w-14" />
        <span class="sr-only">Zur Startseite</span>
      </NuxtLink>

      <nav aria-label="Header">
        <ul class="flex gap-x-8">
          <li>
            <UTooltip
              text="Verfügbare Kurse ansehen"
              :shortcuts="['g', 'k']"
              :popper="{ strategy: 'absolute' }"
            >
              <NuxtLink
                class="before:bg-primary relative flex items-center gap-x-2 before:absolute before:-bottom-1 before:h-1 before:w-full before:origin-left before:scale-x-0 before:motion-safe:transition-transform"
                :class="{
                  'before:scale-x-100': route.path.startsWith('/kurse'),
                  'hover:before:scale-x-100': !route.path.startsWith('/kurse'),

                  'focus-visible:before:scale-x-100':
                    !route.path.startsWith('/kurse'),
                }"
                to="/kurse"
              >
                <UIcon name="i-heroicons-academic-cap-solid" class="h-5 w-5" />
                Kurse
              </NuxtLink>
            </UTooltip>
          </li>
          <li>
            <UTooltip
              text="Verfügbare Challenges ansehen"
              :shortcuts="['g', 'c']"
              :popper="{ strategy: 'absolute' }"
            >
              <NuxtLink
                class="before:bg-primary relative flex items-center gap-x-2 before:absolute before:-bottom-1 before:h-1 before:w-full before:origin-left before:scale-x-0 before:motion-safe:transition-transform"
                :class="{
                  'before:scale-x-100': route.path.startsWith('/challenges'),
                  'hover:before:scale-x-100':
                    !route.path.startsWith('/challenges'),
                  'focus-visible:before:scale-x-100':
                    !route.path.startsWith('/challenges'),
                }"
                to="/challenges"
              >
                <UIcon name="i-heroicons-bolt-solid" class="h-5 w-5" />
                Challenges
              </NuxtLink>
            </UTooltip>
          </li>
          <li>
            <UTooltip
              text="Unsere erstklassigen Dozenten kennenlernen"
              :shortcuts="['g', 'd']"
              :popper="{ strategy: 'absolute' }"
            >
              <NuxtLink
                class="before:bg-primary relative flex items-center gap-x-2 before:absolute before:-bottom-1 before:h-1 before:w-full before:origin-left before:scale-x-0 before:motion-safe:transition-transform"
                :class="{
                  'before:scale-x-100': route.path.startsWith('/dozenten'),
                  'hover:before:scale-x-100':
                    !route.path.startsWith('/dozenten'),
                  'focus-visible:before:scale-x-100':
                    !route.path.startsWith('/dozenten'),
                }"
                to="/dozenten"
              >
                <UIcon name="i-heroicons-briefcase-solid" class="h-5 w-5" />
                Dozenten
              </NuxtLink>
            </UTooltip>
          </li>
        </ul>
      </nav>

      <div class="flex gap-x-4">
        <LoginFormModalTrigger v-if="!session" />
        <RegisterFormModalTrigger v-if="!session" />

        <UTooltip
          v-if="session"
          text="Abmelden"
          :shortcuts="['Ctrl', 'A']"
          :popper="{ strategy: 'absolute' }"
        >
          <UButton
            type="button"
            icon="i-heroicons-arrow-right-start-on-rectangle"
            variant="ghost"
            color="white"
            :padded="false"
            @click="logout"
          >
            <span class="sr-only">Abmelden</span>
          </UButton>
        </UTooltip>

        <UTooltip
          v-if="session"
          text="Meine Kurse"
          :shortcuts="['g', 'm']"
          :popper="{ strategy: 'absolute' }"
        >
          <NuxtLink
            to="/profil/meine-kurse"
            class="flex items-center"
            :class="{ 'text-primary': route.path === '/profil/meine-kurse' }"
          >
            <UIcon name="i-heroicons-bookmark-solid" class="h-5 w-5" />
            <span class="sr-only">Zu Deinen Kursen</span>
          </NuxtLink>
        </UTooltip>

        <UTooltip
          v-if="session"
          text="Mein Profil"
          :shortcuts="['g', 'p']"
          :popper="{ strategy: 'absolute' }"
        >
          <NuxtLink
            to="/profil"
            class="flex items-center"
            :class="{ 'text-primary': route.path === '/profil' }"
          >
            <UIcon name="i-heroicons-user-circle-solid" class="h-5 w-5" />
            <span class="sr-only">Zu Deinem Profil</span>
          </NuxtLink>
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
            :padded="false"
            @click="showCommands = true"
          >
            <span class="sr-only">Modal mit Plattform-Befehlen öffnen</span>
          </UButton>
        </UTooltip>
      </div>
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

      <section
        class="[&>div:not(:last-child)]:mb-4"
        aria-labelledby="action-shortcuts-section-title"
      >
        <p
          id="action-shortcuts-section-title"
          class="text-primary mb-1 text-xs"
        >
          Aktionen
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

        <div v-if="session" class="flex items-center justify-between">
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
      </section>

      <UDivider
        class="py-1"
        :ui="{ border: { base: 'border-primary-200 dark:border-primary-800' } }"
      />

      <section
        class="[&>div:not(:last-child)]:mb-4"
        aria-labelledby="navigation-shortcuts-section-title"
      >
        <p
          id="navigation-shortcuts-section-title"
          class="text-primary mb-1 text-xs"
        >
          Navigation
        </p>

        <div class="flex items-center justify-between">
          <span class="flex items-center gap-x-2">
            <UIcon name="i-heroicons-academic-cap-solid" class="h-5 w-5" />
            Verfügbare Kurse
          </span>
          <span class="flex gap-x-1">
            <UKbd>g</UKbd>
            <UKbd>k</UKbd>
          </span>
        </div>

        <div class="flex items-center justify-between">
          <span class="flex items-center gap-x-2">
            <UIcon name="i-heroicons-bolt-solid" class="h-5 w-5" />
            Verfügbare Challenges
          </span>
          <span class="flex gap-x-1">
            <UKbd>g</UKbd>
            <UKbd>c</UKbd>
          </span>
        </div>

        <div class="flex items-center justify-between">
          <span class="flex items-center gap-x-2">
            <UIcon name="i-heroicons-briefcase-solid" class="h-5 w-5" />
            Unsere erstklassigen Dozenten kennenlernen
          </span>
          <span class="flex gap-x-1">
            <UKbd>g</UKbd>
            <UKbd>d</UKbd>
          </span>
        </div>

        <div v-if="session" class="flex items-center justify-between">
          <span class="flex items-center gap-x-2">
            <UIcon name="i-heroicons-bookmark-solid" class="h-5 w-5" />
            Meine Kurse
          </span>
          <span class="flex gap-x-1">
            <UKbd>g</UKbd>
            <UKbd>m</UKbd>
          </span>
        </div>

        <div v-if="session" class="flex items-center justify-between">
          <span class="flex items-center gap-x-2">
            <UIcon name="i-heroicons-user-circle-solid" class="h-5 w-5" />
            Mein Profil
          </span>
          <span class="flex gap-x-1">
            <UKbd>g</UKbd>
            <UKbd>p</UKbd>
          </span>
        </div>
      </section>

      <UDivider
        class="py-1"
        :ui="{ border: { base: 'border-primary-200 dark:border-primary-800' } }"
      />

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
