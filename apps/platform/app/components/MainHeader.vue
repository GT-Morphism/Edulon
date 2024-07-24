<template>
  <header class="bg-surface-500 flex h-12 justify-between px-6 py-2">
    <NuxtLink to="/#">
      <span
        class="bg-edulon-500 flex h-7 w-36 items-center justify-center text-xs text-black"
      >
        Logo
      </span>
    </NuxtLink>

    <nav class="text-white">
      <ul class="flex items-center justify-center gap-x-6 text-xs">
        <li><NuxtLink to="/kurse">Kurse</NuxtLink></li>
        <li><NuxtLink to="/meine-kurse">Meine Kurse</NuxtLink></li>
        <li><NuxtLink to="/challenge">Challenge</NuxtLink></li>
        <li><NuxtLink to="/lernressourcen">Lernressourcen</NuxtLink></li>
        <li><NuxtLink to="/dozent-werden">Dozent werden</NuxtLink></li>
        <li><NuxtLink to="/ausbilderteam">Ausbilderteam</NuxtLink></li>
        <li>
          <NuxtLink to="/profil" class="flex items-center gap-x-2">
            <UAvatar
              src="https://avatars.githubusercontent.com/u/72008643?v=4"
            />
            Profil
          </NuxtLink>
        </li>
        <li>
          <UButton size="2xs">Login</UButton>
        </li>
      </ul>
    </nav>
  </header>
</template>
