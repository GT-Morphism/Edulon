<template>
  <header
    class="dark:bg-surface-500 flex h-14 justify-between border-b border-b-neutral-400 bg-neutral-50 px-6 py-2"
  >
    <NuxtLink to="/#">
      <span
        class="bg-edulon-500 flex w-36 items-center justify-center rounded py-2 text-black"
      >
        <span class="me-2 h-5 w-5 rounded-full bg-white" />
        AD.ZUBI
      </span>
    </NuxtLink>

    <nav class="flex items-center dark:text-white">
      <ul class="flex items-center justify-center gap-x-6">
        <li>
          <NuxtLink to="/kurse" exact-active-class="text-edulon-500">
            Kurse
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/meine-kurse" exact-active-class="text-edulon-500">
            Meine Kurse
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/challenge" exact-active-class="text-edulon-500">
            Challenge
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/lernressourcen" exact-active-class="text-edulon-500">
            Lernressourcen
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/dozent-werden" exact-active-class="text-edulon-500">
            Dozent werden
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/ausbilderteam" exact-active-class="text-edulon-500">
            Ausbilderteam
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/profil" class="flex items-center gap-x-2 text-xs">
            <UAvatar
              src="https://avatars.githubusercontent.com/u/72008643?v=4"
            />
            Profil
          </NuxtLink>
        </li>
        <li>
          <UButton size="2xs"> Login </UButton>
        </li>
      </ul>
    </nav>
  </header>
</template>
