<script setup lang="ts">
  import { RegisterFormModal } from "#components";
  const modal = useModal();

  defineShortcuts({
    ctrl_r: {
      usingInput: true,
      handler: () => {
        modal.open(RegisterFormModal);
      },
    },
  });
</script>

<template>
  <UTooltip
    text="Jetzt Account erstellen"
    :shortcuts="['Ctrl', 'R']"
    :popper="{ strategy: 'absolute' }"
  >
    <UButton label="Registrieren" @click="modal.open(RegisterFormModal)" />
  </UTooltip>
</template>
