<template>
  <footer
    class="border-primary-800 me-auto ms-auto flex max-w-screen-xl flex-col items-center gap-y-12 border-t p-24"
  >
    <div class="flex items-center justify-center gap-x-24">
      <!-- LOGO + SLOGAN -->
      <div class="flex flex-col items-center gap-y-2">
        <!-- LOGO -->
        <NuxtLink to="/">
          <AnimatedLogo class="max-w-80" />
          <span class="sr-only">Zur Startseite</span>
        </NuxtLink>

        <!-- SLOGAN -->
        <aside class="text-xs text-gray-400">
          <span class="text-primary">adZubi</span> – von adessi für adessi.
        </aside>
      </div>

      <!-- FOOTER MAIN PAGES -->
      <div class="flex flex-col items-center">
        <p class="mb-2 text-xs text-gray-400">
          Alles, was Du für Deine Ausbildung brauchst (und mehr).
        </p>
        <nav aria-label="Footer Hauptseiten">
          <ul class="flex flex-col gap-y-2">
            <li>
              <NuxtLink
                to="/courses"
                class="hover:bg-primary/50 hover:ring-primary flex items-center gap-x-2 px-8 py-4 text-lg hover:ring-1"
              >
                <UIcon
                  name="i-heroicons-academic-cap-solid"
                  class="h-10 w-10"
                />
                Kurse
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/challenges"
                class="hover:bg-primary/50 hover:ring-primary flex items-center gap-x-2 px-8 py-4 text-lg hover:ring-1"
              >
                <UIcon name="i-heroicons-bolt-solid" class="h-10 w-10" />
                Challenges
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/instructors"
                class="hover:bg-primary/50 hover:ring-primary flex items-center gap-x-2 px-8 py-4 text-lg hover:ring-1"
              >
                <UIcon name="i-heroicons-briefcase-solid" class="h-10 w-10" />
                Dozenten
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- FOOTER LEGAL PAGES -->
    <div
      class="border-surface-400 flex items-center justify-between gap-x-32 border-t pt-4"
    >
      <p class="text-sm">
        © {{ new Date().getFullYear() }}
        <span class="text-primary me-1 ms-1">adZubi</span>
        <span class="me-1">|</span>
        Alle Rechte vorbehalten
      </p>

      <nav aria-label="Footer rechtliche Seiten">
        <ul class="flex justify-around gap-x-8">
          <li>
            <NuxtLink to="/imprint" class="text-sm">Impressum</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/privacy" class="text-sm">Datenschutz</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>
